import React from 'react';
import LocalizedMDX from '@common/modules/MDX/LocalizedMDX';

const route = {
  path: '/algorithms/supervised/random-forest',
  element: (
    <LocalizedMDX
      mdxModules={{
        'en': () => import('./index.en.mdx'),
        'zh-CN': () => import('./index.zh-CN.mdx'),
      }}
      showTableOfContents={true}
    />
  ),
};

export default route;

