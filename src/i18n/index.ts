// ============================================================
// i18n Barrel Export — 多语言系统统一出口
// ============================================================

import type { Locale, LocalePack } from './types';
import zh from './locales/zh.json';
import en from './locales/en.json';
import ms from './locales/ms.json';

export { I18nProvider, useI18n, useT, useLocale } from './i18n-context';
export { default as LanguageSwitcher } from './LanguageSwitcher';
export { localeList, defaultLocale } from './types';
export type { Locale, LocalePack, LocaleMeta } from './types';

export { zh, en, ms };

const localePacks: Record<Locale, LocalePack> = { zh: zh as LocalePack, en: en as LocalePack, ms: ms as LocalePack };

// 创建翻译函数，使 useLanguage hook 可通过 t('section.key') 访问文案
export function createTranslator(locale: Locale) {
  const pack = localePacks[locale] || localePacks.en;

  return function t(path: string): string {
    const keys = path.split('.');
    let value: unknown = pack;
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[key];
      } else {
        return path;
      }
    }
    return typeof value === 'string' ? value : path;
  };
}
