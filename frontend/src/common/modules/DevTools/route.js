import { lazy } from 'react';

const DevTools = lazy(() => import('./DevTools'));

const routes = [
  {
    path: '/devtools',
    element: DevTools,
    meta: {
      title: 'Developer Tools',
      description: 'Monitor logs, exceptions, and system information',
    },
  },
];

export default routes;

