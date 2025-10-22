import { create } from 'zustand';

/**
 * DBSCAN 聚类算法状态管理
 * 使用 Zustand 进行全局状态管理，无需 Provider
 */

export const useDBSCAN = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 算法参数 */
  params: {
    eps: 0.5, // 邻域半径
    minSamples: 5, // 最小样本数
    metric: 'euclidean', // 'euclidean' | 'manhattan'
  },
  
  /** 训练状态：'idle' | 'training' | 'completed' | 'error' */
  trainingStatus: 'idle',
  
  /** 聚类结果 */
  clusters: null,
  
  /** 噪声点 */
  noisePoints: null,
  
  /** 聚类统计信息 */
  clusterStats: null,
  
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
   * @param {any} clustersData - 聚类数据
   * @param {any} noise - 噪声点
   * @param {any} stats - 统计信息
   */
  completeTraining: (clustersData, noise, stats) => {
    set({
      clusters: clustersData,
      noisePoints: noise,
      clusterStats: stats,
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
   * 设置聚类结果
   * @param {any} clusters - 聚类结果
   */
  setClusters: (clusters) => {
    set({ clusters });
  },

  /**
   * 设置噪声点
   * @param {any} noisePoints - 噪声点
   */
  setNoisePoints: (noisePoints) => {
    set({ noisePoints });
  },

  /**
   * 设置聚类统计信息
   * @param {any} clusterStats - 统计信息
   */
  setClusterStats: (clusterStats) => {
    set({ clusterStats });
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
        eps: 0.5,
        minSamples: 5,
        metric: 'euclidean',
      },
      trainingStatus: 'idle',
      clusters: null,
      noisePoints: null,
      clusterStats: null,
      error: null
    });
  },
}));
