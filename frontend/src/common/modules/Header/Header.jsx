import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Bug, Database } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLogger } from '@common/modules/Logger';

function Header({ darkMode, toggleDarkMode }) {
  const { t, i18n } = useTranslation();
  const logger = useLogger();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh-CN' ? 'en' : 'zh-CN';
    logger.info('切换语言', { from: i18n.language, to: newLang });
    i18n.changeLanguage(newLang);
  };

  const handleToggleDarkMode = () => {
    logger.info('切换主题', { darkMode: !darkMode });
    toggleDarkMode();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Logo and Title */}
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          🎓 {t('app.title')}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 hidden md:block">
          {t('app.subtitle')}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* 数据集 */}
        <Link
          to="/datasets"
          onClick={() => logger.info('导航到数据集页面', { path: '/datasets', previousPath: location.pathname })}
          className={`p-2 rounded-lg transition-colors ${
            isActive('/datasets')
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
          aria-label={t('nav.datasets')}
          title={t('nav.datasets')}
        >
          <Database className="w-5 h-5" />
        </Link>

        {/* 开发工具 */}
        <Link
          to="/devtools"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Developer Tools"
          title={t('devTools.title', 'Developer Tools')}
        >
          <Bug className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </Link>

        {/* 语言切换 */}
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle language"
        >
          <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* 主题切换 */}
        <button
          onClick={handleToggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;

