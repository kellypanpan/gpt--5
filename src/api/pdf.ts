import { authUserAndCheckCredits, AuthService } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    // 解析请求体
    const { text, analysisType = 'summary', question } = await req.json();
    
    if (!text) {
      return Response.json(
        { error: 'PDF text content is required' },
        { status: 400 }
      );
    }

    // 认证用户并检查Credits
    const user = await authUserAndCheckCredits(req, 1);

    if (analysisType === 'qa' && !question) {
      return Response.json(
        { error: 'Question is required for Q&A analysis' },
        { status: 400 }
      );
    }

    // Use OpenRouter API via simple-api server
    const apiResponse = await fetch('http://localhost:3001/api/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, analysisType, question }),
    });

    if (!apiResponse.ok) {
      throw new Error(`API request failed: ${apiResponse.status}`);
    }

    const result = await apiResponse.json();
    const analysisResult = result.analysis;

    // 记录生成日志
    await AuthService.logGeneration({
      userId: user.id,
      tool: 'pdf_analyzer',
      creditsUsed: 1,
      prompt: text.substring(0, 100),
      result: analysisResult,
      status: 'success'
    });

    return Response.json({
      analysis: analysisResult,
      type: analysisType,
      creditsUsed: 1,
      remainingCredits: user.credits
    });

  } catch (error: any) {
    console.error('PDF Analyzer API Error:', error);
    
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
      { error: 'Failed to analyze PDF. Please try again.' },
      { status: 500 }
    );
  }
}

// 构建摘要提示词
function buildSummaryPrompt(text: string): string {
  return `Please provide a comprehensive summary of the following document:

${text}

Please create a summary that:
- Captures the main points and key ideas
- Is well-structured and easy to understand
- Maintains the original context and meaning
- Is concise but thorough
- Highlights important findings or conclusions`;
}

// 构建问答提示词
function buildQAPrompt(text: string, question: string): string {
  return `Based on the following document, please answer this question:

Document:
${text}

Question: ${question}

Please provide a detailed answer that:
- Directly addresses the question
- Uses information from the document
- Is accurate and well-supported
- Includes relevant quotes or references when appropriate`;
}

// 构建关键词提取提示词
function buildKeywordsPrompt(text: string): string {
  return `Please extract key themes and keywords from the following document:

${text}

Please identify:
- Main topics and themes
- Important keywords and phrases
- Key concepts and ideas
- Technical terms if applicable

Format your response as a list of keywords and brief descriptions.`;
} 