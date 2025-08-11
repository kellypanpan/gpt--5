import { NextApiRequest, NextApiResponse } from 'next';
import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  max: number; // Maximum number of requests
  windowMs: number; // Time window in milliseconds
  message?: string; // Custom error message
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

// In-memory cache for rate limiting
// In production, you might want to use Redis or similar
const cache = new LRUCache<string, RateLimitInfo>({
  max: 10000, // Maximum number of cached entries
  ttl: 60 * 60 * 1000, // 1 hour TTL
});

export class RateLimiter {
  private static getClientIdentifier(req: NextApiRequest): string {
    // Try to get user ID from authentication
    const userId = (req as any).user?.id;
    if (userId) {
      return `user:${userId}`;
    }

    // Fallback to IP address
    const forwarded = req.headers['x-forwarded-for'] as string;
    const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
    return `ip:${ip}`;
  }

  private static getKey(identifier: string, endpoint: string): string {
    return `${identifier}:${endpoint}`;
  }

  static async checkLimit(
    req: NextApiRequest,
    endpoint: string,
    options: RateLimitOptions
  ): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    total: number;
  }> {
    const identifier = this.getClientIdentifier(req);
    const key = this.getKey(identifier, endpoint);
    const now = Date.now();
    const windowStart = now - options.windowMs;

    // Get current rate limit info
    let info = cache.get(key);

    // Reset if window has passed
    if (!info || info.resetTime <= now) {
      info = {
        count: 0,
        resetTime: now + options.windowMs,
      };
    }

    // Check if limit exceeded
    const allowed = info.count < options.max;
    
    if (allowed) {
      info.count++;
      cache.set(key, info);
    }

    return {
      allowed,
      remaining: Math.max(0, options.max - info.count),
      resetTime: info.resetTime,
      total: options.max,
    };
  }

  static async isRateLimited(
    req: NextApiRequest,
    endpoint: string,
    options: RateLimitOptions
  ): Promise<boolean> {
    const result = await this.checkLimit(req, endpoint, options);
    return !result.allowed;
  }

  // Get rate limit status without incrementing counter
  static async getStatus(
    req: NextApiRequest,
    endpoint: string
  ): Promise<{
    remaining: number;
    resetTime: number;
    total: number;
  } | null> {
    const identifier = this.getClientIdentifier(req);
    const key = this.getKey(identifier, endpoint);
    const info = cache.get(key);

    if (!info) {
      return null;
    }

    return {
      remaining: Math.max(0, 100 - info.count), // Default total of 100
      resetTime: info.resetTime,
      total: 100,
    };
  }

  // Clear rate limit for a specific user/IP
  static clearLimit(req: NextApiRequest, endpoint: string): void {
    const identifier = this.getClientIdentifier(req);
    const key = this.getKey(identifier, endpoint);
    cache.delete(key);
  }

  // Get all active rate limits (for debugging)
  static getActiveLimits(): Array<{ key: string; info: RateLimitInfo }> {
    const limits: Array<{ key: string; info: RateLimitInfo }> = [];
    
    for (const [key, info] of cache.entries()) {
      limits.push({ key, info });
    }
    
    return limits;
  }
}

// Middleware function for easy integration
export async function rateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  options: RateLimitOptions
): Promise<void> {
  const endpoint = req.url || 'unknown';
  const result = await RateLimiter.checkLimit(req, endpoint, options);

  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', result.total);
  res.setHeader('X-RateLimit-Remaining', result.remaining);
  res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000));

  if (!result.allowed) {
    const message = options.message || 'Rate limit exceeded. Please try again later.';
    
    res.status(429).json({
      error: message,
      retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
    });
    
    throw new Error('Rate limit exceeded');
  }
}

// Predefined rate limit configurations
export const RATE_LIMITS = {
  // Text generation - moderate limit
  TEXT_GENERATION: {
    max: 10,
    windowMs: 60 * 1000, // 1 minute
    message: 'Too many text generation requests. Please wait before trying again.',
  },

  // Image generation - stricter limit
  IMAGE_GENERATION: {
    max: 5,
    windowMs: 60 * 1000, // 1 minute
    message: 'Too many image generation requests. Please wait before trying again.',
  },

  // PDF analysis - moderate limit
  PDF_ANALYSIS: {
    max: 6,
    windowMs: 60 * 1000, // 1 minute
    message: 'Too many PDF analysis requests. Please wait before trying again.',
  },

  // Agent conversations - higher limit
  AGENT_CHAT: {
    max: 15,
    windowMs: 60 * 1000, // 1 minute
    message: 'Too many chat requests. Please wait before continuing the conversation.',
  },

  // Script generation - moderate limit
  SCRIPT_GENERATION: {
    max: 8,
    windowMs: 60 * 1000, // 1 minute
    message: 'Too many script generation requests. Please wait before trying again.',
  },

  // General API limit
  GENERAL: {
    max: 30,
    windowMs: 60 * 1000, // 1 minute
    message: 'Too many requests. Please slow down.',
  },

  // Strict limit for expensive operations
  STRICT: {
    max: 3,
    windowMs: 60 * 1000, // 1 minute
    message: 'Rate limit exceeded for this resource-intensive operation.',
  },

  // Auth related operations
  AUTH: {
    max: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    message: 'Too many authentication attempts. Please try again later.',
  },
} as const;

// Dynamic rate limiting based on user subscription
export function getDynamicRateLimit(
  userSubscription: 'free' | 'pro' | 'creator' | 'lifetime',
  baseLimit: RateLimitOptions
): RateLimitOptions {
  const multipliers = {
    free: 1,
    pro: 2,
    creator: 5,
    lifetime: 10,
  };

  const multiplier = multipliers[userSubscription] || 1;

  return {
    ...baseLimit,
    max: Math.floor(baseLimit.max * multiplier),
  };
}

// Rate limit specifically for different user tiers
export async function tieredRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  baseOptions: RateLimitOptions,
  userTier: 'free' | 'pro' | 'creator' | 'lifetime' = 'free'
): Promise<void> {
  const options = getDynamicRateLimit(userTier, baseOptions);
  return rateLimit(req, res, options);
}

// Burst rate limiting - allows short bursts but maintains overall limit
export class BurstRateLimiter {
  private static burstCache = new LRUCache<string, {
    tokens: number;
    lastRefill: number;
  }>({
    max: 5000,
    ttl: 60 * 60 * 1000, // 1 hour
  });

  static async checkBurstLimit(
    req: NextApiRequest,
    endpoint: string,
    options: {
      bucketSize: number; // Maximum burst tokens
      refillRate: number; // Tokens per second
      cost?: number; // Cost per request (default 1)
    }
  ): Promise<{ allowed: boolean; tokensRemaining: number }> {
    const identifier = RateLimiter['getClientIdentifier'](req);
    const key = `burst:${identifier}:${endpoint}`;
    const now = Date.now();
    const cost = options.cost || 1;

    let bucket = this.burstCache.get(key);
    
    if (!bucket) {
      bucket = {
        tokens: options.bucketSize,
        lastRefill: now,
      };
    }

    // Refill tokens based on time passed
    const timePassed = (now - bucket.lastRefill) / 1000; // seconds
    const tokensToAdd = Math.floor(timePassed * options.refillRate);
    
    bucket.tokens = Math.min(options.bucketSize, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    const allowed = bucket.tokens >= cost;
    
    if (allowed) {
      bucket.tokens -= cost;
    }

    this.burstCache.set(key, bucket);

    return {
      allowed,
      tokensRemaining: bucket.tokens,
    };
  }
}

// Export default rate limiter for convenience
export default RateLimiter;