// ============================================================
// useLanguage — 客户端语言切换 Hook
// ============================================================

'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Locale } from '@/i18n/types';
import { getInitialLocale, persistLocale, setHtmlLang } from '@/i18n/config';
import { createTranslator } from '@/i18n';

export function useLanguage() {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  // 切换语言
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
    setHtmlLang(next);
  }, []);

  // 初始化时设置 HTML lang
  useEffect(() => {
    setHtmlLang(locale);
  }, []);

  const t = createTranslator(locale);

  return {
    locale,
    setLocale,
    t,
  };
}
