import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';
import { Play, RotateCcw, Code, Eye, EyeOff } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';

// CodeBlock 组件 - 用于显示代码
function CodeBlock({ children, className }) {
  const { t } = useTranslation();
  const [showCode, setShowCode] = useState(true);
  const language = className ? className.replace(/language-/, '') : 'python';

  React.useEffect(() => {
    Prism.highlightAll();
  }, [showCode]);

  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {language.toUpperCase()}
        </span>
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
        >
          {showCode ? (
            <>
              <EyeOff className="w-4 h-4" /> {t('common.hideCode')}
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" /> {t('common.showCode')}
            </>
          )}
        </button>
      </div>
      {showCode && (
        <pre className={`language-${language}`}>
          <code className={`language-${language}`}>{children}</code>
        </pre>
      )}
    </div>
  );
}

// Chart 组件 - 用于显示 Plotly 图表
function Chart({ data, layout, config, className = '' }) {
  const defaultLayout = {
    autosize: true,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    font: {
      family: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
    },
    ...layout,
  };

  const defaultConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    ...config,
  };

  return (
    <div className={`demo-container ${className}`}>
      <Plot
        data={data}
        layout={defaultLayout}
        config={defaultConfig}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
}

// Demo 组件 - 交互式演示容器
function Demo({ children, title, className = '' }) {
  return (
    <div className={`demo-container flex-1 flex flex-col ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      )}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

// ParameterSlider 组件 - 参数调整滑块
function ParameterSlider({ label, value, onChange, min, max, step, unit = '' }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

// DatasetSelector 组件 - 数据集选择器
function DatasetSelector({ value, onChange, datasets, label }) {
  const { t } = useTranslation();
  
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
        {label || t('common.selectDataset')}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {datasets.map((dataset) => (
          <option key={dataset.value} value={dataset.value}>
            {dataset.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// DatasetPreview 组件 - 数据集预览
function DatasetPreview({ dataset, loading }) {
  const { t } = useTranslation();
  
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    );
  }
  
  if (!dataset) return null;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
        📊 {t('common.datasetInfo')}
      </h5>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-600 dark:text-gray-400">{t('common.samples')}:</span>
          <span className="ml-2 font-mono font-semibold">{dataset.n_samples}</span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">{t('common.features')}:</span>
          <span className="ml-2 font-mono font-semibold">{dataset.n_features}</span>
        </div>
        {dataset.n_classes && (
          <div>
            <span className="text-gray-600 dark:text-gray-400">{t('common.classes')}:</span>
            <span className="ml-2 font-mono font-semibold">{dataset.n_classes}</span>
          </div>
        )}
        {dataset.description && (
          <div className="col-span-2">
            <span className="text-gray-600 dark:text-gray-400">{t('common.description')}:</span>
            <p className="mt-1 text-gray-700 dark:text-gray-300">{dataset.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// AlgorithmHeader 组件 - 算法页面头部
function AlgorithmHeader({ title, difficulty, time, stars }) {
  const { t } = useTranslation();
  
  const difficultyColors = {
    beginner: 'text-green-600 dark:text-green-400',
    intermediate: 'text-yellow-600 dark:text-yellow-400',
    advanced: 'text-red-600 dark:text-red-400',
  };

  const renderStars = (count) => {
    return '⭐'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h1>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${difficultyColors[difficulty]}`}>
            {renderStars(stars)}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {t(`difficulty.${difficulty}`)}
          </span>
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          ⏱️ {time} {t('common.minutes')}
        </div>
      </div>
    </div>
  );
}

// Button 组件
function Button({ children, onClick, variant = 'primary', icon: Icon, disabled = false }) {
  const variants = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} flex items-center gap-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

// MDX 组件映射
const MDXComponents = {
  // 自定义组件
  CodeBlock,
  Chart,
  Demo,
  ParameterSlider,
  DatasetSelector,
  DatasetPreview,
  AlgorithmHeader,
  Button,
  // 图标
  PlayIcon: Play,
  ResetIcon: RotateCcw,
  CodeIcon: Code,
  // HTML 元素样式覆盖
  h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold mt-5 mb-2" {...props} />,
  p: (props) => <p className="my-4 leading-relaxed" {...props} />,
  ul: (props) => <ul className="list-disc list-inside my-4 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside my-4 space-y-2" {...props} />,
  li: (props) => <li className="ml-4" {...props} />,
  code: ({ className, children }) => {
    // 如果是代码块（有 className），使用 CodeBlock
    if (className) {
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }
    // 如果是行内代码，使用简单样式
    return <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">{children}</code>;
  },
  pre: ({ children }) => <>{children}</>, // pre 标签由 CodeBlock 处理
};

// 导出单独的组件供外部使用
export {
  CodeBlock,
  Chart,
  Demo,
  ParameterSlider,
  DatasetSelector,
  DatasetPreview,
  AlgorithmHeader,
  Button,
  Play as PlayIcon,
  RotateCcw as ResetIcon,
};

// 导出新的交互式实验组件
export { 
  default as InteractiveExperiment,
  ExperimentPanel,
  ParameterControl,
  ResultCard
} from './InteractiveExperiment';

export default MDXComponents;

