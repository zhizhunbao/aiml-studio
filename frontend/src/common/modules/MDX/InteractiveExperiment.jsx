import React from 'react';
import { useTranslation } from 'react-i18next';
import { Play, RotateCcw } from 'lucide-react';

/**
 * 交互式实验组件 - 简洁版设计
 * @param {object} props
 * @param {string} props.title - 实验标题
 * @param {string} props.description - 实验描述
 * @param {Array<string>} props.steps - 实验步骤说明（可选）
 * @param {React.ReactNode} props.guide - 自定义实验指导内容（可选，与 steps 二选一）
 * @param {React.ReactNode} props.children - 实验内容（参数面板、可视化等）
 * @param {Function} props.onRun - 运行实验的回调
 * @param {Function} props.onReset - 重置参数的回调
 * @param {boolean} props.loading - 是否正在运行
 * @param {React.ReactNode} props.result - 实验结果
 */
const InteractiveExperiment = ({
  title,
  description,
  steps = null,
  guide = null,
  children,
  onRun,
  onReset,
  loading = false,
  result = null,
  className = ''
}) => {
  const { t } = useTranslation();

  return (
    <div className={`not-prose space-y-6 ${className}`}>
      {/* 标题和描述 */}
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
      )}

      {/* 实验内容 */}
      <div className="space-y-4">
        {children}
      </div>

      {/* 操作按钮 */}
      {(onRun || onReset) && (
        <div className="flex gap-3">
          {onRun && (
            <button
              onClick={onRun}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Play size={16} />
              {loading ? t('running', '运行中...') : t('run', '运行')}
            </button>
          )}
          {onReset && (
            <button
              onClick={onReset}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <RotateCcw size={16} />
              {t('reset', '重置')}
            </button>
          )}
        </div>
      )}

      {/* 结果展示区域 */}
      {result && (
        <div className="mt-2">
          {result}
        </div>
      )}
    </div>
  );
};

/**
 * 实验面板组件 - 用于组织内容的简单面板
 */
export const ExperimentPanel = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 ${className}`}>
      {title && (
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h4>
      )}
      {children}
    </div>
  );
};

/**
 * 参数控制组件 - 简单的滑块控制器
 */
export const ParameterControl = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step, 
  unit = ''
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
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
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">{min}{unit}</span>
        <span className="text-xs text-gray-400">{max}{unit}</span>
      </div>
    </div>
  );
};

/**
 * 结果卡片组件 - 简洁版
 */
export const ResultCard = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${className}`}>
      {title && (
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h4>
      )}
      {children}
    </div>
  );
};

export default InteractiveExperiment;

