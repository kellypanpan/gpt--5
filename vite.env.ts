// Vite 环境变量配置
export const viteEnv = {
  VITE_CLERK_PUBLISHABLE_KEY: 'pk_live_Y2xlcmsuZ3B0LTUuY29tJA',
  VITE_CLERK_SECRET_KEY: 'sk_live_DR21PhOpwbArxoUJyxckCLlCHQEXZCwFP8GfaQNBDD',
  VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || 'your_openai_api_key_here',
}; 