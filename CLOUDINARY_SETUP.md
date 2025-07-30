# ☁️ Cloudinary 文件存储配置指南

## 快速配置步骤

### 1. 创建Cloudinary账户
1. 访问 https://cloudinary.com 并注册
2. 登录后进入 Dashboard
3. 获取以下配置信息：
   - **Cloud Name** 
   - **API Key**
   - **API Secret**

### 2. 更新环境变量
在 `.env.local` 中配置：

```bash
# Cloudinary for File Uploads
CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key  
CLOUDINARY_API_SECRET=your-actual-api-secret
```

### 3. 配置上传预设
在Cloudinary控制台中：

1. 进入 **Settings** → **Upload**
2. 创建上传预设：
   - 预设名：`ai-hub-uploads`
   - 模式：`Unsigned`
   - 文件夹：`ai-hub/`
   - 格式限制：`jpg,jpeg,png,webp,pdf`
   - 大小限制：`10MB`

### 4. 安全配置
1. **域名限制**：添加你的域名到允许列表
2. **上传限制**：设置文件类型和大小限制
3. **访问控制**：配置适当的访问策略

## 📁 支持的文件类型

| 类型 | 格式 | 最大大小 | 用途 |
|------|------|----------|------|
| 图片 | JPG, PNG, WebP | 10MB | 图像生成、头像 |
| 文档 | PDF | 10MB | PDF分析功能 |

## 🔧 使用示例

### 前端上传
```javascript
// 使用 Cloudinary Upload Widget
const uploadWidget = cloudinary.createUploadWidget(
  {
    cloudName: 'your-cloud-name',
    uploadPreset: 'ai-hub-uploads',
    folder: 'ai-hub/user-uploads'
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log('Upload successful:', result.info.secure_url);
    }
  }
);
```

### 后端处理
```typescript
// 在 API 中使用
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

## 🎨 图片优化

Cloudinary 提供强大的图片优化功能：

```javascript
// 自动优化
const optimizedUrl = cloudinary.url('sample.jpg', {
  quality: 'auto',
  fetch_format: 'auto',
  width: 300,
  height: 200,
  crop: 'fill'
});
```

## 🔒 安全最佳实践

1. **签名上传**：生产环境使用签名上传
2. **上传验证**：验证文件类型和内容
3. **访问控制**：限制API密钥权限
4. **监控使用量**：设置使用量告警

## 📊 监控和分析

### 使用量监控
- 存储空间使用
- 带宽消耗
- API 调用次数
- 转换操作统计

### 性能优化
- CDN 加速分发
- 自动格式选择
- 响应式图片
- 懒加载支持

## 🚀 生产环境配置

### 1. CDN 设置
配置自定义域名和 CDN：
```bash
# 自定义域名配置
CLOUDINARY_SECURE_DISTRIBUTION=your-cdn-domain.com
```

### 2. 备份策略
- 启用自动备份
- 设置版本控制
- 定期导出资源清单

### 3. 成本优化
- 配置存储层级
- 设置自动删除规则
- 监控成本使用

---

## ✅ 配置检查清单

- [ ] 创建Cloudinary账户
- [ ] 获取API凭证
- [ ] 更新环境变量
- [ ] 创建上传预设
- [ ] 配置安全策略
- [ ] 测试文件上传
- [ ] 设置监控告警

完成配置后，你的应用将支持高效的文件存储和处理！