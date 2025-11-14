
[中文](#中文) | [English](#english)

<div id="中文">

# AI UI提示词生成器

> 一款专业的AI UI提示词生成器，采用Apple设计美学，帮助您快速构建高质量、结构化的UI/UX设计需求，并与AI设计助手实时协作。

**[🚀 在 AI Studio 中打开应用](https://aistudio.google.com/apps/drive/1DcUID_kYoOnAPM7kOEAtBntRPZeB6Nvf)**

---

## 📦 项目结构

```
.
├── index.html              # 主页面文件
├── css/
│   └── style.css           # 样式文件
├── js/
│   ├── main.js             # 主要JavaScript逻辑 (已重构)
│   └── componentData.js    # 组件数据
├── services/
│   └── geminiService.ts    # Gemini API 服务
├── index.tsx               # React 应用入口
└── README.md               # 项目说明
```

---

## ✨ 功能特性

### 核心功能
- ✅ **3步生成提示词**: 选择目的 → 定义风格 → 配置组件
- ✅ **丰富的组件库**: 18个类别，超过100个精选组件
- ✅ **智能搜索**: 快速查找所需组件
- ✅ **实时预览**: 设计选择即时可视化
- ✅ **多格式输出**: 支持 Markdown、纯文本和 JSON 格式

### AI 集成
- ✅ **Gemini API 支持**: 集成强大的 Gemini 模型
- ✅ **实时AI对话**: 与AI设计助手进行上下文感知对话
- ✅ **上下文感知**: AI助手了解您当前的设计选择
- ✅ **对话历史**: 本地保存聊天记录，方便回顾

### 设计
- ✅ **Apple 设计语言**: 简洁、优雅、用户友好的界面
- ✅ **响应式布局**:完美适配桌面、平板和移动设备
- ✅ **毛玻璃效果**: 现代化的半透明界面元素
- ✅ **流畅动画**: 提供无缝、愉悦的用户体验

---

## 🚀 快速开始

### 1. 打开应用
- **在线使用**: 直接点击 [**AI Studio 链接**](https://aistudio.google.com/apps/drive/1DcUID_kYoOnAPM7kOEAtBntRPZeB6Nvf)
- **本地打开**: 在浏览器中打开 `index.html` 文件。

### 2. 使用步骤
1.  **选择设计目的**: 从8个预设场景（如仪表盘、电商）中选择。
2.  **定义视觉风格**: 从6种主流风格（如 Modern Apple, Material V3）中选择，并自定义主色调。
3.  **配置功能组件**: 从18个类别、100多个组件中勾选您需要的功能模块。
4.  **复制提示词**: 在右侧面板中，提示词会自动生成。选择所需格式并一键复制。

### 3. 使用AI助手
1.  点击右上角的 **"AI设计助手"** 按钮。
2.  在弹出的聊天窗口中，您可以基于当前的选择向AI提问，获取设计建议、配色方案等。

---

## 📊 组件系统

应用包含一个涵盖18个类别的综合组件库，以满足各种UI设计需求。

| 类别 | 图标 | 组件数量 | 示例 |
|---|---|---|---|
| **导航** | 🧭 | 8 | 导航栏, 侧边栏, 面包屑 |
| **表单** | 📝 | 16 | 输入框, 选择器, 开关 |
| **数据展示** | 📊 | 11 | 表格, 列表, 卡片 |
| **反馈** | 💬 | 9 | 警告框, 模态框, 通知 |
| **布局** | 📐 | 8 | 栅格, 弹性布局, 容器 |
| **内容** | 📄 | 6 | 排版, 引用, 代码块 |
| **图表** | 📈 | 8 | 折线图, 柱状图, 饼图 |
| **导航菜单** | ☰ | 4 | 下拉菜单, 右键菜单 |
| **数据输入** | ⌨️ | 6 | 数字输入, 密码输入 |
| **展示** | 🖼️ | 5 | 图片预览, 图片轮播 |
| **反馈状态** | ℹ️ | 5 | 消息提示, 气泡卡片 |
| **高级数据** | 🎯 | 5 | 树形选择, 树表格 |
| **业务组件** | 💼 | 4 | 穿梭框, 功能引导 |
| **通用** | 🔧 | 6 | 按钮, 图标, 链接 |
| **实验性** | 🧪 | 5 | 颜色选择器, 图片裁剪 |
| **移动端专用** | 📱 | 6 | 底部导航, 下拉刷新 |

---

## 🔧 技术栈

- **React & TypeScript**: 用于构建现代、可维护的用户界面。
- **HTML5**: 语义化结构。
- **CSS3**: 使用CSS变量、Grid、Flexbox和`backdrop-filter`实现现代化设计。
- **@google/genai**: 用于与 Gemini API 集成。
- **LocalStorage**: 用于本地数据持久化，如用户选择和对话历史。

---

## 📱 浏览器支持

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ 主流移动端浏览器

---

## 🎨 设计原则

### Apple设计语言
- **留白**: 大量使用留白创造清晰、无干扰的布局。
- **毛玻璃效果**: 通过 `backdrop-filter` 增强界面的深度和层次感。
- **流畅动画**: 使用 `cubic-bezier` 实现平滑、自然的过渡效果。
- **视觉层次**: 清晰的排版和元素层级引导用户注意力。

### 响应式设计
- **桌面端**: 优化的宽屏双栏布局。
- **平板与移动端**: 自动适应的单栏堆叠布局，确保在任何设备上都有一致的体验。

---

## 🔍 搜索功能

组件选择步骤提供实时搜索功能，帮助您快速定位组件：
- 搜索 "输入" → 找到所有输入相关组件。
- 搜索 "表格" → 找到数据表格、树表格等。
- 搜索 "导航" → 找到导航栏、面包屑等。

---

## 💾 本地存储

应用使用 `localStorage` 保存您的工作进度和偏好：
- **用户选择**: 目的、风格、已选组件。
- **对话历史**: 与AI助手的聊天记录。

---

## 🔒 隐私安全

- ✅ **纯前端运行**: 所有操作都在您的浏览器中完成。
- ✅ **API密钥安全**: 您的 Gemini API 密钥仅存储在浏览器本地，不会上传到任何服务器。
- ✅ **无数据上传**: 您的设计选择和聊天记录完全私密。

---

## 📝 许可证

[MIT License](https://opensource.org/licenses/MIT) - 您可以自由使用、修改和分发。

</div>

<hr/>

<div id="english">

# AI UI Prompt Generator

> A professional AI UI prompt generator, inspired by Apple's design aesthetics, to help you quickly build high-quality, structured UI/UX design requirements and collaborate in real-time with an AI design assistant.

**[🚀 Open Application in AI Studio](https://aistudio.google.com/apps/drive/1DcUID_kYoOnAPM7kOEAtBntRPZeB6Nvf)**

---

## 📦 Project Structure

```
.
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Stylesheet
├── js/
│   ├── main.js             # Main JavaScript logic (refactored)
│   └── componentData.js    # Component data
├── services/
│   └── geminiService.ts    # Gemini API Service
├── index.tsx               # React application entry point
└── README.md               # Project README
```

---

## ✨ Features

### Core Features
- ✅ **3-Step Prompt Generation**: Select Purpose → Define Style → Configure Components
- ✅ **Rich Component Library**: 18 categories with 100+ curated components
- ✅ **Smart Search**: Quickly find the components you need
- ✅ **Real-time Preview**: Instantly visualize your design choices
- ✅ **Multi-Format Output**: Supports Markdown, Plain Text, and JSON

### AI Integration
- ✅ **Gemini API Support**: Integrated with the powerful Gemini model
- ✅ **Real-time AI Chat**: Engage in contextual conversations with the AI Design Assistant
- ✅ **Context-Aware**: The assistant understands your current design selections
- ✅ **Chat History**: Conversation history is saved locally for your reference

### Design
- ✅ **Apple Design Language**: A clean, elegant, and user-friendly interface
- ✅ **Responsive Layout**: Perfect adaptation for desktop, tablet, and mobile devices
- ✅ **Glassmorphism Effect**: Modern, translucent UI elements
- ✅ **Fluent Animations**: Provides a seamless and delightful user experience

---

## 🚀 Quick Start

### 1. Open the Application
- **Online**: Simply click the [**AI Studio Link**](https://aistudio.google.com/apps/drive/1DcUID_kYoOnAPM7kOEAtBntRPZeB6Nvf)
- **Locally**: Open the `index.html` file in your browser.

### 2. Usage Steps
1.  **Select Design Purpose**: Choose from 8 presets like Dashboard, E-commerce, etc.
2.  **Define Visual Style**: Select from 6 popular styles (e.g., Modern Apple, Material V3) and customize the primary color.
3.  **Configure Components**: Check the functional modules you need from 18 categories and 100+ components.
4.  **Copy the Prompt**: The prompt is automatically generated on the right panel. Select your desired format and copy it with one click.

### 3. Using the AI Assistant
1.  Click the **"AI Design Assistant"** button in the top-right corner.
2.  In the chat modal, you can ask the AI for design suggestions, color schemes, and more, based on your current selections.

---

## 📊 Component System

The application includes a comprehensive component library across 18 categories to meet various UI design needs.

| Category | Icon | Count | Examples |
|---|---|---|---|
| **Navigation** | 🧭 | 8 | Navbar, Sidebar, Breadcrumb |
| **Form** | 📝 | 16 | Input, Select, Switch |
| **Data Display** | 📊 | 11 | Table, List, Card |
| **Feedback** | 💬 | 9 | Alert, Modal, Notification |
| **Layout** | 📐 | 8 | Grid, Flex, Container |
| **Content** | 📄 | 6 | Typography, Quote, Code Block |
| **Charts** | 📈 | 8 | Line Chart, Bar Chart, Pie Chart |
| **Nav Menu** | ☰ | 4 | Dropdown, Context Menu |
| **Data Input** | ⌨️ | 6 | Input Number, Password Input |
| **Display** | 🖼️ | 5 | Image Preview, Carousel |
| **Feedback Status** | ℹ️ | 5 | Message, Popover |
| **Advanced Data** | 🎯 | 5 | Tree Select, Tree Table |
| **Business** | 💼 | 4 | Transfer, Tour |
| **General** | 🔧 | 6 | Button, Icon, Link |
| **Experimental** | 🧪 | 5 | Color Picker, Image Cropper |
| **Mobile** | 📱 | 6 | Bottom Nav, Pull to Refresh |

---

## 🔧 Tech Stack

- **React & TypeScript**: For building a modern, maintainable user interface.
- **HTML5**: For semantic structure.
- **CSS3**: Utilizing CSS Variables, Grid, Flexbox, and `backdrop-filter` for modern design.
- **@google/genai**: For integrating with the Gemini API.
- **LocalStorage**: For local data persistence of user selections and chat history.

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Modern Mobile Browsers

---

## 🎨 Design Principles

### Apple Design Language
- **Whitespace**: Generous use of whitespace to create a clean, uncluttered layout.
- **Glassmorphism**: Enhances UI depth and hierarchy with `backdrop-filter`.
- **Fluent Animations**: Smooth, natural transitions using `cubic-bezier`.
- **Visual Hierarchy**: Clear typography and element hierarchy to guide user focus.

### Responsive Design
- **Desktop**: An optimized wide-screen two-column layout.
- **Tablet & Mobile**: An adaptive single-column stacked layout for a consistent experience on any device.

---

## 🔍 Search Functionality

The component selection step features a real-time search to help you quickly locate components:
- Search "input" → Finds all input-related components.
- Search "table" → Finds Data Table, Tree Table, etc.
- Search "nav" → Finds Navbar, Breadcrumb, etc.

---

## 💾 Local Storage

The application uses `localStorage` to save your progress and preferences:
- **User Selections**: Purpose, style, and selected components.
- **Chat History**: Your conversation with the AI assistant.

---

## 🔒 Privacy & Security

- ✅ **Client-Side Only**: All operations are performed within your browser.
- ✅ **API Key Security**: Your Gemini API key is stored only in your browser's local storage and is never uploaded to any server.
- ✅ **No Data Upload**: Your design selections and chat history remain completely private.

---

## 📝 License

[MIT License](https://opensource.org/licenses/MIT) - Feel free to use, modify, and distribute.

</div>
