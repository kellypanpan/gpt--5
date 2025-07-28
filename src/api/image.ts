import { authUserAndCheckCredits, AuthService } from '@/lib/auth';
import { openai, SYSTEM_PROMPTS, TOOL_CONFIG } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    // 解析请求体
    const { prompt, size = '1024x1024', quality = 'standard', style = 'natural' } = await req.json();
    
    if (!prompt) {
      return Response.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // 认证用户并检查Credits
    const user = await authUserAndCheckCredits(req, TOOL_CONFIG.IMAGE_GENERATOR.credits);

    // 构建图像生成提示词
    const enhancedPrompt = buildImagePrompt(prompt, style);

    // 调用OpenAI DALL-E API
    const response = await openai.images.generate({
      model: TOOL_CONFIG.IMAGE_GENERATOR.model,
      prompt: enhancedPrompt,
      n: 1,
      size: size as '1024x1024' | '1792x1024' | '1024x1792',
      quality: quality as 'standard' | 'hd',
    });

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      throw new Error('Failed to generate image');
    }

    // 记录生成日志
    await AuthService.logGeneration({
      userId: user.id,
      tool: 'image',
      creditsUsed: TOOL_CONFIG.IMAGE_GENERATOR.credits,
      prompt: enhancedPrompt,
      result: imageUrl,
      status: 'success'
    });

    return Response.json({
      imageUrl: imageUrl,
      creditsUsed: TOOL_CONFIG.IMAGE_GENERATOR.credits,
      remainingCredits: user.credits,
      prompt: enhancedPrompt
    });

  } catch (error: any) {
    console.error('Image API Error:', error);
    
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

    // OpenAI API 特定错误
    if (error.message.includes('content_policy_violation')) {
      return Response.json(
        { error: 'Your prompt violates our content policy. Please try a different prompt.' },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to generate image. Please try again.' },
      { status: 500 }
    );
  }
}

// 构建图像生成提示词
function buildImagePrompt(prompt: string, style: string): string {
  const styleEnhancements = {
    natural: 'photorealistic, natural lighting, high quality, detailed',
    artistic: 'artistic style, creative composition, vibrant colors, detailed',
    cinematic: 'cinematic lighting, dramatic atmosphere, professional photography, detailed',
    minimalist: 'minimalist design, clean composition, simple background, elegant',
    vintage: 'vintage aesthetic, retro style, nostalgic atmosphere, detailed',
    futuristic: 'futuristic design, sci-fi aesthetic, advanced technology, detailed'
  };

  const enhancement = styleEnhancements[style as keyof typeof styleEnhancements] || styleEnhancements.natural;

  return `${prompt}, ${enhancement}, 4K resolution, high quality, professional photography`;
} 