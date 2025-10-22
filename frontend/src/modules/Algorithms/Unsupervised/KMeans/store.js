import { create } from 'zustand';

/**
 * K-Means 聚类算法状态管理
 * 使用 Zustand 进行全局状态管理，无需 Provider
 */

export const useKMeans = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 算法参数 */
  params: {
    k: 3,
    maxIterations: 100,
    initMethod: 'random', // 'random' | 'kmeans++'
    tolerance: 0.0001,
  },
  
  /** 训练状态：'idle' | 'training' | 'completed' | 'error' */
  trainingStatus: 'idle',
  
  /** 聚类中心 */
  centroids: null,
  
  /** 聚类结果 */
  clusters: null,
  
  /** 迭代历史 */
  iterationHistory: [],
  
  /** 轮廓系数 */
  silhouetteScore: null,
  
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
   * @param {any} centroidsData - 聚类中心数据
   * @param {any} clustersData - 聚类结果
   * @param {Array} history - 迭代历史
   */
  completeTraining: (centroidsData, clustersData, history) => {
    set({
      centroids: centroidsData,
      clusters: clustersData,
      iterationHistory: history,
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
   * 设置聚类中心
   * @param {any} centroids - 聚类中心
   */
  setCentroids: (centroids) => {
    set({ centroids });
  },

  /**
   * 设置聚类结果
   * @param {any} clusters - 聚类结果
   */
  setClusters: (clusters) => {
    set({ clusters });
  },

  /**
   * 设置轮廓系数
   * @param {number} silhouetteScore - 轮廓系数
   */
  setSilhouetteScore: (silhouetteScore) => {
    set({ silhouetteScore });
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
        k: 3,
        maxIterations: 100,
        initMethod: 'random',
        tolerance: 0.0001,
      },
      trainingStatus: 'idle',
      centroids: null,
      clusters: null,
      iterationHistory: [],
      silhouetteScore: null,
      error: null
    });
  },
}));
