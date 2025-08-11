import { NextApiRequest, NextApiResponse } from 'next';
import { LRUCache } from 'lru-cache';

// 存储接口定义
interface RateLimitStore {
  get(key: string): Promise<RateLimitInfo | null>;
  set(key: string, info: RateLimitInfo, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

interface RateLimitInfo {
  count: number;
  resetTime: number;
  firstRequestTime: number;
}

interface RateLimitOptions {
  max: number; // 最大请求数
  windowMs: number; // 时间窗口（毫秒）
  message?: string; // 自定义错误信息
  skipSuccessfulRequests?: boolean; // 不计算成功请求
  skipFailedRequests?: boolean; // 不计算失败请求
  keyGenerator?: (req: NextApiRequest) => string; // 自定义key生成器
  onLimitReached?: (req: NextApiRequest, info: RateLimitInfo) => void; // 限流回调
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  total: number;
  retryAfter?: number;
}

// 内存存储实现
class MemoryStore implements RateLimitStore {
  private cache: LRUCache<string, RateLimitInfo>;

  constructor(maxSize = 10000) {
    this.cache = new LRUCache<string, RateLimitInfo>({
      max: maxSize,
      ttl: 60 * 60 * 1000, // 1小时TTL
    });
  }

  async get(key: string): Promise<RateLimitInfo | null> {
    return this.cache.get(key) || null;
  }

  async set(key: string, info: RateLimitInfo, ttl?: number): Promise<void> {
    if (ttl) {
      this.cache.set(key, info, { ttl });
    } else {
      this.cache.set(key, info);
    }
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

// Redis存储实现（可选）
class RedisStore implements RateLimitStore {
  private redis: any; // 避免直接依赖Redis
  private keyPrefix: string;

  constructor(redisClient?: any, keyPrefix = 'rl:') {
    this.redis = redisClient;
    this.keyPrefix = keyPrefix;
  }

  async get(key: string): Promise<RateLimitInfo | null> {
    if (!this.redis) return null;
    
    try {
      const data = await this.redis.get(`${this.keyPrefix}${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  async set(key: string, info: RateLimitInfo, ttl?: number): Promise<void> {
    if (!this.redis) return;
    
    try {
      const data = JSON.stringify(info);
      if (ttl) {
        await this.redis.setex(`${this.keyPrefix}${key}`, Math.ceil(ttl / 1000), data);
      } else {
        await this.redis.set(`${this.keyPrefix}${key}`, data);
      }
    } catch (error) {
      console.error('Redis set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    if (!this.redis) return;
    
    try {
      await this.redis.del(`${this.keyPrefix}${key}`);
    } catch (error) {
      console.error('Redis delete error:', error);
    }
  }

  async clear(): Promise<void> {
    if (!this.redis) return;
    
    try {
      const keys = await this.redis.keys(`${this.keyPrefix}*`);
      if (keys.length > 0) {
        await this.redis.del(keys);
      }
    } catch (error) {
      console.error('Redis clear error:', error);
    }
  }
}

// 增强的限流器
export class EnhancedRateLimiter {
  private store: RateLimitStore;
  private defaultOptions: Partial<RateLimitOptions>;

  constructor(
    store?: RateLimitStore, 
    defaultOptions: Partial<RateLimitOptions> = {}
  ) {
    this.store = store || new MemoryStore();
    this.defaultOptions = defaultOptions;
  }

  // 设置存储后端
  setStore(store: RateLimitStore): void {
    this.store = store;
  }

  // 生成客户端标识符
  private getClientIdentifier(req: NextApiRequest, keyGenerator?: (req: NextApiRequest) => string): string {
    if (keyGenerator) {
      return keyGenerator(req);
    }

    // 尝试获取用户ID
    const userId = (req as any).user?.id || req.headers['x-user-id'];
    if (userId) {
      return `user:${userId}`;
    }

    // 回退到IP地址
    const forwarded = req.headers['x-forwarded-for'] as string;
    const realIp = req.headers['x-real-ip'] as string;
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               realIp || req.socket.remoteAddress || 'unknown';
    
    return `ip:${ip}`;
  }

  // 生成缓存键
  private getCacheKey(identifier: string, endpoint: string): string {
    return `${identifier}:${endpoint}`;
  }

  // 检查限流
  async checkLimit(
    req: NextApiRequest,
    endpoint: string,
    options: RateLimitOptions
  ): Promise<RateLimitResult> {
    const mergedOptions = { ...this.defaultOptions, ...options };
    const identifier = this.getClientIdentifier(req, mergedOptions.keyGenerator);
    const key = this.getCacheKey(identifier, endpoint);
    const now = Date.now();

    // 获取当前限流信息
    let info = await this.store.get(key);

    // 如果没有记录或窗口已过期，创建新记录
    if (!info || now >= info.resetTime) {
      info = {
        count: 0,
        resetTime: now + mergedOptions.windowMs,
        firstRequestTime: now,
      };
    }

    // 检查是否允许请求
    const allowed = info.count < mergedOptions.max;
    
    if (allowed) {
      info.count++;
      // 设置TTL为重置时间
      const ttl = info.resetTime - now;
      await this.store.set(key, info, ttl);
    } else {
      // 调用限流回调
      if (mergedOptions.onLimitReached) {
        mergedOptions.onLimitReached(req, info);
      }
    }

    return {
      allowed,
      remaining: Math.max(0, mergedOptions.max - info.count),
      resetTime: info.resetTime,
      total: mergedOptions.max,
      retryAfter: allowed ? undefined : Math.ceil((info.resetTime - now) / 1000),
    };
  }

  // 简化的限流检查
  async isRateLimited(
    req: NextApiRequest,
    endpoint: string,
    options: RateLimitOptions
  ): Promise<boolean> {
    const result = await this.checkLimit(req, endpoint, options);
    return !result.allowed;
  }

  // 获取限流状态（不增加计数）
  async getStatus(
    req: NextApiRequest,
    endpoint: string,
    keyGenerator?: (req: NextApiRequest) => string
  ): Promise<RateLimitResult | null> {
    const identifier = this.getClientIdentifier(req, keyGenerator);
    const key = this.getCacheKey(identifier, endpoint);
    const info = await this.store.get(key);

    if (!info) {
      return null;
    }

    return {
      allowed: true,
      remaining: Math.max(0, 100 - info.count), // 默认总数100
      resetTime: info.resetTime,
      total: 100,
    };
  }

  // 清除特定键的限流
  async clearLimit(
    req: NextApiRequest,
    endpoint: string,
    keyGenerator?: (req: NextApiRequest) => string
  ): Promise<void> {
    const identifier = this.getClientIdentifier(req, keyGenerator);
    const key = this.getCacheKey(identifier, endpoint);
    await this.store.delete(key);
  }

  // 清除所有限流记录
  async clearAllLimits(): Promise<void> {
    await this.store.clear();
  }
}

// 滑动窗口限流器
export class SlidingWindowRateLimiter extends EnhancedRateLimiter {
  async checkLimit(
    req: NextApiRequest,
    endpoint: string,
    options: RateLimitOptions
  ): Promise<RateLimitResult> {
    const identifier = this.getClientIdentifier(req, options.keyGenerator);
    const key = this.getCacheKey(identifier, endpoint);
    const now = Date.now();
    const windowStart = now - options.windowMs;

    // 获取请求时间戳列表
    const info = await this.store.get(key) || {
      count: 0,
      resetTime: now + options.windowMs,
      firstRequestTime: now,
    };

    // 这里简化实现，实际应该存储时间戳数组
    // 在生产环境中，建议使用Redis的ZSET来实现真正的滑动窗口
    
    const allowed = info.count < options.max;
    
    if (allowed) {
      info.count++;
      info.resetTime = Math.max(info.resetTime, now + options.windowMs);
      await this.store.set(key, info, options.windowMs);
    }

    return {
      allowed,
      remaining: Math.max(0, options.max - info.count),
      resetTime: info.resetTime,
      total: options.max,
      retryAfter: allowed ? undefined : Math.ceil((info.resetTime - now) / 1000),
    };
  }
}

// 令牌桶限流器
export class TokenBucketRateLimiter extends EnhancedRateLimiter {
  async checkLimit(
    req: NextApiRequest,
    endpoint: string,
    options: RateLimitOptions & {
      refillRate?: number; // 每秒补充的令牌数
      bucketSize?: number; // 桶容量
    }
  ): Promise<RateLimitResult> {
    const refillRate = options.refillRate || options.max / (options.windowMs / 1000);
    const bucketSize = options.bucketSize || options.max;
    
    const identifier = this.getClientIdentifier(req, options.keyGenerator);
    const key = this.getCacheKey(identifier, endpoint);
    const now = Date.now();

    let info = await this.store.get(key);
    
    if (!info) {
      info = {
        count: bucketSize, // 初始令牌数等于桶容量
        resetTime: now,
        firstRequestTime: now,
      };
    }

    // 计算需要补充的令牌
    const timePassed = (now - info.resetTime) / 1000; // 秒
    const tokensToAdd = Math.floor(timePassed * refillRate);
    
    info.count = Math.min(bucketSize, info.count + tokensToAdd);
    info.resetTime = now;

    const allowed = info.count >= 1;
    
    if (allowed) {
      info.count--;
      await this.store.set(key, info, options.windowMs);
    }

    return {
      allowed,
      remaining: info.count,
      resetTime: now + Math.ceil((bucketSize - info.count) / refillRate) * 1000,
      total: bucketSize,
      retryAfter: allowed ? undefined : Math.ceil((1 - info.count) / refillRate),
    };
  }
}

// 中间件函数
export async function enhancedRateLimit(
  req: NextApiRequest,
  res: NextApiResponse,
  options: RateLimitOptions,
  limiter?: EnhancedRateLimiter
): Promise<void> {
  const rateLimiter = limiter || new EnhancedRateLimiter();
  const endpoint = req.url || 'unknown';
  
  const result = await rateLimiter.checkLimit(req, endpoint, options);

  // 设置限流头部
  res.setHeader('X-RateLimit-Limit', result.total);
  res.setHeader('X-RateLimit-Remaining', result.remaining);
  res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000));

  if (result.retryAfter) {
    res.setHeader('Retry-After', result.retryAfter);
  }

  if (!result.allowed) {
    const message = options.message || 'Rate limit exceeded. Please try again later.';
    
    res.status(429).json({
      error: message,
      retryAfter: result.retryAfter,
      resetTime: result.resetTime,
    });
    
    throw new Error('Rate limit exceeded');
  }
}

// 工厂函数创建不同类型的限流器
export const createRateLimiter = {
  memory: (options?: Partial<RateLimitOptions>) => new EnhancedRateLimiter(new MemoryStore(), options),
  redis: (redisClient: any, options?: Partial<RateLimitOptions>) => new EnhancedRateLimiter(new RedisStore(redisClient), options),
  slidingWindow: (store?: RateLimitStore, options?: Partial<RateLimitOptions>) => new SlidingWindowRateLimiter(store, options),
  tokenBucket: (store?: RateLimitStore, options?: Partial<RateLimitOptions>) => new TokenBucketRateLimiter(store, options),
};

// 预配置的限流规则
export const ENHANCED_RATE_LIMITS = {
  // 严格限制
  STRICT: {
    max: 5,
    windowMs: 60 * 1000,
    message: 'Strict rate limit exceeded',
  },
  
  // 一般API限制
  API: {
    max: 100,
    windowMs: 60 * 1000,
    message: 'API rate limit exceeded',
  },
  
  // 认证相关
  AUTH: {
    max: 10,
    windowMs: 15 * 60 * 1000, // 15分钟
    message: 'Too many authentication attempts',
  },
  
  // 付费功能
  PREMIUM: {
    max: 1000,
    windowMs: 60 * 1000,
    message: 'Premium feature rate limit exceeded',
  },
} as const;

// 导出默认实例
export const defaultRateLimiter = new EnhancedRateLimiter();

export default {
  EnhancedRateLimiter,
  SlidingWindowRateLimiter,
  TokenBucketRateLimiter,
  enhancedRateLimit,
  createRateLimiter,
  ENHANCED_RATE_LIMITS,
  defaultRateLimiter,
};