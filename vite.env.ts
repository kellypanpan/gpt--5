// Vite 环境变量配置 - 仅用于开发环境示例
export const viteEnv = {
  // 使用环境变量，不要硬编码真实密钥
  VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here',
  VITE_CLERK_SECRET_KEY: import.meta.env.VITE_CLERK_SECRET_KEY || 'sk_test_your_secret_key_here',
  VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || 'sk-your_openai_api_key_here',
}; 