// ============================================================
// 数据层统一导出入口 — 窗口五：机型数据
// 全站唯一商品：手机壳 / 唯一分类维度：手机型号
// ============================================================

// ── 手机品牌 → 型号分类 ──
export {
  phoneBrands,
  getAllBrands,
  getBrandById,
  findModelById,
  getModelsByBrand,
  getHotModels,
  getTotalModelCount,
} from './phones';
export type { PhoneBrand, PhoneModel } from './phones';

// ── 商品数据模板（仅手机壳）──
export {
  caseStyleLabels,
  caseMaterialLabels,
  stockLabels,
  sampleProducts,
  getProductsByModelId,
  getProductsByBrandId,
  getNewProducts,
  getHotProducts,
  getFeaturedProducts,
} from './products';
export type {
  CaseStyle,
  CaseMaterial,
  LocalizedString,
  ProductImage,
  PhoneCaseProduct,
} from './products';

// ── 马币 MYR 定价规则 ──
export {
  priceTiers,
  materialBasePrice,
  styleSurcharge,
  flagshipBrandPremium,
  pricingConfig,
  calculateSuggestedPrice,
  formatMYR,
  calcDiscountPercent,
  priceRangeLabel,
} from './pricing';
export type { PriceTier, PriceRange } from './pricing';

// ── 配送规则（西马 / 东马）──
export {
  shippingRegions,
  shippingRates,
  shippingNotices,
  checkoutFormFields,
  calculateShipping,
  getShippingRegion,
} from './shipping';
export type {
  ShippingZone,
  ShippingRegion,
  ShippingRate,
  ShippingCostResult,
  ShippingNotice,
  CheckoutFormField,
} from './shipping';
