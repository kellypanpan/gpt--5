import { NextApiRequest } from 'next';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { DatabaseService, User } from './database';

export interface AuthenticatedUser {
  id: string;
  clerkUserId: string;
  email: string;
  credits: number;
  isSubscribed: boolean;
  subscriptionType?: 'pro' | 'creator' | 'lifetime';
  subscriptionExpiresAt?: string;
}

export class AuthService {
  // Get user from Clerk authentication
  static async getUserFromRequest(req: NextApiRequest): Promise<AuthenticatedUser | null> {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return null;
      }

      // Get user from Clerk
      const clerkUser = await clerkClient.users.getUser(userId);
      
      if (!clerkUser) {
        return null;
      }

      // Get or create user in our database
      let dbUser = await DatabaseService.getUserByClerkId(userId);
      
      if (!dbUser) {
        // Create new user in our database
        dbUser = await DatabaseService.createUser({
          clerk_user_id: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          credits: 10, // Welcome credits
        });
      }

      return {
        id: dbUser.id,
        clerkUserId: dbUser.clerk_user_id,
        email: dbUser.email,
        credits: dbUser.credits,
        isSubscribed: dbUser.is_subscribed,
        subscriptionType: dbUser.subscription_type,
        subscriptionExpiresAt: dbUser.subscription_expires_at,
      };

    } catch (error: any) {
      console.error('Auth error:', error);
      return null;
    }
  }

  // Check if user has subscription and sufficient credits
  static async checkUserAccess(
    user: AuthenticatedUser,
    requiredCredits: number,
    requireSubscription: boolean = false
  ): Promise<{ allowed: boolean; reason?: string }> {
    // Check subscription if required
    if (requireSubscription && !user.isSubscribed) {
      return {
        allowed: false,
        reason: 'Subscription required: Please upgrade to access this feature'
      };
    }

    // Check subscription expiry
    if (user.isSubscribed && user.subscriptionExpiresAt) {
      const expiryDate = new Date(user.subscriptionExpiresAt);
      if (expiryDate < new Date()) {
        return {
          allowed: false,
          reason: 'Subscription expired: Please renew your subscription'
        };
      }
    }

    // Check credits for non-lifetime subscribers
    if (user.subscriptionType !== 'lifetime' && user.credits < requiredCredits) {
      return {
        allowed: false,
        reason: `Insufficient credits: You need ${requiredCredits} credits but have ${user.credits}`
      };
    }

    return { allowed: true };
  }

  // Deduct credits from user account
  static async deductCredits(userId: string, credits: number): Promise<User> {
    const user = await DatabaseService.getUser(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const newCredits = Math.max(0, user.credits - credits);
    return await DatabaseService.updateUserCredits(userId, newCredits);
  }

  // Add credits to user account
  static async addCredits(userId: string, credits: number): Promise<User> {
    const user = await DatabaseService.getUser(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const newCredits = user.credits + credits;
    return await DatabaseService.updateUserCredits(userId, newCredits);
  }

  // Update user subscription
  static async updateSubscription(
    userId: string,
    subscriptionData: {
      isSubscribed: boolean;
      subscriptionType?: 'pro' | 'creator' | 'lifetime';
      subscriptionExpiresAt?: string;
    }
  ): Promise<User> {
    return await DatabaseService.updateUserSubscription(userId, {
      is_subscribed: subscriptionData.isSubscribed,
      subscription_type: subscriptionData.subscriptionType,
      subscription_expires_at: subscriptionData.subscriptionExpiresAt,
    });
  }

  // Check if user is admin (based on Clerk metadata)
  static async isAdmin(clerkUserId: string): Promise<boolean> {
    try {
      const user = await clerkClient.users.getUser(clerkUserId);
      return user.publicMetadata.role === 'admin';
    } catch {
      return false;
    }
  }

  // Get user subscription tier for rate limiting
  static getSubscriptionTier(user: AuthenticatedUser): 'free' | 'pro' | 'creator' | 'lifetime' {
    if (!user.isSubscribed) return 'free';
    return user.subscriptionType || 'pro';
  }

  // Validate webhook signatures (for Stripe/payment webhooks)
  static validateWebhookSignature(
    body: string,
    signature: string,
    secret: string
  ): boolean {
    try {
      // This would typically use Stripe's webhook signature validation
      // For now, return true for development
      return true;
    } catch {
      return false;
    }
  }

  // Get user stats and usage
  static async getUserUsageStats(userId: string): Promise<{
    totalGenerations: number;
    creditsUsed: number;
    favoriteTools: string[];
    generationsThisMonth: number;
  }> {
    const stats = await DatabaseService.getUserStats(userId);
    
    return {
      totalGenerations: stats.total_generations,
      creditsUsed: stats.credits_used,
      favoriteTools: [stats.favorite_tool],
      generationsThisMonth: stats.generations_this_month,
    };
  }
}

// Enhanced authentication middleware
export async function authUserAndCheckCredits(
  req: NextApiRequest,
  requiredCredits: number,
  options: {
    requireSubscription?: boolean;
    allowedRoles?: string[];
  } = {}
): Promise<AuthenticatedUser> {
  const user = await AuthService.getUserFromRequest(req);
  
  if (!user) {
    throw new Error('Unauthorized: Please log in to access this feature');
  }

  // Check role-based access if specified
  if (options.allowedRoles && options.allowedRoles.length > 0) {
    const isAdmin = await AuthService.isAdmin(user.clerkUserId);
    if (!isAdmin && !options.allowedRoles.includes('user')) {
      throw new Error('Forbidden: Insufficient permissions');
    }
  }

  // Check user access (subscription and credits)
  const accessCheck = await AuthService.checkUserAccess(
    user,
    requiredCredits,
    options.requireSubscription
  );

  if (!accessCheck.allowed) {
    throw new Error(accessCheck.reason || 'Access denied');
  }

  // Deduct credits if operation will proceed
  if (requiredCredits > 0 && user.subscriptionType !== 'lifetime') {
    await AuthService.deductCredits(user.id, requiredCredits);
    user.credits -= requiredCredits; // Update local object
  }

  return user;
}

// Middleware for admin-only routes
export async function requireAdmin(req: NextApiRequest): Promise<AuthenticatedUser> {
  const user = await AuthService.getUserFromRequest(req);
  
  if (!user) {
    throw new Error('Unauthorized: Please log in');
  }

  const isAdmin = await AuthService.isAdmin(user.clerkUserId);
  
  if (!isAdmin) {
    throw new Error('Forbidden: Admin access required');
  }

  return user;
}

// Middleware for subscription check only (no credit deduction)
export async function requireSubscription(req: NextApiRequest): Promise<AuthenticatedUser> {
  const user = await AuthService.getUserFromRequest(req);
  
  if (!user) {
    throw new Error('Unauthorized: Please log in');
  }

  if (!user.isSubscribed) {
    throw new Error('Subscription required: Please upgrade to access this feature');
  }

  // Check subscription expiry
  if (user.subscriptionExpiresAt) {
    const expiryDate = new Date(user.subscriptionExpiresAt);
    if (expiryDate < new Date()) {
      throw new Error('Subscription expired: Please renew your subscription');
    }
  }

  return user;
}

// Helper to get user without any checks (for public endpoints)
export async function getOptionalUser(req: NextApiRequest): Promise<AuthenticatedUser | null> {
  return await AuthService.getUserFromRequest(req);
} 