// Cloudflare Pages Function for content writing
interface Env {
  OPENAI_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

interface WriterRequest {
  prompt: string;
  tone?: string;
  length?: string;
  type?: string;
}

interface WriterResponse {
  content: string;
  creditsUsed: number;
  remainingCredits: number;
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  
  try {
    // 基础验证
    if (!env.OPENAI_API_KEY) {
      return Response.json({ error: 'OpenAI API not configured' }, { status: 500 });
    }

    const body = await request.json() as WriterRequest;
    const { prompt, tone = 'professional', length = 'medium', type = 'article' } = body;

    if (!prompt || prompt.trim().length === 0) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (prompt.length > 1000) {
      return Response.json({ error: 'Prompt is too long (max 1000 characters)' }, { status: 400 });
    }

    // TODO: 添加用户认证和积分检查
    // const authHeader = request.headers.get('Authorization');
    // if (!authHeader) {
    //   return Response.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // 内容审核
    const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: prompt })
    });

    const moderationResult = await moderationResponse.json();
    if (moderationResult.results?.[0]?.flagged) {
      return Response.json({ 
        error: 'Content violates our content policy. Please rephrase your request.' 
      }, { status: 400 });
    }

    // 构建写作提示
    const systemPrompt = `You are a professional writer. Generate ${length} ${type} content with a ${tone} tone.
    
Instructions:
- Follow the user's specific requirements
- Maintain high quality and engaging content
- Use proper formatting with paragraphs and structure
- Be creative and informative
- Keep the tone ${tone} throughout`;

    // 调用 OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: length === 'long' ? 2000 : length === 'medium' ? 1000 : 500,
        temperature: 0.7
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error?.message || 'OpenAI API call failed');
    }

    const content = result.choices[0]?.message?.content || '';
    
    if (!content) {
      throw new Error('No content generated');
    }

    // TODO: 记录使用日志和扣除积分
    // await logGeneration({
    //   userId: user.id,
    //   tool: 'writer',
    //   creditsUsed: 1,
    //   prompt: prompt.substring(0, 100) + '...',
    //   result: content.substring(0, 200) + '...',
    //   status: 'success'
    // });

    return Response.json({
      content,
      creditsUsed: 1,
      remainingCredits: 999 // 临时硬编码
    } as WriterResponse);

  } catch (error: unknown) {
    console.error('Writer API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('rate limit')) {
      return Response.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    }
    
    if (errorMessage.includes('quota')) {
      return Response.json({ error: 'API quota exceeded' }, { status: 402 });
    }

    return Response.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}