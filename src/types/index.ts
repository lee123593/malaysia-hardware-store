export interface Product {
  id: string;
  name: string;
  nameZh?: string | null;
  slug: string;
  description: string;
  descriptionZh?: string | null;
  price: number;
  costPrice?: number | null;
  category: string;
  categoryZh?: string | null;
  images: string;
  stock: number;
  featured: boolean;
  published: boolean;
  weight: number;
  sku: string;
  origin: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
  product?: Product;
}

export interface Order {
  id: string;
  orderNo: string;
  customerName: string;
  customerEmail?: string | null;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  region: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: string;
  paymentMethod?: string | null;
  paymentRef?: string | null;
  paidAt?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[];
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped_cn' | 'in_transit' | 'delivered_my' | 'cancelled';

export const ORDER_STATUS_MAP: Record<string, string> = {
  pending: 'Pending Payment',
  paid: 'Paid',
  processing: 'Processing',
  shipped_cn: 'Shipped from China',
  in_transit: 'In Transit',
  delivered_my: 'Delivered in Malaysia',
  cancelled: 'Cancelled',
};

export const ORDER_STATUS_MAP_ZH: Record<string, string> = {
  pending: '待付款',
  paid: '已付款',
  processing: '处理中',
  shipped_cn: '中国发货',
  in_transit: '运输中',
  delivered_my: '大马签收',
  cancelled: '已取消',
};

export interface CartItem {
  productId: string;
  name: string;
  nameZh?: string | null;
  price: number;
  quantity: number;
  image: string;
  slug: string;
  weight: number;
}

export type MalaysiaRegion = 'west' | 'east';

export const MALAYSIA_STATES: { name: string; region: MalaysiaRegion }[] = [
  { name: 'Kuala Lumpur', region: 'west' },
  { name: 'Selangor', region: 'west' },
  { name: 'Penang', region: 'west' },
  { name: 'Johor', region: 'west' },
  { name: 'Perak', region: 'west' },
  { name: 'Kedah', region: 'west' },
  { name: 'Perlis', region: 'west' },
  { name: 'Melaka', region: 'west' },
  { name: 'Negeri Sembilan', region: 'west' },
  { name: 'Pahang', region: 'west' },
  { name: 'Terengganu', region: 'west' },
  { name: 'Kelantan', region: 'west' },
  { name: 'Putrajaya', region: 'west' },
  { name: 'Labuan', region: 'east' },
  { name: 'Sabah', region: 'east' },
  { name: 'Sarawak', region: 'east' },
];
