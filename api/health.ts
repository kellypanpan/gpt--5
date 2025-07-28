import { NextApiRequest, NextApiResponse } from 'next';
import { DatabaseService } from '../lib/database';
import { OpenAIService } from '../lib/openai';
import { UploadService } from '../lib/upload';
import { handleHealthCheck } from '../lib/error-handler';
import { HealthLogger } from '../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const checks = await Promise.allSettled([
    // Database health check
    checkDatabase(),
    // OpenAI API health check
    checkOpenAI(),
    // Upload service health check
    checkUploadService(),
    // System resources check
    checkSystemResources(),
  ]);

  const healthChecks = checks.map((result, index) => {
    const services = ['database', 'openai', 'upload', 'system'];
    const serviceName = services[index];

    if (result.status === 'fulfilled') {
      HealthLogger.logHealthCheck(serviceName, 'healthy', result.value);
      return {
        name: serviceName,
        status: 'healthy' as const,
        details: result.value,
      };
    } else {
      HealthLogger.logHealthCheck(serviceName, 'unhealthy', { error: result.reason });
      return {
        name: serviceName,
        status: 'unhealthy' as const,
        details: { error: result.reason?.message || 'Unknown error' },
      };
    }
  });

  const healthResponse = handleHealthCheck(healthChecks);
  const statusCode = healthResponse.status === 'healthy' ? 200 : 503;

  // Log system metrics
  if (healthResponse.status === 'healthy') {
    const systemCheck = healthChecks.find(check => check.name === 'system');
    if (systemCheck?.details) {
      HealthLogger.logSystemMetrics(systemCheck.details);
    }
  }

  res.status(statusCode).json(healthResponse);
}

async function checkDatabase(): Promise<any> {
  try {
    const isHealthy = await DatabaseService.healthCheck();
    
    if (!isHealthy) {
      throw new Error('Database connection failed');
    }

    return {
      status: 'connected',
      responseTime: await measureDatabaseResponseTime(),
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Database error: ${errorMessage}`);
  }
}

async function checkOpenAI(): Promise<{ status: string; responseTime: string }> {
  try {
    // Simple health check - try to moderate a safe string
    const startTime = Date.now();
    await OpenAIService.moderateContent('Hello world');
    const responseTime = Date.now() - startTime;

    return {
      status: 'connected',
      responseTime: `${responseTime}ms`,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`OpenAI API error: ${errorMessage}`);
  }
}

async function checkUploadService(): Promise<{ status: string; configured: boolean }> {
  try {
    const isConfigured = UploadService.isConfigured();
    
    if (!isConfigured) {
      throw new Error('Upload service not configured');
    }

    return {
      status: 'configured',
      configured: true,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Upload service error: ${errorMessage}`);
  }
}

interface SystemMetrics {
  memoryUsage: number;
  totalMemory: number;
  externalMemory: number;
  uptime: number;
  nodeVersion: string;
  platform: string;
  arch: string;
}

async function checkSystemResources(): Promise<SystemMetrics> {
  try {
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    // Convert bytes to MB
    const formatMemory = (bytes: number) => Math.round(bytes / 1024 / 1024);

    const metrics = {
      memoryUsage: formatMemory(memoryUsage.heapUsed),
      totalMemory: formatMemory(memoryUsage.heapTotal),
      externalMemory: formatMemory(memoryUsage.external),
      uptime: Math.round(uptime),
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    };

    // Check if memory usage is concerning (> 500MB)
    if (metrics.memoryUsage > 500) {
      throw new Error(`High memory usage: ${metrics.memoryUsage}MB`);
    }

    return metrics;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`System check error: ${errorMessage}`);
  }
}

async function measureDatabaseResponseTime(): Promise<number> {
  const startTime = Date.now();
  
  try {
    // Simple query to measure response time
    await DatabaseService.healthCheck();
    const responseTime = Date.now() - startTime;
    return `${responseTime}ms`;
  } catch {
    return 'unavailable';
  }
}