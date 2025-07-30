import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../../lib/auth';
import { DatabaseService } from '../../lib/database';
import { rateLimit } from '../../lib/rate-limit';

interface CreateOrderRequest {
  planType: 'pro' | 'creator' | 'lifetime';
  returnUrl?: string;
}

interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  paymentUrl: string;
  amount: number;
  planType: string;
}

// Creem支付计划配置
const CREEM_PLANS = {
  pro: {
    name: 'Pro Plan',
    price: 15.00,
    credits: 500,
    duration: 'monthly'
  },
  creator: {
    name: 'Creator Plan', 
    price: 39.00,
    credits: 1000,
    duration: 'monthly'
  },
  lifetime: {
    name: 'Lifetime Plan',
    price: 299.00,
    credits: -1, // unlimited
    duration: 'lifetime'
  }
} as const;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateOrderResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    await rateLimit(req, res, { max: 10, windowMs: 60000 });

    // Authenticate user
    const user = await authUserAndCheckCredits(req, 0); // No credits required for payment

    const { planType, returnUrl } = req.body as CreateOrderRequest;

    if (!planType || !CREEM_PLANS[planType]) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    const plan = CREEM_PLANS[planType];

    // 创建订单记录（等待支付）
    const orderId = `order_${user.id}_${Date.now()}`;
    
    // TODO: 集成creem支付API
    // 这里需要调用creem的创建订单API
    const creemOrderResponse = await createCreemOrder({
      orderId,
      userId: user.id,
      amount: plan.price,
      planType,
      planName: plan.name,
      returnUrl: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    });

    // 保存订单到数据库
    await DatabaseService.createPendingOrder({
      orderId,
      userId: user.id,
      planType,
      amount: plan.price,
      status: 'pending'
    });

    res.status(200).json({
      success: true,
      orderId,
      paymentUrl: creemOrderResponse.paymentUrl,
      amount: plan.price,
      planType
    });

  } catch (error: unknown) {
    console.error('Create order error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('Unauthorized')) {
      return res.status(401).json({ error: errorMessage });
    }
    
    if (errorMessage.includes('Rate limit')) {
      return res.status(429).json({ error: errorMessage });
    }

    res.status(500).json({ error: 'Failed to create payment order' });
  }
}

// TODO: 实现creem支付API调用
async function createCreemOrder(orderData: {
  orderId: string;
  userId: string;
  amount: number;
  planType: string;
  planName: string;
  returnUrl: string;
}): Promise<{ paymentUrl: string; creemOrderId: string }> {
  // 这里需要根据creem的API文档实现
  // 临时返回模拟数据
  return {
    paymentUrl: `https://creem.payment/checkout/${orderData.orderId}`,
    creemOrderId: `creem_${orderData.orderId}`
  };
}