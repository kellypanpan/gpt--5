import { createClient } from '@supabase/supabase-js';
import { config } from './config';

// 前端 Supabase 客户端配置
const supabaseUrl = config.supabase.url || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = config.supabase.anonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase configuration missing for frontend. User data features may not work properly.');
}

// 创建前端 Supabase 客户端 (使用 anon key 用于客户端操作)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // 禁用 Supabase 内置认证，我们使用 Clerk
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

// 用户数据钩子和工具函数
export async function getUserByClerkId(clerkUserId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in getUserByClerkId:', error);
    return null;
  }
}

export async function getUserStats(userId: string) {
  try {
    const { data, error } = await supabase
      .rpc('get_user_stats', { p_user_id: userId });

    if (error) {
      console.error('Error fetching user stats:', error);
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
    console.error('Error in getUserStats:', error);
    return {
      total_generations: 0,
      credits_used: 0,
      favorite_tool: 'writer',
      generations_this_month: 0
    };
  }
}

export async function getUserGenerations(userId: string, limit = 10, offset = 0) {
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
    console.error('Error in getUserGenerations:', error);
    return [];
  }
}

export async function getFeaturedPrompts(limit = 6) {
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
    console.error('Error in getFeaturedPrompts:', error);
    return [];
  }
}

export async function getPromptsByCategory(category: string, limit = 20, offset = 0) {
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
    console.error('Error in getPromptsByCategory:', error);
    return [];
  }
}

export async function searchPrompts(query: string, limit = 20, offset = 0) {
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
    console.error('Error in searchPrompts:', error);
    return [];
  }
}

// 数据库健康检查
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('Database connection check failed:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export default supabase;