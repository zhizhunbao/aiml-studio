# Sidebar Component

侧边栏导航组件，提供算法分类导航和折叠/展开功能。

## 功能特性

### 1. 分层导航
- **监督学习**：线性回归、逻辑回归、决策树、随机森林
- **无监督学习**：K-均值聚类、DBSCAN、主成分分析
- **神经网络**：多层感知机、卷积神经网络

### 2. 折叠/展开功能
类似于 ChatGPT 的侧边栏设计：
- 点击侧边栏头部的折叠按钮可隐藏侧边栏
- 侧边栏隐藏后，显示悬浮按钮以便重新展开
- 平滑的动画过渡效果
- 状态持久化（通过 Layout Store 管理）

### 3. 响应式设计
- 深色/浅色主题支持
- 活跃状态高亮显示
- Hover 交互效果

## 使用方式

```jsx
import { Sidebar } from '@common/modules/Sidebar';

// 在 Layout 中使用
function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main>
        {/* 主内容 */}
      </main>
    </div>
  );
}
```

## 状态管理

侧边栏使用 Layout Store 来管理折叠/展开状态：

```jsx
import { useLayout } from '@common/modules/Layout/store';

const { sidebarOpen, toggleSidebar } = useLayout();
```

## 样式特点

- **宽度**: 240px (展开) / 0px (折叠)
- **过渡动画**: 300ms ease-in-out
- **悬浮按钮**: 固定定位，左侧 16px，顶部 80px
- **深色主题**: `bg-gray-900` (展开) / `bg-gray-800` (悬浮按钮)
- **浅色主题**: `bg-gray-50` (展开) / `bg-gray-100` (悬浮按钮)

## 快捷键支持

未来可以添加键盘快捷键支持：
- `Ctrl/Cmd + B`: 切换侧边栏
- `Ctrl/Cmd + \`: 切换侧边栏

## 日志记录

所有用户交互都会被记录到 Logger 系统：
- 分组展开/折叠
- 侧边栏显示/隐藏
- 算法导航跳转

