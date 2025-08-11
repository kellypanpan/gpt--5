import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 需要service role key，不是anon key
);

const WEBHOOK_SECRET = 'creem_6Ti3FMBtlyNdWHlGgwkPDg';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. 验证webhook签名（防止伪造请求）
    const signature = req.headers['creem-signature'] || req.headers['x-creem-signature'];
    const body = JSON.stringify(req.body);
    
    if (signature) {
      // 验证签名
      const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(body, 'utf8')
        .digest('hex');
      
      const providedSignature = signature.replace('sha256=', '');
      
      if (providedSignature !== expectedSignature) {
        console.log('Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    } else {
      console.log('No signature provided, accepting for now');
    }

    // 2. 解析事件数据
    const event = req.body;
    console.log('Received Creem webhook:', JSON.stringify(event, null, 2));

    // 3. 根据事件类型处理
    const eventType = event.type || event.event_type || event.eventType;
    
    switch (eventType) {
      case 'subscription.created':
      case 'subscription_created':
      case 'payment.succeeded':
      case 'payment_succeeded':
      case 'checkout.completed':
      case 'checkout_completed':
        await handleSubscriptionActivated(event);
        break;
        
      case 'subscription.cancelled':
      case 'subscription_cancelled':
      case 'subscription.ended':
      case 'subscription_ended':
        await handleSubscriptionDeactivated(event);
        break;
        
      default:
        console.log('Unhandled webhook event type:', eventType);
        console.log('Full event data:', event);
    }

    return res.status(200).json({ received: true, eventType });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// 激活订阅
async function handleSubscriptionActivated(event: any) {
  try {
    const { customer_email, product_id, subscription_id } = event.data;
    
    // 根据product_id判断是哪个计划
    let planType = 'monthly';
    if (product_id === 'prod_6LX36QdDi0G9OKoFiRxY2h') planType = 'quarterly';
    if (product_id === 'prod_3X0YJVzza8jlBTPC2DqbA5') planType = 'yearly';
    
    // 计算订阅结束时间
    const now = new Date();
    const endDate = new Date(now);
    if (planType === 'monthly') endDate.setMonth(now.getMonth() + 1);
    if (planType === 'quarterly') endDate.setMonth(now.getMonth() + 3);
    if (planType === 'yearly') endDate.setFullYear(now.getFullYear() + 1);
    
    // 查找用户
    const { data: user } = await supabase.auth.admin.getUserByEmail(customer_email);
    
    if (!user) {
      console.error('User not found:', customer_email);
      return;
    }
    
    // 更新用户订阅状态
    const { error } = await supabase
      .from('user_subscriptions')
      .upsert({
        user_id: user.id,
        subscription_id,
        plan_type: planType,
        status: 'active',
        current_period_start: now.toISOString(),
        current_period_end: endDate.toISOString(),
        created_at: now.toISOString(),
        updated_at: now.toISOString()
      });
    
    if (error) {
      console.error('Failed to update subscription:', error);
    } else {
      console.log('Subscription activated for user:', customer_email);
    }
    
  } catch (error) {
    console.error('Error activating subscription:', error);
  }
}

// 取消订阅
async function handleSubscriptionDeactivated(event: any) {
  try {
    const { customer_email, subscription_id } = event.data;
    
    // 查找用户
    const { data: user } = await supabase.auth.admin.getUserByEmail(customer_email);
    
    if (!user) {
      console.error('User not found:', customer_email);
      return;
    }
    
    // 更新订阅状态为取消
    const { error } = await supabase
      .from('user_subscriptions')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('subscription_id', subscription_id);
    
    if (error) {
      console.error('Failed to cancel subscription:', error);
    } else {
      console.log('Subscription cancelled for user:', customer_email);
    }
    
  } catch (error) {
    console.error('Error cancelling subscription:', error);
  }
}