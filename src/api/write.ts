import { authUserAndCheckCredits, AuthService } from '@/lib/auth';
import { openai, SYSTEM_PROMPTS, TOOL_CONFIG, handleOpenAIResponse } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    // 解析请求体
    const { prompt, tone = 'professional', length = 'medium', type = 'blog' } = await req.json();
    
    if (!prompt) {
      return Response.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // 认证用户并检查Credits
    const user = await authUserAndCheckCredits(req, TOOL_CONFIG.WRITER.credits);

    // 构建用户提示词
    const userPrompt = buildWriterPrompt(prompt, tone, length, type);

    // 调用OpenAI API
    const completion = await openai.chat.completions.create({
      model: TOOL_CONFIG.WRITER.model,
      messages: [
        { 
          role: 'system', 
          content: SYSTEM_PROMPTS.WRITER 
        },
        { 
          role: 'user', 
          content: userPrompt 
        }
      ],
      temperature: TOOL_CONFIG.WRITER.temperature,
      max_tokens: TOOL_CONFIG.WRITER.max_tokens,
    });

    const generatedContent = completion.choices[0]?.message?.content || '';

    // 记录生成日志
    await AuthService.logGeneration({
      userId: user.id,
      tool: 'writer',
      creditsUsed: TOOL_CONFIG.WRITER.credits,
      prompt: userPrompt,
      result: generatedContent,
      status: 'success'
    });

    return Response.json({
      content: generatedContent,
      creditsUsed: TOOL_CONFIG.WRITER.credits,
      remainingCredits: user.credits
    });

  } catch (error: any) {
    console.error('Writer API Error:', error);
    
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
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}

// 构建写作提示词
function buildWriterPrompt(prompt: string, tone: string, length: string, type: string): string {
  const lengthMap = {
    short: '300-500 words',
    medium: '800-1200 words',
    long: '1500-2000 words'
  };

  const toneMap = {
    professional: 'professional and formal',
    casual: 'casual and conversational',
    creative: 'creative and engaging',
    academic: 'academic and scholarly'
  };

  const typeMap = {
    blog: 'blog post',
    article: 'article',
    copy: 'marketing copy',
    social: 'social media post',
    email: 'email'
  };

  return `Write a ${lengthMap[length as keyof typeof lengthMap] || '800-1200 words'} ${typeMap[type as keyof typeof typeMap] || 'blog post'} in a ${toneMap[tone as keyof typeof toneMap] || 'professional'} tone about: ${prompt}

Please ensure the content is:
- Well-structured with clear headings
- Engaging and informative
- Optimized for the target audience
- Free of grammatical errors
- SEO-friendly where appropriate`;
} 