import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../lib/auth';
import { DatabaseService, Conversation } from '../lib/database';
import { rateLimit } from '../lib/rate-limit';

interface AgentRequest {
  message: string;
  context?: string;
  taskType?: 'writing' | 'analysis' | 'coding' | 'creative' | 'general';
  conversationId?: string;
}

interface AgentResponse {
  response: string;
  taskType: string;
  creditsUsed: number;
  remainingCredits: number;
  conversationId: string;
  suggestions?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AgentResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    await rateLimit(req, res, { max: 15, windowMs: 60000 }); // 15 requests per minute

    // Authenticate user and check credits
    const user = await authUserAndCheckCredits(req, 1);

    const { 
      message, 
      context, 
      taskType = 'general',
      conversationId 
    } = req.body as AgentRequest;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message is too long (max 2000 characters)' });
    }

    // Skip content moderation for now (could be added to OpenRouter API later)

    // Get conversation history if conversationId is provided
    let conversationHistory: Conversation[] = [];
    if (conversationId) {
      conversationHistory = await DatabaseService.getConversationHistory(conversationId, user.id);
    }

    // Use OpenRouter API via simple-api server
    const apiResponse = await fetch('http://localhost:3001/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, context, taskType }),
    });

    if (!apiResponse.ok) {
      throw new Error(`API request failed: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();
    const response = result.response;
    const suggestions = [];

    // Generate or use existing conversation ID
    const finalConversationId = conversationId || `conv_${user.id}_${Date.now()}`;

    // Save conversation message and response
    await DatabaseService.saveConversation({
      conversationId: finalConversationId,
      userId: user.id,
      userMessage: message,
      assistantResponse: response,
      taskType,
      context
    });

    // Log the generation
    await DatabaseService.logGeneration({
      userId: user.id,
      tool: 'agent',
      creditsUsed: 1,
      prompt: `${taskType}: ${message.substring(0, 100)}...`,
      result: response.substring(0, 200) + '...',
      status: 'success'
    });

    // Get updated user credits
    const updatedUser = await DatabaseService.getUser(user.id);

    res.status(200).json({
      response,
      taskType,
      creditsUsed: 1,
      remainingCredits: updatedUser?.credits || 0,
      conversationId: finalConversationId,
      suggestions
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Agent API error:', error);
    
    if (errorMessage.includes('Unauthorized')) {
      return res.status(401).json({ error: errorMessage });
    }
    
    if (errorMessage.includes('credits') || errorMessage.includes('Subscription')) {
      return res.status(402).json({ error: errorMessage });
    }

    if (errorMessage.includes('Rate limit')) {
      return res.status(429).json({ error: errorMessage });
    }

    if (errorMessage.includes('policy') || errorMessage.includes('content')) {
      return res.status(400).json({ error: errorMessage });
    }

    res.status(500).json({ error: 'Failed to generate response' });
  }
}