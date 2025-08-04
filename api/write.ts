import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../lib/auth';
import { DatabaseService } from '../lib/database';
import { rateLimit } from '../lib/rate-limit';
import { apiSchemas, validateRequest, ValidationError, sanitizeInput } from '../lib/validation';
import { asyncHandler, ValidationError as ErrorHandlerValidationError } from '../lib/error-handler';

interface WriteRequest {
  prompt: string;
  tone?: 'professional' | 'casual' | 'creative' | 'academic';
  length?: 'short' | 'medium' | 'long';
  type?: 'blog' | 'article' | 'copy' | 'social' | 'email';
}

interface WriteResponse {
  content: string;
  creditsUsed: number;
  remainingCredits: number;
}

async function writeHandler(
  req: NextApiRequest,
  res: NextApiResponse<WriteResponse | { error: string }>
): Promise<void> {
  if (req.method !== 'POST') {
    throw new ErrorHandlerValidationError('Method not allowed');
  }
  
  // Rate limiting
  await rateLimit(req, res, { max: 10, windowMs: 60000 }); // 10 requests per minute

  // 验证请求数据
  const validator = validateRequest(apiSchemas.writeRequest);
  const validatedData = validator(req);
  
  // 清理输入
  const cleanPrompt = sanitizeInput.cleanText(validatedData.prompt);
  
  // Authenticate user and check credits
  const user = await authUserAndCheckCredits(req, 1);

  // Use OpenRouter API via simple-api server
  const apiResponse = await fetch('http://localhost:3001/api/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      prompt: cleanPrompt, 
      tone: validatedData.tone || 'professional', 
      length: validatedData.length || 'medium' 
    }),
  });

  if (!apiResponse.ok) {
    throw new Error(`API request failed: ${apiResponse.status}`);
  }

  const result = await apiResponse.json();
  const content = result.content;

  // Log the generation
  await DatabaseService.logGeneration({
    userId: user.id,
    tool: 'writer',
    creditsUsed: 1,
    prompt: cleanPrompt,
    result: content,
    status: 'success'
  });

  // Get updated user credits
  const updatedUser = await DatabaseService.getUser(user.id);

  res.status(200).json({
    content,
    creditsUsed: 1,
    remainingCredits: updatedUser?.credits || 0
  });
}

// 使用错误处理包装器导出
export default asyncHandler(writeHandler, 'WriteAPI');