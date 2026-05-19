// ============================================================
// 全站全局类型定义 — 单一真相来源
// ============================================================

// ======== 三语字段 ========
export interface LocalizedString {
  zh: string;
  en: string;
  ms: string;
}

// ======== 手机型号 ========
export interface PhoneModel {
  id: string;
  name: string;
  screenSize?: string;
  year: number;
  hot: boolean;
  sortOrder: number;
}

// ======== 手机品牌 ========
export interface PhoneBrand {
  id: string;
  name: string;
  logo?: string;
  sortOrder: number;
  models: PhoneModel[];
}

// ======== 手机壳商品 (全站唯一商品类型) ========
export interface PhoneCase {
  id: string;
  sku: string;
  name: LocalizedString;
  description: LocalizedString;
  modelId: string;
  model?: PhoneModel;
  styles: string[];
  material: string;
  images: { id: string; url: string; alt: LocalizedString; sortOrder: number }[];
  price: number;
  originalPrice: number;
  stock: 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';
  status: 'active' | 'inactive' | 'draft';
  isNew: boolean;
  isHot: boolean;
  isFeatured: boolean;
  colorOptions: { name: LocalizedString; hex: string }[];
  createdAt: string;
  sortOrder: number;
}

// ======== 购物车条目 ========
export interface CartItem {
  id: string;
  name: string;
  price: number;
  model: string;
  image: string;
  qty: number;
}

// ======== 订单 ========
export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city?: string;
  state?: string;
  postcode?: string;
  region: 'wm' | 'em';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

// ======== 结算表单 ========
export interface CheckoutForm {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  shippingZone: 'west_malaysia' | 'east_malaysia';
  note?: string;
}

// ======== API 响应 ========
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
