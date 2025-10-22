/**
 * Exceptions 模块导出
 * 
 * 使用方式（基于 Zustand，无需 Provider）：
 * 1. 在应用根组件添加 GlobalExceptionBoundary 和 ExceptionNotifications
 * 2. 直接在任何组件中使用 useExceptions Hook
 * 3. （可选）添加 ExceptionMonitor 页面查看异常列表
 */

// ============================================
// Hooks & Constants
// ============================================

export { useExceptions, ExceptionType, ExceptionSeverity } from './store';

// ============================================
// Components
// ============================================

export { default as ExceptionMonitor } from './ExceptionMonitor';
export {
  ExceptionToast,
  ExceptionNotifications,
  ExceptionStats,
  GlobalExceptionBoundary,
} from './ExceptionComponents';

// ============================================
// Routing
// ============================================

export { default as routes } from './route';

