// ============================================================
// 全局常量定义
// ============================================================

// 配送地区
export const SHIPPING_REGIONS = {
  WM: 'WM' as const,  // 西马
  EM: 'EM' as const,  // 东马
} as const;

export type ShippingRegion = typeof SHIPPING_REGIONS[keyof typeof SHIPPING_REGIONS];

// 配送时效 (工作日)
export const SHIPPING_DAYS = {
  WM: { min: 7, max: 12 },
  EM: { min: 10, max: 15 },
} as const;

// 订单状态
export const ORDER_STATUS = {
  PENDING: 'pending',
  SHIPPED: 'shipped',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// 商品状态
export const PRODUCT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

// 商品标签
export const CASE_TAGS = ['new', 'hot', 'recommended'] as const;

// 首页板块类型
export const HOME_SECTION_TYPES = ['features', 'hotModels', 'newArrivals', 'bestSellers'] as const;

// 排序选项
export const SORT_OPTIONS = ['latest', 'price_asc', 'price_desc', 'popular'] as const;

// 默认分页
export const DEFAULT_PAGE_SIZE = 20;

// LocalStorage Key 前缀
export const STORAGE_PREFIX = 'caseart-';

// 货源声明
export const SOURCE_NOTE = {
  zh: '所有商品从中国直发马来西亚',
  en: 'All products shipped directly from China to Malaysia',
  ms: 'Semua produk dihantar terus dari China ke Malaysia',
} as const;
