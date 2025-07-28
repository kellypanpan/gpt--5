# 环境变量设置指南

## 🔧 必需的环境变量

在项目根目录创建 `.env.local` 文件，并添加以下配置：

```bash
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key-here

# OpenAI API Configuration
VITE_OPENAI_API_KEY=your-openai-api-key-here

# Supabase Configuration (可选)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# App Configuration
VITE_APP_URL=http://localhost:8080
NODE_ENV=development
```

## 📋 获取API密钥

### 1. Clerk认证密钥
1. 访问 [Clerk Dashboard](https://dashboard.clerk.com/)
2. 创建新应用或选择现有应用
3. 在 "API Keys" 部分复制 `Publishable Key`
4. 格式: `pk_test_...` 或 `pk_live_...`

### 2. OpenAI API密钥
1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 登录您的账户
3. 点击 "Create new secret key"
4. 复制生成的密钥

### 3. Supabase配置 (可选)
1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 创建新项目或选择现有项目
3. 在 "Settings" > "API" 中获取:
   - Project URL
   - anon/public key

## 🚀 启动项目

设置完环境变量后，运行以下命令：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🔒 安全注意事项

1. **永远不要提交 `.env.local` 文件到版本控制**
2. **在生产环境中使用强密钥**
3. **定期轮换API密钥**
4. **限制API密钥的权限范围**

## 📝 环境变量说明

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk认证公钥 | ✅ |
| `VITE_OPENAI_API_KEY` | OpenAI API密钥 | ✅ |
| `VITE_SUPABASE_URL` | Supabase项目URL | ❌ |
| `VITE_SUPABASE_ANON_KEY` | Supabase匿名密钥 | ❌ |
| `VITE_APP_URL` | 应用URL | ❌ |
| `NODE_ENV` | 环境模式 | ❌ |

## 🛠️ 故障排除

### 常见问题

1. **Clerk密钥无效**
   - 检查密钥格式是否正确
   - 确认密钥是否已激活

2. **OpenAI API错误**
   - 检查API密钥是否正确
   - 确认账户余额充足
   - 检查API使用限制

3. **环境变量未加载**
   - 确认文件名是 `.env.local`
   - 重启开发服务器
   - 检查变量名是否以 `VITE_` 开头 