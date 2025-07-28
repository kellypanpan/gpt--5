# GPT-5AI.com API 集成指南

## 🚀 快速开始

### 1. 环境变量配置

创建 `.env.local` 文件并添加以下配置：

```bash
# OpenAI API Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

# Database (Supabase)
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# File Upload (UploadThing)
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 2. 安装依赖

```bash
npm install openai @clerk/nextjs @supabase/supabase-js uploadthing
```

## 📁 API 路由结构

```
src/api/
├── write.ts          # 写作工具 API
├── script.ts         # 剧本生成 API
├── image.ts          # 图像生成 API
├── pdf.ts            # PDF 分析 API
└── agent.ts          # 通用 Agent API
```

## 🔐 认证系统

### 用户认证流程

1. **Clerk 集成**：使用 Clerk 进行用户认证
2. **Credits 检查**：每次 API 调用前检查用户积分
3. **权限验证**：验证用户订阅状态

### 认证中间件

```typescript
// 在每个 API 路由中使用
const user = await authUserAndCheckCredits(req, requiredCredits);
```

## 💰 Credits 系统

### Credits 消耗规则

| 工具 | Credits 消耗 | 说明 |
|------|-------------|------|
| Writer | 1 | 文本生成 |
| Script | 1 | 剧本生成 |
| PDF Analyzer | 2 | PDF 分析 |
| Image Generator | 5 | 图像生成 |
| Agent | 1 | 通用任务 |

### Credits 管理

- 新用户注册获得 10 个免费 Credits
- 付费订阅用户每月获得 1000 Credits
- 积分不足时自动提示升级

## 🔧 API 端点详情

### 1. Writer API (`/api/write`)

**请求参数：**
```typescript
{
  prompt: string;        // 必填：写作提示
  tone?: string;         // 可选：语调 (professional, casual, creative, academic)
  length?: string;       // 可选：长度 (short, medium, long)
  type?: string;         // 可选：类型 (blog, article, copy, social, email)
}
```

**响应：**
```typescript
{
  content: string;           // 生成的内容
  creditsUsed: number;       // 消耗的积分
  remainingCredits: number;  // 剩余积分
}
```

### 2. Script Generator API (`/api/script`)

**请求参数：**
```typescript
{
  scene: string;         // 必填：剧本场景
  style: string;         // 必填：风格 (romance, comedy, thriller, drama, action)
  platform?: string;     // 可选：平台 (tiktok, youtube, instagram)
  duration?: string;     // 可选：时长 (30s, 60s, 90s)
}
```

### 3. Image Generator API (`/api/image`)

**请求参数：**
```typescript
{
  prompt: string;        // 必填：图像描述
  size?: string;         // 可选：尺寸 (512x512, 1024x1024, 1792x1024)
  quality?: string;      // 可选：质量 (standard, hd)
  style?: string;        // 可选：风格 (natural, artistic, cinematic)
}
```

### 4. PDF Analyzer API (`/api/pdf`)

**请求参数：**
```typescript
{
  text: string;          // 必填：PDF 文本内容
  analysisType: string;  // 必填：分析类型 (summary, qa, keywords)
  question?: string;     // 可选：问答分析时的问题
}
```

### 5. Agent API (`/api/agent`)

**请求参数：**
```typescript
{
  message: string;       // 必填：用户消息
  context?: string;      // 可选：上下文
  taskType?: string;     // 可选：任务类型 (writing, analysis, coding, creative)
}
```

## 🎨 前端集成

### 使用自定义 Hooks

```typescript
import { useWriter, useImageGenerator } from '@/hooks/useAPI';

// 在组件中使用
const { data, loading, error, generateContent } = useWriter();

const handleGenerate = async () => {
  try {
    await generateContent({
      prompt: "Write about AI",
      tone: "professional",
      length: "medium",
      type: "blog"
    });
  } catch (error) {
    // 错误处理
  }
};
```

### 错误处理

所有 API 调用都包含完整的错误处理：

- **401**: 未认证
- **402**: 积分不足
- **403**: 订阅要求
- **400**: 请求参数错误
- **500**: 服务器错误

## 📊 数据库设计

### 用户表 (users)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  credits INTEGER DEFAULT 10,
  is_subscribed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 生成日志表 (generation_logs)

```sql
CREATE TABLE generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  tool VARCHAR(50) NOT NULL,
  credits_used INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  result TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'success',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔄 部署流程

### 1. 生产环境配置

```bash
# 设置生产环境变量
NODE_ENV=production
OPENAI_API_KEY=your-production-openai-key
```

### 2. 数据库迁移

```bash
# 运行数据库迁移
npx supabase db push
```

### 3. 部署到 Vercel

```bash
# 部署到 Vercel
vercel --prod
```

## 🛡️ 安全考虑

### API 安全

1. **速率限制**：每个用户每分钟最多 10 次 API 调用
2. **输入验证**：所有用户输入都经过验证和清理
3. **内容过滤**：防止不当内容生成
4. **错误处理**：不暴露敏感信息

### 数据保护

1. **加密存储**：敏感数据加密存储
2. **访问控制**：基于角色的访问控制
3. **审计日志**：记录所有 API 调用
4. **数据备份**：定期备份用户数据

## 📈 监控和分析

### 关键指标

- API 调用成功率
- 平均响应时间
- Credits 消耗统计
- 用户活跃度
- 错误率监控

### 日志记录

```typescript
// 记录 API 调用日志
await AuthService.logGeneration({
  userId: user.id,
  tool: 'writer',
  creditsUsed: 1,
  prompt: userPrompt,
  result: generatedContent,
  status: 'success'
});
```

## 🔮 未来扩展

### 计划功能

1. **语音生成**：集成 OpenAI TTS
2. **代码生成**：专门的代码生成工具
3. **多语言支持**：支持多种语言
4. **团队协作**：团队共享 Credits
5. **API 市场**：第三方 API 集成

### 技术升级

1. **向量数据库**：用于 RAG 功能
2. **流式响应**：实时生成内容
3. **缓存系统**：提高响应速度
4. **负载均衡**：处理高并发

---

**注意**：在生产环境中，请确保所有 API 密钥和敏感信息都正确配置，并启用适当的安全措施。 