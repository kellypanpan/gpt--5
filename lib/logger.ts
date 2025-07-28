import { createLogger, format, transports } from 'winston';

// Create logger instance
export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.json(),
    format.prettyPrint()
  ),
  defaultMeta: { 
    service: 'gpt5ai-backend',
    environment: process.env.NODE_ENV || 'development'
  },
  transports: [
    // Console transport for development
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.printf(({ timestamp, level, message, service, ...meta }) => {
          return `${timestamp} [${service}] ${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
          }`;
        })
      )
    }),
    
    // File transport for errors
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // File transport for all logs
    new transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ],
});

// Create different log levels with context
export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  info(message: string, meta?: any) {
    logger.info(message, { context: this.context, ...meta });
  }

  error(message: string, error?: Error | any, meta?: any) {
    logger.error(message, {
      context: this.context,
      error: error?.message,
      stack: error?.stack,
      ...meta
    });
  }

  warn(message: string, meta?: any) {
    logger.warn(message, { context: this.context, ...meta });
  }

  debug(message: string, meta?: any) {
    logger.debug(message, { context: this.context, ...meta });
  }

  // Log API requests
  logApiRequest(req: any, meta?: any) {
    this.info('API Request', {
      method: req.method,
      url: req.url,
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
      ...meta
    });
  }

  // Log API responses
  logApiResponse(req: any, res: any, duration: number, meta?: any) {
    this.info('API Response', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ...meta
    });
  }

  // Log user actions
  logUserAction(userId: string, action: string, meta?: any) {
    this.info('User Action', {
      userId,
      action,
      ...meta
    });
  }

  // Log system events
  logSystemEvent(event: string, meta?: any) {
    this.info('System Event', {
      event,
      ...meta
    });
  }

  // Log database operations
  logDatabaseOperation(operation: string, table: string, meta?: any) {
    this.debug('Database Operation', {
      operation,
      table,
      ...meta
    });
  }

  // Log external API calls
  logExternalApiCall(service: string, endpoint: string, meta?: any) {
    this.info('External API Call', {
      service,
      endpoint,
      ...meta
    });
  }
}

// Performance monitoring
export class PerformanceLogger {
  private static timers = new Map<string, number>();

  static startTimer(label: string): void {
    this.timers.set(label, Date.now());
  }

  static endTimer(label: string, context?: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      logger.warn('Timer not found', { label, context });
      return 0;
    }

    const duration = Date.now() - startTime;
    this.timers.delete(label);

    logger.info('Performance Metric', {
      label,
      duration: `${duration}ms`,
      context
    });

    return duration;
  }

  static measureAsync<T>(
    label: string,
    operation: () => Promise<T>,
    context?: string
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      this.startTimer(label);
      
      try {
        const result = await operation();
        this.endTimer(label, context);
        resolve(result);
      } catch (error) {
        this.endTimer(label, context);
        logger.error('Async operation failed', error, { label, context });
        reject(error);
      }
    });
  }
}

// Health check logger
export class HealthLogger {
  private static logger = new Logger('HealthCheck');

  static logHealthCheck(service: string, status: 'healthy' | 'unhealthy', meta?: any) {
    if (status === 'healthy') {
      this.logger.info(`${service} health check passed`, meta);
    } else {
      this.logger.error(`${service} health check failed`, null, meta);
    }
  }

  static logSystemMetrics(metrics: {
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
    activeConnections: number;
  }) {
    this.logger.info('System Metrics', metrics);
  }
}

// Security logger
export class SecurityLogger {
  private static logger = new Logger('Security');

  static logAuthAttempt(email: string, success: boolean, ip: string, meta?: any) {
    const message = success ? 'Authentication successful' : 'Authentication failed';
    const logLevel = success ? 'info' : 'warn';
    
    this.logger[logLevel](message, {
      email,
      ip,
      ...meta
    });
  }

  static logSuspiciousActivity(type: string, details: any, ip: string) {
    this.logger.warn('Suspicious Activity Detected', {
      type,
      details,
      ip,
      timestamp: new Date().toISOString()
    });
  }

  static logRateLimitExceeded(identifier: string, endpoint: string, ip: string) {
    this.logger.warn('Rate Limit Exceeded', {
      identifier,
      endpoint,
      ip
    });
  }

  static logContentModeration(content: string, flagged: boolean, reasons?: string[]) {
    this.logger.info('Content Moderation', {
      contentLength: content.length,
      flagged,
      reasons,
      contentPreview: content.substring(0, 100)
    });
  }
}

// Error tracking and reporting
export class ErrorTracker {
  private static logger = new Logger('ErrorTracker');

  static trackError(error: Error, context: string, meta?: any) {
    this.logger.error('Application Error', error, {
      context,
      ...meta
    });

    // In production, you might want to send to external service like Sentry
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      this.sendToErrorService(error, context, meta);
    }
  }

  static trackApiError(
    error: Error,
    req: any,
    endpoint: string,
    userId?: string
  ) {
    this.logger.error('API Error', error, {
      endpoint,
      method: req.method,
      url: req.url,
      userId,
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress
    });
  }

  static trackValidationError(
    field: string,
    value: any,
    rule: string,
    context: string
  ) {
    this.logger.warn('Validation Error', {
      field,
      value: typeof value === 'string' ? value.substring(0, 100) : value,
      rule,
      context
    });
  }

  private static sendToErrorService(error: Error, context: string, meta?: any) {
    // Implementation for external error service (Sentry, Bugsnag, etc.)
    // This is a placeholder for the actual implementation
    console.log('Sending error to external service:', {
      error: error.message,
      context,
      meta
    });
  }
}

// Request/Response middleware logger
export function createRequestLogger(context: string) {
  const requestLogger = new Logger(context);
  
  return {
    logRequest: (req: any, meta?: any) => {
      requestLogger.logApiRequest(req, meta);
    },
    
    logResponse: (req: any, res: any, duration: number, meta?: any) => {
      requestLogger.logApiResponse(req, res, duration, meta);
    },
    
    logError: (error: Error, req: any, meta?: any) => {
      ErrorTracker.trackApiError(error, req, context, meta?.userId);
    }
  };
}

// Export default logger for simple usage
export default logger;