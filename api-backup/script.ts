import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../lib/auth';
import { DatabaseService } from '../lib/database';
import { rateLimit } from '../lib/rate-limit';

interface ScriptRequest {
  scene: string;
  style: 'romance' | 'comedy' | 'thriller' | 'drama' | 'action';
  platform?: 'tiktok' | 'youtube' | 'instagram';
  duration?: '30s' | '60s' | '90s' | '120s';
}

interface ScriptResponse {
  script: string;
  creditsUsed: number;
  remainingCredits: number;
  metadata: {
    scenes: number;
    estimatedDuration: string;
    platform: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScriptResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    await rateLimit(req, res, { max: 8, windowMs: 60000 }); // 8 requests per minute

    // Authenticate user and check credits
    const user = await authUserAndCheckCredits(req, 2);

    const { scene, style, platform = 'youtube', duration = '60s' } = req.body as ScriptRequest;

    if (!scene || scene.trim().length === 0) {
      return res.status(400).json({ error: 'Scene description is required' });
    }

    if (scene.length > 500) {
      return res.status(400).json({ error: 'Scene description is too long (max 500 characters)' });
    }

    // Use OpenRouter API via simple-api server
    const apiResponse = await fetch('http://localhost:3001/api/script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scene, style, platform, duration }),
    });

    if (!apiResponse.ok) {
      throw new Error(`API request failed: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();
    const script = result.script;
    const metadata = {
      scenes: 1,
      estimatedDuration: duration,
      platform
    };

    // Log the generation
    await DatabaseService.logGeneration({
      userId: user.id,
      tool: 'script',
      creditsUsed: 2,
      prompt: `${style} script for ${platform}: ${scene}`,
      result: script,
      status: 'success'
    });

    // Get updated user credits
    const updatedUser = await DatabaseService.getUser(user.id);

    res.status(200).json({
      script,
      creditsUsed: 2,
      remainingCredits: updatedUser?.credits || 0,
      metadata
    });

  } catch (error: unknown) {
    console.error('Script API error:', error);
    
    const errorMessage: string = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('Unauthorized')) {
      return res.status(401).json({ error: errorMessage });
    }
    
    if (errorMessage.includes('credits') || errorMessage.includes('Subscription')) {
      return res.status(402).json({ error: errorMessage });
    }

    if (errorMessage.includes('Rate limit')) {
      return res.status(429).json({ error: errorMessage });
    }

    res.status(500).json({ error: 'Failed to generate script' });
  }
}