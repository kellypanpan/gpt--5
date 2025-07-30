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

console.log('🔑 API Key:', API_KEY ? `${API_KEY.substring(0, 20)}...` : 'Missing');
console.log('🌐 Base URL:', OPENROUTER_BASE_URL);

// 中间件
app.use(cors());
app.use(express.json());

// 日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 简单健康检查
app.get('/api/health', (req, res) => {
  console.log('Health check called');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiProvider: 'OpenRouter',
    apiConfigured: !!API_KEY
  });
});

// 测试OpenRouter连接
app.get('/api/test-openai', async (req, res) => {
  console.log('OpenRouter test called');
  
  if (!API_KEY) {
    return res.status(500).json({
      success: false,
      error: 'API key not configured'
    });
  }

  try {
    // 简单的聊天测试
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
        messages: [{ role: 'user', content: 'Hello, this is a test.' }],
        max_tokens: 50
      })
    });

    console.log('OpenRouter response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenRouter error:', error);
      throw new Error(error.error?.message || `API failed: ${response.status}`);
    }

    const data = await response.json();
    
    res.json({
      success: true,
      message: 'OpenRouter connection successful',
      response: data.choices[0]?.message?.content,
      model: data.model
    });

  } catch (error) {
    console.error('OpenRouter test error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Writer API
app.post('/api/write', async (req, res) => {
  console.log('Writer API called with:', req.body);
  
  const { prompt, tone = 'professional', length = 'medium' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'API not configured' });
  }

  try {
    const systemPrompt = `You are a professional writer. Write ${length} content with a ${tone} tone.`;

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

    console.log('Writer API - OpenRouter status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('Writer API - OpenRouter error:', error);
      throw new Error(error.error?.message || `API failed: ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices[0]?.message?.content || '';

    console.log('Generated content length:', content.length);

    res.json({
      content,
      creditsUsed: 1,
      remainingCredits: 999,
      model: result.model
    });

  } catch (error) {
    console.error('Writer API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Script Generator API
app.post('/api/script', async (req, res) => {
  console.log('Script API called with:', req.body);
  
  const { scene, style, platform = 'general', duration = 'medium' } = req.body;

  if (!scene || !style) {
    return res.status(400).json({ error: 'Scene and style are required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'API not configured' });
  }

  try {
    const systemPrompt = `You are a professional script writer. Create a ${duration} script for ${platform} platform with ${style} style.

Instructions:
- Write engaging and creative scripts
- Include scene descriptions and dialogue as appropriate  
- Match the requested style (${style}) throughout
- Consider the platform (${platform}) requirements
- Structure the script professionally with proper formatting`;

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
          { role: 'user', content: `Create a script for: ${scene}` }
        ],
        max_tokens: duration === 'long' ? 2000 : duration === 'medium' ? 1000 : 500,
        temperature: 0.8
      })
    });

    console.log('Script API - OpenRouter status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('Script API - OpenRouter error:', error);
      throw new Error(error.error?.message || `API failed: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices[0]?.message?.content || '';

    console.log('Generated script length:', script.length);

    res.json({
      script,
      creditsUsed: 1,
      remainingCredits: 999,
      model: result.model
    });

  } catch (error) {
    console.error('Script API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Image Generator API (using OpenRouter with DALL-E)
app.post('/api/image', async (req, res) => {
  console.log('Image API called with:', req.body);
  
  const { prompt, size = '1024x1024', quality = 'standard', style = 'natural' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'API not configured' });
  }

  try {
    // 使用OpenRouter调用DALL-E模型
    const response = await fetch(`${OPENROUTER_BASE_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3001',
        'X-Title': 'execu-ai-hub'
      },
      body: JSON.stringify({
        model: 'openai/dall-e-3',
        prompt: `${style} style: ${prompt}`,
        n: 1,
        size: size,
        quality: quality
      })
    });

    console.log('Image API - OpenRouter status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('Image API - OpenRouter error:', error);
      throw new Error(error.error?.message || `Image generation failed: ${response.status}`);
    }

    const result = await response.json();
    const imageUrl = result.data[0]?.url || '';

    if (!imageUrl) {
      throw new Error('No image URL returned');
    }

    console.log('Generated image URL:', imageUrl.substring(0, 50) + '...');

    res.json({
      imageUrl,
      prompt,
      creditsUsed: 2,
      remainingCredits: 998
    });

  } catch (error) {
    console.error('Image API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// PDF Analyzer API
app.post('/api/pdf', async (req, res) => {
  console.log('PDF API called with:', req.body);
  
  const { text, analysisType, question } = req.body;

  if (!text || !analysisType) {
    return res.status(400).json({ error: 'Text and analysis type are required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'API not configured' });
  }

  try {
    let systemPrompt = '';
    let userPrompt = '';

    switch (analysisType) {
      case 'summary':
        systemPrompt = 'You are a professional document analyst. Provide concise and accurate summaries.';
        userPrompt = `Please provide a comprehensive summary of the following text:\n\n${text}`;
        break;
      case 'qa':
        systemPrompt = 'You are a professional document analyst. Answer questions based on the provided text accurately.';
        userPrompt = `Based on the following text, please answer this question: ${question}\n\nText:\n${text}`;
        break;
      case 'keywords':
        systemPrompt = 'You are a professional document analyst. Extract the most important keywords and key phrases.';
        userPrompt = `Please extract the most important keywords and key phrases from the following text:\n\n${text}`;
        break;
      default:
        throw new Error('Invalid analysis type');
    }

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
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1500,
        temperature: 0.3
      })
    });

    console.log('PDF API - OpenRouter status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('PDF API - OpenRouter error:', error);
      throw new Error(error.error?.message || `API failed: ${response.status}`);
    }

    const result = await response.json();
    const analysis = result.choices[0]?.message?.content || '';

    console.log('Generated analysis length:', analysis.length);

    res.json({
      analysis,
      type: analysisType,
      creditsUsed: 1,
      remainingCredits: 999,
      model: result.model
    });

  } catch (error) {
    console.error('PDF API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Agent API (Conversational Assistant)
app.post('/api/agent', async (req, res) => {
  console.log('Agent API called with:', req.body);
  
  const { message, context, taskType = 'general' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'API not configured' });
  }

  try {
    const systemPrompt = `You are an intelligent AI assistant specialized in ${taskType} tasks. 
    
Instructions:
- Provide helpful, accurate, and contextual responses
- Be professional yet conversational
- Consider any provided context when formulating responses
- Adapt your communication style to the task type: ${taskType}
- Be concise but comprehensive in your answers`;

    let userPrompt = message;
    if (context) {
      userPrompt = `Context: ${context}\n\nUser message: ${message}`;
    }

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
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    console.log('Agent API - OpenRouter status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error('Agent API - OpenRouter error:', error);
      throw new Error(error.error?.message || `API failed: ${response.status}`);
    }

    const result = await response.json();
    const response_text = result.choices[0]?.message?.content || '';

    console.log('Generated response length:', response_text.length);

    res.json({
      response: response_text,
      taskType,
      creditsUsed: 1,
      remainingCredits: 999,
      model: result.model
    });

  } catch (error) {
    console.error('Agent API error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Simple API Server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`- GET  http://localhost:${PORT}/api/health`);
  console.log(`- GET  http://localhost:${PORT}/api/test-openai`);
  console.log(`- POST http://localhost:${PORT}/api/write`);
  console.log(`- POST http://localhost:${PORT}/api/script`);
  console.log(`- POST http://localhost:${PORT}/api/image`);
  console.log(`- POST http://localhost:${PORT}/api/pdf`);
  console.log(`- POST http://localhost:${PORT}/api/agent`);
  console.log('');
  console.log('🎯 Ready for testing!');
});