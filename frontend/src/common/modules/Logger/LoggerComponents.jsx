import React from 'react';
import { useLogger, LogLevel } from './store';
import { AlertCircle, Info, AlertTriangle, Bug, X } from 'lucide-react';

/**
 * Toast 通知组件
 * 在页面右上角显示日志通知
 */
export function LogToast({ log, onClose }) {
  const getIcon = () => {
    switch (log.level) {
      case LogLevel.ERROR:
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case LogLevel.WARN:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case LogLevel.INFO:
        return <Info className="w-5 h-5 text-blue-500" />;
      case LogLevel.DEBUG:
        return <Bug className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (log.level) {
      case LogLevel.ERROR:
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case LogLevel.WARN:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case LogLevel.INFO:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case LogLevel.DEBUG:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${getBgColor()} shadow-lg min-w-[300px] max-w-md animate-slide-in`}
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {log.message}
        </p>
        {log.data && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {typeof log.data === 'object' ? JSON.stringify(log.data) : log.data}
          </p>
        )}
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/**
 * 日志统计面板
 * 显示各级别日志的统计信息
 */
export function LogStats() {
  const { logs } = useLogger();

  const stats = {
    [LogLevel.ERROR]: logs.filter(l => l.level === LogLevel.ERROR).length,
    [LogLevel.WARN]: logs.filter(l => l.level === LogLevel.WARN).length,
    [LogLevel.INFO]: logs.filter(l => l.level === LogLevel.INFO).length,
    [LogLevel.DEBUG]: logs.filter(l => l.level === LogLevel.DEBUG).length,
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">错误</span>
        </div>
        <p className="text-2xl font-bold text-red-600">{stats[LogLevel.ERROR]}</p>
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">警告</span>
        </div>
        <p className="text-2xl font-bold text-yellow-600">{stats[LogLevel.WARN]}</p>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">信息</span>
        </div>
        <p className="text-2xl font-bold text-blue-600">{stats[LogLevel.INFO]}</p>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Bug className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">调试</span>
        </div>
        <p className="text-2xl font-bold text-gray-600">{stats[LogLevel.DEBUG]}</p>
      </div>
    </div>
  );
}

/**
 * 日志控制面板
 * 提供日志相关的控制按钮
 */
export function LogControls() {
  const { enabled, setEnabled, clearLogs, exportLogs } = useLogger();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setEnabled(!enabled)}
        className={`btn ${enabled ? 'btn-primary' : 'btn-secondary'}`}
      >
        {enabled ? '日志已启用' : '日志已禁用'}
      </button>
      <button onClick={clearLogs} className="btn btn-secondary">
        清空日志
      </button>
      <button onClick={exportLogs} className="btn btn-secondary">
        导出日志
      </button>
    </div>
  );
}

