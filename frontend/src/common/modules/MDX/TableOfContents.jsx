import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * 页面目录组件 - 自动解析 DOM 中的标题并生成导航
 */
const TableOfContents = () => {
  const { t, i18n } = useTranslation();
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  // 从 DOM 中解析标题
  useEffect(() => {
    const parseHeadings = () => {
      // 查找所有 h1-h6 标题
      const headingElements = document.querySelectorAll('.mdx-content h1, .mdx-content h2, .mdx-content h3, .mdx-content h4, .mdx-content h5, .mdx-content h6');
      
      const usedIds = new Set(); // 跟踪已使用的 ID
      
      const matches = Array.from(headingElements).map((element, index) => {
        const level = parseInt(element.tagName.charAt(1)); // h1 -> 1, h2 -> 2, etc.
        const text = element.textContent.trim();
        
        // 如果没有 id，生成一个
        let id = element.id;
        if (!id) {
          // 生成基础 ID
          let baseId = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // 移除特殊字符
            .replace(/\s+/g, '-') // 空格替换为连字符
            .replace(/^-+|-+$/g, ''); // 移除首尾连字符
          
          // 如果生成的 ID 为空或只有数字，使用 heading-{index} 作为后备
          if (!baseId || /^\d+$/.test(baseId)) {
            baseId = `heading-${index}`;
          }
          
          // 确保 ID 唯一
          id = baseId;
          let counter = 1;
          while (usedIds.has(id)) {
            id = `${baseId}-${counter}`;
            counter++;
          }
          
          usedIds.add(id);
          element.id = id;
        } else {
          usedIds.add(id);
        }

        return {
          id,
          text,
          level,
          element
        };
      });

      setHeadings(matches);
      
      // 重置 activeId，让滚动监听重新计算
      if (matches.length > 0) {
        setActiveId('');
      }
    };

    // 延迟执行，确保 DOM 已经渲染
    const timer = setTimeout(parseHeadings, 100);
    
    return () => clearTimeout(timer);
  }, [i18n.language]); // 添加语言依赖，语言切换时重新解析


  // 监听滚动，高亮当前可见的标题
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // 偏移量

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading.element && heading.element.offsetTop <= scrollPosition) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  // 点击跳转到对应标题
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-8 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 pr-2">
      <div className="w-full">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wider px-2">
          {t('common.tableOfContents')}
        </h3>
        <nav className="space-y-0.5">
          {headings.map((heading, index) => (
            <div key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  block w-full text-left text-xs transition-all duration-200 py-1.5 px-2 rounded
                  ${heading.level === 1 ? 'font-semibold text-sm' : heading.level === 2 ? 'font-medium' : 'font-normal'}
                  ${
                    activeId === heading.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-2 border-transparent'
                  }
                `}
                style={{
                  paddingLeft: heading.level > 1 ? `${(heading.level - 1) * 12 + 8}px` : '8px'
                }}
              >
                {heading.text}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;

