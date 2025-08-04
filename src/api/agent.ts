import { authUserAndCheckCredits, AuthService } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    // 解析请求体
    const { message, context = '', taskType = 'general' } = await req.json();
    
    if (!message) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // 认证用户并检查Credits
    const user = await authUserAndCheckCredits(req, 1);

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

    // 记录生成日志
    await AuthService.logGeneration({
      userId: user.id,
      tool: 'agent',
      creditsUsed: 1,
      prompt: message,
      result: response,
      status: 'success'
    });

    return Response.json({
      response: response,
      taskType: taskType,
      creditsUsed: 1,
      remainingCredits: user.credits
    });

  } catch (error: any) {
    console.error('Agent API Error:', error);
    
    if (error.message.includes('Unauthorized')) {
      return Response.json(
        { error: 'Please log in to use this feature' },
        { status: 401 }
      );
    }
    
    if (error.message.includes('Subscription required')) {
      return Response.json(
        { error: 'Please upgrade your subscription to use this feature' },
        { status: 403 }
      );
    }
    
    if (error.message.includes('Insufficient credits')) {
      return Response.json(
        { error: error.message },
        { status: 402 }
      );
    }

    return Response.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}

// 构建Agent提示词
function buildAgentPrompt(message: string, context: string, taskType: string): string {
  const taskInstructions = {
    writing: 'Focus on writing tasks, content creation, and text generation.',
    analysis: 'Focus on data analysis, research, and analytical tasks.',
    coding: 'Focus on programming, code review, and technical tasks.',
    creative: 'Focus on creative tasks, brainstorming, and innovative solutions.',
    general: 'Handle any type of task with appropriate expertise.'
  };

  const instruction = taskInstructions[taskType as keyof typeof taskInstructions] || taskInstructions.general;

  let prompt = `Task Type: ${taskType}\nInstruction: ${instruction}\n\nUser Request: ${message}`;

  if (context) {
    prompt += `\n\nContext: ${context}`;
  }

  prompt += `\n\nPlease provide a comprehensive and helpful response that addresses the user's request appropriately for the task type.`;

  return prompt;
} 