import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIService } from '../lib/openai';

interface TestResponse {
  success: boolean;
  message: string;
  data?: any;
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
    // 检查环境变量
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'OpenAI API key not configured',
        error: 'OPENAI_API_KEY environment variable is missing'
      });
    }

    // 测试简单的内容审核API调用（消耗最少的token）
    const testText = "Hello, this is a test message.";
    const isFlagged = await OpenAIService.moderateContent(testText);

    return res.status(200).json({
      success: true,
      message: 'OpenAI API connection successful',
      data: {
        testText,
        moderated: isFlagged,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('OpenAI API test error:', error);
    
    let errorMessage = 'Unknown error occurred';
    
    if (error.message.includes('API key')) {
      errorMessage = 'Invalid API key';
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
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