import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bug, ScrollText, AlertCircle, AlertTriangle, Info, 
  ChevronDown, ChevronUp, Trash2, Download, CheckCircle, XCircle,
  Filter, Search, Clock, Terminal
} from 'lucide-react';
import { useLogger, LogLevel } from '@common/modules/Logger';
import { useExceptions, ExceptionSeverity } from '@common/modules/Exceptions';
import { PageContainer, PageHeader, PageContent, PageCard, PageToolbar } from '@common/components/PageContainer';

function DevTools() {
  const { t } = useTranslation();
  const { logs, clearLogs, exportLogs } = useLogger();
  const { exceptions, clearExceptions, resolveException, getUnresolvedExceptions } = useExceptions();
  
  const [activeTab, setActiveTab] = useState('logs'); // 'logs' | 'exceptions' | 'console'
  const [logFilter, setLogFilter] = useState('all'); // 'all' | 'error' | 'warn' | 'info' | 'debug'
  const [exceptionFilter, setExceptionFilter] = useState('unresolved'); // 'all' | 'unresolved' | 'resolved'
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());

  // 过滤日志
  const filteredLogs = logs.filter(log => {
    // 级别过滤
    if (logFilter !== 'all' && log.level !== logFilter) return false;
    
    // 搜索过滤
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return log.message.toLowerCase().includes(search) ||
             (log.data && JSON.stringify(log.data).toLowerCase().includes(search));
    }
    
    return true;
  });

  // 过滤异常
  const filteredExceptions = exceptions.filter(exception => {
    // 状态过滤
    if (exceptionFilter === 'unresolved' && exception.resolved) return false;
    if (exceptionFilter === 'resolved' && !exception.resolved) return false;
    
    // 搜索过滤
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return exception.message.toLowerCase().includes(search) ||
             exception.type.toLowerCase().includes(search) ||
             (exception.stack && exception.stack.toLowerCase().includes(search));
    }
    
    return true;
  });

  // 统计数据
  const logStats = {
    total: logs.length,
    error: logs.filter(l => l.level === LogLevel.ERROR).length,
    warn: logs.filter(l => l.level === LogLevel.WARN).length,
    info: logs.filter(l => l.level === LogLevel.INFO).length,
    debug: logs.filter(l => l.level === LogLevel.DEBUG).length,
  };

  const exceptionStats = {
    total: exceptions.length,
    unresolved: getUnresolvedExceptions().length,
    critical: exceptions.filter(e => e.severity === ExceptionSeverity.CRITICAL && !e.resolved).length,
    high: exceptions.filter(e => e.severity === ExceptionSeverity.HIGH && !e.resolved).length,
    medium: exceptions.filter(e => e.severity === ExceptionSeverity.MEDIUM && !e.resolved).length,
    low: exceptions.filter(e => e.severity === ExceptionSeverity.LOW && !e.resolved).length,
  };

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3 
    });
  };

  const getLogIcon = (level) => {
    switch (level) {
      case LogLevel.ERROR:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case LogLevel.WARN:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case LogLevel.INFO:
        return <Info className="w-4 h-4 text-blue-500" />;
      case LogLevel.DEBUG:
        return <Bug className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getLogBgColor = (level) => {
    switch (level) {
      case LogLevel.ERROR:
        return 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30';
      case LogLevel.WARN:
        return 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/30';
      case LogLevel.INFO:
        return 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30';
      case LogLevel.DEBUG:
        return 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  const getExceptionIcon = (severity) => {
    switch (severity) {
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

  const getExceptionBgColor = (severity, resolved) => {
    if (resolved) {
      return 'bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600';
    }
    switch (severity) {
      case ExceptionSeverity.CRITICAL:
      case ExceptionSeverity.HIGH:
        return 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30';
      case ExceptionSeverity.MEDIUM:
        return 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/30';
      case ExceptionSeverity.LOW:
        return 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30';
      default:
        return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <PageContainer>
      <PageHeader 
        icon={Bug}
        title={t('devTools.title', 'Developer Tools')}
        description={t('devTools.description', 'Monitor logs, exceptions, and system information')}
      />

      {/* 标签页 */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'logs'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <ScrollText className="w-4 h-4" />
            {t('devTools.logs', 'Logs')}
            <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
              {logStats.total}
            </span>
          </div>
          {activeTab === 'logs' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('exceptions')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'exceptions'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {t('devTools.exceptions', 'Exceptions')}
            <span className={`px-2 py-0.5 text-xs rounded-full ${
              exceptionStats.unresolved > 0 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              {exceptionStats.unresolved}
            </span>
          </div>
          {activeTab === 'exceptions' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('console')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'console'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            {t('devTools.console', 'Console')}
          </div>
          {activeTab === 'console' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
          )}
        </button>
      </div>

      {/* 日志视图 */}
      {activeTab === 'logs' && (
        <PageContent>
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('devTools.total', 'Total')}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{logStats.total}</div>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Error</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{logStats.error}</div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Warn</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">{logStats.warn}</div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Info</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{logStats.info}</div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Bug className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Debug</span>
              </div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{logStats.debug}</div>
            </div>
          </div>

          {/* 工具栏 */}
          <PageToolbar>
            {/* 搜索 */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('devTools.search', 'Search logs...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 过滤器 */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={logFilter}
                onChange={(e) => setLogFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('devTools.allLevels', 'All Levels')}</option>
                <option value={LogLevel.ERROR}>Error</option>
                <option value={LogLevel.WARN}>Warn</option>
                <option value={LogLevel.INFO}>Info</option>
                <option value={LogLevel.DEBUG}>Debug</option>
              </select>
            </div>

            {/* 操作按钮 */}
            <button
              onClick={exportLogs}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              title={t('devTools.exportLogs', 'Export Logs')}
            >
              <Download className="w-4 h-4" />
              {t('devTools.export', 'Export')}
            </button>

            <button
              onClick={clearLogs}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
              title={t('devTools.clearLogs', 'Clear Logs')}
            >
              <Trash2 className="w-4 h-4" />
              {t('devTools.clear', 'Clear')}
            </button>
          </PageToolbar>

          {/* 日志列表 */}
          <PageCard className="overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <ScrollText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{t('devTools.noLogs', 'No logs to display')}</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-l-4 ${getLogBgColor(log.level)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getLogIcon(log.level)}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {formatTimestamp(log.timestamp)}
                            </span>
                            <span className={`text-xs font-semibold uppercase ${
                              log.level === LogLevel.ERROR ? 'text-red-600' :
                              log.level === LogLevel.WARN ? 'text-yellow-600' :
                              log.level === LogLevel.INFO ? 'text-blue-600' :
                              'text-gray-600'
                            }`}>
                              {log.level}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-900 dark:text-gray-100 mb-1">
                            {log.message}
                          </p>
                          
                          {log.data && (
                            <div className="mt-2">
                              <button
                                onClick={() => toggleExpand(log.id)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                              >
                                {expandedItems.has(log.id) ? (
                                  <>
                                    <ChevronUp className="w-3 h-3" />
                                    {t('devTools.hideData', 'Hide Data')}
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3 h-3" />
                                    {t('devTools.showData', 'Show Data')}
                                  </>
                                )}
                              </button>
                              
                              {expandedItems.has(log.id) && (
                                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
                                  {JSON.stringify(log.data, null, 2)}
                                </pre>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PageCard>
        </PageContent>
      )}

      {/* 异常视图 */}
      {activeTab === 'exceptions' && (
        <PageContent>
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {t('devTools.total', 'Total')}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{exceptionStats.total}</div>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800/30">
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                {t('devTools.unresolved', 'Unresolved')}
              </div>
              <div className="text-2xl font-bold text-orange-600">{exceptionStats.unresolved}</div>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Critical</span>
              </div>
              <div className="text-2xl font-bold text-red-600">{exceptionStats.critical}</div>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800/20">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">High</span>
              </div>
              <div className="text-2xl font-bold text-red-500">{exceptionStats.high}</div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Medium</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">{exceptionStats.medium}</div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Low</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{exceptionStats.low}</div>
            </div>
          </div>

          {/* 工具栏 */}
          <PageToolbar>
            {/* 搜索 */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('devTools.searchExceptions', 'Search exceptions...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 过滤器 */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={exceptionFilter}
                onChange={(e) => setExceptionFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t('devTools.allExceptions', 'All Exceptions')}</option>
                <option value="unresolved">{t('devTools.unresolved', 'Unresolved')}</option>
                <option value="resolved">{t('devTools.resolved', 'Resolved')}</option>
              </select>
            </div>

            {/* 操作按钮 */}
            <button
              onClick={clearExceptions}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
              title={t('devTools.clearExceptions', 'Clear Exceptions')}
            >
              <Trash2 className="w-4 h-4" />
              {t('devTools.clear', 'Clear')}
            </button>
          </PageToolbar>

          {/* 异常列表 */}
          <PageCard className="overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              {filteredExceptions.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{t('devTools.noExceptions', 'No exceptions to display')}</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredExceptions.map((exception) => (
                    <div
                      key={exception.id}
                      className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-l-4 ${getExceptionBgColor(exception.severity, exception.resolved)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getExceptionIcon(exception.severity)}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {formatTimestamp(exception.timestamp)}
                            </span>
                            <span className={`text-xs font-semibold uppercase px-2 py-0.5 rounded ${
                              exception.severity === ExceptionSeverity.CRITICAL ? 'bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-300' :
                              exception.severity === ExceptionSeverity.HIGH ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                              exception.severity === ExceptionSeverity.MEDIUM ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                              'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            }`}>
                              {exception.severity}
                            </span>
                            <span className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                              {exception.type}
                            </span>
                            {exception.resolved && (
                              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                <CheckCircle className="w-3 h-3" />
                                {t('devTools.resolved', 'Resolved')}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-2">
                            {exception.message}
                          </p>
                          
                          {exception.context && (
                            <div className="mb-2">
                              <button
                                onClick={() => toggleExpand(`${exception.id}-context`)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                              >
                                {expandedItems.has(`${exception.id}-context`) ? (
                                  <>
                                    <ChevronUp className="w-3 h-3" />
                                    {t('devTools.hideContext', 'Hide Context')}
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3 h-3" />
                                    {t('devTools.showContext', 'Show Context')}
                                  </>
                                )}
                              </button>
                              
                              {expandedItems.has(`${exception.id}-context`) && (
                                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
                                  {JSON.stringify(exception.context, null, 2)}
                                </pre>
                              )}
                            </div>
                          )}
                          
                          {exception.stack && (
                            <div className="mb-2">
                              <button
                                onClick={() => toggleExpand(`${exception.id}-stack`)}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                              >
                                {expandedItems.has(`${exception.id}-stack`) ? (
                                  <>
                                    <ChevronUp className="w-3 h-3" />
                                    {t('devTools.hideStack', 'Hide Stack Trace')}
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3 h-3" />
                                    {t('devTools.showStack', 'Show Stack Trace')}
                                  </>
                                )}
                              </button>
                              
                              {expandedItems.has(`${exception.id}-stack`) && (
                                <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
                                  {exception.stack}
                                </pre>
                              )}
                            </div>
                          )}
                          
                          {!exception.resolved && (
                            <button
                              onClick={() => resolveException(exception.id)}
                              className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              {t('devTools.markResolved', 'Mark as Resolved')}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </PageCard>
        </PageContent>
      )}

      {/* Console 视图 */}
      {activeTab === 'console' && (
        <PageCard className="p-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Terminal className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="mb-2">{t('devTools.consoleInfo', 'Browser console integration')}</p>
            <p className="text-sm">{t('devTools.consoleHint', 'Open browser DevTools (F12) to view console output')}</p>
          </div>
        </PageCard>
      )}
    </PageContainer>
  );
}

export default DevTools;

