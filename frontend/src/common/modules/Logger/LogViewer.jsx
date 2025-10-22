import React, { useState } from 'react';
import { useLogger, LogLevel } from './store';
import { 
  FileText, 
  Download, 
  Trash2, 
  Filter, 
  Search,
  AlertCircle,
  Info,
  AlertTriangle,
  Bug
} from 'lucide-react';

/**
 * 日志查看器组件
 * 提供日志列表查看、过滤、搜索、导出等功能
 */
function LogViewer() {
  const {
    logs,
    logLevel,
    setLogLevel,
    clearLogs,
    exportLogs,
    getFilteredLogs,
  } = useLogger();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  // 根据日志级别返回对应图标和颜色
  const getLogIcon = (level) => {
    switch (level) {
      case LogLevel.DEBUG:
        return <Bug className="w-4 h-4 text-gray-500" />;
      case LogLevel.INFO:
        return <Info className="w-4 h-4 text-blue-500" />;
      case LogLevel.WARN:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case LogLevel.ERROR:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // 获取日志级别的样式类
  const getLogLevelClass = (level) => {
    switch (level) {
      case LogLevel.DEBUG:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
      case LogLevel.INFO:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case LogLevel.WARN:
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case LogLevel.ERROR:
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  // 过滤并搜索日志
  const filteredLogs = getFilteredLogs().filter(log => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      log.message.toLowerCase().includes(search) ||
      log.level.toLowerCase().includes(search) ||
      (log.data && JSON.stringify(log.data).toLowerCase().includes(search))
    );
  });

  // 格式化时间
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* 头部工具栏 */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            日志查看器
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={exportLogs}
              className="btn btn-secondary flex items-center gap-2"
              title="导出日志"
            >
              <Download className="w-4 h-4" />
              导出
            </button>
            <button
              onClick={clearLogs}
              className="btn btn-secondary flex items-center gap-2 text-red-600 hover:text-red-700"
              title="清空日志"
            >
              <Trash2 className="w-4 h-4" />
              清空
            </button>
          </div>
        </div>

        {/* 过滤和搜索 */}
        <div className="flex items-center gap-4">
          {/* 日志级别过滤 */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={logLevel}
              onChange={(e) => setLogLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            >
              <option value={LogLevel.DEBUG}>DEBUG+</option>
              <option value={LogLevel.INFO}>INFO+</option>
              <option value={LogLevel.WARN}>WARN+</option>
              <option value={LogLevel.ERROR}>ERROR</option>
            </select>
          </div>

          {/* 搜索框 */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索日志..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>

          {/* 日志统计 */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            共 {filteredLogs.length} 条日志
          </div>
        </div>
      </div>

      {/* 日志列表 */}
      <div className="flex-1 overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>暂无日志</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                  selectedLog?.id === log.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* 日志图标 */}
                  <div className="mt-1">
                    {getLogIcon(log.level)}
                  </div>

                  {/* 日志内容 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLogLevelClass(log.level)}`}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(log.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-100 break-words">
                      {log.message}
                    </p>
                    {log.data && (
                      <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
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

export default LogViewer;

