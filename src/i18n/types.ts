// ============================================================
// i18n 类型系统 — 三语（中文/英文/马来语）类型约束
// ============================================================

export type Locale = 'zh' | 'en' | 'ms';

export interface LocaleMeta {
  code: Locale;
  label: string;
  labelEn: string;
  flag: string;
}

export const localeList: LocaleMeta[] = [
  { code: 'zh', label: '中文', labelEn: 'Chinese', flag: '🇨🇳' },
  { code: 'en', label: 'English', labelEn: 'English', flag: '🇬🇧' },
  { code: 'ms', label: 'Bahasa Melayu', labelEn: 'Malay', flag: '🇲🇾' },
];

export const defaultLocale: Locale = 'en';

// ============================================================
// 核心 UI 字段 — 所有语言包必须实现此结构
// ============================================================
export interface NavStrings {
  home: string;
  allProducts: string;
  about: string;
  cart: string;
  checkout: string;
  contact: string;
}

export interface HomeStrings {
  heroTitle: string;
  heroSubtitle: string;
  ctaShopNow: string;
  ctaViewModels: string;
  featuresTitle: string;
  featureSource: string;
  featureModels: string;
  featurePrice: string;
  featureShipping: string;
  hotModels: string;
  newArrivals: string;
  bestSellers: string;
  viewAll: string;
}

export interface ProductStrings {
  addToCart: string;
  buyNow: string;
  compatibleModels: string;
  material: string;
  style: string;
  shippingInfo: string;
  relatedProducts: string;
  price: string;
  inStock: string;
  outOfStock: string;
  newTag: string;
  hotTag: string;
  recommendedTag: string;
  sortLatest: string;
  sortPriceLow: string;
  sortPriceHigh: string;
  sortPopular: string;
}

export interface CartStrings {
  title: string;
  empty: string;
  emptyHint: string;
  quantity: string;
  subtotal: string;
  total: string;
  checkout: string;
  continueShopping: string;
  remove: string;
}

export interface CheckoutStrings {
  title: string;
  shippingInfo: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  region: string;
  regionWM: string;
  regionEM: string;
  orderSummary: string;
  submitOrder: string;
  paymentNotice: string;
}

export interface FooterStrings {
  about: string;
  shipping: string;
  afterSales: string;
  contact: string;
  copyright: string;
  langSwitch: string;
}

export interface CommonStrings {
  loading: string;
  error: string;
  retry: string;
  noData: string;
  search: string;
  filter: string;
  clear: string;
  confirm: string;
  cancel: string;
  back: string;
  next: string;
  prev: string;
}

export interface AboutStrings {
  title: string;
  intro: string;
  shippingTitle: string;
  shippingDesc: string;
  afterSalesTitle: string;
  afterSalesDesc: string;
  noticeTitle: string;
  noticeDesc: string;
}

// ============================================================
// 完整语言包类型
// ============================================================
export interface LocalePack {
  meta: LocaleMeta;
  nav: NavStrings;
  home: HomeStrings;
  product: ProductStrings;
  cart: CartStrings;
  checkout: CheckoutStrings;
  footer: FooterStrings;
  common: CommonStrings;
  about: AboutStrings;
}
