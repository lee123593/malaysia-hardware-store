"use client";
import { create } from "zustand";
import en, { type Translations } from "./en";
import zh from "./zh";

type Lang = "en" | "zh";

interface I18nState {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
}

export const useI18n = create<I18nState>((set) => ({
  lang: "en",
  t: en,
  setLang: (lang: Lang) => set({ lang, t: lang === "zh" ? zh : en }),
}));

export const translations = { en, zh };
export type { Lang, Translations };
