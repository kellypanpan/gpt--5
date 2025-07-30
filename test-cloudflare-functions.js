// 本地测试 Cloudflare Functions
import fs from 'fs';
import path from 'path';

// 加载环境变量
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...values] = line.split('=');
      if (key && values.length > 0) {
        envVars[key.trim()] = values.join('=').trim();
      }
    }
  });
  
  // 设置环境变量
  Object.assign(process.env, envVars);
}

// 模拟 Cloudflare Pages Function 环境
async function testOpenAIFunction() {
  console.log('🧪 Testing OpenAI API function...');
  
  // 动态导入函数
  const { onRequestGet } = await import('./functions/api/test-openai.ts');
  
  const mockContext = {
    request: new Request('http://localhost:8080/api/test-openai'),
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY
    }
  };
  
  try {
    const response = await onRequestGet(mockContext);
    const result = await response.json();
    
    console.log('✅ OpenAI API Test Result:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('🎉 OpenAI API connection successful!');
    } else {
      console.log('❌ OpenAI API test failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Function test failed:', error.message);
  }
}

async function testWriterFunction() {
  console.log('\n📝 Testing Writer API function...');
  
  const { onRequestPost } = await import('./functions/api/write.ts');
  
  const mockRequest = new Request('http://localhost:8080/api/write', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: '写一篇关于人工智能的简短文章',
      tone: 'professional',
      length: 'short',
      type: 'article'
    })
  });
  
  const mockContext = {
    request: mockRequest,
    env: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  };
  
  try {
    const response = await onRequestPost(mockContext);
    const result = await response.json();
    
    console.log('✅ Writer API Test Result:');
    console.log('Status:', response.status);
    
    if (response.ok) {
      console.log('Generated content length:', result.content?.length || 0);
      console.log('Credits used:', result.creditsUsed);
      console.log('🎉 Writer API working successfully!');
    } else {
      console.log('❌ Writer API failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Writer function test failed:', error.message);
  }
}

// 运行测试
async function runTests() {
  console.log('🚀 Starting Cloudflare Functions Tests\n');
  
  await testOpenAIFunction();
  await testWriterFunction();
  
  console.log('\n✨ Tests completed!');
}

runTests().catch(console.error);