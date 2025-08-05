import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../../lib/auth';
import { DatabaseService } from '../../lib/database';

interface CreditsResponse {
  currentCredits: number;
  totalCredits: number;
  usedCredits: number;
  subscription: {
    plan: string;
    status: 'active' | 'inactive' | 'expired';
    nextBillingDate?: string;
  } | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreditsResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 认证用户
    const user = await authUserAndCheckCredits(req, 0);

    // 获取用户credits
    let creditsData = await DatabaseService.getUserCredits(user.id);
    
    // 如果用户没有credits记录，创建一个
    if (!creditsData) {
      creditsData = await DatabaseService.createUserCredits(user.id, 0);
    }

    // 获取用户订阅信息
    const subscription = await DatabaseService.getUserSubscription(user.id);

    const response: CreditsResponse = {
      currentCredits: creditsData.current_credits,
      totalCredits: creditsData.total_credits,
      usedCredits: creditsData.used_credits,
      subscription: subscription ? {
        plan: subscription.plan_type,
        status: subscription.status as 'active' | 'inactive' | 'expired',
        nextBillingDate: subscription.next_billing_date
      } : null
    };

    res.status(200).json(response);

  } catch (error: unknown) {
    console.error('Get credits error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('Unauthorized')) {
      return res.status(401).json({ error: errorMessage });
    }

    res.status(500).json({ error: 'Failed to get credits' });
  }
} 