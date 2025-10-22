/**
 * 数据集模块
 * 提供数据集加载、管理和展示功能
 * 
 * 使用方式（基于 Zustand，无需 Provider）：
 * 1. 直接在任何组件中使用 useDatasets Hook
 * 2. 使用 DatasetSelector 组件在算法页面中嵌入
 */

import { useDatasets, DATASETS_METADATA } from './store';
import { 
  DatasetSelector, 
  DatasetInfo, 
  DatasetPreview,
  useDataset 
} from './DatasetSelector';

// ============================================
// Hooks & Constants
// ============================================

export { useDatasets, DATASETS_METADATA };
export { useDataset };

// ============================================
// Components
// ============================================

// 导出组件 - 供算法模块使用
export { 
  DatasetSelector, 
  DatasetInfo, 
  DatasetPreview
};

// ============================================
// Pages & Routes
// ============================================

export { default as DatasetsPage } from './DatasetsPage';
export { default as datasetsRoute } from './route';

