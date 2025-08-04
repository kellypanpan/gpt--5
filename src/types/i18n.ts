// 翻译资源的类型定义
export interface TranslationResources {
  common: {
    navigation: {
      home: string;
      tools: string;
      blog: string;
      useCases: string;
      pricing: string;
    };
    actions: {
      getStarted: string;
      learnMore: string;
      tryNow: string;
      signIn: string;
      signOut: string;
      signUp: string;
      save: string;
      cancel: string;
      delete: string;
      edit: string;
      submit: string;
      back: string;
      next: string;
      previous: string;
      close: string;
    };
    status: {
      loading: string;
      success: string;
      error: string;
      warning: string;
      info: string;
    };
    time: {
      now: string;
      today: string;
      yesterday: string;
      tomorrow: string;
      thisWeek: string;
      lastWeek: string;
      thisMonth: string;
      lastMonth: string;
    };
    credits: {
      remaining: string;
      used: string;
      purchase: string;
      insufficient: string;
    };
    subscription: {
      free: string;
      pro: string;
      creator: string;
      lifetime: string;
      upgrade: string;
      manage: string;
    };
  };
  pages: {
    home: {
      hero: {
        title: string;
        subtitle: string;
        description: string;
      };
      features: {
        title: string;
        subtitle: string;
        writer: {
          title: string;
          description: string;
        };
        imageGenerator: {
          title: string;
          description: string;
        };
        pdfAnalyzer: {
          title: string;
          description: string;
        };
        scriptGenerator: {
          title: string;
          description: string;
        };
      };
      pricing: {
        title: string;
        subtitle: string;
        monthly: string;
        yearly: string;
        save: string;
      };
      testimonials: {
        title: string;
        subtitle: string;
      };
      cta: {
        title: string;
        subtitle: string;
        button: string;
      };
    };
  };
  components: Record<string, any>; // 组件翻译暂时用通用类型
}

// 翻译键的类型定义（支持嵌套）
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

// 翻译键类型
export type TranslationKey = NestedKeyOf<TranslationResources>;

// 命名空间类型
export type Namespace = keyof TranslationResources;

// 特定命名空间的键类型
export type TranslationKeyFromNamespace<NS extends Namespace> = NestedKeyOf<TranslationResources[NS]>;

// 插值参数类型
export interface InterpolationOptions {
  [key: string]: string | number | boolean | Date;
  count?: number;
  percent?: number;
}

// 翻译选项类型
export interface TranslationOptions {
  ns?: Namespace | Namespace[];
  defaultValue?: string;
  count?: number;
  context?: string;
  replace?: InterpolationOptions;
  lng?: string;
}

// 语言信息类型
export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

// 语言切换事件类型
export interface LanguageChangeEvent extends CustomEvent {
  detail: {
    language: string;
    languageInfo: LanguageInfo;
  };
}

// 翻译函数类型
export interface TranslationFunction {
  // 基础翻译
  <TKey extends TranslationKey>(key: TKey, options?: TranslationOptions): string;
  
  // 带命名空间的翻译
  <NS extends Namespace, TKey extends TranslationKeyFromNamespace<NS>>(
    key: `${NS}:${TKey}`, 
    options?: TranslationOptions
  ): string;
  
  // 带插值的翻译
  <TKey extends TranslationKey>(
    key: TKey, 
    options: TranslationOptions & { replace: InterpolationOptions }
  ): string;
  
  // 带复数的翻译
  <TKey extends TranslationKey>(
    key: TKey, 
    options: TranslationOptions & { count: number }
  ): string;
}

// Hook 返回类型
export interface UseTranslationReturn<NS extends Namespace = 'common'> {
  t: TranslationFunction;
  i18n: {
    language: string;
    languages: string[];
    changeLanguage: (lng: string) => Promise<void>;
    isInitialized: boolean;
    isInitializing: boolean;
  };
  ready: boolean;
}

// 扩展 react-i18next 的模块声明
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: TranslationResources;
    returnNull: false;
  }
}

export default TranslationResources;