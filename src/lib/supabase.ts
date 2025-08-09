import { createClient } from '@supabase/supabase-js';

// Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

// 创建 Supabase 客户端（启用认证功能）
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// 数据库类型定义
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  plan: 'free' | 'pro' | 'business';
  credits: number;
  subscription_status: 'active' | 'expired' | 'cancelled';
  subscription_ends_at?: string;
  provider?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

// 用户认证相关函数
export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/chat`
    }
  });
  
  if (error) throw error;
  return data;
}

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/chat`
    }
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// 用户数据相关函数
export async function createUserProfile(user: any) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0],
        avatar_url: user.user_metadata?.avatar_url,
        plan: 'free',
        credits: 10,
        subscription_status: 'active',
        provider: user.app_metadata?.provider || 'email'
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    throw error;
  }
  return data;
}

export async function updateUserCredits(userId: string, credits: number) {
  const { data, error } = await supabase
    .from('users')
    .update({ credits })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function upgradeUserPlan(userId: string, plan: 'pro' | 'business', subscriptionEndsAt?: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      plan, 
      subscription_status: 'active',
      subscription_ends_at: subscriptionEndsAt,
      credits: -1 // Unlimited for paid plans
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 聊天会话相关函数
export async function createChatSession(userId: string, title: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .insert([
      {
        user_id: userId,
        title
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserChatSessions(userId: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getChatMessages(sessionId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function addChatMessage(sessionId: string, role: 'user' | 'assistant', content: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      {
        session_id: sessionId,
        role,
        content
      }
    ])
    .select()
    .single();

  if (error) throw error;
  
  // Update session's updated_at timestamp
  await supabase
    .from('chat_sessions')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', sessionId);

  return data;
}

export async function updateChatMessage(messageId: string, content: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .update({ content })
    .eq('id', messageId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteChatMessage(messageId: string) {
  const { error } = await supabase
    .from('chat_messages')
    .delete()
    .eq('id', messageId);
  if (error) throw error;
}

export async function updateChatSessionTitle(sessionId: string, title: string) {
  const { data, error } = await supabase
    .from('chat_sessions')
    .update({ title })
    .eq('id', sessionId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteChatSession(sessionId: string) {
  // Delete messages first due to FK constraints
  const { error: msgErr } = await supabase
    .from('chat_messages')
    .delete()
    .eq('session_id', sessionId);
  if (msgErr) throw msgErr;
  const { error } = await supabase
    .from('chat_sessions')
    .delete()
    .eq('id', sessionId);
  if (error) throw error;
}

// 订阅相关函数
export async function getUserActiveSubscription(userId: string) {
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())
    .order('current_period_end', { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function checkUserSubscriptionStatus(userId: string): Promise<{
  isPaidUser: boolean;
  subscription?: any;
  planType?: string;
}> {
  try {
    const subscription = await getUserActiveSubscription(userId);
    
    if (subscription) {
      return {
        isPaidUser: true,
        subscription,
        planType: subscription.plan_type
      };
    }
    
    return { isPaidUser: false };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return { isPaidUser: false };
  }
}

// 数据库健康检查
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .select('count(*)', { count: 'exact', head: true });
    
    return !error;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export default supabase;