import { createContext, useContext, useState } from 'react';

/**
 * MDX 模块状态管理
 * 管理 MDX 内容渲染相关状态，如代码块展开/折叠、交互式组件状态等
 */

// 创建 Context
const MDXContext = createContext(null);

/**
 * MDX Provider 组件
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子组件
 */
export function MDXProvider({ children }) {
  // 代码块折叠状态（key: 代码块ID, value: 是否折叠）
  const [codeBlockStates, setCodeBlockStates] = useState({});
  
  // 当前激活的交互式组件
  const [activeDemo, setActiveDemo] = useState(null);
  
  // 图表配置
  const [chartConfig, setChartConfig] = useState({
    theme: 'light',
    responsive: true,
  });

  // 切换代码块折叠状态
  const toggleCodeBlock = (blockId) => {
    setCodeBlockStates(prev => ({
      ...prev,
      [blockId]: !prev[blockId],
    }));
  };

  // 设置代码块状态
  const setCodeBlockState = (blockId, collapsed) => {
    setCodeBlockStates(prev => ({
      ...prev,
      [blockId]: collapsed,
    }));
  };

  // 激活交互式组件
  const activateDemo = (demoId) => {
    setActiveDemo(demoId);
  };

  // 更新图表配置
  const updateChartConfig = (config) => {
    setChartConfig(prev => ({
      ...prev,
      ...config,
    }));
  };

  const value = {
    // 状态
    codeBlockStates,
    activeDemo,
    chartConfig,
    
    // 操作方法
    toggleCodeBlock,
    setCodeBlockState,
    activateDemo,
    updateChartConfig,
  };

  return (
    <MDXContext.Provider value={value}>
      {children}
    </MDXContext.Provider>
  );
}

/**
 * 使用 MDX 状态的 Hook
 * @returns {Object} MDX 状态和操作方法
 */
export function useMDX() {
  const context = useContext(MDXContext);
  if (!context) {
    throw new Error('useMDX must be used within MDXProvider');
  }
  return context;
}

export default MDXContext;

