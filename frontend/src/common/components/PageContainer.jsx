import React from 'react';

/**
 * 统一的页面容器组件
 * 用于保持所有页面的布局一致性
 */
const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto max-w-7xl ${className}`}>
      {children}
    </div>
  );
};

/**
 * 页面标题组件
 */
const PageHeader = ({ icon: Icon, title, description, actions, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            {Icon && <Icon className="w-8 h-8" />}
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 页面内容区域
 */
const PageContent = ({ children, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  );
};

/**
 * 页面卡片组件
 */
const PageCard = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

/**
 * 页面工具栏组件
 */
const PageToolbar = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-wrap items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export { PageContainer, PageHeader, PageContent, PageCard, PageToolbar };
export default PageContainer;

