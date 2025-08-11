import { NextApiRequest, NextApiResponse } from 'next';

interface TestResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Test OpenRouter API via simple-api server
    const apiResponse = await fetch('http://localhost:3001/api/test-openai');
    
    if (!apiResponse.ok) {
      throw new Error(`API request failed: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();
    
    return res.status(200).json({
      success: true,
      message: 'OpenRouter API connection successful',
      data: {
        apiProvider: 'OpenRouter',
        response: result.response,
        model: result.model,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: unknown) {
    console.error('OpenAI API test error:', error);
    
    let errorMessage = 'Unknown error occurred';
    const errorText = error instanceof Error ? error.message : '';
    
    if (errorText.includes('API key')) {
      errorMessage = 'Invalid API key';
    } else if (errorText.includes('network') || errorText.includes('fetch')) {
      errorMessage = 'Network connection error';
    } else if (error.message.includes('quota')) {
      errorMessage = 'API quota exceeded';
    } else {
      errorMessage = error.message;
    }

    return res.status(500).json({
      success: false,
      message: 'OpenAI API connection failed',
      error: errorMessage
    });
  }
}