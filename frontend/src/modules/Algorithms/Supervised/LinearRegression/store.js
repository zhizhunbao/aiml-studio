import { create } from 'zustand';

/**
 * 线性回归算法状态管理
 * 使用 Zustand 进行全局状态管理，无需 Provider
 */

export const useLinearRegression = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 算法参数 */
  params: {
    learningRate: 0.01,
    iterations: 1000,
    fitIntercept: true,
  },
  
  /** 训练状态：'idle' | 'training' | 'completed' | 'error' */
  trainingStatus: 'idle',
  
  /** 模型数据 */
  model: null,
  
  /** 训练历史（损失值等） */
  trainingHistory: [],
  
  /** 预测结果 */
  predictions: null,
  
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
   * @param {Array} history - 训练历史
   */
  completeTraining: (modelData, history) => {
    set({
      model: modelData,
      trainingHistory: history,
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
   * 设置预测结果
   * @param {any} predictions - 预测结果
   */
  setPredictions: (predictions) => {
    set({ predictions });
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
        learningRate: 0.01,
        iterations: 1000,
        fitIntercept: true,
      },
      trainingStatus: 'idle',
      model: null,
      trainingHistory: [],
      predictions: null,
      error: null
    });
  },
}));
