import { Database } from 'lucide-react';
import DatasetsPage from './DatasetsPage';

/**
 * 数据集模块路由配置
 */
const datasetsRoute = {
  path: '/datasets',
  element: <DatasetsPage />,
  meta: {
    title: 'Datasets',
    titleZh: '数据集',
    icon: Database,
    description: 'Browse and explore machine learning datasets',
    descriptionZh: '浏览和探索机器学习数据集',
    category: 'tools',
    order: 10
  }
};

export default datasetsRoute;

