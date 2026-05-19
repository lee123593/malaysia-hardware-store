// ============================================================
// 站点全局配置
// ============================================================

import { theme } from './theme';

export const siteConfig = {
  // 站点元信息
  name: 'CaseArt',
  nameFull: 'CaseArt — Malaysia Design Phone Cases',
  tagline: {
    zh: '只为设计感手机壳',
    en: 'Design Phone Cases Only',
    ms: 'Sarung Telefon Berreka Bentuk Sahaja',
  },
  description: {
    zh: '马来西亚设计感手机壳专属商城 · 中国原创设计 · 全机型适配 · 高性价比',
    en: 'Malaysia Design Phone Case Store · Original Chinese Designs · All Models · Affordable',
    ms: 'Kedai Sarung Telefon Berreka Bentuk Malaysia · Rekaan Asli China · Semua Model · Mampu Milik',
  },

  // 货币
  currency: {
    code: 'MYR',
    symbol: 'RM',
    locale: 'ms-MY',
  },

  // 默认语言
  defaultLocale: 'en' as const,

  // 支持的语言
  locales: ['zh', 'en', 'ms'] as const,

  // 配送地区
  shippingRegions: {
    wm: { label: { zh: '西马', en: 'West Malaysia', ms: 'Semenanjung Malaysia' } },
    em: { label: { zh: '东马', en: 'East Malaysia', ms: 'Malaysia Timur' } },
  },

  // 社交/联系
  contact: {
    email: '',
    whatsapp: '',
  },

  // SEO
  seo: {
    titleTemplate: '%s | CaseArt',
    defaultTitle: 'CaseArt — Malaysia Design Phone Cases',
    siteName: 'CaseArt',
  },
} as const;

export type SiteConfig = typeof siteConfig;
