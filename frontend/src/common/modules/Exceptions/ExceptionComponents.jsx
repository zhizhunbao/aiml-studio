import React, { useEffect } from 'react';
import { useExceptions, ExceptionSeverity, ExceptionType } from './store';
import { useLogger } from '@common/modules/Logger';
import { AlertTriangle, XCircle, AlertCircle, X } from 'lucide-react';

/**
 * 异常 Toast 通知组件
 * 在页面右上角显示异常通知（自动显示，用户可关闭）
 */
export function ExceptionToast({ exception, onClose, autoClose = true }) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5秒后自动关闭
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const getIcon = () => {
    switch (exception.severity) {
      case ExceptionSeverity.CRITICAL:
      case ExceptionSeverity.HIGH:
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case ExceptionSeverity.MEDIUM:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case ExceptionSeverity.LOW:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBgColor = () => {
    switch (exception.severity) {
      case ExceptionSeverity.CRITICAL:
      case ExceptionSeverity.HIGH:
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case ExceptionSeverity.MEDIUM:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case ExceptionSeverity.LOW:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${getBgColor()} shadow-lg min-w-[320px] max-w-md animate-slide-in`}
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase">
          {exception.type}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          {exception.message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/**
 * 异常通知容器
 * 在页面固定位置显示所有未解决的异常
 */
export function ExceptionNotifications() {
  const { currentException, clearCurrentException } = useExceptions();

  if (!currentException) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <ExceptionToast
        exception={currentException}
        onClose={clearCurrentException}
        autoClose={currentException.severity !== ExceptionSeverity.CRITICAL}
      />
    </div>
  );
}

/**
 * 异常统计组件
 * 显示异常数量统计
 */
export function ExceptionStats() {
  const { exceptions, getUnresolvedExceptions, getExceptionsBySeverity } = useExceptions();

  const stats = {
    total: exceptions.length,
    unresolved: getUnresolvedExceptions().length,
    critical: getExceptionsBySeverity(ExceptionSeverity.CRITICAL).filter(e => !e.resolved).length,
    high: getExceptionsBySeverity(ExceptionSeverity.HIGH).filter(e => !e.resolved).length,
    medium: getExceptionsBySeverity(ExceptionSeverity.MEDIUM).filter(e => !e.resolved).length,
    low: getExceptionsBySeverity(ExceptionSeverity.LOW).filter(e => !e.resolved).length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">严重</span>
        </div>
        <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
      </div>

      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">高</span>
        </div>
        <p className="text-2xl font-bold text-red-500">{stats.high}</p>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">中</span>
        </div>
        <p className="text-2xl font-bold text-yellow-600">{stats.medium}</p>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">低</span>
        </div>
        <p className="text-2xl font-bold text-blue-600">{stats.low}</p>
      </div>
    </div>
  );
}

/**
 * 全局异常边界组件 (内部类组件)
 * 捕获组件树中的 React 错误
 */
class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // 调用传入的错误处理函数
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              应用出错了
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {this.props.fallbackMessage || '抱歉，应用遇到了一个错误。请刷新页面重试。'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * GlobalExceptionBoundary (函数组件包装器)
 * 集成 Logger 和 Exceptions 系统
 */
export function GlobalExceptionBoundary({ children, fallbackMessage }) {
  const logger = useLogger();
  const { captureException } = useExceptions();

  const handleError = React.useCallback((error, errorInfo) => {
    // 记录日志
    logger.error('React Error Boundary 捕获到错误', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack
    });

    // 捕获异常
    captureException(error, {
      type: ExceptionType.REACT,
      severity: ExceptionSeverity.CRITICAL,
      context: {
        component: 'GlobalExceptionBoundary',
        errorInfo: errorInfo?.componentStack,
        message: 'React component tree error'
      }
    });
  }, [logger, captureException]);

  return (
    <ErrorBoundaryClass onError={handleError} fallbackMessage={fallbackMessage}>
      {children}
    </ErrorBoundaryClass>
  );
}

