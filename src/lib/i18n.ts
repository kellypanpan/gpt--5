import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from '../locales';

// 支持的语言列表
export const SUPPORTED_LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    dir: 'ltr'
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    dir: 'ltr'
  }
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// 语言检测配置
const languageDetectorOptions = {
  // 检测顺序
  order: [
    'querystring',  // ?lng=en
    'cookie',       // cookie
    'localStorage', // localStorage
    'sessionStorage', // sessionStorage
    'navigator',    // navigator.language
    'htmlTag',      // html lang attribute
    'path',         // /en/page
    'subdomain'     // en.example.com
  ],

  // 查找语言的键名
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // 缓存用户语言
  caches: ['localStorage', 'cookie'],

  // 排除某些域名的检测
  checkWhitelist: true,
  
  // Cookie 选项
  cookieOptions: {
    path: '/',
    sameSite: 'strict',
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
  }
};

// 初始化 i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // 默认语言
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    
    // 支持的语言列表
    supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
    nonExplicitSupportedLngs: true,
    
    // 调试模式（仅开发环境）
    debug: process.env.NODE_ENV === 'development',
    
    // 翻译资源
    resources,
    
    // 命名空间
    defaultNS: 'common',
    ns: ['common', 'pages', 'components'],
    
    // 语言检测配置
    detection: languageDetectorOptions,
    
    // 插值配置
    interpolation: {
      escapeValue: false, // React 已经处理了 XSS
      formatSeparator: ',',
      format: (value, format, lng) => {
        if (format === 'number') {
          return new Intl.NumberFormat(lng).format(value);
        }
        if (format === 'currency') {
          return new Intl.NumberFormat(lng, {
            style: 'currency',
            currency: 'USD'
          }).format(value);
        }
        if (format === 'date') {
          return new Intl.DateTimeFormat(lng).format(new Date(value));
        }
        if (format === 'datetime') {
          return new Intl.DateTimeFormat(lng, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }).format(new Date(value));
        }
        return value;
      }
    },
    
    // React 特定配置
    react: {
      // 不等待翻译加载完成，避免阻塞渲染
      wait: false,
      // 绑定 i18n 实例到 React 上下文
      bindI18n: 'languageChanged loaded',
      // 绑定 i18n store 到 React
      bindI18nStore: 'added removed',
      // 禁用 Suspense，使用我们自己的加载处理
      useSuspense: false,
      // 转义模式
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'span']
    },
    
    // 缓存选项
    load: 'languageOnly', // 只加载语言代码，不加载地区代码
    
    // 键分隔符
    keySeparator: '.',
    nsSeparator: ':',
    
    // 复数规则
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // 缺失键处理
    saveMissing: process.env.NODE_ENV === 'development',
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${ns}:${key} for language: ${lng}`);
      }
    },
    
    // 加载完成回调
    initImmediate: false
  });

// 语言切换函数
export const changeLanguage = async (language: SupportedLanguage): Promise<void> => {
  try {
    await i18n.changeLanguage(language);
    
    // 更新 HTML lang 属性
    document.documentElement.lang = language;
    
    // 更新页面方向（如果支持 RTL）
    document.documentElement.dir = SUPPORTED_LANGUAGES[language].dir;
    
    // 触发自定义事件
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language, languageInfo: SUPPORTED_LANGUAGES[language] }
    }));
    
    // 可选：刷新页面以确保所有内容更新
    // window.location.reload();
    
  } catch (error) {
    console.error('Failed to change language:', error);
    throw error;
  }
};

// 获取当前语言信息
export const getCurrentLanguageInfo = () => {
  const currentLng = i18n.language as SupportedLanguage;
  return SUPPORTED_LANGUAGES[currentLng] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
};

// 检查是否为支持的语言
export const isSupportedLanguage = (lng: string): lng is SupportedLanguage => {
  return lng in SUPPORTED_LANGUAGES;
};

// 获取浏览器首选语言
export const getBrowserLanguage = (): SupportedLanguage => {
  const browserLng = navigator.language.split('-')[0];
  return isSupportedLanguage(browserLng) ? browserLng : DEFAULT_LANGUAGE;
};

// 预加载语言包
export const preloadLanguage = (language: SupportedLanguage): Promise<void> => {
  return i18n.loadLanguages([language]);
};

// 批量预加载所有支持的语言
export const preloadAllLanguages = (): Promise<void[]> => {
  return Promise.all(
    Object.keys(SUPPORTED_LANGUAGES).map(lng => 
      preloadLanguage(lng as SupportedLanguage)
    )
  );
};

export default i18n;