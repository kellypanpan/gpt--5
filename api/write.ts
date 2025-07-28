import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIService } from '../lib/openai';
import { authUserAndCheckCredits } from '../lib/auth';
import { DatabaseService } from '../lib/database';
import { rateLimit } from '../lib/rate-limit';

interface WriteRequest {
  prompt: string;
  tone?: 'professional' | 'casual' | 'creative' | 'academic';
  length?: 'short' | 'medium' | 'long';
  type?: 'blog' | 'article' | 'copy' | 'social' | 'email';
}

interface WriteResponse {
  content: string;
  creditsUsed: number;
  remainingCredits: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WriteResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    await rateLimit(req, res, { max: 10, windowMs: 60000 }); // 10 requests per minute

    // Authenticate user and check credits
    const user = await authUserAndCheckCredits(req, 1);

    const { prompt, tone = 'professional', length = 'medium', type = 'blog' } = req.body as WriteRequest;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (prompt.length > 1000) {
      return res.status(400).json({ error: 'Prompt is too long (max 1000 characters)' });
    }

    // Generate content using OpenAI
    const content = await OpenAIService.generateText({
      prompt,
      tone,
      length,
      type
    });

    // Log the generation
    await DatabaseService.logGeneration({
      userId: user.id,
      tool: 'writer',
      creditsUsed: 1,
      prompt,
      result: content,
      status: 'success'
    });

    // Get updated user credits
    const updatedUser = await DatabaseService.getUser(user.id);

    res.status(200).json({
      content,
      creditsUsed: 1,
      remainingCredits: updatedUser?.credits || 0
    });

  } catch (error: any) {
    console.error('Writer API error:', error);
    
    if (error.message.includes('Unauthorized')) {
      return res.status(401).json({ error: error.message });
    }
    
    if (error.message.includes('credits') || error.message.includes('Subscription')) {
      return res.status(402).json({ error: error.message });
    }

    if (error.message.includes('Rate limit')) {
      return res.status(429).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to generate content' });
  }
}