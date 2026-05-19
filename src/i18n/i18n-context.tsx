'use client';

// ============================================================
// i18n Context — 三语切换核心
// 提供全站语言状态、切换函数、便捷翻译 hook
// ============================================================

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Locale, LocalePack } from './types';
import { localeList, defaultLocale } from './types';
import zh from './locales/zh.json';
import en from './locales/en.json';
import ms from './locales/ms.json';

const packs: Record<Locale, LocalePack> = { zh: zh as LocalePack, en: en as LocalePack, ms: ms as LocalePack };

const STORAGE_KEY = 'caseart-locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: LocalePack;
  localeMeta: (typeof localeList)[number];
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['zh', 'en', 'ms'].includes(stored)) return stored as Locale;
  } catch {}
  return defaultLocale;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    document.documentElement.lang = next;
  }, []);

  const t = useMemo(() => packs[locale], [locale]);

  const localeMeta = useMemo(
    () => localeList.find((l) => l.code === locale)!,
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, localeMeta }),
    [locale, setLocale, t, localeMeta],
  );

  // 服务端/未挂载时避免 hydration mismatch
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}

/**
 * 便捷翻译 hook — 直接返回语言包对象
 */
export function useT(): LocalePack {
  return useI18n().t;
}

/**
 * 获取当前 locale
 */
export function useLocale(): Locale {
  return useI18n().locale;
}
