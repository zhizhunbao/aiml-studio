/**
 * CNN 模块导出
 * 
 * 使用方式：
 * 1. 直接使用 useCNN Hook 访问全局状态
 * 2. 无需 Provider，Zustand 自动管理全局状态
 * 3. MDX 页面可直接调用 Hook
 */

export { useCNN } from './store';
export { default as route } from './route';
