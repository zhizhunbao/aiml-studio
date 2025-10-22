import { create } from 'zustand';

/**
 * Exceptions 模块状态管理
 * 使用 Zustand 进行全局异常管理，无需 Provider
 */

// ============================================
// 常量定义
// ============================================

/**
 * 异常类型枚举
 */
export const ExceptionType = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  PERMISSION: 'permission',
  NOT_FOUND: 'not_found',
  SERVER: 'server',
  UNKNOWN: 'unknown',
};

/**
 * 异常严重程度枚举
 */
export const ExceptionSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

// ============================================
// Zustand Store
// ============================================

/**
 * Exceptions Store
 * 提供全局异常处理和管理功能
 */
export const useExceptions = create((set, get) => ({
  // ============================================
  // 状态
  // ============================================
  
  /** 异常列表 */
  exceptions: [],
  
  /** 当前显示的异常（用于错误提示） */
  currentException: null,
  
  /** 是否启用全局错误处理 */
  globalHandlerEnabled: true,
  
  /** 错误处理器映射 */
  handlers: {},

  // ============================================
  // 核心异常处理方法
  // ============================================

  /**
   * 捕获异常
   * @param {Error|string} error - 错误对象或错误消息
   * @param {Object} context - 上下文信息
   * @returns {Object} 异常记录对象
   */
  captureException: (error, context = {}) => {
    const { handlers } = get();
    
    const exception = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      type: context.type || ExceptionType.UNKNOWN,
      severity: context.severity || ExceptionSeverity.MEDIUM,
      message: error.message || String(error),
      stack: error.stack,
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
      resolved: false,
    };

    set(state => ({
      exceptions: [exception, ...state.exceptions],
      currentException: exception
    }));

    // 触发对应的错误处理器
    const handler = handlers[exception.type];
    if (handler) {
      handler(exception);
    }

    return exception;
  },

  // ============================================
  // 处理器管理
  // ============================================

  /**
   * 注册错误处理器
   * @param {string} type - 异常类型
   * @param {Function} handler - 处理函数
   */
  registerHandler: (type, handler) => {
    set(state => ({
      handlers: {
        ...state.handlers,
        [type]: handler
      }
    }));
  },

  /**
   * 移除错误处理器
   * @param {string} type - 异常类型
   */
  unregisterHandler: (type) => {
    set(state => {
      const newHandlers = { ...state.handlers };
      delete newHandlers[type];
      return { handlers: newHandlers };
    });
  },

  // ============================================
  // 异常管理
  // ============================================

  /**
   * 标记异常为已解决
   * @param {string|number} exceptionId - 异常 ID
   */
  resolveException: (exceptionId) => {
    set(state => ({
      exceptions: state.exceptions.map(ex => 
        ex.id === exceptionId 
          ? { ...ex, resolved: true, resolvedAt: new Date().toISOString() }
          : ex
      )
    }));
  },

  /**
   * 清除当前异常提示
   */
  clearCurrentException: () => {
    set({ currentException: null });
  },

  /**
   * 清空所有异常
   */
  clearExceptions: () => {
    set({ 
      exceptions: [],
      currentException: null 
    });
  },

  // ============================================
  // 查询方法
  // ============================================

  /**
   * 获取未解决的异常
   * @returns {Array} 未解决的异常列表
   */
  getUnresolvedExceptions: () => {
    const { exceptions } = get();
    return exceptions.filter(ex => !ex.resolved);
  },

  /**
   * 按类型获取异常
   * @param {string} type - 异常类型
   * @returns {Array} 指定类型的异常列表
   */
  getExceptionsByType: (type) => {
    const { exceptions } = get();
    return exceptions.filter(ex => ex.type === type);
  },

  /**
   * 按严重程度获取异常
   * @param {string} severity - 严重程度
   * @returns {Array} 指定严重程度的异常列表
   */
  getExceptionsBySeverity: (severity) => {
    const { exceptions } = get();
    return exceptions.filter(ex => ex.severity === severity);
  },

  // ============================================
  // 配置方法
  // ============================================

  /**
   * 启用/禁用全局错误处理
   * @param {boolean} enabled - 是否启用
   */
  setGlobalHandlerEnabled: (enabled) => {
    set({ globalHandlerEnabled: enabled });
  },

  // ============================================
  // 工具方法
  // ============================================

  /**
   * 导出异常报告
   */
  exportExceptions: () => {
    const { exceptions, getUnresolvedExceptions } = get();
    
    const report = {
      exportedAt: new Date().toISOString(),
      totalExceptions: exceptions.length,
      unresolvedCount: getUnresolvedExceptions().length,
      exceptions: exceptions,
    };

    const reportJson = JSON.stringify(report, null, 2);
    const blob = new Blob([reportJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exceptions-report-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },
}));
