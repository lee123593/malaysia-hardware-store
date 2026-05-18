"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import en, { type Translations } from "./en";
import zh from "./zh";

type Lang = "en" | "zh";

interface I18nState {
  lang: Lang;
  t: Translations;
  contentLoaded: boolean;
  setLang: (lang: Lang) => void;
  loadContentOverrides: (rawOverrides: Record<string, string>) => void;
}

let storedOverrides: Record<string, string> = {};

export function applyContentOverrides(
  base: Translations,
  overrides: Record<string, string>,
  lang: Lang
): Translations {
  const result = JSON.parse(JSON.stringify(base)) as Translations;
  const prefix = `content_${lang}_`;

  for (const [key, value] of Object.entries(overrides)) {
    if (!key.startsWith(prefix) || !value) continue;
    const suffixPath = key.slice(prefix.length);
    const parts = suffixPath.split("_");

    let current: any = result;
    let ok = true;

    for (let i = 0; i < parts.length - 1; i++) {
      if (current == null) { ok = false; break; }
      if (Array.isArray(current)) {
        const idx = parseInt(parts[i], 10);
        if (isNaN(idx) || idx >= current.length) { ok = false; break; }
        current = current[idx];
      } else {
        current = current[parts[i]];
      }
    }

    if (!ok || current == null) continue;

    const last = parts[parts.length - 1];
    if (Array.isArray(current)) {
      const idx = parseInt(last, 10);
      if (!isNaN(idx) && idx < current.length) current[idx] = value;
    } else if (typeof current === "object" && last in current && typeof current[last] === "string") {
      current[last] = value;
    }
  }

  return result;
}

export const useI18n = create<I18nState>()(
  persist(
    (set) => ({
      lang: "en",
      t: en,
      contentLoaded: false,
      setLang: (lang: Lang) => {
        const base = lang === "zh" ? zh : en;
        const merged = applyContentOverrides(base, storedOverrides, lang);
        set({ lang, t: merged });
      },
      loadContentOverrides: (rawOverrides: Record<string, string>) => {
        storedOverrides = rawOverrides;
        const state = useI18n.getState();
        const base = state.lang === "zh" ? zh : en;
        const merged = applyContentOverrides(base, rawOverrides, state.lang);
        set({ t: merged, contentLoaded: true });
      },
    }),
    {
      name: "myh-lang",
      partialize: (state) => ({ lang: state.lang }),
    }
  )
);

export const translations = { en, zh };
export type { Lang, Translations };
