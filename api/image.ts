import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../lib/auth';
import { DatabaseService } from '../lib/database';
import { rateLimit } from '../lib/rate-limit';
import { uploadToCloudinary } from '../lib/upload';

interface ImageRequest {
  prompt: string;
  size?: '512x512' | '1024x1024' | '1792x1024';
  quality?: 'standard' | 'hd';
  style?: 'natural' | 'vivid';
  count?: number;
}

interface ImageResponse {
  images: {
    url: string;
    prompt: string;
    size: string;
    quality: string;
  }[];
  creditsUsed: number;
  remainingCredits: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting for image generation (more restrictive)
    await rateLimit(req, res, { max: 5, windowMs: 60000 }); // 5 requests per minute

    const { prompt, size = '1024x1024', quality = 'standard', style = 'vivid', count = 1 } = req.body as ImageRequest;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (prompt.length > 400) {
      return res.status(400).json({ error: 'Prompt is too long (max 400 characters)' });
    }

    if (count < 1 || count > 4) {
      return res.status(400).json({ error: 'Count must be between 1 and 4' });
    }

    // Calculate credits based on quality and count
    const baseCredits = quality === 'hd' ? 8 : 5;
    const totalCredits = baseCredits * count;

    // Authenticate user and check credits
    const user = await authUserAndCheckCredits(req, totalCredits);

    // Use OpenRouter API via simple-api server
    const apiResponse = await fetch('http://localhost:3001/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, size, quality, style }),
    });

    if (!apiResponse.ok) {
      throw new Error(`API request failed: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();
    const imageUrls = [result.imageUrl];

    // Upload images to our CDN and get permanent URLs
    const images = await Promise.all(
      imageUrls.map(async (url) => {
        const permanentUrl = await uploadToCloudinary(url, 'generated-images');
        return {
          url: permanentUrl,
          prompt,
          size,
          quality
        };
      })
    );

    // Log the generation
    await DatabaseService.logGeneration({
      userId: user.id,
      tool: 'image',
      creditsUsed: totalCredits,
      prompt,
      result: JSON.stringify({ images: images.length, size, quality }),
      status: 'success'
    });

    // Get updated user credits
    const updatedUser = await DatabaseService.getUser(user.id);

    res.status(200).json({
      images,
      creditsUsed: totalCredits,
      remainingCredits: updatedUser?.credits || 0
    });

  } catch (error: unknown) {
    console.error('Image API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('Unauthorized')) {
      return res.status(401).json({ error: errorMessage });
    }
    
    if (errorMessage.includes('credits') || errorMessage.includes('Subscription')) {
      return res.status(402).json({ error: errorMessage });
    }

    if (errorMessage.includes('Rate limit')) {
      return res.status(429).json({ error: errorMessage });
    }

    if (error.message.includes('policy') || error.message.includes('safety')) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to generate images' });
  }
}