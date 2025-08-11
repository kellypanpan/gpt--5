import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../../lib/auth';
import { DatabaseService } from '../../lib/database';
import { rateLimit } from '../../lib/rate-limit';

interface BuyCreditsRequest {
  amount: number;
  returnUrl?: string;
}

interface BuyCreditsResponse {
  success: boolean;
  orderId: string;
  paymentUrl: string;
  amount: number;
  credits: number;
}

const CREDIT_PRICE = 0.30; // $0.30 per credit

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BuyCreditsResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    await rateLimit(req, res, { max: 10, windowMs: 60000 });

    // Authenticate user
    const user = await authUserAndCheckCredits(req, 0);

    const { amount, returnUrl } = req.body as BuyCreditsRequest;

    if (!amount || amount <= 0 || amount > 1000) {
      return res.status(400).json({ error: 'Invalid credit amount. Must be between 1 and 1000.' });
    }

    const totalPrice = amount * CREDIT_PRICE;

    // 创建订单记录
    const orderId = `credits_${user.id}_${Date.now()}`;
    
    // TODO: 集成creem支付API
    const creemOrderResponse = await createCreemCreditsOrder({
      orderId,
      userId: user.id,
      amount: totalPrice,
      credits: amount,
      returnUrl: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    });

    // 保存订单到数据库
    await DatabaseService.createCreditsOrder({
      orderId,
      userId: user.id,
      credits: amount,
      amount: totalPrice,
      status: 'pending'
    });

    res.status(200).json({
      success: true,
      orderId,
      paymentUrl: creemOrderResponse.paymentUrl,
      amount: totalPrice,
      credits: amount
    });

  } catch (error: unknown) {
    console.error('Buy credits error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('Unauthorized')) {
      return res.status(401).json({ error: errorMessage });
    }
    
    if (errorMessage.includes('Rate limit')) {
      return res.status(429).json({ error: errorMessage });
    }

    res.status(500).json({ error: 'Failed to create credits order' });
  }
}

// TODO: 实现creem支付API调用
async function createCreemCreditsOrder(orderData: {
  orderId: string;
  userId: string;
  amount: number;
  credits: number;
  returnUrl: string;
}): Promise<{ paymentUrl: string; creemOrderId: string }> {
  // 这里需要根据creem的API文档实现
  // 临时返回模拟数据
  return {
    paymentUrl: `https://creem.payment/checkout/credits/${orderData.orderId}`,
    creemOrderId: `creem_credits_${orderData.orderId}`
  };
} 