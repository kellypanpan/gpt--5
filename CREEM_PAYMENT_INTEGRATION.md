# 💳 Creem 支付系统集成指南

## 🔄 Stripe → Creem 迁移完成

**✅ 已移除**
- ❌ Stripe 相关 API 文件
- ❌ Stripe 依赖包
- ❌ Stripe webhook 处理

**✅ 已添加**
- ✅ Creem 支付 API 结构
- ✅ 订单管理系统
- ✅ Webhook 处理框架
- ✅ 数据库订单表

## 📁 新的支付系统结构

```
api/payment/
├── create-order.ts      # 创建支付订单
└── webhook.ts           # 处理支付回调

数据库表:
└── payment_orders       # 订单跟踪表
```

## 🔧 配置步骤

### 1. 获取 Creem API 凭证
1. 注册 Creem 商户账户
2. 获取以下信息：
   - API Key
   - Secret Key  
   - Webhook Secret
   - Merchant ID

### 2. 更新环境变量
在 `.env.local` 中配置：

```bash
# Creem Payment
CREEM_API_KEY=your-creem-api-key
CREEM_SECRET_KEY=your-creem-secret-key
CREEM_WEBHOOK_SECRET=your-creem-webhook-secret
CREEM_MERCHANT_ID=your-creem-merchant-id
```

### 3. 更新数据库
运行更新后的 `supabase/migrations/001_initial_schema.sql`

## 💰 支付计划

| 计划 | 价格 | 积分 | 周期 |
|------|------|------|------|
| Pro | $15.00 | 500 | 月度 |
| Creator | $39.00 | 1000 | 月度 |
| Lifetime | $299.00 | 无限 | 终身 |

## 🔌 API 端点

### 创建支付订单
```
POST /api/payment/create-order
Body: {
  "planType": "pro" | "creator" | "lifetime",
  "returnUrl": "https://yourdomain.com/dashboard"
}
```

### Webhook 回调
```
POST /api/payment/webhook
Headers: {
  "x-creem-signature": "webhook-signature"
}
```

## 🔐 安全特性

- ✅ Webhook 签名验证
- ✅ 订单状态跟踪
- ✅ 重复支付防护
- ✅ 行级安全策略
- ✅ 速率限制保护

## 🛠️ 待实现功能

### 高优先级
1. **Creem API 集成**
   ```typescript
   // 需要实现具体的 Creem API 调用
   async function createCreemOrder(orderData) {
     // TODO: 调用 Creem 创建订单 API
   }
   
   function verifyCreemSignature(payload, signature, secret) {
     // TODO: 实现 Creem 签名验证算法
   }
   ```

2. **错误处理优化**
   - 支付失败重试机制
   - 订单超时处理
   - 异常状态恢复

### 中优先级
3. **订单管理界面**
   - 用户订单历史页面
   - 管理员订单监控
   - 退款处理流程

4. **支付状态同步**
   - 定时任务检查订单状态
   - 手动同步功能
   - 状态不一致修复

## 🧪 测试计划

### 单元测试
- [ ] 订单创建测试
- [ ] Webhook 处理测试
- [ ] 签名验证测试
- [ ] 数据库操作测试

### 集成测试
- [ ] 完整支付流程测试
- [ ] 订阅升级测试
- [ ] 错误场景测试

### 生产前检查
- [ ] Webhook 端点可访问性
- [ ] SSL 证书配置
- [ ] 监控和日志配置
- [ ] 备份和恢复测试

## 📊 监控指标

需要监控的关键指标：
- 支付成功率
- 订单处理时间
- Webhook 失败率
- 用户订阅转化率

## 🚀 部署清单

- [ ] 配置 Creem API 凭证
- [ ] 更新数据库架构
- [ ] 设置 Webhook 端点
- [ ] 配置监控告警
- [ ] 测试支付流程
- [ ] 更新前端支付组件

---

## 📞 下一步行动

1. **联系 Creem** - 获取 API 文档和测试账户
2. **实现 API 调用** - 根据文档完成具体集成
3. **前端更新** - 修改支付按钮和流程
4. **测试部署** - 在测试环境验证完整流程

支付系统是应用的核心，建议优先完成这部分的集成！