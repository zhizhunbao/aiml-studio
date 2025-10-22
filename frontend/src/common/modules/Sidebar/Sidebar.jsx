import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useLogger } from '@common/modules/Logger';
import { useLayout } from '@common/modules/Layout/store';

function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const logger = useLogger();
  const { sidebarOpen, toggleSidebar } = useLayout();
  
  const [expandedSections, setExpandedSections] = useState({
    supervised: true,
    unsupervised: false,
    neuralNetworks: false,
  });

  const toggleSection = (section) => {
    const isExpanding = !expandedSections[section];
    logger.debug('切换侧边栏分组', { section, isExpanding });
    setExpandedSections((prev) => ({
      ...prev,
      [section]: isExpanding,
    }));
  };

  const handleAlgorithmClick = (algo) => {
    logger.info('导航到算法页面', { 
      algorithm: algo.name, 
      path: algo.path,
      previousPath: location.pathname 
    });
  };

  const algorithms = {
    supervised: [
      { name: 'Linear Regression', path: '/algorithms/supervised/linear-regression', label: t('algorithms.linearRegression.title') },
      { name: 'Logistic Regression', path: '/algorithms/supervised/logistic-regression', label: t('algorithms.logisticRegression.title') },
      { name: 'Decision Tree', path: '/algorithms/supervised/decision-tree', label: t('algorithms.decisionTree.title') },
      { name: 'Random Forest', path: '/algorithms/supervised/random-forest', label: t('algorithms.randomForest.title') },
    ],
    unsupervised: [
      { name: 'K-Means', path: '/algorithms/unsupervised/kmeans', label: t('algorithms.kmeans.title') },
      { name: 'DBSCAN', path: '/algorithms/unsupervised/dbscan', label: t('algorithms.dbscan.title') },
      { name: 'PCA', path: '/algorithms/unsupervised/pca', label: t('algorithms.pca.title') },
    ],
    neuralNetworks: [
      { name: 'MLP', path: '/algorithms/neural-networks/mlp', label: t('algorithms.mlp.title') },
      { name: 'CNN', path: '/algorithms/neural-networks/cnn', label: t('algorithms.cnn.title') },
    ],
  };

  const isActive = (path) => location.pathname === path;

  const handleToggleSidebar = () => {
    logger.debug('切换侧边栏显示状态', { currentState: sidebarOpen });
    toggleSidebar();
  };

  return (
    <>
      {/* 侧边栏 */}
      <aside 
        className={`bg-gray-50 dark:bg-gray-900 h-screen overflow-y-auto transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-60' : 'w-0'
        }`}
      >
        <div className={`${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          {/* 侧边栏头部 - 带折叠按钮 */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {t('nav.algorithms', 'Algorithms')}
            </span>
            <button
              onClick={handleToggleSidebar}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              title={t('nav.collapseSidebar', 'Collapse sidebar')}
            >
              <PanelLeftClose className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          <nav className="p-2 space-y-2">
        {/* 监督学习 */}
        <div>
          <button
            onClick={() => toggleSection('supervised')}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              📁 {t('nav.supervised')}
            </span>
            {expandedSections.supervised ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {expandedSections.supervised && (
            <div className="ml-4 mt-1 space-y-1">
              {algorithms.supervised.map((algo) => (
                <Link
                  key={algo.path}
                  to={algo.path}
                  onClick={() => handleAlgorithmClick(algo)}
                  className={`block p-2 rounded-lg transition-colors ${
                    isActive(algo.path)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {algo.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 无监督学习 */}
        <div>
          <button
            onClick={() => toggleSection('unsupervised')}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              📁 {t('nav.unsupervised')}
            </span>
            {expandedSections.unsupervised ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {expandedSections.unsupervised && (
            <div className="ml-4 mt-1 space-y-1">
              {algorithms.unsupervised.map((algo) => (
                <Link
                  key={algo.path}
                  to={algo.path}
                  onClick={() => handleAlgorithmClick(algo)}
                  className={`block p-2 rounded-lg transition-colors ${
                    isActive(algo.path)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {algo.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* 神经网络 */}
        <div>
          <button
            onClick={() => toggleSection('neuralNetworks')}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              📁 {t('nav.neuralNetworks')}
            </span>
            {expandedSections.neuralNetworks ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {expandedSections.neuralNetworks && (
            <div className="ml-4 mt-1 space-y-1">
              {algorithms.neuralNetworks.map((algo) => (
                <Link
                  key={algo.path}
                  to={algo.path}
                  onClick={() => handleAlgorithmClick(algo)}
                  className={`block p-2 rounded-lg transition-colors ${
                    isActive(algo.path)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {algo.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
        </div>
    </aside>

      {/* 悬浮按钮 - 侧边栏隐藏时显示 */}
      {!sidebarOpen && (
        <button
          onClick={handleToggleSidebar}
          className="fixed left-4 top-20 z-50 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg transition-all duration-200 hover:scale-110"
          title={t('nav.expandSidebar', 'Expand sidebar')}
        >
          <PanelLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      )}
    </>
  );
}

export default Sidebar;

