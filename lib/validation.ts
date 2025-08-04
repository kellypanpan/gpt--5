import { z } from 'zod';

// 常用的验证schemas
export const schemas = {
  // 基础字符串验证
  nonEmptyString: z.string().min(1, 'Field cannot be empty').trim(),
  
  // 邮箱验证
  email: z.string().email('Invalid email format'),
  
  // URL验证
  url: z.string().url('Invalid URL format'),
  
  // 限制长度的文本
  limitedText: (minLength = 1, maxLength = 1000) => 
    z.string()
      .min(minLength, `Text must be at least ${minLength} characters`)
      .max(maxLength, `Text must not exceed ${maxLength} characters`)
      .trim(),
  
  // 提示词验证
  prompt: z.string()
    .min(1, 'Prompt cannot be empty')
    .max(5000, 'Prompt is too long (max 5000 characters)')
    .trim(),
  
  // 用户ID验证
  userId: z.string().uuid('Invalid user ID format'),
  
  // 价格验证
  price: z.number().min(0, 'Price must be non-negative').max(999999, 'Price too high'),
  
  // 积分验证
  credits: z.number().int().min(0, 'Credits must be non-negative'),
  
  // 订阅类型验证
  subscriptionType: z.enum(['free', 'pro', 'creator', 'lifetime']),
  
  // 文件类型验证
  fileType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
};

// API请求验证schemas
export const apiSchemas = {
  // 写作API请求
  writeRequest: z.object({
    prompt: schemas.prompt,
    tone: z.enum(['professional', 'casual', 'creative', 'academic']).optional(),
    length: z.enum(['short', 'medium', 'long']).optional(),
    type: z.enum(['blog', 'article', 'copy', 'social', 'email']).optional(),
  }),
  
  // 图像生成API请求
  imageRequest: z.object({
    prompt: schemas.limitedText(1, 1000),
    style: z.enum(['realistic', 'artistic', 'cartoon', 'abstract']).optional(),
    size: z.enum(['512x512', '1024x1024', '1024x1792', '1792x1024']).optional(),
    quality: z.enum(['standard', 'hd']).optional(),
  }),
  
  // PDF分析API请求
  pdfRequest: z.object({
    file: z.string().min(1, 'File content is required'),
    question: schemas.limitedText(1, 500).optional(),
  }),
  
  // 脚本生成API请求
  scriptRequest: z.object({
    description: schemas.limitedText(10, 1000),
    language: z.enum(['python', 'javascript', 'bash', 'powershell']).optional(),
    complexity: z.enum(['simple', 'intermediate', 'advanced']).optional(),
  }),
  
  // 对话API请求
  chatRequest: z.object({
    message: schemas.limitedText(1, 2000),
    conversationId: z.string().optional(),
    context: z.string().max(10000).optional(),
  }),
  
  // Prompt创建请求
  promptCreateRequest: z.object({
    title: schemas.limitedText(1, 100),
    description: schemas.limitedText(1, 500),
    content: schemas.limitedText(10, 5000),
    category: schemas.limitedText(1, 50),
    tags: z.array(schemas.limitedText(1, 30)).max(10, 'Too many tags'),
    price: schemas.price,
  }),
  
  // 支付订单创建请求
  orderCreateRequest: z.object({
    planType: z.enum(['pro', 'creator', 'lifetime']),
    returnUrl: schemas.url.optional(),
  }),
};

// 验证中间件
export function validateRequest<T>(schema: z.ZodSchema<T>) {
  return (req: any): T => {
    try {
      return schema.parse(req.body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => 
          `${err.path.join('.')}: ${err.message}`
        ).join(', ');
        throw new ValidationError(`Validation failed: ${errorMessages}`);
      }
      throw new ValidationError('Invalid request data');
    }
  };
}

// 自定义验证错误类
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// 清理和标准化输入
export const sanitizeInput = {
  // HTML标签清理
  stripHtml: (input: string): string => {
    return input.replace(/<[^>]*>/g, '');
  },
  
  // 清理SQL注入风险字符
  sanitizeSql: (input: string): string => {
    return input.replace(/['"\\;]/g, '');
  },
  
  // 清理JavaScript代码
  sanitizeJs: (input: string): string => {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  },
  
  // 通用文本清理
  cleanText: (input: string): string => {
    return sanitizeInput.stripHtml(
      sanitizeInput.sanitizeJs(input)
    ).trim();
  },
  
  // 文件名清理
  sanitizeFilename: (filename: string): string => {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 255);
  },
};

// 速率限制验证
export const rateLimitValidation = {
  // 检查请求频率是否合理
  validateRequestFrequency: (timestamps: number[], windowMs: number, maxRequests: number): boolean => {
    const now = Date.now();
    const validTimestamps = timestamps.filter(ts => now - ts < windowMs);
    return validTimestamps.length < maxRequests;
  },
  
  // 检查文件大小
  validateFileSize: (sizeInBytes: number, maxSizeInMB: number): boolean => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return sizeInBytes <= maxSizeInBytes;
  },
};

// 安全头部验证
export const securityValidation = {
  // 验证User-Agent
  validateUserAgent: (userAgent: string): boolean => {
    if (!userAgent || userAgent.length < 10) return false;
    // 检查是否为已知的恶意User-Agent模式
    const maliciousPatterns = [
      /bot/i, /crawler/i, /scraper/i, /spider/i
    ];
    return !maliciousPatterns.some(pattern => pattern.test(userAgent));
  },
  
  // 验证Referer
  validateReferer: (referer: string, allowedDomains: string[]): boolean => {
    if (!referer) return true; // 允许没有referer的请求
    try {
      const url = new URL(referer);
      return allowedDomains.some(domain => 
        url.hostname === domain || url.hostname.endsWith(`.${domain}`)
      );
    } catch {
      return false;
    }
  },
  
  // 验证Content-Type
  validateContentType: (contentType: string, allowedTypes: string[]): boolean => {
    return allowedTypes.some(type => contentType.includes(type));
  },
};

// 导出常用的组合验证函数
export const commonValidations = {
  // API请求基础验证
  validateApiRequest: (req: any, schema: z.ZodSchema) => {
    const validator = validateRequest(schema);
    return validator(req);
  },
  
  // 用户身份验证数据验证
  validateUserData: (data: any) => {
    const schema = z.object({
      email: schemas.email,
      userId: schemas.userId.optional(),
      credits: schemas.credits.optional(),
    });
    return schema.parse(data);
  },
  
  // 支付数据验证
  validatePaymentData: (data: any) => {
    const schema = z.object({
      amount: schemas.price,
      currency: z.string().length(3, 'Invalid currency code'),
      orderId: z.string().min(1, 'Order ID is required'),
    });
    return schema.parse(data);
  },
};

export default {
  schemas,
  apiSchemas,
  validateRequest,
  ValidationError,
  sanitizeInput,
  rateLimitValidation,
  securityValidation,
  commonValidations,
};