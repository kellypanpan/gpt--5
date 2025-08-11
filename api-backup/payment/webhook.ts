import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseService } from '../../lib/database';

interface CreemWebhookPayload {
  orderId: string;
  status: 'paid' | 'failed' | 'cancelled';
  amount: number;
  timestamp: string;
  signature: string;
  orderType?: 'subscription' | 'credits';
  planType?: string;
  credits?: number;
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

    // 验证creem webhook签名
    const signature = req.headers['x-creem-signature'] as string;
    const rawBody = JSON.stringify(req.body);
    
    if (!verifyCreemSignature(rawBody, signature, webhookSecret)) {
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
  console.log('Payment success:', payload);

  try {
    if (payload.orderType === 'credits') {
      // 处理credits订单
      await DatabaseService.updateCreditsOrder(payload.orderId, 'completed');
      await DatabaseService.addCreditsToUser(payload.orderId, payload.credits || 0);
    } else {
      // 处理订阅订单
      await DatabaseService.updateOrder(payload.orderId, 'completed');
      await DatabaseService.activateSubscription(payload.orderId, payload.planType);
    }
  } catch (error) {
    console.error('Failed to process payment success:', error);
  }
}

async function handlePaymentFailed(payload: CreemWebhookPayload) {
  console.log('Payment failed:', payload);

  try {
    if (payload.orderType === 'credits') {
      await DatabaseService.updateCreditsOrder(payload.orderId, 'failed');
    } else {
      await DatabaseService.updateOrder(payload.orderId, 'failed');
    }
  } catch (error) {
    console.error('Failed to process payment failure:', error);
  }
}

async function handlePaymentCancelled(payload: CreemWebhookPayload) {
  console.log('Payment cancelled:', payload);

  try {
    if (payload.orderType === 'credits') {
      await DatabaseService.updateCreditsOrder(payload.orderId, 'cancelled');
    } else {
      await DatabaseService.updateOrder(payload.orderId, 'cancelled');
    }
  } catch (error) {
    console.error('Failed to process payment cancellation:', error);
  }
}

// TODO: 实现creem签名验证
function verifyCreemSignature(payload: string, signature: string, secret: string): boolean {
  // 这里需要根据creem的签名算法实现
  // 临时返回true
  return true;
}