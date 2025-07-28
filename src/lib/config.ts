// 环境变量配置
export const config = {
  // Clerk认证配置
  clerk: {
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_your-publishable-key',
  },
  
  // OpenAI配置
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    enabled: import.meta.env.VITE_OPENAI_ENABLED === 'true',
  },
  
  // Supabase配置 (可选)
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  
  // 应用配置
  app: {
    url: import.meta.env.VITE_APP_URL || 'http://localhost:8080',
    environment: import.meta.env.MODE || 'development',
  },
  
  // 检查必需的环境变量
  validate() {
    const missing = [];
    
    if (!this.clerk.publishableKey || this.clerk.publishableKey === 'pk_test_your-publishable-key') {
      missing.push('VITE_CLERK_PUBLISHABLE_KEY');
    }
    
    if (!this.openai.apiKey) {
      missing.push('VITE_OPENAI_API_KEY');
    }
    
    if (missing.length > 0) {
      console.warn('Missing environment variables:', missing.join(', '));
      console.warn('Please check ENVIRONMENT_SETUP.md for setup instructions');
    }
    
    return missing.length === 0;
  }
};

// 导出默认配置
export default config; 