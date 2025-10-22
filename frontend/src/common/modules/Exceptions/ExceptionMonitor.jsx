import React, { useState } from 'react';
import { useExceptions, ExceptionType, ExceptionSeverity } from './store';
import {
  AlertTriangle,
  Download,
  Trash2,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wifi,
  Shield,
  FileX,
  Server,
  HelpCircle,
} from 'lucide-react';

/**
 * 异常监控组件
 * 提供异常列表查看、过滤、搜索、导出等功能
 */
function ExceptionMonitor() {
  const {
    exceptions,
    clearExceptions,
    resolveException,
    exportExceptions,
    getUnresolvedExceptions,
  } = useExceptions();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [showResolved, setShowResolved] = useState(false);
  const [selectedException, setSelectedException] = useState(null);

  // 根据异常类型返回图标
  const getExceptionIcon = (type) => {
    switch (type) {
      case ExceptionType.NETWORK:
        return <Wifi className="w-4 h-4 text-blue-500" />;
      case ExceptionType.VALIDATION:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case ExceptionType.PERMISSION:
        return <Shield className="w-4 h-4 text-red-500" />;
      case ExceptionType.NOT_FOUND:
        return <FileX className="w-4 h-4 text-gray-500" />;
      case ExceptionType.SERVER:
        return <Server className="w-4 h-4 text-red-600" />;
      case ExceptionType.UNKNOWN:
      default:
        return <HelpCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  // 获取严重程度的样式类
  const getSeverityClass = (severity) => {
    switch (severity) {
      case ExceptionSeverity.CRITICAL:
        return 'bg-red-600 text-white';
      case ExceptionSeverity.HIGH:
        return 'bg-red-500 text-white';
      case ExceptionSeverity.MEDIUM:
        return 'bg-yellow-500 text-white';
      case ExceptionSeverity.LOW:
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // 过滤异常
  const filteredExceptions = exceptions.filter((exception) => {
    // 搜索过滤
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        exception.message.toLowerCase().includes(search) ||
        exception.type.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    // 类型过滤
    if (filterType !== 'all' && exception.type !== filterType) {
      return false;
    }

    // 严重程度过滤
    if (filterSeverity !== 'all' && exception.severity !== filterSeverity) {
      return false;
    }

    // 已解决/未解决过滤
    if (!showResolved && exception.resolved) {
      return false;
    }

    return true;
  });

  // 格式化时间
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN');
  };

  // 未解决异常数量
  const unresolvedCount = getUnresolvedExceptions().length;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* 头部工具栏 */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            异常监控
            {unresolvedCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                {unresolvedCount} 未解决
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={exportExceptions}
              className="btn btn-secondary flex items-center gap-2"
              title="导出异常报告"
            >
              <Download className="w-4 h-4" />
              导出报告
            </button>
            <button
              onClick={clearExceptions}
              className="btn btn-secondary flex items-center gap-2 text-red-600 hover:text-red-700"
              title="清空所有异常"
            >
              <Trash2 className="w-4 h-4" />
              清空
            </button>
          </div>
        </div>

        {/* 过滤和搜索 */}
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            {/* 类型过滤 */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
              >
                <option value="all">所有类型</option>
                <option value={ExceptionType.NETWORK}>网络错误</option>
                <option value={ExceptionType.VALIDATION}>验证错误</option>
                <option value={ExceptionType.PERMISSION}>权限错误</option>
                <option value={ExceptionType.NOT_FOUND}>未找到</option>
                <option value={ExceptionType.SERVER}>服务器错误</option>
                <option value={ExceptionType.UNKNOWN}>未知错误</option>
              </select>
            </div>

            {/* 严重程度过滤 */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            >
              <option value="all">所有严重程度</option>
              <option value={ExceptionSeverity.CRITICAL}>严重</option>
              <option value={ExceptionSeverity.HIGH}>高</option>
              <option value={ExceptionSeverity.MEDIUM}>中</option>
              <option value={ExceptionSeverity.LOW}>低</option>
            </select>

            {/* 显示已解决 */}
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={showResolved}
                onChange={(e) => setShowResolved(e.target.checked)}
                className="rounded"
              />
              显示已解决
            </label>

            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索异常..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
              />
            </div>

            {/* 统计 */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              共 {filteredExceptions.length} 条异常
            </div>
          </div>
        </div>
      </div>

      {/* 异常列表 */}
      <div className="flex-1 overflow-y-auto">
        {filteredExceptions.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500 opacity-50" />
              <p>暂无异常</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredExceptions.map((exception) => (
              <div
                key={exception.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  exception.resolved ? 'opacity-60' : ''
                } ${selectedException?.id === exception.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {/* 异常图标 */}
                  <div className="mt-1">
                    {getExceptionIcon(exception.type)}
                  </div>

                  {/* 异常内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityClass(exception.severity)}`}>
                        {exception.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 uppercase">
                        {exception.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(exception.timestamp)}
                      </span>
                      {exception.resolved && (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          已解决
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-2">
                      {exception.message}
                    </p>

                    {exception.stack && (
                      <details className="mb-2">
                        <summary className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200">
                          查看堆栈跟踪
                        </summary>
                        <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                          {exception.stack}
                        </pre>
                      </details>
                    )}

                    {exception.context && Object.keys(exception.context).length > 0 && (
                      <details className="mb-2">
                        <summary className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200">
                          查看上下文信息
                        </summary>
                        <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                          {JSON.stringify(exception.context, null, 2)}
                        </pre>
                      </details>
                    )}

                    {!exception.resolved && (
                      <button
                        onClick={() => resolveException(exception.id)}
                        className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        标记为已解决
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExceptionMonitor;

