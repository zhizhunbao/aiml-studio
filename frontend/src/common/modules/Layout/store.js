import { createContext, useContext, useState } from 'react';

/**
 * Layout 模块状态管理
 * 管理全局 UI 状态，如侧边栏展开/收起、主题模式等
 */

// 创建 Context
const LayoutContext = createContext(null);

/**
 * Layout Provider 组件
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子组件
 */
export function LayoutProvider({ children }) {
  // 侧边栏展开状态
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // 主题模式（浅色/深色）
  const [darkMode, setDarkMode] = useState(() => {
    // 检查系统主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark;
  });
  
  // 当前语言
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'zh-CN';
  });

  // 切换侧边栏
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // 切换主题
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      // 应用主题到 DOM
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  // 切换语言
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    // 状态
    sidebarOpen,
    darkMode,
    language,
    
    // 操作方法
    toggleSidebar,
    toggleDarkMode,
    changeLanguage,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

/**
 * 使用 Layout 状态的 Hook
 * @returns {Object} Layout 状态和操作方法
 */
export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
}

export default LayoutContext;

