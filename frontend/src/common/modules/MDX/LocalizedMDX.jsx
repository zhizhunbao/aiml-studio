import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useMDXComponents } from '@mdx-js/react';
import { useLogger } from '@common/modules/Logger';
import { useExceptions, ExceptionType, ExceptionSeverity } from '@common/modules/Exceptions';
import { PageContainer } from '@common/components/PageContainer';
import TableOfContents from './TableOfContents';

/**
 * LocalizedMDX - 动态加载本地化的 MDX 文件
 * 根据当前语言自动切换 MDX 内容
 * 
 * @param {Object} mdxModules - 包含不同语言 MDX 模块的对象，例如：
 *   { 'en': () => import('./index.en.mdx'), 'zh-CN': () => import('./index.zh-CN.mdx') }
 * @param {boolean} showTableOfContents - 是否显示页面目录
 */
const LocalizedMDX = ({ mdxModules, showTableOfContents = false }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const logger = useLogger();
  const { captureException } = useExceptions();
  const [MDXComponent, setMDXComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const components = useMDXComponents();

  // 创建一个稳定的模块键，用于检测路由变化
  const moduleKey = useMemo(() => {
    return Object.keys(mdxModules).sort().join(',');
  }, [mdxModules]);

  useEffect(() => {
    const loadMDX = async () => {
      setLoading(true);
      setMDXComponent(null); // 清除旧组件，确保重新加载
      const currentLang = i18n.language;
      logger.debug('开始加载 MDX 内容', { language: currentLang, availableLanguages: Object.keys(mdxModules), path: location.pathname });
      
      try {
        let selectedLang = currentLang;
        let module;
        
        // 尝试加载当前语言的 MDX
        if (mdxModules[currentLang]) {
          module = await mdxModules[currentLang]();
          logger.debug('MDX 内容加载成功', { language: currentLang });
        } 
        // 如果当前语言不存在，尝试加载英文版本
        else if (mdxModules['en']) {
          module = await mdxModules['en']();
          selectedLang = 'en';
          logger.warn('当前语言不存在，回退到英文版本', { requestedLang: currentLang });
        }
        // 如果都不存在，加载第一个可用的语言
        else {
          const firstLang = Object.keys(mdxModules)[0];
          if (firstLang) {
            module = await mdxModules[firstLang]();
            selectedLang = firstLang;
            logger.warn('使用第一个可用语言', { language: firstLang });
          }
        }

        if (module) {
          setMDXComponent(() => module.default);
        }
      } catch (error) {
        logger.error('MDX 加载失败', { error: error.message, language: currentLang });
        captureException(error, {
          type: ExceptionType.RUNTIME,
          severity: ExceptionSeverity.MEDIUM,
          context: { 
            component: 'LocalizedMDX',
            language: currentLang,
            availableLanguages: Object.keys(mdxModules),
            message: 'Failed to load MDX content'
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadMDX();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, location.pathname, moduleKey]);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      </PageContainer>
    );
  }

  if (!MDXComponent) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Failed to load content</div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex w-full gap-8">
        {showTableOfContents && (
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <TableOfContents />
          </aside>
        )}
        <div className="flex-1 min-w-0">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <MDXComponent components={components} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default LocalizedMDX;

