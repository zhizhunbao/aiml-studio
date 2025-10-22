import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入模块国际化资源
import headerZhCN from './modules/Header/locales/zh-CN.json';
import headerEn from './modules/Header/locales/en.json';
import sidebarZhCN from './modules/Sidebar/locales/zh-CN.json';
import sidebarEn from './modules/Sidebar/locales/en.json';
import devToolsZhCN from './modules/DevTools/locales/zh-CN.json';
import devToolsEn from './modules/DevTools/locales/en.json';
import datasetsZhCN from '@modules/Datasets/locales/zh-CN.json';
import datasetsEn from '@modules/Datasets/locales/en.json';
import mdxZhCN from './modules/MDX/locales/zh-CN.json';
import mdxEn from './modules/MDX/locales/en.json';

const resources = {
  'zh-CN': {
    translation: {
      ...headerZhCN,
      ...sidebarZhCN,
      ...devToolsZhCN,
      ...datasetsZhCN,
      ...mdxZhCN,
    },
  },
  en: {
    translation: {
      ...headerEn,
      ...sidebarEn,
      ...devToolsEn,
      ...datasetsEn,
      ...mdxEn,
    },
  },
};

// 从 localStorage 读取保存的语言设置，如果没有则使用浏览器语言或默认语言
const getInitialLanguage = () => {
  // 1. 优先使用用户保存的设置
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    return savedLang;
  }
  
  // 2. 尝试使用浏览器语言
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('zh')) {
    return 'zh-CN';
  }
  
  // 3. 默认使用英文
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false,
    },
  });

// 监听语言变化并保存到 localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;

