import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { MainLayout } from '@common/modules/Layout';
import { LayoutProvider } from '@common/modules/Layout/store';
import MDXComponents from '@common/modules/MDX/MDXComponents';
import { GlobalExceptionBoundary, ExceptionNotifications } from '@common/modules/Exceptions';

// 导入所有算法路由
// 监督学习
import { route as linearRegressionRoute } from '@modules/Algorithms/Supervised/LinearRegression';
import { route as logisticRegressionRoute } from '@modules/Algorithms/Supervised/LogisticRegression';
import { route as decisionTreeRoute } from '@modules/Algorithms/Supervised/DecisionTree';
import { route as randomForestRoute } from '@modules/Algorithms/Supervised/RandomForest';

// 无监督学习
import { route as kmeansRoute } from '@modules/Algorithms/Unsupervised/KMeans';
import { route as dbscanRoute } from '@modules/Algorithms/Unsupervised/DBSCAN';
import { route as pcaRoute } from '@modules/Algorithms/Unsupervised/PCA';

// 神经网络
import { route as mlpRoute } from '@modules/Algorithms/NeuralNetworks/MLP';
import { route as cnnRoute } from '@modules/Algorithms/NeuralNetworks/CNN';

// DevTools
import { routes as devToolsRoutes } from '@common/modules/DevTools';

// Datasets
import { datasetsRoute } from '@modules/Datasets';

// 汇总所有路由
const algorithmRoutes = [
  // 监督学习
  linearRegressionRoute,
  logisticRegressionRoute,
  decisionTreeRoute,
  randomForestRoute,
  // 无监督学习
  kmeansRoute,
  dbscanRoute,
  pcaRoute,
  // 神经网络
  mlpRoute,
  cnnRoute,
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // 从 localStorage 读取保存的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // 如果没有保存的设置，使用系统偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    // 应用主题并保存到 localStorage
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <GlobalExceptionBoundary>
      <LayoutProvider>
        <MDXProvider components={MDXComponents}>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
            <Routes>
              {/* 默认重定向到线性回归 */}
              <Route path="/" element={<Navigate to="/algorithms/supervised/linear-regression" replace />} />
              
              {/* DevTools 路由 */}
              {devToolsRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.element />} />
              ))}
              
              {/* 数据集路由 */}
              <Route path={datasetsRoute.path} element={datasetsRoute.element} />
              
              {/* 算法模块路由 */}
              {algorithmRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              
              {/* 404 页面 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </MainLayout>
            {/* 异常通知组件 */}
            <ExceptionNotifications />
          </Router>
        </MDXProvider>
      </LayoutProvider>
    </GlobalExceptionBoundary>
  );
}

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-xl text-gray-600 mt-4">页面未找到</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          返回首页
        </a>
      </div>
    </div>
  );
}

export default App;

