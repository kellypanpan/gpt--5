import { authUserAndCheckCredits, AuthService } from '@/lib/auth';
import { openai, SYSTEM_PROMPTS, TOOL_CONFIG } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    // 解析请求体
    const { scene, style, platform = 'tiktok', duration = '60s' } = await req.json();
    
    if (!scene || !style) {
      return Response.json(
        { error: 'Scene and style are required' },
        { status: 400 }
      );
    }

    // 认证用户并检查Credits
    const user = await authUserAndCheckCredits(req, TOOL_CONFIG.SCRIPT.credits);

    // 构建脚本提示词
    const userPrompt = buildScriptPrompt(scene, style, platform, duration);

    // 调用OpenAI API
    const completion = await openai.chat.completions.create({
      model: TOOL_CONFIG.SCRIPT.model,
      messages: [
        { 
          role: 'system', 
          content: SYSTEM_PROMPTS.SCRIPT_WRITER 
        },
        { 
          role: 'user', 
          content: userPrompt 
        }
      ],
      temperature: TOOL_CONFIG.SCRIPT.temperature,
      max_tokens: TOOL_CONFIG.SCRIPT.max_tokens,
    });

    const generatedScript = completion.choices[0]?.message?.content || '';

    // 记录生成日志
    await AuthService.logGeneration({
      userId: user.id,
      tool: 'script',
      creditsUsed: TOOL_CONFIG.SCRIPT.credits,
      prompt: userPrompt,
      result: generatedScript,
      status: 'success'
    });

    return Response.json({
      script: generatedScript,
      creditsUsed: TOOL_CONFIG.SCRIPT.credits,
      remainingCredits: user.credits
    });

  } catch (error: any) {
    console.error('Script API Error:', error);
    
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
      { error: 'Failed to generate script. Please try again.' },
      { status: 500 }
    );
  }
}

// 构建脚本提示词
function buildScriptPrompt(scene: string, style: string, platform: string, duration: string): string {
  const styleMap = {
    romance: 'romantic and heartwarming',
    comedy: 'funny and entertaining',
    thriller: 'suspenseful and dramatic',
    drama: 'emotional and engaging',
    action: 'exciting and dynamic'
  };

  const platformMap = {
    tiktok: 'TikTok short-form video',
    youtube: 'YouTube short video',
    instagram: 'Instagram Reel',
    general: 'short-form video content'
  };

  return `Create a ${duration} ${platformMap[platform as keyof typeof platformMap] || 'short-form video'} script with a ${styleMap[style as keyof typeof styleMap] || 'engaging'} style.

Scene/Theme: ${scene}

Please create a script that includes:
1. Scene descriptions with camera angles and movements
2. Character dialogue with natural, engaging conversations
3. Visual effects and transitions
4. Background music suggestions
5. Timing and pacing notes
6. Platform-specific optimization tips

Format the script with clear sections for:
- Scene setup
- Character interactions
- Visual elements
- Audio/music cues
- Production notes

Make it viral-worthy and optimized for ${platform} engagement.`;
} 