// ============================================================
// 后台管理系统类型定义
// ============================================================

import type { LocalizedString, Order as BaseOrder } from './index';

// Re-export for convenience
export type { LocalizedString };
export type Trilingual = LocalizedString;

// 手机型号 (admin view)
export interface PhoneModel {
  id: string;
  name: string;
  screenSize?: string;
  year?: number;
  hot: boolean;
  order: number;
}

// 手机品牌 (admin view)
export interface PhoneBrand {
  id: string;
  name: string;
  nameZh: string;
  order: number;
  models: PhoneModel[];
}

// 商品状态
export type ProductStatus = 'active' | 'inactive';
export type StockStatus = 'in_stock' | 'out_of_stock' | 'pre_order';

// 商品 (admin view)
export interface Product {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  modelId: string;
  price: number;
  originalPrice: number | null;
  images: string[];
  status: ProductStatus;
  isNew: boolean;
  isHot: boolean;
  stock: StockStatus;
  style: string;
  createdAt: string;
  order: number;
}

// 订单状态
export type OrderStatus = 'pending' | 'shipped' | 'completed' | 'cancelled';
export type ShippingRegion = 'wm' | 'em';

// 订单项
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

// 订单 (matches admin component usage)
export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  region: ShippingRegion;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  notes: string;
  createdAt: string;
}

// 首页板块
export interface HomepageSection {
  id: string;
  type: 'hotModels' | 'newProducts' | 'hotProducts';
  visible: boolean;
  order: number;
}

// 首页卖点
export interface SellingPoint {
  id: string;
  icon: string;
  visible: boolean;
  order: number;
}

// 首页配置
export interface HomepageConfig {
  banner: {
    title: LocalizedString;
    subtitle: LocalizedString;
    buttonText: LocalizedString;
    buttonLink: string;
    image: string;
  };
  sellingPoints: SellingPoint[];
  sections: HomepageSection[];
}

// 站点设置
export interface SiteSettings {
  siteName: LocalizedString;
  adminPassword: string;
  logo: string;
  favicon: string;
  defaultLanguage: 'zh' | 'en' | 'ms';
  enableLanguageSwitch: boolean;
  currency: { code: string; symbol: string; locale: string };
  shippingInfo: LocalizedString;
  afterSalesInfo: LocalizedString;
  aboutUs: LocalizedString;
  footerCopyright: LocalizedString;
  contact: { email: string; whatsapp: string; instagram: string };
  seo: { title: LocalizedString; description: LocalizedString };
}

// 翻译包
export interface TranslationPack {
  [section: string]: { [key: string]: LocalizedString };
}

// 后台登录
export interface AdminLoginRequest { password: string }
export interface AdminLoginResponse { success: boolean; token?: string; message: string }

// API 通用响应
export interface ApiResponse<T = unknown> { success: boolean; data?: T; message?: string }

// 仪表盘统计
export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalModels: number;
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
}
