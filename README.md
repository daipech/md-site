# MD-Site

一个基于 SvelteKit 的极简 Markdown 静态站点生成器。

## 预览

<table>
  <tr>
    <td width="50%">
      <b>亮色模式</b><br/>
      <img src="doc/website_white.PNG" alt="网站亮色模式" />
    </td>
    <td width="50%">
      <b>暗色模式</b><br/>
      <img src="doc/website_dark.PNG" alt="网站暗色模式" />
    </td>
  </tr>
</table>

## 特性

- 🎨 **现代化设计** - 使用 Tailwind CSS 构建
- 🌓 **暗色主题支持** - 自动适配亮色和暗色模式
- 📝 **Markdown 渲染** - 支持 Markdown、代码高亮和 Mermaid 图表
- 🧩 **组件化** - 可复用的 Card 和 Button 组件
- ⚡ **快速构建** - 基于 Vite 的超快构建速度
- 🎯 **动态路由** - 支持动态加载 Markdown 文件

## 技术栈

- [SvelteKit](https://kit.svelte.dev/) - Web 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Vite](https://vitejs.dev/) - 构建工具

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 配置

站点配置集中在 `src/lib/config.js` 文件中：

```javascript
export const siteConfig = {
	// 站点名称
	name: 'Markdown 静态站',
	
	// 站点描述
	description: '极简风格的 Markdown 静态站点',
	
	// 站点标题分隔符
	titleSeparator: ' - '
};
```

### 配置说明

- **name**: 站点名称，显示在页面标题和导航栏中
- **description**: 站点描述，用于首页的 meta 描述标签
- **titleSeparator**: 页面标题分隔符，用于拼接页面标题，例如 "Sample - Markdown 静态站"

### 使用配置

在组件中导入并使用配置：

```javascript
import { siteConfig, getPageTitle } from '$lib/config.js';

// 直接使用站点名称
const siteName = siteConfig.name;

// 生成页面标题
const title = getPageTitle('页面名称'); // 结果: "页面名称 - Markdown 静态站"
```

## 目录结构

```
md-site/
├── src/
│   ├── lib/
│   │   ├── components/      # 组件目录
│   │   │   ├── Button.svelte
│   │   │   ├── Card.svelte
│   │   │   └── MarkdownRenderer.svelte
│   │   ├── content/         # Markdown 内容 (编译时导入)
│   │   │   └── sample.md
│   │   └── config.js        # 站点配置文件
│   ├── routes/              # 路由目录
│   │   ├── blog/
│   │   │   └── [md_name]/   # 动态路由
│   │   ├── sample/          # 示例页面
│   │   ├── +layout.svelte
│   │   └── +page.svelte
│   ├── app.css
│   └── app.html
└── static/
    ├── content/             # 静态 Markdown 文件 (运行时加载)
    │   ├── index.md
    │   └── sample.md
    └── favicon.svg
```

## 组件

### Card 组件

带有圆角细边框的卡片组件，支持可配置的标题栏和底栏。

```svelte
<Card title="标题" footer="底栏文本">
  <p>卡片内容</p>
</Card>
```

### Button 组件

圆角按钮组件，支持多种样式和图标。

```svelte
<Button variant="primary">点击我</Button>
```

## 许可证

MIT
