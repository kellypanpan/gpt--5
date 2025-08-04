import { useTranslation as useI18nextTranslation } from 'react-i18next';
import { useMemo, useCallback } from 'react';
import type { 
  Namespace, 
  TranslationFunction, 
  UseTranslationReturn,
  InterpolationOptions,
  TranslationOptions
} from '../types/i18n';
import { SUPPORTED_LANGUAGES, changeLanguage, getCurrentLanguageInfo } from '../lib/i18n';

/**
 * 增强的翻译Hook，提供类型安全和额外功能
 */
export function useTranslation<NS extends Namespace = 'common'>(
  namespace: NS = 'common' as NS,
  options?: {
    keyPrefix?: string;
    useSuspense?: boolean;
  }
): UseTranslationReturn<NS> {
  const { t: i18nextT, i18n, ready } = useI18nextTranslation(namespace, {
    useSuspense: options?.useSuspense ?? false, // 默认不使用 Suspense
    keyPrefix: options?.keyPrefix
  });

  // 创建增强的翻译函数
  const t: TranslationFunction = useCallback((key: string, opts?: TranslationOptions) => {
    try {
      // 处理插值选项
      const translationOptions: any = {};
      
      if (opts?.defaultValue) {
        translationOptions.defaultValue = opts.defaultValue;
      }
      
      if (opts?.count !== undefined) {
        translationOptions.count = opts.count;
      }
      
      if (opts?.context) {
        translationOptions.context = opts.context;
      }
      
      if (opts?.replace) {
        // 展开替换选项到根级别
        Object.assign(translationOptions, opts.replace);
      }
      
      if (opts?.lng) {
        translationOptions.lng = opts.lng;
      }
      
      if (opts?.ns) {
        translationOptions.ns = opts.ns;
      }

      return i18nextT(key, translationOptions);
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key; // 回退到键名
    }
  }, [i18nextT]);

  // 创建增强的 i18n 对象
  const enhancedI18n = useMemo(() => ({
    language: i18n.language,
    languages: i18n.languages,
    changeLanguage: (lng: string) => changeLanguage(lng as keyof typeof SUPPORTED_LANGUAGES),
    isInitialized: i18n.isInitialized,
    isInitializing: i18n.isInitializing
  }), [i18n]);

  return {
    t,
    i18n: enhancedI18n,
    ready
  };
}

/**
 * 简化的翻译Hook，只返回翻译函数
 */
export function useT<NS extends Namespace = 'common'>(
  namespace: NS = 'common' as NS,
  keyPrefix?: string
): TranslationFunction {
  const { t } = useTranslation(namespace, { keyPrefix });
  return t;
}

/**
 * 语言切换Hook
 */
export function useLanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const currentLanguage = i18n.language as keyof typeof SUPPORTED_LANGUAGES;
  const currentLanguageInfo = getCurrentLanguageInfo();
  
  const switchLanguage = useCallback(async (language: keyof typeof SUPPORTED_LANGUAGES) => {
    try {
      await changeLanguage(language);
    } catch (error) {
      console.error('Failed to switch language:', error);
      throw error;
    }
  }, []);

  const availableLanguages = useMemo(() => 
    Object.entries(SUPPORTED_LANGUAGES).map(([code, info]) => ({
      code: code as keyof typeof SUPPORTED_LANGUAGES,
      ...info,
      isCurrent: code === currentLanguage
    }))
  , [currentLanguage]);

  return {
    currentLanguage,
    currentLanguageInfo,
    availableLanguages,
    switchLanguage,
    isChanging: i18n.isInitializing
  };
}

/**
 * 翻译状态Hook
 */
export function useTranslationStatus() {
  const { ready, i18n } = useTranslation();
  
  return {
    isReady: ready,
    isInitialized: i18n.isInitialized,
    isInitializing: i18n.isInitializing,
    currentLanguage: i18n.language,
    loadedLanguages: i18n.languages
  };
}

/**
 * 格式化Hook - 提供本地化的数字、日期等格式化
 */
export function useFormatter() {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const formatNumber = useCallback((value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locale, options).format(value);
  }, [locale]);

  const formatCurrency = useCallback((value: number, currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(value);
  }, [locale]);

  const formatDate = useCallback((date: Date | number | string, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  }, [locale]);

  const formatRelativeTime = useCallback((value: number, unit: Intl.RelativeTimeFormatUnit) => {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(value, unit);
  }, [locale]);

  const formatPercent = useCallback((value: number) => {
    return new Intl.NumberFormat(locale, { style: 'percent' }).format(value);
  }, [locale]);

  return {
    formatNumber,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    formatPercent,
    locale
  };
}

/**
 * 便捷的翻译函数（用于组件外部）
 */
let globalT: TranslationFunction | null = null;

// 初始化全局翻译函数
export function initGlobalTranslation(t: TranslationFunction) {
  globalT = t;
}

// 全局翻译函数
export function t(key: string, options?: TranslationOptions): string {
  if (!globalT) {
    console.warn('Global translation function not initialized. Use useTranslation hook instead.');
    return key;
  }
  return globalT(key, options);
}

// 导出默认Hook
export default useTranslation;