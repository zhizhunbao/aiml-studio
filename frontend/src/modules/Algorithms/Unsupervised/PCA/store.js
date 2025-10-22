import { create } from 'zustand';

/**
 * PCA 降维算法状态管理
 * 使用 Zustand 进行全局状态管理，无需 Provider
 */

export const usePCA = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 算法参数 */
  params: {
    nComponents: 2, // 主成分数量
    whiten: false, // 是否白化
  },
  
  /** 训练状态：'idle' | 'training' | 'completed' | 'error' */
  trainingStatus: 'idle',
  
  /** 主成分 */
  components: null,
  
  /** 方差解释率 */
  explainedVariance: null,
  
  /** 累计方差解释率 */
  cumulativeVariance: null,
  
  /** 转换后的数据 */
  transformedData: null,
  
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
   * @param {any} componentsData - 主成分数据
   * @param {any} variance - 方差解释率
   * @param {any} cumVariance - 累计方差解释率
   * @param {any} transformed - 转换后的数据
   */
  completeTraining: (componentsData, variance, cumVariance, transformed) => {
    set({
      components: componentsData,
      explainedVariance: variance,
      cumulativeVariance: cumVariance,
      transformedData: transformed,
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
   * 设置主成分
   * @param {any} components - 主成分
   */
  setComponents: (components) => {
    set({ components });
  },

  /**
   * 设置方差解释率
   * @param {any} explainedVariance - 方差解释率
   */
  setExplainedVariance: (explainedVariance) => {
    set({ explainedVariance });
  },

  /**
   * 设置累计方差解释率
   * @param {any} cumulativeVariance - 累计方差解释率
   */
  setCumulativeVariance: (cumulativeVariance) => {
    set({ cumulativeVariance });
  },

  /**
   * 设置转换后的数据
   * @param {any} transformedData - 转换后的数据
   */
  setTransformedData: (transformedData) => {
    set({ transformedData });
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
        nComponents: 2,
        whiten: false,
      },
      trainingStatus: 'idle',
      components: null,
      explainedVariance: null,
      cumulativeVariance: null,
      transformedData: null,
      error: null
    });
  },
}));
