import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../../lib/auth';
import { DatabaseService } from '../../lib/database';

interface UseCreditsRequest {
  amount: number;
  toolName?: string;
  description?: string;
}

interface UseCreditsResponse {
  currentCredits: number;
  totalCredits: number;
  usedCredits: number;
  creditsUsed: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UseCreditsResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 认证用户
    const user = await authUserAndCheckCredits(req, 0);

    const { amount, toolName = 'unknown', description } = req.body as UseCreditsRequest;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid credit amount' });
    }

    // 使用credits
    const creditsData = await DatabaseService.useCredits(
      user.id, 
      amount, 
      toolName, 
      description
    );

    const response: UseCreditsResponse = {
      currentCredits: creditsData.current_credits,
      totalCredits: creditsData.total_credits,
      usedCredits: creditsData.used_credits,
      creditsUsed: amount
    };

    res.status(200).json(response);

  } catch (error: unknown) {
    console.error('Use credits error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('Unauthorized')) {
      return res.status(401).json({ error: errorMessage });
    }

    if (errorMessage.includes('Insufficient credits')) {
      return res.status(400).json({ error: errorMessage });
    }

    res.status(500).json({ error: 'Failed to use credits' });
  }
} 