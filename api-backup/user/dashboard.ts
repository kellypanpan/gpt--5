import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits, AuthService } from '../../lib/auth';
import { DatabaseService } from '../../lib/database';

interface DashboardData {
  user: {
    id: string;
    email: string;
    credits: number;
    isSubscribed: boolean;
    subscriptionType?: string;
    subscriptionExpiresAt?: string;
  };
  stats: {
    totalGenerations: number;
    creditsUsed: number;
    favoriteTools: string[];
    generationsThisMonth: number;
  };
  recentGenerations: Array<{
    id: string;
    tool: string;
    prompt: string;
    creditsUsed: number;
    createdAt: string;
    status: string;
  }>;
  usage: {
    daily: Array<{ date: string; count: number }>;
    byTool: Array<{ tool: string; count: number }>;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardData | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Authenticate user (no credits required for dashboard)
    const user = await authUserAndCheckCredits(req, 0);

    // Get user statistics
    const stats = await AuthService.getUserUsageStats(user.id);

    // Get recent generations
    const recentGenerations = await DatabaseService.getUserGenerationHistory(user.id, 10);

    // Get usage analytics
    const usage = await getUsageAnalytics(user.id);

    const dashboardData: DashboardData = {
      user: {
        id: user.id,
        email: user.email,
        credits: user.credits,
        isSubscribed: user.isSubscribed,
        subscriptionType: user.subscriptionType,
        subscriptionExpiresAt: user.subscriptionExpiresAt,
      },
      stats,
      recentGenerations: recentGenerations.map(gen => ({
        id: gen.id,
        tool: gen.tool,
        prompt: gen.prompt.substring(0, 100) + (gen.prompt.length > 100 ? '...' : ''),
        creditsUsed: gen.credits_used,
        createdAt: gen.created_at,
        status: gen.status,
      })),
      usage,
    };

    res.status(200).json(dashboardData);

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Dashboard API error:', error);
    
    if (errorMessage.includes('Unauthorized')) {
      return res.status(401).json({ error: errorMessage });
    }

    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
}

async function getUsageAnalytics(userId: string): Promise<{
  daily: Array<{ date: string; count: number }>;
  byTool: Array<{ tool: string; count: number }>;
}> {
  try {
    // Get generation history for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const generations = await DatabaseService.getUserGenerationHistory(userId, 1000);
    
    // Filter to last 30 days
    const recentGenerations = generations.filter(gen => 
      new Date(gen.created_at) >= thirtyDaysAgo
    );

    // Calculate daily usage
    const dailyUsage = new Map<string, number>();
    const toolUsage = new Map<string, number>();

    for (const gen of recentGenerations) {
      const date = new Date(gen.created_at).toISOString().split('T')[0];
      dailyUsage.set(date, (dailyUsage.get(date) || 0) + 1);
      toolUsage.set(gen.tool, (toolUsage.get(gen.tool) || 0) + 1);
    }

    // Convert to arrays and sort
    const daily = Array.from(dailyUsage.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const byTool = Array.from(toolUsage.entries())
      .map(([tool, count]) => ({ tool, count }))
      .sort((a, b) => b.count - a.count);

    return { daily, byTool };

  } catch (error) {
    console.error('Error getting usage analytics:', error);
    return { daily: [], byTool: [] };
  }
}