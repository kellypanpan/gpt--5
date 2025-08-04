// 导入所有翻译资源
import enCommon from './en/common.json';
import enPagesHome from './en/pages/home.json';

import jaCommon from './ja/common.json';
import jaPagesHome from './ja/pages/home.json';

import koCommon from './ko/common.json';
import koPagesHome from './ko/pages/home.json';

// 构建翻译资源对象
export const resources = {
  en: {
    common: enCommon,
    pages: enPagesHome,
    components: {} // 暂时为空
  },
  ja: {
    common: jaCommon,
    pages: jaPagesHome,
    components: {}
  },
  ko: {
    common: koCommon,
    pages: koPagesHome,
    components: {}
  }
} as const;

export default resources;