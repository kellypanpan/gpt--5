import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple route handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const path = req.url?.split('?')[0] || '';
    console.log(`API Request: ${req.method} ${path}`);

    // Route based on URL path
    if (path === '/api/health' || path === '/api/') {
      return handleHealth(req, res);
    }

    if (path === '/api/test-openai') {
      return handleTestOpenAI(req, res);
    }

    if (path === '/api/write') {
      return handleWrite(req, res);
    }

    if (path === '/api/agent') {
      return handleAgent(req, res);
    }

    if (path === '/api/image') {
      return handleImage(req, res);
    }

    if (path === '/api/script') {
      return handleScript(req, res);
    }

    // Default 404
    return res.status(404).json({ 
      error: 'Endpoint not found',
      path,
      method: req.method 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Health check handler
async function handleHealth(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    apiProvider: 'OpenRouter',
    apiConfigured: !!process.env.OPENAI_API_KEY
  });
}

// Test OpenAI handler
async function handleTestOpenAI(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const API_KEY = process.env.OPENAI_API_KEY;
    const OPENROUTER_BASE_URL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';

    if (!API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'OpenRouter API key not configured',
        error: 'Missing API key'
      });
    }

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers.referer || 'https://your-app.vercel.app',
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
    
    return res.json({
      success: true,
      message: 'OpenRouter API connection successful',
      data: {
        model: data.model,
        response: data.choices[0]?.message?.content,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    let errorMessage = 'Unknown error occurred';
    if (error.message?.includes('quota') || error.message?.includes('credit')) {
      errorMessage = 'API quota/credit insufficient';
    } else if (error.message?.includes('API key') || error.message?.includes('401')) {
      errorMessage = 'Invalid API key';
    } else if (error.message?.includes('rate')) {
      errorMessage = 'Rate limit exceeded';
    }

    return res.status(500).json({
      success: false,
      message: 'OpenRouter API test failed',
      error: errorMessage,
      details: error.message
    });
  }
}

// Write handler
async function handleWrite(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, tone = 'professional', length = 'medium', type = 'article' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const API_KEY = process.env.OPENAI_API_KEY;
    const OPENROUTER_BASE_URL = process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1';

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

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers.referer || 'https://your-app.vercel.app',
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

    if (!response.ok) {
      throw new Error(result.error?.message || `API call failed: ${response.status}`);
    }

    const content = result.choices[0]?.message?.content || '';

    if (!content) {
      throw new Error('No content generated');
    }

    return res.json({
      content,
      creditsUsed: 1,
      remainingCredits: 999,
      model: result.model
    });

  } catch (error: any) {
    if (error.message?.includes('quota') || error.message?.includes('credit')) {
      return res.status(402).json({ error: 'API quota/credit insufficient' });
    }
    
    if (error.message?.includes('rate')) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    return res.status(500).json({ error: 'Failed to generate content: ' + error.message });
  }
}

// Basic handlers for other endpoints
async function handleAgent(req: VercelRequest, res: VercelResponse) {
  return res.status(501).json({ error: 'Agent endpoint not implemented yet' });
}

async function handleImage(req: VercelRequest, res: VercelResponse) {
  return res.status(501).json({ error: 'Image endpoint not implemented yet' });
}

async function handleScript(req: VercelRequest, res: VercelResponse) {
  return res.status(501).json({ error: 'Script endpoint not implemented yet' });
}