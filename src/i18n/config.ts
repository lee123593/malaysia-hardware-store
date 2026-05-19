// ============================================================
// i18n 核心配置
// 语言检测、切换、持久化逻辑
// ============================================================

import { type Locale, defaultLocale, localeList } from './types';

// LocalStorage 存储 key
const LOCALE_STORAGE_KEY = 'caseart-locale';

// 从浏览器获取首选语言
function getBrowserLocale(): Locale | null {
  if (typeof navigator === 'undefined') return null;

  const lang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
  const code = lang.split('-')[0].toLowerCase();

  if (code === 'zh') return 'zh';
  if (code === 'ms' || code === 'id') return 'ms';
  if (code === 'en') return 'en';

  return null;
}

// 获取初始语言：存储 > 浏览器 > 默认
export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;

  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored && localeList.some((l) => l.code === stored)) {
      return stored;
    }
  } catch {
    // localStorage 不可用
  }

  const browser = getBrowserLocale();
  if (browser) return browser;

  return defaultLocale;
}

// 持久化语言选择
export function persistLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // localStorage 不可用
  }
}

// 设置 HTML lang 属性
export function setHtmlLang(locale: Locale): void {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale === 'ms' ? 'ms' : locale === 'zh' ? 'zh-CN' : 'en';
  }
}

// 获取语言元信息
export function getLocaleMeta(locale: Locale) {
  return localeList.find((l) => l.code === locale) || localeList[1]; // 默认英文
}
