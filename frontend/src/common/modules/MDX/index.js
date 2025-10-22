/**
 * MDX 模块导出
 * 
 * 使用方式：
 * 1. 在应用根组件包裹 MDXProvider
 * 2. MDXComponents 会自动应用到所有 MDX 内容
 * 3. 可以直接导入组件在自定义页面中使用
 */

export { MDXProvider, useMDX } from './store';
export { default as MDXComponents } from './MDXComponents';
export { default as LocalizedMDX } from './LocalizedMDX';
export { default as routes } from './route';

// 导出常用的 MDX 组件供直接使用
export {
  CodeBlock,
  Chart,
  Demo,
  ParameterSlider,
  AlgorithmHeader,
  Button,
} from './MDXComponents';

