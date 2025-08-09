// OpenRouter API integration for GPT-4o
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || import.meta.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o';

if (!OPENROUTER_API_KEY) {
  console.warn('OpenRouter API key is missing. Chat functionality may not work properly.');
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface StreamChunk {
  choices: Array<{
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason?: string;
  }>;
}

export class OpenRouterAPI {
  private apiKey: string;
  private model: string;
  private baseURL = 'https://openrouter.ai/api/v1';

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || OPENROUTER_API_KEY;
    this.model = model || OPENROUTER_MODEL;
    
    if (!this.apiKey) {
      throw new Error('OpenRouter API key is required');
    }
  }

  async chat(messages: ChatMessage[], options: {
    stream?: boolean;
    temperature?: number;
    max_tokens?: number;
    onChunk?: (chunk: string) => void;
    signal?: AbortSignal;
  } = {}): Promise<string> {
    const {
      stream = false,
      temperature = 0.7,
      max_tokens = 2000,
      onChunk,
      signal
    } = options;

    const requestBody = {
      model: this.model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      temperature,
      max_tokens,
      stream
    };

    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'GPT-5 AI Tools Hub'
    };

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        signal
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      if (stream) {
        return this.handleStreamResponse(response, onChunk);
      } else {
        const data: OpenRouterResponse = await response.json();
        return data.choices[0]?.message?.content || '';
      }
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }

  private async handleStreamResponse(response: Response, onChunk?: (chunk: string) => void): Promise<string> {
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get response stream reader');
    }

    const decoder = new TextDecoder();
    let fullResponse = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              return fullResponse;
            }

            try {
              const parsed: StreamChunk = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              
              if (content) {
                fullResponse += content;
                onChunk?.(content);
              }
            } catch (parseError) {
              // Skip invalid JSON lines
              continue;
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return fullResponse;
  }

  async generateTitle(messages: ChatMessage[]): Promise<string> {
    const titleMessages: ChatMessage[] = [
      {
        role: 'system',
        content: 'Generate a short, descriptive title (4-6 words) for this conversation based on the user\'s first message. Return only the title, no quotes or extra text.'
      },
      {
        role: 'user',
        content: messages.find(m => m.role === 'user')?.content || 'New conversation'
      }
    ];

    try {
      const title = await this.chat(titleMessages, { temperature: 0.3, max_tokens: 50 });
      return title.trim().replace(/^["']|["']$/g, ''); // Remove quotes if present
    } catch (error) {
      console.error('Error generating title:', error);
      return 'New Conversation';
    }
  }
}

// Default instance
export const openRouterAPI = new OpenRouterAPI();

// Helper function for simple chat completions
export async function chatWithGPT4o(
  messages: ChatMessage[],
  options?: {
    stream?: boolean;
    onChunk?: (chunk: string) => void;
    signal?: AbortSignal;
  }
): Promise<string> {
  return openRouterAPI.chat(messages, options);
}

// Helper function to generate conversation titles
export async function generateConversationTitle(messages: ChatMessage[]): Promise<string> {
  return openRouterAPI.generateTitle(messages);
}