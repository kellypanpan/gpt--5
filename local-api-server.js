import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

// 加载环境变量
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  config({ path: envPath });
}

const app = express();
const PORT = 3001;

// OpenRouter API 配置
const OPENROUTER_BASE_URL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';
const API_KEY = process.env.OPENAI_API_KEY;

// 中间件
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// 日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 测试 OpenRouter API
app.get('/api/test-openai', async (req, res) => {
  try {
    console.log('Testing OpenRouter API...');
    
    if (!API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'OpenRouter API key not configured',
        error: 'Missing API key'
      });
    }

    // 测试简单的聊天完成
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'execu-ai-hub'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: 'Hello, this is a test message.' }
        ],
        max_tokens: 50
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `API call failed: ${response.status}`);
    }

    const data = await response.json();
    
    res.json({
      success: true,
      message: 'OpenRouter API connection successful',
      data: {
        model: data.model,
        response: data.choices[0]?.message?.content,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('OpenRouter API test error:', error.message);
    
    let errorMessage = 'Unknown error occurred';
    if (error.message.includes('quota') || error.message.includes('credit')) {
      errorMessage = 'API quota/credit insufficient';
    } else if (error.message.includes('API key') || error.message.includes('401')) {
      errorMessage = 'Invalid API key';
    } else if (error.message.includes('rate')) {
      errorMessage = 'Rate limit exceeded';
    }

    res.status(500).json({
      success: false,
      message: 'OpenRouter API test failed',
      error: errorMessage,
      details: error.message
    });
  }
});

// Writer API
app.post('/api/write', async (req, res) => {
  try {
    console.log('Writer API called with:', req.body);
    
    const { prompt, tone = 'professional', length = 'medium', type = 'article' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: 'OpenRouter API not configured' });
    }

    const systemPrompt = `You are a professional writer. Generate ${length} ${type} content with a ${tone} tone.

Instructions:
- Follow the user's specific requirements
- Maintain high quality and engaging content
- Use proper formatting with paragraphs and structure
- Be creative and informative
- Keep the tone ${tone} throughout`;

    // 调用 OpenRouter API
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'execu-ai-hub'
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
    console.log('OpenRouter response status:', response.status);

    if (!response.ok) {
      console.error('OpenRouter API error:', result);
      throw new Error(result.error?.message || `API call failed: ${response.status}`);
    }

    const content = result.choices[0]?.message?.content || '';

    if (!content) {
      throw new Error('No content generated');
    }

    console.log('Generated content length:', content.length);

    res.json({
      content,
      creditsUsed: 1,
      remainingCredits: 999,
      model: result.model
    });

  } catch (error) {
    console.error('Writer API error:', error.message);
    
    if (error.message.includes('quota') || error.message.includes('credit')) {
      return res.status(402).json({ error: 'API quota/credit insufficient' });
    }
    
    if (error.message.includes('rate')) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    res.status(500).json({ error: 'Failed to generate content: ' + error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    apiProvider: 'OpenRouter',
    apiConfigured: !!API_KEY
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND',
    path: req.path,
    method: req.method
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Local API Server running at http://localhost:${PORT}`);
  console.log(`📱 Frontend running at http://localhost:8080`);
  console.log(`🔑 OpenRouter API Key: ${API_KEY ? 'Configured' : 'Missing'}`);
  console.log(`🌐 API Base URL: ${OPENROUTER_BASE_URL}`);
  console.log('');
  console.log('Test endpoints:');
  console.log(`- GET  http://localhost:${PORT}/api/health`);
  console.log(`- GET  http://localhost:${PORT}/api/test-openai`);
  console.log(`- POST http://localhost:${PORT}/api/write`);
  console.log('');
  console.log('🎯 Ready to test!');
});