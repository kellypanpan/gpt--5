import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorTracker, Logger } from './logger';

// Custom error classes
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errorCode?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    errorCode?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400, true, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, true, 'AUTH_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, true, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, true, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 429, true, 'RATE_LIMIT_ERROR');
    this.name = 'RateLimitError';
  }
}

export class PaymentError extends AppError {
  constructor(message: string = 'Payment required') {
    super(message, 402, true, 'PAYMENT_ERROR');
    this.name = 'PaymentError';
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string = 'External service error') {
    super(`${service}: ${message}`, 503, true, 'EXTERNAL_SERVICE_ERROR');
    this.name = 'ExternalServiceError';
  }
}

// Error response interface
interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    statusCode: number;
    timestamp: string;
    path?: string;
    details?: any;
  };
  success: false;
}

// Global error handler for API routes
export function createErrorHandler(context: string) {
  const logger = new Logger(context);

  return function handleError(
    error: Error | AppError,
    req: NextApiRequest,
    res: NextApiResponse
  ): void {
    // Default error values
    let statusCode = 500;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';
    let isOperational = false;

    // Handle different error types
    if (error instanceof AppError) {
      statusCode = error.statusCode;
      message = error.message;
      errorCode = error.errorCode || 'APP_ERROR';
      isOperational = error.isOperational;
    } else if (error.name === 'ValidationError') {
      statusCode = 400;
      message = error.message;
      errorCode = 'VALIDATION_ERROR';
      isOperational = true;
    } else if (error.message.includes('Unauthorized')) {
      statusCode = 401;
      message = error.message;
      errorCode = 'AUTH_ERROR';
      isOperational = true;
    } else if (error.message.includes('Forbidden')) {
      statusCode = 403;
      message = error.message;
      errorCode = 'AUTHORIZATION_ERROR';
      isOperational = true;
    } else if (error.message.includes('Not found')) {
      statusCode = 404;
      message = error.message;
      errorCode = 'NOT_FOUND_ERROR';
      isOperational = true;
    } else if (error.message.includes('Rate limit')) {
      statusCode = 429;
      message = error.message;
      errorCode = 'RATE_LIMIT_ERROR';
      isOperational = true;
    } else if (error.message.includes('credits') || error.message.includes('Payment')) {
      statusCode = 402;
      message = error.message;
      errorCode = 'PAYMENT_ERROR';
      isOperational = true;
    }

    // Log the error
    if (isOperational) {
      logger.warn('Operational error', { 
        error: message, 
        statusCode, 
        errorCode,
        url: req.url,
        method: req.method
      });
    } else {
      ErrorTracker.trackApiError(error, req, context);
    }

    // Create error response
    const errorResponse: ErrorResponse = {
      error: {
        message,
        code: errorCode,
        statusCode,
        timestamp: new Date().toISOString(),
        path: req.url,
      },
      success: false,
    };

    // Add error details in development
    if (process.env.NODE_ENV === 'development' && !isOperational) {
      errorResponse.error.details = {
        stack: error.stack,
        name: error.name,
      };
    }

    // Send error response
    res.status(statusCode).json(errorResponse);
  };
}

// Async error wrapper for API routes
export function asyncHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  context: string = 'API'
) {
  const errorHandler = createErrorHandler(context);

  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      await handler(req, res);
    } catch (error: any) {
      errorHandler(error, req, res);
    }
  };
}

// Error validation helpers
export class ErrorValidator {
  static validateRequired(value: any, fieldName: string): void {
    if (value === undefined || value === null || value === '') {
      throw new ValidationError(`${fieldName} is required`);
    }
  }

  static validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email format');
    }
  }

  static validateStringLength(
    value: string,
    fieldName: string,
    min?: number,
    max?: number
  ): void {
    if (min && value.length < min) {
      throw new ValidationError(`${fieldName} must be at least ${min} characters long`);
    }
    if (max && value.length > max) {
      throw new ValidationError(`${fieldName} must be no more than ${max} characters long`);
    }
  }

  static validateNumber(
    value: number,
    fieldName: string,
    min?: number,
    max?: number
  ): void {
    if (min !== undefined && value < min) {
      throw new ValidationError(`${fieldName} must be at least ${min}`);
    }
    if (max !== undefined && value > max) {
      throw new ValidationError(`${fieldName} must be no more than ${max}`);
    }
  }

  static validateArray(
    value: any[],
    fieldName: string,
    minLength?: number,
    maxLength?: number
  ): void {
    if (!Array.isArray(value)) {
      throw new ValidationError(`${fieldName} must be an array`);
    }
    if (minLength !== undefined && value.length < minLength) {
      throw new ValidationError(`${fieldName} must contain at least ${minLength} items`);
    }
    if (maxLength !== undefined && value.length > maxLength) {
      throw new ValidationError(`${fieldName} must contain no more than ${maxLength} items`);
    }
  }

  static validateEnum<T>(
    value: T,
    fieldName: string,
    allowedValues: T[]
  ): void {
    if (!allowedValues.includes(value)) {
      throw new ValidationError(
        `${fieldName} must be one of: ${allowedValues.join(', ')}`
      );
    }
  }
}

// HTTP status code constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// Success response helper
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200
) {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

// Pagination response helper
export function createPaginatedResponse<T>(
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  },
  message?: string
) {
  return {
    success: true,
    data,
    pagination,
    message,
    timestamp: new Date().toISOString(),
  };
}

// Health check error handler
export function handleHealthCheck(
  checks: Array<{ name: string; status: 'healthy' | 'unhealthy'; details?: any }>
): { status: 'healthy' | 'unhealthy'; checks: typeof checks; timestamp: string } {
  const overallStatus = checks.every(check => check.status === 'healthy') 
    ? 'healthy' 
    : 'unhealthy';

  return {
    status: overallStatus,
    checks,
    timestamp: new Date().toISOString(),
  };
}