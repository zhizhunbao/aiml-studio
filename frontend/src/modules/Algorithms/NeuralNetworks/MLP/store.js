import { create } from 'zustand';

/**
 * 多层感知机（MLP）算法状态管理
 * 使用 Zustand 进行全局状态管理，无需 Provider
 */

export const useMLP = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 算法参数 */
  params: {
    hiddenLayers: [64, 32], // 隐藏层神经元数量
    activation: 'relu', // 'relu' | 'sigmoid' | 'tanh'
    learningRate: 0.001,
    epochs: 100,
    batchSize: 32,
    optimizer: 'adam', // 'adam' | 'sgd' | 'rmsprop'
    dropout: 0.0,
  },
  
  /** 训练状态：'idle' | 'training' | 'completed' | 'error' */
  trainingStatus: 'idle',
  
  /** 模型结构 */
  modelStructure: null,
  
  /** 训练历史（损失、准确率等） */
  trainingHistory: {
    loss: [],
    accuracy: [],
    valLoss: [],
    valAccuracy: [],
  },
  
  /** 当前训练进度 */
  trainingProgress: 0,
  
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
      trainingProgress: 0,
      error: null
    });
  },

  /**
   * 更新训练进度
   * @param {number} epoch - 当前 epoch
   * @param {number} totalEpochs - 总 epoch 数
   * @param {Object} metrics - 训练指标
   */
  updateTrainingProgress: (epoch, totalEpochs, metrics) => {
    set(state => ({
      trainingProgress: (epoch / totalEpochs) * 100,
      trainingHistory: {
        loss: [...state.trainingHistory.loss, metrics.loss],
        accuracy: [...state.trainingHistory.accuracy, metrics.accuracy],
        valLoss: [...state.trainingHistory.valLoss, metrics.valLoss],
        valAccuracy: [...state.trainingHistory.valAccuracy, metrics.valAccuracy],
      }
    }));
  },

  /**
   * 完成训练
   * @param {Object} model - 模型
   */
  completeTraining: (model) => {
    set({
      modelStructure: model,
      trainingStatus: 'completed',
      trainingProgress: 100
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
   * 设置模型结构
   * @param {Object} modelStructure - 模型结构
   */
  setModelStructure: (modelStructure) => {
    set({ modelStructure });
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
        hiddenLayers: [64, 32],
        activation: 'relu',
        learningRate: 0.001,
        epochs: 100,
        batchSize: 32,
        optimizer: 'adam',
        dropout: 0.0,
      },
      trainingStatus: 'idle',
      modelStructure: null,
      trainingHistory: {
        loss: [],
        accuracy: [],
        valLoss: [],
        valAccuracy: [],
      },
      trainingProgress: 0,
      predictions: null,
      confusionMatrix: null,
      error: null
    });
  },
}));
