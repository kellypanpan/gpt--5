# GPT-5AI.com 后端部署指南

## 🚀 快速部署

### 1. 环境准备

#### 必需的第三方服务
- **Supabase** - PostgreSQL 数据库
- **Clerk** - 用户认证
- **OpenAI** - AI API 服务
- **Stripe** - 支付处理
- **Cloudinary** - 文件上传存储

#### 开发环境
```bash
# Node.js 18+ 
node --version

# 安装依赖
npm install

# 安装额外的后端依赖
npm install @clerk/nextjs @supabase/supabase-js stripe cloudinary winston lru-cache multer pdfjs-dist next-connect
```

### 2. 数据库设置

#### Supabase 配置
1. 创建 Supabase 项目：https://supabase.com
2. 运行数据库迁移：
```bash
# 将 supabase/migrations/001_initial_schema.sql 复制到 Supabase SQL 编辑器中执行
```

3. 设置 RLS 策略和函数已在迁移文件中包含

### 3. 认证服务设置

#### Clerk 配置
1. 创建 Clerk 应用：https://clerk.com
2. 配置认证方式（邮箱、Google、GitHub等）
3. 设置 Webhooks：
   - 端点：`https://yourdomain.com/api/webhooks/clerk`
   - 事件：user.created, user.updated, user.deleted

### 4. 支付系统设置

#### Stripe 配置
1. 创建 Stripe 账户：https://stripe.com
2. 创建产品和价格：
   ```bash
   # Pro Plan - $15/月
   # Creator Plan - $39/月  
   # Lifetime Plan - $299一次性
   ```
3. 设置 Webhook：
   - 端点：`https://yourdomain.com/api/subscription/webhook`
   - 事件：checkout.session.completed, customer.subscription.*, invoice.payment.*

### 5. 文件上传设置

#### Cloudinary 配置
1. 创建 Cloudinary 账户：https://cloudinary.com
2. 获取 API 密钥
3. 配置上传预设和变换

### 6. 环境变量配置

```bash
# 复制环境变量模板
cp .env.example .env.local

# 填写所有必需的环境变量
```

### 7. 部署到 Vercel

#### 自动部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod

# 设置环境变量
vercel env add OPENAI_API_KEY
vercel env add SUPABASE_URL
# ... 添加所有环境变量
```

#### 手动部署
1. 连接 GitHub 仓库到 Vercel
2. 配置构建设置：
   - 框架：Next.js
   - 构建命令：`npm run build`
   - 输出目录：`.next`
3. 添加所有环境变量

## 🔧 配置详解

### API 路由结构
```
api/
├── write.ts              # 文本生成
├── script.ts             # 剧本生成
├── image.ts              # 图像生成
├── pdf.ts                # PDF分析
├── agent.ts              # AI对话
├── health.ts             # 健康检查
├── user/
│   └── dashboard.ts      # 用户仪表板
├── subscription/
│   ├── create-checkout.ts # 创建支付
│   └── webhook.ts        # 支付回调
└── prompts/
    ├── index.ts          # 提示词列表
    ├── create.ts         # 创建提示词
    └── [id]/purchase.ts  # 购买提示词
```

### 数据库结构
- `users` - 用户信息和积分
- `generation_logs` - 生成记录
- `conversations` - 对话历史
- `prompts` - 提示词商城
- `prompt_purchases` - 购买记录
- `prompt_likes` - 点赞记录

### 积分系统
- 新用户：10个免费积分
- Pro用户：每月500积分
- Creator用户：每月1000积分
- Lifetime用户：无限制

### 工具积分消耗
- Writer：1积分
- Script：2积分
- PDF分析：3-5积分（根据文档大小）
- 图像生成：5-8积分（根据质量）
- Agent对话：1积分

## 🔒 安全配置

### 内容安全
- OpenAI 内容审核
- 文件类型验证
- 文件大小限制（10MB）
- SQL注入防护
- XSS防护

### 速率限制
- 文本生成：10次/分钟
- 图像生成：5次/分钟
- PDF分析：6次/分钟
- Agent对话：15次/分钟

### 数据保护
- 行级安全策略（RLS）
- 数据加密传输
- 敏感信息脱敏
- 定期数据备份

## 📊 监控和日志

### 日志系统
- Winston 结构化日志
- 错误追踪和报告
- 性能监控
- 用户行为分析

### 健康检查
- 数据库连接状态
- OpenAI API 可用性
- 文件上传服务状态
- 系统资源监控

### 指标监控
```bash
# 访问健康检查端点
curl https://yourdomain.com/api/health
```

## 🚀 性能优化

### 缓存策略
- API 响应缓存
- 图像 CDN 缓存
- 数据库查询优化

### 负载均衡
- Vercel 自动扩展
- 数据库连接池
- CDN 静态资源分发

### 监控告警
- 错误率监控
- 响应时间监控
- 资源使用监控

## 🔄 CI/CD 流程

### 自动化部署
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 数据库迁移
```bash
# 运行新的迁移
supabase db push

# 回滚迁移（如需要）
supabase db reset
```

## 🐛 故障排除

### 常见问题

1. **OpenAI API 限制**
   - 检查 API 配额
   - 实现指数退避重试
   - 监控 API 使用率

2. **数据库连接**
   - 检查连接池配置
   - 验证环境变量
   - 监控连接数

3. **支付回调失败**
   - 验证 Webhook 签名
   - 检查端点可访问性
   - 查看 Stripe 日志

4. **文件上传问题**
   - 检查 Cloudinary 配置
   - 验证文件大小限制
   - 确认 CORS 设置

### 调试工具
```bash
# 查看日志
tail -f logs/combined.log

# 测试 API 端点
curl -X POST https://yourdomain.com/api/health

# 数据库查询
psql $DATABASE_URL -c "SELECT COUNT(*) FROM users;"
```

## 📈 扩展计划

### 即将推出的功能
- 语音生成（OpenAI TTS）
- 代码生成工具
- 多语言支持
- 团队协作功能
- API 市场

### 技术升级
- 实时流式响应
- 向量数据库集成
- Redis 缓存层
- 微服务架构

---

## 📞 技术支持

- **文档**：查看 API_INTEGRATION.md
- **问题反馈**：GitHub Issues
- **技术咨询**：team@gpt5ai.com

部署完成后，请访问 `/api/health` 检查所有服务状态。