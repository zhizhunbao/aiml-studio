import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Database, 
  Search, 
  Filter, 
  Download,
  BarChart3,
  Grid3x3,
  Table2,
  ChevronRight,
  Info,
  Eye
} from 'lucide-react';
import { useDatasets, DATASETS_METADATA } from './store';
import { DatasetPreview } from './DatasetSelector';
import { PageContainer, PageHeader, PageContent, PageCard, PageToolbar } from '@common/components/PageContainer';

/**
 * 数据集浏览页面
 * 提供数据集的浏览、搜索、预览功能
 */
const DatasetsPage = () => {
  const { t, i18n } = useTranslation();
  const { metadata, datasets, loadDataset } = useDatasets();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  
  const isZh = i18n.language === 'zh-CN';

  // 过滤和搜索数据集
  const filteredDatasets = useMemo(() => {
    return Object.entries(metadata).filter(([name, meta]) => {
      // 类型过滤
      if (typeFilter !== 'all' && meta.type !== typeFilter) {
        return false;
      }
      
      // 搜索过滤
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const nameMatch = (isZh ? meta.nameZh : meta.name).toLowerCase().includes(term);
        const descMatch = (isZh ? meta.descriptionZh : meta.description).toLowerCase().includes(term);
        return nameMatch || descMatch;
      }
      
      return true;
    });
  }, [metadata, typeFilter, searchTerm, isZh]);

  // 统计信息
  const stats = useMemo(() => {
    const all = Object.values(metadata);
    return {
      total: all.length,
      classification: all.filter(m => m.type === 'classification').length,
      regression: all.filter(m => m.type === 'regression').length,
      totalSamples: all.reduce((sum, m) => sum + m.samples, 0),
      loaded: Object.keys(datasets).length
    };
  }, [metadata, datasets]);

  // 加载并预览数据集
  const handlePreview = async (datasetName) => {
    setSelectedDataset(datasetName);
    if (!datasets[datasetName]) {
      await loadDataset(datasetName);
    }
  };

  return (
    <PageContainer>
      <PageHeader 
        icon={Database}
        title={t('datasets.title', 'Datasets')}
        description={t('datasets.subtitle', 'Browse and explore available machine learning datasets')}
      />

      {/* 统计信息 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard 
          icon={Database}
          label={t('datasets.stats.total', 'Total Datasets')}
          value={stats.total}
          color="blue"
        />
        <StatCard 
          icon={Grid3x3}
          label={t('datasets.stats.classification', 'Classification')}
          value={stats.classification}
          color="green"
        />
        <StatCard 
          icon={BarChart3}
          label={t('datasets.stats.regression', 'Regression')}
          value={stats.regression}
          color="purple"
        />
        <StatCard 
          icon={Table2}
          label={t('datasets.stats.samples', 'Total Samples')}
          value={stats.totalSamples.toLocaleString()}
          color="orange"
        />
        <StatCard 
          icon={Download}
          label={t('datasets.stats.loaded', 'Loaded')}
          value={stats.loaded}
          color="pink"
        />
      </div>

      <PageContent>
        {/* 搜索和过滤栏 */}
        <PageToolbar>
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={t('datasets.search', 'Search datasets...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* 类型过滤 */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('datasets.filter.all', 'All Types')}</option>
                <option value="classification">{t('datasets.filter.classification', 'Classification')}</option>
                <option value="regression">{t('datasets.filter.regression', 'Regression')}</option>
              </select>
            </div>

            {/* 视图切换 */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${
                  viewMode === 'table'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Table2 size={18} />
              </button>
            </div>
          </div>
        </PageToolbar>

        {/* 结果计数 */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {t('datasets.results', 'Showing {{count}} of {{total}} datasets', {
            count: filteredDatasets.length,
            total: stats.total
          })}
        </div>

        {/* 数据集列表 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDatasets.map(([name, meta]) => (
              <DatasetCard
                key={name}
                name={name}
                meta={meta}
                isLoaded={!!datasets[name]}
                isSelected={selectedDataset === name}
                onPreview={() => handlePreview(name)}
                isZh={isZh}
              />
            ))}
          </div>
        ) : (
          <DatasetTable
            datasets={filteredDatasets}
            loadedDatasets={datasets}
            selectedDataset={selectedDataset}
            onPreview={handlePreview}
            isZh={isZh}
          />
        )}

        {/* 数据预览面板 */}
        {selectedDataset && (
          <PageCard className="overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="text-blue-600 dark:text-blue-400" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {t('datasets.preview', 'Dataset Preview')}
                  </h3>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                    {selectedDataset}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDataset(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <DatasetPreview datasetName={selectedDataset} maxRows={10} />
              </div>
            </PageCard>
        )}
      </PageContent>
    </PageContainer>
  );
};

/**
 * 统计卡片组件
 */
const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
  };

  return (
    <div className={`${colorClasses[color]} rounded-lg p-4`}>
      <Icon size={20} className="mb-2" />
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs opacity-80">{label}</div>
    </div>
  );
};

/**
 * 数据集卡片组件（网格视图）
 */
const DatasetCard = ({ name, meta, isLoaded, isSelected, onPreview, isZh }) => {
  const { t } = useTranslation();
  
  const typeColors = {
    classification: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    regression: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all cursor-pointer
                ${isSelected 
                  ? 'border-blue-500 dark:border-blue-400 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
      onClick={onPreview}
    >
      <div className="p-5">
        {/* 头部 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {isZh ? meta.nameZh : meta.name}
            </h3>
          </div>
          {isLoaded && (
            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">
              {t('datasets.loaded', 'Loaded')}
            </span>
          )}
        </div>

        {/* 描述 */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {isZh ? meta.descriptionZh : meta.description}
        </p>

        {/* 标签 */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 text-xs font-medium rounded ${typeColors[meta.type]}`}>
            {t(`dataset.type.${meta.type}`, meta.type)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {name}
          </span>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-500">{t('dataset.samples', 'Samples')}</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{meta.samples.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-500">{t('dataset.features', 'Features')}</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{meta.features}</div>
          </div>
          {meta.classes && (
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-500">{t('dataset.classes', 'Classes')}</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{meta.classes}</div>
            </div>
          )}
        </div>
      </div>

      {/* 预览按钮 */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
            <Eye size={14} />
            {t('datasets.viewDetails', 'View Details')}
          </span>
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

/**
 * 数据集表格组件（表格视图）
 */
const DatasetTable = ({ datasets, loadedDatasets, selectedDataset, onPreview, isZh }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('datasets.table.name', 'Dataset')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('datasets.table.type', 'Type')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('datasets.table.samples', 'Samples')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('datasets.table.features', 'Features')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('datasets.table.classes', 'Classes')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('datasets.table.status', 'Status')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('datasets.table.action', 'Action')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {datasets.map(([name, meta]) => {
              const isLoaded = !!loadedDatasets[name];
              const isSelected = selectedDataset === name;
              
              return (
                <tr 
                  key={name}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${
                    isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Database className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={16} />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {isZh ? meta.nameZh : meta.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">{name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${
                      meta.type === 'classification'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                    }`}>
                      {t(`dataset.type.${meta.type}`, meta.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {meta.samples.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {meta.features}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {meta.classes || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isLoaded && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">
                        {t('datasets.loaded', 'Loaded')}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => onPreview(name)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center gap-1"
                    >
                      <Eye size={14} />
                      {t('datasets.preview', 'Preview')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DatasetsPage;

