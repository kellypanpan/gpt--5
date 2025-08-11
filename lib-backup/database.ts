import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface User {
  id: string;
  email: string;
  credits: number;
  is_subscribed: boolean;
  subscription_type?: 'pro' | 'creator' | 'lifetime';
  subscription_expires_at?: string;
  created_at: string;
  updated_at: string;
  clerk_user_id: string;
}

export interface GenerationLog {
  id: string;
  user_id: string;
  tool: string;
  credits_used: number;
  prompt: string;
  result: string;
  status: 'success' | 'failed';
  created_at: string;
  metadata?: Record<string, unknown>;
}

export interface Conversation {
  id: string;
  conversation_id: string;
  user_id: string;
  user_message: string;
  assistant_response: string;
  task_type: string;
  context?: string;
  created_at: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  price: number;
  author_id: string;
  likes: number;
  downloads: number;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface PromptPurchase {
  id: string;
  user_id: string;
  prompt_id: string;
  price_paid: number;
  created_at: string;
}

export class DatabaseService {
  // Credits管理
  static async getUserCredits(userId: string) {
    const { data, error } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  }

  static async createUserCredits(userId: string, credits: number = 0) {
    const { data, error } = await supabase
      .from('user_credits')
      .insert({
        user_id: userId,
        current_credits: credits,
        total_credits: credits,
        used_credits: 0
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUserCredits(userId: string, credits: number) {
    const { data, error } = await supabase
      .from('user_credits')
      .update({ current_credits: credits })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async addCreditsToUser(userId: string, credits: number) {
    // 先获取当前credits
    const currentData = await this.getUserCredits(userId);
    const newCredits = (currentData?.current_credits || 0) + credits;
    const newTotalCredits = (currentData?.total_credits || 0) + credits;

    const { data, error } = await supabase
      .from('user_credits')
      .update({ 
        current_credits: newCredits,
        total_credits: newTotalCredits
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async useCredits(userId: string, credits: number, toolName: string, description?: string) {
    // 先获取当前credits
    const currentData = await this.getUserCredits(userId);
    const newCredits = (currentData?.current_credits || 0) - credits;
    const newUsedCredits = (currentData?.used_credits || 0) + credits;

    if (newCredits < 0) {
      throw new Error('Insufficient credits');
    }

    // 更新credits
    const { data: creditsData, error: creditsError } = await supabase
      .from('user_credits')
      .update({ 
        current_credits: newCredits,
        used_credits: newUsedCredits
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (creditsError) throw creditsError;

    // 记录使用情况
    const { error: usageError } = await supabase
      .from('credits_usage')
      .insert({
        user_id: userId,
        tool_name: toolName,
        credits_used: credits,
        description
      });

    if (usageError) throw usageError;

    return creditsData;
  }

  // 订阅管理
  static async getUserSubscription(userId: string) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data;
  }

  static async createSubscription(subscriptionData: {
    user_id: string;
    plan_type: string;
    credits_per_month: number;
    amount: number;
    billing_cycle: string;
    next_billing_date?: string;
  }) {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert(subscriptionData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateSubscription(subscriptionId: string, updates: any) {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(updates)
      .eq('id', subscriptionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // 订单管理
  static async createSubscriptionOrder(orderData: {
    order_id: string;
    user_id: string;
    plan_type: string;
    amount: number;
    creem_order_id?: string;
  }) {
    const { data, error } = await supabase
      .from('subscription_orders')
      .insert(orderData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createCreditsOrder(orderData: {
    order_id: string;
    user_id: string;
    credits: number;
    amount: number;
    creem_order_id?: string;
  }) {
    const { data, error } = await supabase
      .from('credits_orders')
      .insert(orderData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateSubscriptionOrder(orderId: string, status: string, creemOrderId?: string) {
    const updates: any = { status };
    if (creemOrderId) updates.creem_order_id = creemOrderId;

    const { data, error } = await supabase
      .from('subscription_orders')
      .update(updates)
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateCreditsOrder(orderId: string, status: string, creemOrderId?: string) {
    const updates: any = { status };
    if (creemOrderId) updates.creem_order_id = creemOrderId;

    const { data, error } = await supabase
      .from('credits_orders')
      .update(updates)
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getSubscriptionOrder(orderId: string) {
    const { data, error } = await supabase
      .from('subscription_orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) throw error;
    return data;
  }

  static async getCreditsOrder(orderId: string) {
    const { data, error } = await supabase
      .from('credits_orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) throw error;
    return data;
  }

  // 激活订阅
  static async activateSubscription(orderId: string, planType: string) {
    const order = await this.getSubscriptionOrder(orderId);
    if (!order) throw new Error('Order not found');

    // 获取计划信息
    const planInfo = this.getPlanInfo(planType);
    if (!planInfo) throw new Error('Invalid plan type');

    // 创建或更新订阅
    const subscriptionData = {
      user_id: order.user_id,
      plan_type: planType,
      credits_per_month: planInfo.credits,
      amount: planInfo.price,
      billing_cycle: planInfo.type,
      next_billing_date: this.calculateNextBillingDate(planInfo.type)
    };

    // 检查是否已有活跃订阅
    const existingSubscription = await this.getUserSubscription(order.user_id);
    
    if (existingSubscription) {
      // 更新现有订阅
      await this.updateSubscription(existingSubscription.id, subscriptionData);
    } else {
      // 创建新订阅
      await this.createSubscription(subscriptionData);
    }

    // 添加credits到用户账户
    await this.addCreditsToUser(order.user_id, planInfo.credits);

    return true;
  }

  // 辅助方法
  private static getPlanInfo(planType: string) {
    const plans: Record<string, any> = {
      'starter_monthly': { credits: 100, price: 19.99, type: 'monthly' },
      'pro_monthly': { credits: 300, price: 39.99, type: 'monthly' },
      'business_monthly': { credits: 800, price: 79.99, type: 'monthly' },
      'starter_yearly': { credits: 100, price: 191.88, type: 'yearly' },
      'pro_yearly': { credits: 300, price: 383.88, type: 'yearly' },
      'business_yearly': { credits: 800, price: 767.88, type: 'yearly' }
    };

    return plans[planType];
  }

  private static calculateNextBillingDate(billingCycle: string): string {
    const now = new Date();
    if (billingCycle === 'monthly') {
      now.setMonth(now.getMonth() + 1);
    } else if (billingCycle === 'yearly') {
      now.setFullYear(now.getFullYear() + 1);
    }
    return now.toISOString();
  }
}