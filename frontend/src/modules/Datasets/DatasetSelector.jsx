import React from 'react';
import { useTranslation } from 'react-i18next';
import { Database, Loader2, AlertCircle } from 'lucide-react';
import { useDatasets } from './store';

/**
 * 数据集选择器组件
 * @param {string} value - 当前选中的数据集名称
 * @param {function} onChange - 数据集变化时的回调
 * @param {string} filter - 按类型过滤数据集（'regression', 'classification' 等）
 * @param {boolean} readonly - 只读模式，固定显示当前数据集，不显示选择器
 * @param {string} className - 自定义样式类名
 */
const DatasetSelector = ({ 
  value, 
  onChange, 
  filter = null,
  readonly = false,
  className = '' 
}) => {
  const { t } = useTranslation();
  const { metadata, loading } = useDatasets();
  
  // 只读模式：固定数据集，不显示选择器
  if (readonly) {
    return null; // 只读模式下不显示选择器，只显示 DatasetInfo 和 DatasetPreview
  }
  
  // 过滤数据集（按类型）
  const availableDatasets = Object.entries(metadata).filter(([name, meta]) => {
    if (!filter) return true;
    return meta.type === filter;
  });
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
        <Database size={16} />
        {t('dataset.selectDataset', 'Select Dataset')}
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading[value]}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">
          {t('dataset.chooseDataset', 'Choose a dataset...')}
        </option>
        {availableDatasets.map(([name, meta]) => (
          <option key={name} value={name}>
            {t('common.language') === 'zh-CN' ? meta.nameZh : meta.name}
            {` (${meta.samples} ${t('dataset.samples', 'samples')})`}
          </option>
        ))}
      </select>
      
      {loading[value] && (
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Loader2 size={14} className="animate-spin" />
          {t('dataset.loading', 'Loading dataset...')}
        </div>
      )}
    </div>
  );
};

/**
 * 数据集信息卡片
 */
const DatasetInfo = ({ datasetName, className = '' }) => {
  const { t, i18n } = useTranslation();
  const { metadata, datasets } = useDatasets();
  const dataset = datasets[datasetName];
  
  if (!datasetName || !metadata[datasetName]) return null;
  
  const meta = metadata[datasetName];
  const isZh = i18n.language === 'zh-CN';
  
  return (
    <div className={`bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <Database className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
            {isZh ? meta.nameZh : meta.name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {isZh ? meta.descriptionZh : meta.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <div className="text-gray-500 dark:text-gray-500">
                {t('dataset.samples', 'Samples')}
              </div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {dataset ? dataset.shape[0] : meta.samples}
              </div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-500">
                {t('dataset.features', 'Features')}
              </div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {meta.features}
              </div>
            </div>
            {meta.classes && (
              <div>
                <div className="text-gray-500 dark:text-gray-500">
                  {t('dataset.classes', 'Classes')}
                </div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {meta.classes}
                </div>
              </div>
            )}
            <div>
              <div className="text-gray-500 dark:text-gray-500">
                {t('dataset.type', 'Type')}
              </div>
              <div className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                {t(`dataset.type.${meta.type}`, meta.type)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 数据集加载器 Hook
 */
const useDataset = (datasetName) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { loadDataset, datasets } = useDatasets();
  const dataset = datasets[datasetName];
  
  React.useEffect(() => {
    if (datasetName && !dataset) {
      setLoading(true);
      setError(null);
      
      loadDataset(datasetName)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [datasetName, dataset, loadDataset]);
  
  return { dataset, loading, error };
};

/**
 * 数据预览表格
 */
const DatasetPreview = ({ datasetName, maxRows = 5, className = '' }) => {
  const { t } = useTranslation();
  const { dataset, loading, error } = useDataset(datasetName);
  
  if (!datasetName) return null;
  
  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={24} />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`bg-red-50 dark:bg-red-900/20 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-600 dark:text-red-400 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
              {t('dataset.error', 'Error loading dataset')}
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!dataset) return null;
  
  const previewData = dataset.data.slice(0, maxRows);
  const hasMore = dataset.data.length > maxRows;
  
  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {dataset.headers.map((header, idx) => (
                <th 
                  key={idx}
                  className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900">
            {previewData.map((row, rowIdx) => (
              <tr 
                key={rowIdx}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {dataset.headers.map((header, colIdx) => (
                  <td 
                    key={colIdx}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400"
                  >
                    {typeof row[header] === 'number' 
                      ? row[header].toFixed(3)
                      : row[header]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400 text-center">
          {t('dataset.showingRows', `Showing {{count}} of {{total}} rows`, {
            count: maxRows,
            total: dataset.data.length
          })}
        </div>
      )}
    </div>
  );
};

export { DatasetSelector, DatasetInfo, DatasetPreview, useDataset };
export default DatasetSelector;

