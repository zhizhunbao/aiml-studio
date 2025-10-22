import { create } from 'zustand';

/**
 * Logger 模块状态管理
 * 使用 Zustand 进行全局状态管理，无需 Provider
 */

// ============================================
// 常量定义
// ============================================

/**
 * 日志级别枚举
 */
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

// ============================================
// Zustand Store
// ============================================

/**
 * Logger Store
 * 提供全局日志管理功能
 */
export const useLogger = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 日志列表 */
  logs: [],
  
  /** 当前日志级别（只显示此级别及以上的日志） */
  logLevel: LogLevel.INFO,
  
  /** 是否启用日志记录 */
  enabled: true,
  
  /** 最大日志数量 */
  maxLogs: 1000,

  // ============================================
  // 核心日志方法
  // ============================================

  /**
   * 记录日志
   * @param {string} level - 日志级别
   * @param {string} message - 日志消息
   * @param {any} data - 附加数据
   */
  log: (level, message, data = null) => {
    const { enabled, maxLogs } = get();
    if (!enabled) return;

    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };

    set(state => ({
      logs: [logEntry, ...state.logs].slice(0, maxLogs)
    }));

    // 同时输出到控制台
    const consoleMethod = level === LogLevel.ERROR ? 'error' 
                        : level === LogLevel.WARN ? 'warn'
                        : level === LogLevel.DEBUG ? 'debug'
                        : 'log';
    
    if (data) {
      console[consoleMethod](`[${level.toUpperCase()}]`, message, data);
    } else {
      console[consoleMethod](`[${level.toUpperCase()}]`, message);
    }
  },

  // ============================================
  // 便捷日志方法
  // ============================================

  /**
   * 记录 DEBUG 级别日志
   */
  debug: (message, data) => {
    get().log(LogLevel.DEBUG, message, data);
  },

  /**
   * 记录 INFO 级别日志
   */
  info: (message, data) => {
    get().log(LogLevel.INFO, message, data);
  },

  /**
   * 记录 WARN 级别日志
   */
  warn: (message, data) => {
    get().log(LogLevel.WARN, message, data);
  },

  /**
   * 记录 ERROR 级别日志
   */
  error: (message, data) => {
    get().log(LogLevel.ERROR, message, data);
  },

  // ============================================
  // 配置方法
  // ============================================

  /**
   * 设置日志级别
   */
  setLogLevel: (level) => set({ logLevel: level }),

  /**
   * 启用/禁用日志记录
   */
  setEnabled: (enabled) => set({ enabled }),

  /**
   * 设置最大日志数量
   */
  setMaxLogs: (maxLogs) => set({ maxLogs }),

  // ============================================
  // 工具方法
  // ============================================

  /**
   * 清空所有日志
   */
  clearLogs: () => set({ logs: [] }),

  /**
   * 导出日志为 JSON 文件
   */
  exportLogs: () => {
    const { logs } = get();
    const logsJson = JSON.stringify(logs, null, 2);
    const blob = new Blob([logsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  /**
   * 根据当前日志级别过滤日志
   * @returns {Array} 过滤后的日志列表
   */
  getFilteredLogs: () => {
    const { logs, logLevel } = get();
    const levelOrder = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const minLevelIndex = levelOrder.indexOf(logLevel);
    
    return logs.filter(log => {
      const logLevelIndex = levelOrder.indexOf(log.level);
      return logLevelIndex >= minLevelIndex;
    });
  },
}));

