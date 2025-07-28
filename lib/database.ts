import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a service role client for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
  // User operations
  static async createUser(userData: {
    clerk_user_id: string;
    email: string;
    credits?: number;
  }): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        clerk_user_id: userData.clerk_user_id,
        email: userData.email,
        credits: userData.credits || 10, // Welcome credits
        is_subscribed: false
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create user: ${error.message}`);
    return data;
  }

  static async getUser(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get user: ${error.message}`);
    }
    return data;
  }

  static async getUserByClerkId(clerkUserId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get user by Clerk ID: ${error.message}`);
    }
    return data;
  }

  static async updateUserCredits(userId: string, credits: number): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        credits,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update credits: ${error.message}`);
    return data;
  }

  static async updateUserSubscription(userId: string, subscriptionData: {
    is_subscribed: boolean;
    subscription_type?: string;
    subscription_expires_at?: string;
  }): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...subscriptionData,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update subscription: ${error.message}`);
    return data;
  }

  // Generation log operations
  static async logGeneration(logData: {
    userId: string;
    tool: string;
    creditsUsed: number;
    prompt: string;
    result: string;
    status: 'success' | 'failed';
    metadata?: Record<string, unknown>;
  }): Promise<GenerationLog> {
    const { data, error } = await supabase
      .from('generation_logs')
      .insert({
        user_id: logData.userId,
        tool: logData.tool,
        credits_used: logData.creditsUsed,
        prompt: logData.prompt,
        result: logData.result,
        status: logData.status,
        metadata: logData.metadata
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to log generation: ${error.message}`);
    return data;
  }

  static async getUserGenerationHistory(
    userId: string, 
    limit: number = 50,
    offset: number = 0
  ): Promise<GenerationLog[]> {
    const { data, error } = await supabase
      .from('generation_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
      .offset(offset);

    if (error) throw new Error(`Failed to get generation history: ${error.message}`);
    return data || [];
  }

  // Conversation operations
  static async saveConversation(conversationData: {
    conversationId: string;
    userId: string;
    userMessage: string;
    assistantResponse: string;
    taskType: string;
    context?: string;
  }): Promise<Conversation> {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        conversation_id: conversationData.conversationId,
        user_id: conversationData.userId,
        user_message: conversationData.userMessage,
        assistant_response: conversationData.assistantResponse,
        task_type: conversationData.taskType,
        context: conversationData.context
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to save conversation: ${error.message}`);
    return data;
  }

  static async getConversationHistory(
    conversationId: string,
    userId: string,
    limit: number = 20
  ): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw new Error(`Failed to get conversation history: ${error.message}`);
    return data || [];
  }

  // Prompt marketplace operations
  static async createPrompt(promptData: {
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    price: number;
    author_id: string;
  }): Promise<Prompt> {
    const { data, error } = await supabase
      .from('prompts')
      .insert({
        ...promptData,
        likes: 0,
        downloads: 0,
        is_featured: false,
        is_approved: false
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create prompt: ${error.message}`);
    return data;
  }

  static async getPrompts(filters: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
    featured_only?: boolean;
  } = {}): Promise<{ prompts: Prompt[]; total: number }> {
    let query = supabase
      .from('prompts')
      .select('*, users!prompts_author_id_fkey(email)', { count: 'exact' })
      .eq('is_approved', true);

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters.featured_only) {
      query = query.eq('is_featured', true);
    }

    query = query
      .order('created_at', { ascending: false })
      .limit(filters.limit || 20)
      .offset(filters.offset || 0);

    const { data, error, count } = await query;

    if (error) throw new Error(`Failed to get prompts: ${error.message}`);
    return { prompts: data || [], total: count || 0 };
  }

  static async getPrompt(promptId: string): Promise<Prompt | null> {
    const { data, error } = await supabase
      .from('prompts')
      .select('*, users!prompts_author_id_fkey(email)')
      .eq('id', promptId)
      .eq('is_approved', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get prompt: ${error.message}`);
    }
    return data;
  }

  static async purchasePrompt(purchaseData: {
    userId: string;
    promptId: string;
    pricePaid: number;
  }): Promise<PromptPurchase> {
    // Start a transaction
    const { data, error } = await supabase.rpc('purchase_prompt', {
      p_user_id: purchaseData.userId,
      p_prompt_id: purchaseData.promptId,
      p_price_paid: purchaseData.pricePaid
    });

    if (error) throw new Error(`Failed to purchase prompt: ${error.message}`);
    return data;
  }

  static async getUserPurchases(userId: string): Promise<PromptPurchase[]> {
    const { data, error } = await supabase
      .from('prompt_purchases')
      .select('*, prompts(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to get user purchases: ${error.message}`);
    return data || [];
  }

  // Analytics and stats
  static async getUserStats(userId: string): Promise<{
    total_generations: number;
    credits_used: number;
    favorite_tool: string;
    generations_this_month: number;
  }> {
    const { data, error } = await supabase.rpc('get_user_stats', {
      p_user_id: userId
    });

    if (error) throw new Error(`Failed to get user stats: ${error.message}`);
    return data || {
      total_generations: 0,
      credits_used: 0,
      favorite_tool: 'writer',
      generations_this_month: 0
    };
  }

  // Health check
  static async healthCheck(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);
      
      return !error;
    } catch {
      return false;
    }
  }
}