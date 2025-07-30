// Cloudflare Pages Function for OpenAI API testing
interface Env {
  OPENAI_API_KEY: string;
}

interface TestResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
  error?: string;
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { env } = context;
  
  try {
    if (!env.OPENAI_API_KEY) {
      return Response.json({
        success: false,
        message: 'OpenAI API key not configured',
        error: 'Missing API key'
      } as TestResponse, { status: 500 });
    }

    // Test OpenAI API connection
    const testText = "Hello world";
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: testText
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${result.error?.message || 'Unknown error'}`);
    }

    const isFlagged = result.results?.[0]?.flagged || false;

    return Response.json({
      success: true,
      message: 'OpenAI API connection successful',
      data: {
        testText,
        moderated: isFlagged,
        timestamp: new Date().toISOString()
      }
    } as TestResponse);

  } catch (error: unknown) {
    console.error('OpenAI API test error:', error);
    
    let errorMessage = 'Unknown error occurred';
    const errorText = error instanceof Error ? error.message : '';
    
    if (errorText.includes('API key')) {
      errorMessage = 'Invalid API key';
    } else if (errorText.includes('network') || errorText.includes('fetch')) {
      errorMessage = 'Network connection error';
    } else if (errorText.includes('quota')) {
      errorMessage = 'API quota exceeded';
    } else if (errorText.includes('rate')) {
      errorMessage = 'Rate limit exceeded';
    }

    return Response.json({
      success: false,
      message: 'OpenAI API test failed',
      error: errorMessage
    } as TestResponse, { status: 500 });
  }
}