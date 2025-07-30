# ☁️ Cloudflare 部署指南

## 🚀 为什么选择 Cloudflare？

- **全球CDN** - 更快的加载速度
- **Workers** - 无服务器函数支持
- **免费额度** - 慷慨的免费使用限制
- **边缘计算** - 更低的延迟
- **安全性** - 内置DDoS防护

## 📋 部署步骤

### 1. 准备项目结构

当前项目需要重构为 Cloudflare Pages + Workers 架构：

```
├── 前端 (Cloudflare Pages)
│   ├── dist/ (构建后的静态文件)
│   └── src/ (React应用)
└── API (Cloudflare Workers)
    ├── functions/ (Pages Functions)
    └── api/ (当前的API文件)
```

### 2. 创建 Cloudflare Pages Functions

Cloudflare Pages 支持 `functions/` 目录下的文件作为无服务器函数：

```bash
# 创建functions目录结构
mkdir -p functions/api
```

### 3. 配置部署

#### 方法一：通过 Wrangler CLI

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 创建 Pages 项目
wrangler pages project create execu-ai-hub

# 部署
wrangler pages deploy dist
```

#### 方法二：通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 选择 **Pages** → **Create a project**
3. 连接 GitHub 仓库
4. 配置构建设置：
   - **构建命令**: `npm run build`
   - **构建输出目录**: `dist`
   - **Root目录**: `/`

### 4. 环境变量配置

在 Cloudflare Pages 设置中添加环境变量：

```bash
# 必需的环境变量
CLERK_SECRET_KEY=你的clerk密钥
OPENAI_API_KEY=你的openai密钥
SUPABASE_URL=你的supabase链接
SUPABASE_ANON_KEY=你的supabase密钥
SUPABASE_SERVICE_ROLE_KEY=你的supabase服务密钥
CLOUDINARY_CLOUD_NAME=你的cloudinary名称
CLOUDINARY_API_KEY=你的cloudinary密钥
CLOUDINARY_API_SECRET=你的cloudinary密钥
```

### 5. API 函数迁移

需要将 `api/` 目录下的文件重构为 Cloudflare Pages Functions 格式：

**原文件**: `api/write.ts`
**新位置**: `functions/api/write.ts`

**函数格式调整**:
```typescript
// Cloudflare Pages Function 格式
export async function onRequestPost(context: {
  request: Request;
  env: Env;
  params: Params;
  waitUntil: (promise: Promise<any>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, unknown>;
}) {
  // 你的API逻辑
}
```

## 🛠️ 项目重构方案

### 选项1：完整迁移到 Cloudflare

让我帮你重构项目结构：

1. **前端保持不变** - Vite + React
2. **API重构为 Pages Functions**
3. **配置 wrangler.toml**

### 选项2：混合部署

- **前端** - Cloudflare Pages
- **API** - Cloudflare Workers (单独部署)

## 🎯 推荐配置

### wrangler.toml 配置文件

```toml
name = "execu-ai-hub"
compatibility_date = "2024-01-01"

[env.production]
account_id = "你的账户ID"

[[env.production.bindings]]
name = "DB"
type = "d1"
database_name = "execu-ai-hub-db"
database_id = "你的数据库ID"

[build]
command = "npm run build"
cwd = "."
watch_dir = "src"

[build.upload]
format = "modules"
dir = "dist"
main = "./functions/_middleware.ts"
```

## 💰 费用估算

**Cloudflare Pages (免费版)**:
- 500 构建/月
- 100GB 带宽/月
- 无限请求

**Cloudflare Workers (免费版)**:
- 100,000 请求/天
- 10ms CPU 时间/请求

**对于你的项目完全足够免费使用！**

## 🔧 本地开发

```bash
# 安装依赖
npm install wrangler --save-dev

# 本地开发（包含Functions）
wrangler pages dev dist --compatibility-date 2024-01-01

# 或使用 Vite + 代理
npm run dev
```

## 📝 部署检查清单

- [ ] 项目构建成功
- [ ] 环境变量配置完成
- [ ] API函数格式调整
- [ ] 数据库连接测试
- [ ] 域名DNS配置
- [ ] SSL证书验证

## 🚨 注意事项

1. **冷启动** - Workers 首次调用可能有延迟
2. **执行时间** - 免费版有10ms CPU限制
3. **包大小** - Workers 有1MB限制
4. **并发** - 免费版有1000并发限制

---

## 🎉 立即开始

想要立即部署到 Cloudflare？我可以帮你：

1. **重构API文件** 为 Pages Functions 格式
2. **创建 wrangler.toml** 配置文件  
3. **设置部署脚本**
4. **配置环境变量**

Cloudflare 是个优秀的选择，特别适合全球用户访问！