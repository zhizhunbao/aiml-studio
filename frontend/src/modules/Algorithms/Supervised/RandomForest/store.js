import { create } from 'zustand';

/**
 * 随机森林算法状态管理
 * 使用 Zustand 进行全局状态管理，无需 Provider
 */

export const useRandomForest = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 算法参数 */
  params: {
    nEstimators: 100,
    maxDepth: 5,
    minSamplesSplit: 2,
    minSamplesLeaf: 1,
    maxFeatures: 'sqrt', // 'sqrt' | 'log2' | number
    criterion: 'gini', // 'gini' | 'entropy'
  },
  
  /** 训练状态：'idle' | 'training' | 'completed' | 'error' */
  trainingStatus: 'idle',
  
  /** 模型数据 */
  model: null,
  
  /** 各个树的结构 */
  trees: [],
  
  /** 特征重要性 */
  featureImportance: null,
  
  /** 预测结果 */
  predictions: null,
  
  /** 混淆矩阵 */
  confusionMatrix: null,
  
  /** 数据集 */
  dataset: null,
  
  /** 错误信息 */
  error: null,

  // ============================================
  // 操作方法
  // ============================================

  /**
   * 更新参数
   * @param {Object} newParams - 新参数
   */
  updateParams: (newParams) => {
    set(state => ({
      params: { ...state.params, ...newParams }
    }));
  },

  /**
   * 开始训练
   */
  startTraining: () => {
    set({
      trainingStatus: 'training',
      error: null
    });
  },

  /**
   * 完成训练
   * @param {Object} modelData - 模型数据
   * @param {Array} treeData - 树数据
   */
  completeTraining: (modelData, treeData) => {
    set({
      model: modelData,
      trees: treeData,
      trainingStatus: 'completed'
    });
  },

  /**
   * 设置训练错误
   * @param {string} errorMsg - 错误消息
   */
  setTrainingError: (errorMsg) => {
    set({
      error: errorMsg,
      trainingStatus: 'error'
    });
  },

  /**
   * 设置树数据
   * @param {Array} trees - 树数据
   */
  setTrees: (trees) => {
    set({ trees });
  },

  /**
   * 设置特征重要性
   * @param {any} featureImportance - 特征重要性
   */
  setFeatureImportance: (featureImportance) => {
    set({ featureImportance });
  },

  /**
   * 设置预测结果
   * @param {any} predictions - 预测结果
   */
  setPredictions: (predictions) => {
    set({ predictions });
  },

  /**
   * 设置混淆矩阵
   * @param {any} confusionMatrix - 混淆矩阵
   */
  setConfusionMatrix: (confusionMatrix) => {
    set({ confusionMatrix });
  },

  /**
   * 设置数据集
   * @param {any} dataset - 数据集
   */
  setDataset: (dataset) => {
    set({ dataset });
  },

  /**
   * 重置所有状态
   */
  reset: () => {
    set({
      params: {
        nEstimators: 100,
        maxDepth: 5,
        minSamplesSplit: 2,
        minSamplesLeaf: 1,
        maxFeatures: 'sqrt',
        criterion: 'gini',
      },
      trainingStatus: 'idle',
      model: null,
      trees: [],
      featureImportance: null,
      predictions: null,
      confusionMatrix: null,
      error: null
    });
  },
}));
