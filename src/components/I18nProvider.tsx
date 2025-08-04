import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { initGlobalTranslation } from '../hooks/useTranslation';
import useTranslation from '../hooks/useTranslation';

interface I18nProviderProps {
  children: React.ReactNode;
}

// 初始化组件
function I18nInitializer({ children }: { children: React.ReactNode }) {
  const { t, ready } = useTranslation();

  useEffect(() => {
    if (ready) {
      // 初始化全局翻译函数
      initGlobalTranslation(t);
    }
  }, [t, ready]);

  // 不阻塞渲染，即使翻译未完全加载也显示页面
  return <>{children}</>;
}

/**
 * I18n Provider 组件
 * 提供国际化上下文，不阻塞页面渲染
 */
export function I18nProvider({ children }: I18nProviderProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <I18nInitializer>
        {children}
      </I18nInitializer>
    </I18nextProvider>
  );
}

export default I18nProvider;