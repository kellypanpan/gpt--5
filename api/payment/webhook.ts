import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseService } from '../../lib/database';

interface CreemWebhookPayload {
  orderId: string;
  status: 'paid' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  timestamp: string;
  signature: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('CREEM_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    // TODO: 验证creem webhook签名
    const signature = req.headers['x-creem-signature'] as string;
    if (!verifyCreemSignature(req.body, signature, webhookSecret)) {
      console.error('Invalid creem webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const payload = req.body as CreemWebhookPayload;

    switch (payload.status) {
      case 'paid':
        await handlePaymentSuccess(payload);
        break;
      case 'failed':
        await handlePaymentFailed(payload);
        break;
      case 'cancelled':
        await handlePaymentCancelled(payload);
        break;
      default:
        console.log(`Unhandled payment status: ${payload.status}`);
    }

    res.status(200).json({ received: true });

  } catch (error: unknown) {
    console.error('Creem webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handlePaymentSuccess(payload: CreemWebhookPayload) {
  try {
    const orderId = payload.orderId;
    
    // 获取订单信息
    const order = await DatabaseService.getPendingOrder(orderId);
    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return;
    }

    // 更新用户订阅和积分
    const user = await DatabaseService.getUser(order.userId);
    if (!user) {
      console.error(`User not found: ${order.userId}`);
      return;
    }

    // 根据计划类型更新用户信息
    let subscriptionExpiry = null;
    let creditsToAdd = 0;

    switch (order.planType) {
      case 'pro':
        creditsToAdd = 500;
        subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30天
        break;
      case 'creator':
        creditsToAdd = 1000;
        subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30天
        break;
      case 'lifetime':
        creditsToAdd = 10000; // 给一个大数值表示无限
        subscriptionExpiry = new Date('2099-12-31'); // 远期日期
        break;
    }

    // 更新用户订阅状态
    await DatabaseService.updateUserSubscription({
      userId: order.userId,
      subscriptionType: order.planType,
      creditsToAdd,
      subscriptionExpiry,
      isSubscribed: true
    });

    // 更新订单状态
    await DatabaseService.updateOrderStatus(orderId, 'completed');

    console.log(`Payment successful for user ${order.userId}, plan: ${order.planType}`);

  } catch (error: unknown) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

async function handlePaymentFailed(payload: CreemWebhookPayload) {
  try {
    await DatabaseService.updateOrderStatus(payload.orderId, 'failed');
    console.log(`Payment failed for order: ${payload.orderId}`);
  } catch (error: unknown) {
    console.error('Error handling payment failure:', error);
  }
}

async function handlePaymentCancelled(payload: CreemWebhookPayload) {
  try {
    await DatabaseService.updateOrderStatus(payload.orderId, 'cancelled');
    console.log(`Payment cancelled for order: ${payload.orderId}`);
  } catch (error: unknown) {
    console.error('Error handling payment cancellation:', error);
  }
}

// TODO: 实现creem签名验证
function verifyCreemSignature(payload: unknown, signature: string, secret: string): boolean {
  // 这里需要根据creem的文档实现签名验证
  // 临时返回true，实际使用时需要实现真实的验证逻辑
  console.log('TODO: Implement creem signature verification');
  return true;
}