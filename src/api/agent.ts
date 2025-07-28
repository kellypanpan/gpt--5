import { authUserAndCheckCredits, AuthService } from '@/lib/auth';
import { openai, SYSTEM_PROMPTS, TOOL_CONFIG } from '@/lib/openai';

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
    const user = await authUserAndCheckCredits(req, TOOL_CONFIG.AGENT.credits);

    // 构建Agent提示词
    const userPrompt = buildAgentPrompt(message, context, taskType);

    // 调用OpenAI API
    const completion = await openai.chat.completions.create({
      model: TOOL_CONFIG.AGENT.model,
      messages: [
        { 
          role: 'system', 
          content: SYSTEM_PROMPTS.AGENT 
        },
        { 
          role: 'user', 
          content: userPrompt 
        }
      ],
      temperature: TOOL_CONFIG.AGENT.temperature,
      max_tokens: TOOL_CONFIG.AGENT.max_tokens,
    });

    const response = completion.choices[0]?.message?.content || '';

    // 记录生成日志
    await AuthService.logGeneration({
      userId: user.id,
      tool: 'agent',
      creditsUsed: TOOL_CONFIG.AGENT.credits,
      prompt: userPrompt,
      result: response,
      status: 'success'
    });

    return Response.json({
      response: response,
      taskType: taskType,
      creditsUsed: TOOL_CONFIG.AGENT.credits,
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