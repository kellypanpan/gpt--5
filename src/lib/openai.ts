import OpenAI from 'openai';
import { config } from './config';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export class OpenAIService {
  // Text generation for Writer tool
  static async generateText(options: {
    prompt: string;
    tone: string;
    length: string;
    type: string;
  }): Promise<string> {
    const { prompt, tone, length, type } = options;
    
    // Build system message based on parameters
    const systemMessage = this.buildWriterSystemMessage(tone, length, type);
    
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        max_tokens: this.getMaxTokensForLength(length),
        temperature: this.getTemperatureForTone(tone),
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      return completion.choices[0]?.message?.content || 'Failed to generate content';
    } catch (error: any) {
      console.error('OpenAI text generation error:', error);
      throw new Error(`Failed to generate text: ${error.message}`);
    }
  }

  // Script generation for video content
  static async generateScript(options: {
    scene: string;
    style: string;
    platform: string;
    duration: string;
  }): Promise<{ script: string; metadata: any }> {
    const { scene, style, platform, duration } = options;
    
    const systemMessage = this.buildScriptSystemMessage(style, platform, duration);
    
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: scene }
        ],
        max_tokens: 2000,
        temperature: 0.8,
      });

      const script = completion.choices[0]?.message?.content || 'Failed to generate script';
      
      // Extract metadata
      const metadata = {
        scenes: (script.match(/SCENE \d+/g) || []).length || 1,
        estimatedDuration: duration,
        platform: platform.toUpperCase()
      };

      return { script, metadata };
    } catch (error: any) {
      console.error('OpenAI script generation error:', error);
      throw new Error(`Failed to generate script: ${error.message}`);
    }
  }

  // Image generation using DALL-E
  static async generateImages(options: {
    prompt: string;
    size: string;
    quality: string;
    style: string;
    count: number;
  }): Promise<string[]> {
    const { prompt, size, quality, style, count } = options;
    
    try {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: this.enhanceImagePrompt(prompt, style),
        size: size as '1024x1024' | '1792x1024' | '1024x1792',
        quality: quality as 'standard' | 'hd',
        n: Math.min(count, 1), // DALL-E 3 only supports n=1
        response_format: 'url',
      });

      return response.data.map(img => img.url!);
    } catch (error: any) {
      console.error('OpenAI image generation error:', error);
      throw new Error(`Failed to generate images: ${error.message}`);
    }
  }

  // PDF analysis
  static async analyzePDF(options: {
    text: string;
    analysisType: string;
    question?: string;
    language: string;
  }): Promise<string> {
    const { text, analysisType, question, language } = options;
    
    const systemMessage = this.buildPDFAnalysisSystemMessage(analysisType, language);
    let userMessage = text;
    
    if (analysisType === 'qa' && question) {
      userMessage = `Document content:\n${text}\n\nQuestion: ${question}`;
    }
    
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ],
        max_tokens: 3000,
        temperature: 0.3,
      });

      return completion.choices[0]?.message?.content || 'Failed to analyze document';
    } catch (error: any) {
      console.error('OpenAI PDF analysis error:', error);
      throw new Error(`Failed to analyze PDF: ${error.message}`);
    }
  }

  // Agent conversation
  static async generateAgentResponse(options: {
    message: string;
    context?: string;
    taskType: string;
    conversationHistory: any[];
    userId: string;
  }): Promise<{ response: string; suggestions?: string[] }> {
    const { message, context, taskType, conversationHistory } = options;
    
    const systemMessage = this.buildAgentSystemMessage(taskType);
    const messages = [{ role: 'system', content: systemMessage }];
    
    // Add conversation history
    conversationHistory.slice(-10).forEach(conv => {
      messages.push(
        { role: 'user', content: conv.user_message },
        { role: 'assistant', content: conv.assistant_response }
      );
    });
    
    // Add context if provided
    if (context) {
      messages.push({ role: 'user', content: `Context: ${context}` });
    }
    
    messages.push({ role: 'user', content: message });
    
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: messages as any,
        max_tokens: 2500,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || 'Failed to generate response';
      
      // Generate follow-up suggestions
      const suggestions = await this.generateSuggestions(message, taskType);
      
      return { response, suggestions };
    } catch (error: any) {
      console.error('OpenAI agent response error:', error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }

  // Content moderation
  static async moderateContent(text: string): Promise<boolean> {
    try {
      const moderation = await openai.moderations.create({
        input: text,
      });

      return moderation.results[0]?.flagged || false;
    } catch (error: any) {
      console.error('OpenAI moderation error:', error);
      // Default to safe if moderation fails
      return false;
    }
  }

  // Helper methods
  private static buildWriterSystemMessage(tone: string, length: string, type: string): string {
    const toneInstructions = {
      professional: 'Use formal, business-appropriate language with clear structure and authoritative tone.',
      casual: 'Use conversational, friendly language that feels natural and approachable.',
      creative: 'Use imaginative, engaging language with vivid descriptions and creative flair.',
      academic: 'Use scholarly, formal language with proper citations format and analytical approach.'
    };

    const lengthInstructions = {
      short: 'Keep the response concise, around 150-300 words.',
      medium: 'Provide a detailed response of 400-800 words.',
      long: 'Create a comprehensive piece of 1000+ words with thorough coverage.'
    };

    const typeInstructions = {
      blog: 'Structure as a blog post with engaging headline, introduction, main content with subheadings, and conclusion.',
      article: 'Write as an informative article with proper journalism structure and fact-based content.',
      copy: 'Create persuasive marketing copy focused on benefits and call-to-action.',
      social: 'Optimize for social media with hashtags, engaging hooks, and shareable content.',
      email: 'Format as an email with subject line, greeting, body, and professional closing.'
    };

    return `You are GPT-5, an advanced AI writing assistant. ${toneInstructions[tone as keyof typeof toneInstructions]} ${lengthInstructions[length as keyof typeof lengthInstructions]} ${typeInstructions[type as keyof typeof typeInstructions]} Ensure the content is original, engaging, and valuable to the reader.`;
  }

  private static buildScriptSystemMessage(style: string, platform: string, duration: string): string {
    const styleInstructions = {
      romance: 'Create romantic, emotionally engaging content with heartfelt moments.',
      comedy: 'Focus on humor, timing, and comedic elements that entertain.',
      thriller: 'Build suspense, tension, and dramatic moments that captivate.',
      drama: 'Develop emotional depth, character development, and meaningful dialogue.',
      action: 'Emphasize dynamic scenes, excitement, and high-energy moments.'
    };

    const platformInstructions = {
      tiktok: 'Optimize for vertical format, quick cuts, trending sounds, and viral potential.',
      youtube: 'Structure for longer engagement with clear intro, content, and outro.',
      instagram: 'Focus on visual appeal and story-driven content for Reels format.'
    };

    return `You are a professional script writer specializing in ${platform} content. ${styleInstructions[style as keyof typeof styleInstructions]} ${platformInstructions[platform as keyof typeof platformInstructions]} Create a ${duration} script with scene descriptions, dialogue, and visual cues. Format with clear scene breaks and timestamps.`;
  }

  private static buildPDFAnalysisSystemMessage(analysisType: string, language: string): string {
    const analysisInstructions = {
      summary: 'Provide a comprehensive summary highlighting key points, main themes, and important conclusions.',
      qa: 'Answer the specific question based on the document content with detailed explanations and relevant quotes.',
      keywords: 'Extract and categorize the most important keywords, phrases, and concepts from the document.',
      insights: 'Provide deep insights, analysis, and actionable takeaways from the document content.'
    };

    return `You are an expert document analyst. ${analysisInstructions[analysisType as keyof typeof analysisInstructions]} Respond in ${language === 'en' ? 'English' : language}. Be thorough, accurate, and provide specific references to the source material when relevant.`;
  }

  private static buildAgentSystemMessage(taskType: string): string {
    const taskInstructions = {
      writing: 'You are a professional writing assistant. Help with all writing tasks including editing, proofreading, and content creation.',
      analysis: 'You are an analytical expert. Provide thorough analysis, insights, and data-driven conclusions.',
      coding: 'You are a senior software engineer. Help with code review, debugging, architecture, and best practices.',
      creative: 'You are a creative professional. Assist with brainstorming, ideation, and creative problem-solving.',
      general: 'You are GPT-5, a highly capable AI assistant. Provide helpful, accurate, and detailed responses.'
    };

    return `${taskInstructions[taskType as keyof typeof taskInstructions]} Always provide actionable advice, be thorough in your explanations, and ask clarifying questions when needed. Your responses should be professional yet approachable.`;
  }

  private static enhanceImagePrompt(prompt: string, style: string): string {
    const styleEnhancements = {
      natural: ', photorealistic, natural lighting, high quality',
      vivid: ', vibrant colors, dramatic lighting, artistic style',
      cinematic: ', cinematic composition, dramatic lighting, movie poster style'
    };

    return prompt + (styleEnhancements[style as keyof typeof styleEnhancements] || '');
  }

  private static async generateSuggestions(message: string, taskType: string): Promise<string[]> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Generate 3 brief follow-up questions or suggestions related to the ${taskType} task. Each should be under 10 words.`
          },
          { role: 'user', content: message }
        ],
        max_tokens: 150,
        temperature: 0.8,
      });

      const suggestions = completion.choices[0]?.message?.content
        ?.split('\n')
        .filter(s => s.trim())
        .slice(0, 3) || [];

      return suggestions;
    } catch {
      return [];
    }
  }

  private static getMaxTokensForLength(length: string): number {
    const tokens = {
      short: 500,
      medium: 1200,
      long: 2500
    };
    return tokens[length as keyof typeof tokens] || 1200;
  }

  private static getTemperatureForTone(tone: string): number {
    const temperatures = {
      professional: 0.3,
      casual: 0.7,
      creative: 0.9,
      academic: 0.2
    };
    return temperatures[tone as keyof typeof temperatures] || 0.5;
  }
} 