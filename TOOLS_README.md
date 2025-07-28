# GPT-5AI.com 工具页面

本项目包含了为 GPT-5AI.com 定制的5个工具页面，使用 React + TailwindCSS + shadcn/ui 构建。

## 🚀 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 访问工具页面：
- 主页：http://localhost:5173/
- 工具测试页：http://localhost:5173/tools

## 📁 工具页面列表

### 1. GPT-5 Writer (`/tools/writer`)
**AI博客和文案写作工具**

功能特性：
- ✍️ 智能写作提示输入
- 🎯 一键生成高质量内容
- 📋 复制和导出功能
- 🔒 登录状态检测和付费解锁
- 📱 响应式设计

### 2. PDF Analyzer (`/tools/pdf`)
**AI驱动的PDF分析工具**

功能特性：
- 📄 PDF文件上传（10MB限制）
- 🔍 智能分析（摘要、问答、关键词）
- 📊 三种视图模式切换
- 💳 积分系统显示
- ⏳ 加载动画和进度条

### 3. Script Generator (`/tools/script`)
**TikTok/YouTube视频剧本生成器**

功能特性：
- 🎬 剧本场景输入
- 🎭 多种风格选择（爱情、搞笑、悬疑等）
- 📝 分场景输出格式
- 📱 平台兼容性显示
- 💾 导出为文本文件

### 4. Image Generator (`/tools/image`)
**AI文本生成图像工具**

功能特性：
- 🎨 文本提示输入
- 📐 多种尺寸选择
- 🖼️ 多图生成展示
- 💰 积分消耗提示
- 📥 图片下载功能

### 5. Prompt Lab (`/tools/prompts`)
**AI提示词商城**

功能特性：
- 🔍 搜索和分类筛选
- 💎 提示词卡片展示
- ❤️ 点赞和收藏功能
- 🔒 免费浏览，付费使用
- 📤 用户上传入口

## 🛠️ 技术栈

- **前端框架**: React 18
- **样式**: TailwindCSS
- **UI组件**: shadcn/ui
- **路由**: React Router DOM
- **图标**: Lucide React
- **构建工具**: Vite
- **语言**: TypeScript

## 🎨 设计特色

### 统一的设计语言
- 渐变背景和现代化UI
- 一致的色彩方案和间距
- 响应式布局设计
- 流畅的动画效果

### 用户体验
- 直观的操作流程
- 清晰的状态反馈
- 友好的错误提示
- 加载状态指示

### 付费功能集成
- 登录状态检测
- 功能锁定机制
- 升级提示和CTA
- 积分系统显示

## 📱 响应式设计

所有工具页面都支持：
- 📱 移动端适配
- 💻 桌面端优化
- 🖥️ 平板端兼容
- 🎯 触摸友好交互

## 🔧 自定义配置

### 修改主题色彩
在 `tailwind.config.ts` 中修改 CSS 变量：
```typescript
colors: {
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... 其他颜色
}
```

### 添加新工具页面
1. 在 `src/pages/tools/` 创建新组件
2. 在 `src/App.tsx` 添加路由
3. 更新导航和链接

## 🚀 部署

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 📝 开发注意事项

1. **TypeScript错误**: 项目可能存在一些TypeScript配置问题，但不影响功能运行
2. **组件导入**: 使用相对路径导入组件
3. **状态管理**: 使用React hooks进行状态管理
4. **API集成**: 目前使用模拟数据，需要替换为真实API调用

## 🎯 下一步计划

- [ ] 集成真实API端点
- [ ] 添加用户认证系统
- [ ] 实现数据库连接
- [ ] 添加更多工具页面
- [ ] 优化性能和加载速度
- [ ] 添加单元测试

## 📞 支持

如有问题或建议，请通过以下方式联系：
- 项目Issues
- 技术支持邮箱
- 开发团队Slack

---

**注意**: 这些工具页面目前使用模拟数据，在实际部署前需要集成真实的API和数据库。 