import { createClient } from '@supabase/supabase-js';

// 从环境变量获取 Supabase 配置
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase configuration missing. Please check your environment variables.');
}

// 创建 Supabase 客户端 (使用 service key 用于服务端操作)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 用户接口定义
export interface User {
  id: string;
  clerk_user_id: string;
  email: string;
  credits: number;
  is_subscribed: boolean;
  subscription_type?: 'pro' | 'creator' | 'lifetime';
  subscription_expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface GenerationLog {
  id: string;
  user_id: string;
  tool: string;
  credits_used: number;
  prompt: string;
  result: string;
  status: 'success' | 'failed';
  metadata?: Record<string, any>;
  created_at: string;
}

export interface UserStats {
  total_generations: number;
  credits_used: number;
  favorite_tool: string;
  generations_this_month: number;
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

export interface PaymentOrder {
  id: string;
  order_id: string;
  user_id: string;
  plan_type: 'pro' | 'creator' | 'lifetime';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  creem_order_id?: string;
  created_at: string;
  updated_at: string;
}

// 数据库服务类
export class DatabaseService {
  // 用户相关操作
  static async getUserByClerkId(clerkUserId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_user_id', clerkUserId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user by Clerk ID:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Database error in getUserByClerkId:', error);
      return null;
    }
  }

  static async getUser(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Database error in getUser:', error);
      return null;
    }
  }

  static async createUser(userData: {
    clerk_user_id: string;
    email: string;
    credits?: number;
  }): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          clerk_user_id: userData.clerk_user_id,
          email: userData.email,
          credits: userData.credits || 10,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating user:', error);
        throw new Error(`Failed to create user: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Database error in createUser:', error);
      throw error;
    }
  }

  static async updateUserCredits(userId: string, newCredits: number): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ 
          credits: Math.max(0, newCredits),
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user credits:', error);
        throw new Error(`Failed to update credits: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Database error in updateUserCredits:', error);
      throw error;
    }
  }

  static async updateUserSubscription(
    userId: string,
    subscriptionData: {
      is_subscribed: boolean;
      subscription_type?: 'pro' | 'creator' | 'lifetime';
      subscription_expires_at?: string;
    }
  ): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          is_subscribed: subscriptionData.is_subscribed,
          subscription_type: subscriptionData.subscription_type,
          subscription_expires_at: subscriptionData.subscription_expires_at,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Error updating user subscription:', error);
        throw new Error(`Failed to update subscription: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Database error in updateUserSubscription:', error);
      throw error;
    }
  }

  // 生成日志相关操作
  static async logGeneration(logData: {
    user_id: string;
    tool: string;
    credits_used: number;
    prompt: string;
    result: string;
    status?: 'success' | 'failed';
    metadata?: Record<string, any>;
  }): Promise<GenerationLog> {
    try {
      const { data, error } = await supabase
        .from('generation_logs')
        .insert({
          user_id: logData.user_id,
          tool: logData.tool,
          credits_used: logData.credits_used,
          prompt: logData.prompt,
          result: logData.result,
          status: logData.status || 'success',
          metadata: logData.metadata || {}
        })
        .select()
        .single();

      if (error) {
        console.error('Error logging generation:', error);
        throw new Error(`Failed to log generation: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Database error in logGeneration:', error);
      throw error;
    }
  }

  static async getUserGenerations(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<GenerationLog[]> {
    try {
      const { data, error } = await supabase
        .from('generation_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Error fetching user generations:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error in getUserGenerations:', error);
      return [];
    }
  }

  // 用户统计相关操作
  static async getUserStats(userId: string): Promise<UserStats> {
    try {
      const { data, error } = await supabase
        .rpc('get_user_stats', { p_user_id: userId });

      if (error) {
        console.error('Error fetching user stats:', error);
        // 返回默认统计数据
        return {
          total_generations: 0,
          credits_used: 0,
          favorite_tool: 'writer',
          generations_this_month: 0
        };
      }

      return data[0] || {
        total_generations: 0,
        credits_used: 0,
        favorite_tool: 'writer',
        generations_this_month: 0
      };
    } catch (error) {
      console.error('Database error in getUserStats:', error);
      return {
        total_generations: 0,
        credits_used: 0,
        favorite_tool: 'writer',
        generations_this_month: 0
      };
    }
  }

  // 对话历史相关操作
  static async saveConversation(conversationData: {
    conversation_id: string;
    user_id: string;
    user_message: string;
    assistant_response: string;
    task_type: string;
    context?: string;
  }): Promise<void> {
    try {
      const { error } = await supabase
        .from('conversations')
        .insert({
          conversation_id: conversationData.conversation_id,
          user_id: conversationData.user_id,
          user_message: conversationData.user_message,
          assistant_response: conversationData.assistant_response,
          task_type: conversationData.task_type,
          context: conversationData.context || ''
        });

      if (error) {
        console.error('Error saving conversation:', error);
        throw new Error(`Failed to save conversation: ${error.message}`);
      }
    } catch (error) {
      console.error('Database error in saveConversation:', error);
      throw error;
    }
  }

  static async getConversationHistory(
    conversationId: string,
    limit: number = 50
  ): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) {
        console.error('Error fetching conversation history:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error in getConversationHistory:', error);
      return [];
    }
  }

  // 提示词商城相关操作
  static async getFeaturedPrompts(limit: number = 10): Promise<Prompt[]> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('is_approved', true)
        .eq('is_featured', true)
        .order('likes', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching featured prompts:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error in getFeaturedPrompts:', error);
      return [];
    }
  }

  static async getPromptsByCategory(
    category: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<Prompt[]> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('is_approved', true)
        .eq('category', category)
        .order('likes', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Error fetching prompts by category:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error in getPromptsByCategory:', error);
      return [];
    }
  }

  static async searchPrompts(
    query: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<Prompt[]> {
    try {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('is_approved', true)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
        .order('likes', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Error searching prompts:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error in searchPrompts:', error);
      return [];
    }
  }

  static async purchasePrompt(
    userId: string,
    promptId: string,
    pricePaid: number
  ): Promise<string> {
    try {
      const { data, error } = await supabase
        .rpc('purchase_prompt', {
          p_user_id: userId,
          p_prompt_id: promptId,
          p_price_paid: pricePaid
        });

      if (error) {
        console.error('Error purchasing prompt:', error);
        throw new Error(`Failed to purchase prompt: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Database error in purchasePrompt:', error);
      throw error;
    }
  }

  static async togglePromptLike(
    userId: string,
    promptId: string
  ): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('toggle_prompt_like', {
          p_user_id: userId,
          p_prompt_id: promptId
        });

      if (error) {
        console.error('Error toggling prompt like:', error);
        throw new Error(`Failed to toggle like: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Database error in togglePromptLike:', error);
      throw error;
    }
  }

  static async getUserPurchases(userId: string): Promise<PromptPurchase[]> {
    try {
      const { data, error } = await supabase
        .from('prompt_purchases')
        .select(`
          *,
          prompts:prompt_id (
            id,
            title,
            description,
            category,
            tags
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user purchases:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Database error in getUserPurchases:', error);
      return [];
    }
  }

  // 支付订单相关操作
  static async createPaymentOrder(orderData: {
    order_id: string;
    user_id: string;
    plan_type: 'pro' | 'creator' | 'lifetime';
    amount: number;
    creem_order_id?: string;
  }): Promise<PaymentOrder> {
    try {
      const { data, error } = await supabase
        .from('payment_orders')
        .insert({
          order_id: orderData.order_id,
          user_id: orderData.user_id,
          plan_type: orderData.plan_type,
          amount: orderData.amount,
          creem_order_id: orderData.creem_order_id,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating payment order:', error);
        throw new Error(`Failed to create payment order: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Database error in createPaymentOrder:', error);
      throw error;
    }
  }

  static async updatePaymentOrderStatus(
    orderId: string,
    status: 'pending' | 'completed' | 'failed' | 'cancelled',
    creemOrderId?: string
  ): Promise<PaymentOrder> {
    try {
      const updateData: any = { 
        status, 
        updated_at: new Date().toISOString() 
      };
      
      if (creemOrderId) {
        updateData.creem_order_id = creemOrderId;
      }

      const { data, error } = await supabase
        .from('payment_orders')
        .update(updateData)
        .eq('order_id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating payment order status:', error);
        throw new Error(`Failed to update payment order: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Database error in updatePaymentOrderStatus:', error);
      throw error;
    }
  }

  static async getPaymentOrder(orderId: string): Promise<PaymentOrder | null> {
    try {
      const { data, error } = await supabase
        .from('payment_orders')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching payment order:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error in getPaymentOrder:', error);
      return null;
    }
  }

  // 数据库健康检查
  static async healthCheck(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .select('count(*)', { count: 'exact', head: true });
      
      return !error;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // 批量操作
  static async batchUpdateUserCredits(
    userUpdates: Array<{ userId: string; credits: number }>
  ): Promise<void> {
    try {
      const updates = userUpdates.map(update => ({
        id: update.userId,
        credits: Math.max(0, update.credits),
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('users')
        .upsert(updates, { onConflict: 'id' });

      if (error) {
        console.error('Error batch updating user credits:', error);
        throw new Error(`Failed to batch update credits: ${error.message}`);
      }
    } catch (error) {
      console.error('Database error in batchUpdateUserCredits:', error);
      throw error;
    }
  }

  // 清理旧数据
  static async cleanupOldLogs(daysOld: number = 90): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const { data, error } = await supabase
        .from('generation_logs')
        .delete()
        .lt('created_at', cutoffDate.toISOString())
        .select('id');

      if (error) {
        console.error('Error cleaning up old logs:', error);
        return 0;
      }

      return data?.length || 0;
    } catch (error) {
      console.error('Database error in cleanupOldLogs:', error);
      return 0;
    }
  }
}

// 导出 Supabase 客户端供其他地方使用
export { supabase };

// 导出默认实例
export default DatabaseService;