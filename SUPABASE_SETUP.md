# 🗄️ Supabase 数据库配置指南

## 快速配置步骤

### 1. 创建Supabase项目
1. 访问 https://supabase.com 并登录
2. 点击 "New Project"
3. 选择组织，输入项目名称：`execu-ai-hub`
4. 选择数据库密码（请妥善保存）
5. 选择区域（建议选择离用户最近的区域）
6. 点击 "Create new project"

### 2. 运行数据库迁移
项目创建完成后：

1. 进入项目仪表板
2. 点击左侧菜单的 "SQL Editor"
3. 点击 "New query"
4. 将 `supabase/migrations/001_initial_schema.sql` 文件的全部内容复制粘贴到查询框
5. 点击 "Run" 执行迁移

### 3. 获取连接信息
在项目仪表板中：

1. 点击左侧菜单的 "Settings" → "API"
2. 复制以下信息到 `.env.local`：
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** → `SUPABASE_ANON_KEY`  
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 4. 更新环境变量
编辑 `.env.local` 文件：

```bash
# Supabase Database
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## 📊 数据库结构说明

### 核心表结构
- **users** - 用户信息和积分管理
- **generation_logs** - AI生成记录
- **conversations** - 对话历史
- **prompts** - 提示词商城
- **prompt_purchases** - 购买记录
- **prompt_likes** - 点赞记录

### 重要功能
- ✅ 行级安全策略 (RLS)
- ✅ 自动更新时间戳
- ✅ 积分系统函数
- ✅ 购买和点赞功能
- ✅ 用户统计函数
- ✅ 性能优化索引

### 积分系统
- 新用户默认 10 积分
- 支持订阅类型：pro, creator, lifetime
- 自动积分扣除和恢复

## 🔒 安全配置

### RLS 策略
- 用户只能访问自己的数据
- 公开访问已批准的提示词
- 防止数据泄露和未授权访问

### 数据验证
- 积分不能为负数
- 价格必须 ≥ 0
- 防止重复购买和点赞
- 状态值限制检查

## 🧪 测试数据库连接

创建测试文件 `test-db.js`：

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// 测试连接
async function testConnection() {
  const { data, error } = await supabase
    .from('users')
    .select('count(*)')
    .single()
  
  if (error) {
    console.error('❌ 数据库连接失败:', error)
  } else {
    console.log('✅ 数据库连接成功!', data)
  }
}

testConnection()
```

运行测试：
```bash
node test-db.js
```

## 🚀 生产环境配置

### 性能优化
- 启用连接池
- 配置适当的连接限制
- 监控查询性能

### 备份策略
- 启用自动备份
- 设置备份保留期
- 定期测试恢复流程

### 监控和告警
- 设置数据库性能监控
- 配置异常告警
- 监控存储使用量

---

## ⚡ 下一步

数据库配置完成后：
1. 测试数据库连接
2. 配置 Clerk 认证集成
3. 设置 Cloudinary 文件存储
4. 移除 Stripe，集成 creem 支付

完成配置后，你的应用将拥有完整的数据持久化能力！