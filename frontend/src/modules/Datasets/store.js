import { create } from 'zustand';

/**
 * 数据集模块 - 状态管理
 * 使用 Zustand 进行全局数据集管理，无需 Provider
 * 
 * 📋 文件结构：
 * 1. 数据集元信息配置 (DATASETS_METADATA)
 * 2. 工具函数 (CSV 解析、数据处理)
 * 3. Zustand Store (useDatasets)
 * 
 * 💡 功能说明：
 * - 管理多个机器学习数据集的加载和缓存
 * - 提供统一的数据访问接口
 * - 支持特征和标签的自动提取
 */

// ============================================
// 数据集元信息配置
// ============================================

/**
 * 数据集元信息
 * 包含所有可用数据集的配置信息
 */
export const DATASETS_METADATA = {
  // 鸢尾花数据集 - 经典多分类问题
  iris: {
    name: 'Iris Dataset',
    nameZh: '鸢尾花数据集',
    description: 'Classic dataset for multi-class classification',
    descriptionZh: '经典的多分类数据集',
    samples: 150,
    features: 4,
    classes: 3,
    targetColumn: 'target',
    featureColumns: ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)'],
    classNames: ['setosa', 'versicolor', 'virginica'],
    type: 'classification',
    path: '/aiml-studio/datasets/iris.csv'
  },
  
  // 加州房价数据集 - 回归问题
  california_housing: {
    name: 'California Housing',
    nameZh: '加州房价数据集',
    description: 'Regression dataset for house price prediction',
    descriptionZh: '用于房价预测的回归数据集',
    samples: 20640,
    features: 8,
    targetColumn: 'MedHouseVal',
    featureColumns: ['MedInc', 'HouseAge', 'AveRooms', 'AveBedrms', 'Population', 'AveOccup', 'Latitude', 'Longitude'],
    type: 'regression',
    path: '/aiml-studio/datasets/california_housing.csv'
  },
  
  // 红酒数据集 - 多分类问题
  wine: {
    name: 'Wine Dataset',
    nameZh: '红酒数据集',
    description: 'Chemical analysis of wines',
    descriptionZh: '红酒的化学分析数据',
    samples: 178,
    features: 13,
    classes: 3,
    targetColumn: 'target',
    type: 'classification',
    path: '/aiml-studio/datasets/wine.csv'
  },
  
  // 乳腺癌数据集 - 二分类问题
  breast_cancer: {
    name: 'Breast Cancer',
    nameZh: '乳腺癌数据集',
    description: 'Binary classification for cancer diagnosis',
    descriptionZh: '用于癌症诊断的二分类数据集',
    samples: 569,
    features: 30,
    classes: 2,
    targetColumn: 'target',
    classNames: ['malignant', 'benign'],
    type: 'classification',
    path: '/aiml-studio/datasets/breast_cancer.csv'
  },
  
  // 手写数字数据集 - 多分类问题
  digits: {
    name: 'Digits Dataset',
    nameZh: '手写数字数据集',
    description: '8x8 images of handwritten digits',
    descriptionZh: '8x8 像素的手写数字图像',
    samples: 1797,
    features: 64,
    classes: 10,
    targetColumn: 'target',
    type: 'classification',
    path: '/aiml-studio/datasets/digits.csv'
  },
  
  // 糖尿病数据集 - 回归问题
  diabetes: {
    name: 'Diabetes Dataset',
    nameZh: '糖尿病数据集',
    description: 'Diabetes disease progression prediction',
    descriptionZh: '糖尿病病程预测数据集',
    samples: 442,
    features: 10,
    targetColumn: 'target',
    type: 'regression',
    path: '/aiml-studio/datasets/diabetes.csv'
  }
};

// ============================================
// 工具函数
// ============================================

/**
 * 解析 CSV 文本
 * @param {string} csvText - CSV 文本内容
 * @returns {Object} { headers: string[], data: Object[] }
 */
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const data = lines.slice(1).map(line => {
    const values = line.split(',');
    const row = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      // 尝试转换为数字
      row[header] = isNaN(value) ? value : parseFloat(value);
    });
    
    return row;
  });
  
  return { headers, data };
}

// ============================================
// Zustand Store
// ============================================

/**
 * Datasets Store
 * 提供全局数据集管理功能
 */
export const useDatasets = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 数据集缓存 */
  datasets: {},
  
  /** 加载状态 */
  loading: {},
  
  /** 错误信息 */
  errors: {},

  /** 数据集元信息（方便访问） */
  metadata: DATASETS_METADATA,

  // ============================================
  // 核心数据加载方法
  // ============================================

  /**
   * 加载数据集
   * @param {string} datasetName - 数据集名称
   * @returns {Promise<Object>} 加载的数据集对象
   */
  loadDataset: async (datasetName) => {
    const { datasets } = get();
    
    // 如果已经加载过，直接返回
    if (datasets[datasetName]) {
      return datasets[datasetName];
    }
    
    // 检查数据集是否存在
    if (!DATASETS_METADATA[datasetName]) {
      const error = `Dataset "${datasetName}" not found`;
      set(state => ({
        errors: { ...state.errors, [datasetName]: error }
      }));
      throw new Error(error);
    }
    
    // 设置加载状态
    set(state => ({
      loading: { ...state.loading, [datasetName]: true },
      errors: { ...state.errors, [datasetName]: null }
    }));
    
    try {
      const path = DATASETS_METADATA[datasetName].path;
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`Failed to load dataset: ${response.statusText}`);
      }
      
      const csvText = await response.text();
      const { headers, data } = parseCSV(csvText);
      
      const dataset = {
        name: datasetName,
        metadata: DATASETS_METADATA[datasetName],
        headers,
        data,
        shape: [data.length, headers.length]
      };
      
      // 缓存数据集
      set(state => ({
        datasets: { ...state.datasets, [datasetName]: dataset },
        loading: { ...state.loading, [datasetName]: false }
      }));
      
      return dataset;
    } catch (error) {
      set(state => ({
        loading: { ...state.loading, [datasetName]: false },
        errors: { ...state.errors, [datasetName]: error.message }
      }));
      throw error;
    }
  },

  // ============================================
  // 数据处理方法
  // ============================================

  /**
   * 获取数据集的特征和标签
   * @param {string} datasetName - 数据集名称
   * @returns {Object} { X: number[][], y: number[], featureColumns: string[] }
   * @throws {Error} 如果数据集未加载
   */
  getFeatureAndTarget: (datasetName) => {
    const { datasets } = get();
    const dataset = datasets[datasetName];
    
    if (!dataset) {
      throw new Error(`Dataset "${datasetName}" not loaded`);
    }
    
    const meta = DATASETS_METADATA[datasetName];
    const targetColumn = meta.targetColumn;
    const featureColumns = meta.featureColumns || 
      dataset.headers.filter(h => h !== targetColumn);
    
    // 提取特征矩阵 X
    const X = dataset.data.map(row => 
      featureColumns.map(col => row[col])
    );
    
    // 提取标签向量 y
    const y = dataset.data.map(row => row[targetColumn]);
    
    return { X, y, featureColumns };
  },

  /**
   * 获取所有可用的数据集列表
   * @returns {Object} 数据集元信息对象
   */
  getAvailableDatasets: () => {
    return DATASETS_METADATA;
  },

  // ============================================
  // 缓存管理方法
  // ============================================

  /**
   * 清除指定数据集的缓存
   * @param {string} datasetName - 数据集名称
   */
  clearDataset: (datasetName) => {
    set(state => {
      const newDatasets = { ...state.datasets };
      delete newDatasets[datasetName];
      return { datasets: newDatasets };
    });
  },

  /**
   * 清除所有缓存
   */
  clearAll: () => {
    set({
      datasets: {},
      loading: {},
      errors: {}
    });
  },
}));
