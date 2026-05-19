// ============================================================
// 马来西亚配送规则 — 中国货源 → 马来西亚全境
// 区分西马（Semenanjung）/ 东马（Sabah & Sarawak）
// 管理员可在后台修改配送说明和时效文案
// ============================================================

import type { LocalizedString } from './products';

// ────────────────────────────────────────
// 配送区域
// ────────────────────────────────────────

export type ShippingZone = 'west_malaysia' | 'east_malaysia';

export interface ShippingRegion {
  id: ShippingZone;
  name: LocalizedString;
  /** 该区域包含的州/联邦直辖区 */
  states: LocalizedString[];
}

/** 西马 + 东马 配送区域定义 */
export const shippingRegions: ShippingRegion[] = [
  {
    id: 'west_malaysia',
    name: { zh: '西马', en: 'West Malaysia', ms: 'Semenanjung Malaysia' },
    states: [
      { zh: '吉隆坡',       en: 'Kuala Lumpur',        ms: 'Kuala Lumpur' },
      { zh: '雪兰莪',       en: 'Selangor',             ms: 'Selangor' },
      { zh: '布城',         en: 'Putrajaya',            ms: 'Putrajaya' },
      { zh: '槟城',         en: 'Penang',               ms: 'Pulau Pinang' },
      { zh: '柔佛',         en: 'Johor',                ms: 'Johor' },
      { zh: '霹雳',         en: 'Perak',                ms: 'Perak' },
      { zh: '吉打',         en: 'Kedah',                ms: 'Kedah' },
      { zh: '吉兰丹',       en: 'Kelantan',             ms: 'Kelantan' },
      { zh: '登嘉楼',       en: 'Terengganu',           ms: 'Terengganu' },
      { zh: '彭亨',         en: 'Pahang',               ms: 'Pahang' },
      { zh: '森美兰',       en: 'Negeri Sembilan',      ms: 'Negeri Sembilan' },
      { zh: '马六甲',       en: 'Malacca',              ms: 'Melaka' },
      { zh: '玻璃市',       en: 'Perlis',               ms: 'Perlis' },
    ],
  },
  {
    id: 'east_malaysia',
    name: { zh: '东马', en: 'East Malaysia', ms: 'Malaysia Timur' },
    states: [
      { zh: '沙巴',         en: 'Sabah',                ms: 'Sabah' },
      { zh: '砂拉越',       en: 'Sarawak',              ms: 'Sarawak' },
      { zh: '纳闽',         en: 'Labuan',               ms: 'Labuan' },
    ],
  },
];

// ────────────────────────────────────────
// 运费规则
// ────────────────────────────────────────

export interface ShippingRate {
  zone: ShippingZone;
  /** 基础运费（MYR） */
  baseFee: number;
  /** 满额免邮阈值（MYR），0 表示无免邮 */
  freeShippingThreshold: number;
  /** 每增加一件商品额外运费（MYR） */
  additionalItemFee: number;
  /** 预计送达天数 范围 */
  estimatedDays: { min: number; max: number };
}

export const shippingRates: ShippingRate[] = [
  {
    zone: 'west_malaysia',
    baseFee: 8,
    freeShippingThreshold: 80,
    additionalItemFee: 2,
    estimatedDays: { min: 5, max: 10 },
  },
  {
    zone: 'east_malaysia',
    baseFee: 15,
    freeShippingThreshold: 120,
    additionalItemFee: 4,
    estimatedDays: { min: 7, max: 14 },
  },
];

// ────────────────────────────────────────
// 运费计算函数
// ────────────────────────────────────────

export interface ShippingCostResult {
  zone: ShippingZone;
  subtotal: number;
  baseFee: number;
  additionalFee: number;
  totalShipping: number;
  isFree: boolean;
  estimatedDays: { min: number; max: number };
}

/**
 * 计算订单运费
 * @param zone 配送区域
 * @param orderSubtotal 订单商品小计（MYR）
 * @param itemCount 商品件数
 */
export function calculateShipping(
  zone: ShippingZone,
  orderSubtotal: number,
  itemCount: number,
): ShippingCostResult {
  const rate = shippingRates.find((r) => r.zone === zone)!;

  if (rate.freeShippingThreshold > 0 && orderSubtotal >= rate.freeShippingThreshold) {
    return {
      zone,
      subtotal: orderSubtotal,
      baseFee: 0,
      additionalFee: 0,
      totalShipping: 0,
      isFree: true,
      estimatedDays: rate.estimatedDays,
    };
  }

  const additionalFee = Math.max(0, (itemCount - 1) * rate.additionalItemFee);
  const totalShipping = rate.baseFee + additionalFee;

  return {
    zone,
    subtotal: orderSubtotal,
    baseFee: rate.baseFee,
    additionalFee,
    totalShipping,
    isFree: false,
    estimatedDays: rate.estimatedDays,
  };
}

/** 根据区域 ID 获取区域信息 */
export function getShippingRegion(zone: ShippingZone): ShippingRegion | undefined {
  return shippingRegions.find((r) => r.id === zone);
}

// ────────────────────────────────────────
// 配送说明（三语，后台可编辑）
// ────────────────────────────────────────

export interface ShippingNotice {
  id: string;
  title: LocalizedString;
  content: LocalizedString;
}

export const shippingNotices: ShippingNotice[] = [
  {
    id: 'shipping-origin',
    title: { zh: '发货来源', en: 'Shipping Origin', ms: 'Asal Penghantaran' },
    content: {
      zh: '所有商品从中国仓库直发马来西亚，正品保障，品质严选。',
      en: 'All products are shipped directly from our China warehouse to Malaysia, guaranteed authentic with strict quality control.',
      ms: 'Semua produk dihantar terus dari gudang China kami ke Malaysia, dijamin tulen dengan kawalan kualiti yang ketat.',
    },
  },
  {
    id: 'shipping-west',
    title: { zh: '西马配送', en: 'West Malaysia Delivery', ms: 'Penghantaran Semenanjung' },
    content: {
      zh: '西马地区基础运费 RM 8，满 RM 80 免邮。预计 5-10 个工作日送达。',
      en: 'West Malaysia base shipping RM 8, free shipping for orders over RM 80. Estimated delivery 5-10 working days.',
      ms: 'Penghantaran asas Semenanjung RM 8, penghantaran percuma untuk pesanan melebihi RM 80. Anggaran penghantaran 5-10 hari bekerja.',
    },
  },
  {
    id: 'shipping-east',
    title: { zh: '东马配送', en: 'East Malaysia Delivery', ms: 'Penghantaran Malaysia Timur' },
    content: {
      zh: '东马地区（沙巴/砂拉越/纳闽）基础运费 RM 15，满 RM 120 免邮。预计 7-14 个工作日送达。',
      en: 'East Malaysia (Sabah/Sarawak/Labuan) base shipping RM 15, free shipping for orders over RM 120. Estimated delivery 7-14 working days.',
      ms: 'Malaysia Timur (Sabah/Sarawak/Labuan) penghantaran asas RM 15, penghantaran percuma untuk pesanan melebihi RM 120. Anggaran penghantaran 7-14 hari bekerja.',
    },
  },
  {
    id: 'customs-note',
    title: { zh: '关税说明', en: 'Customs Information', ms: 'Maklumat Kastam' },
    content: {
      zh: '马来西亚手机壳类商品关税已由我方承担，您无需额外支付任何关税或进口费用。',
      en: 'Customs duties for phone case products in Malaysia are covered by us. You will NOT need to pay any additional customs or import fees.',
      ms: 'Duti kastam untuk produk sarung telefon di Malaysia ditanggung oleh kami. Anda TIDAK perlu membayar sebarang duti kastam atau yuran import tambahan.',
    },
  },
  {
    id: 'returns',
    title: { zh: '退换政策', en: 'Return Policy', ms: 'Polisi Pemulangan' },
    content: {
      zh: '收到商品如有质量问题，7 天内联系客服可免费退换。因个人原因退换需承担往返运费。',
      en: 'If you receive a defective product, contact customer service within 7 days for free return/exchange. Returns for personal reasons require the customer to cover round-trip shipping.',
      ms: 'Jika anda menerima produk yang rosak, hubungi perkhidmatan pelanggan dalam masa 7 hari untuk pemulangan/penukaran percuma. Pemulangan atas sebab peribadi memerlukan pelanggan menanggung kos penghantaran pergi-balik.',
    },
  },
  {
    id: 'delivery-timeline',
    title: { zh: '全流程时效', en: 'Full Timeline', ms: 'Garis Masa Penuh' },
    content: {
      zh: '下单后 1-2 个工作日处理 → 中国仓库发出 → 国际运输 → 马来西亚本地派送 → 签收。全流程西马约 5-10 天，东马约 7-14 天。',
      en: 'Processing 1-2 working days after order → Ship from China warehouse → International transit → Local Malaysia delivery → Receipt. Full timeline: West Malaysia ~5-10 days, East Malaysia ~7-14 days.',
      ms: 'Pemprosesan 1-2 hari bekerja selepas pesanan → Hantar dari gudang China → Transit antarabangsa → Penghantaran tempatan Malaysia → Penerimaan. Garis masa penuh: Semenanjung ~5-10 hari, Malaysia Timur ~7-14 hari.',
    },
  },
];

// ────────────────────────────────────────
// 结算页面确认字段定义（马来西亚本地收货信息）
// ────────────────────────────────────────

export interface CheckoutFormField {
  id: string;
  label: LocalizedString;
  placeholder: LocalizedString;
  required: boolean;
  type: 'text' | 'tel' | 'select' | 'textarea';
  /** 下拉选项（type=select 时） */
  options?: { value: string; label: LocalizedString }[];
}

export const checkoutFormFields: CheckoutFormField[] = [
  {
    id: 'fullName',
    label: { zh: '收货人姓名', en: 'Full Name', ms: 'Nama Penuh' },
    placeholder: { zh: '请输入收货人姓名', en: 'Enter full name', ms: 'Masukkan nama penuh' },
    required: true,
    type: 'text',
  },
  {
    id: 'phone',
    label: { zh: '联系电话', en: 'Phone Number', ms: 'Nombor Telefon' },
    placeholder: { zh: '例如 012-345 6789', en: 'e.g. 012-345 6789', ms: 'cth. 012-345 6789' },
    required: true,
    type: 'tel',
  },
  {
    id: 'shippingZone',
    label: { zh: '配送地区', en: 'Shipping Zone', ms: 'Zon Penghantaran' },
    placeholder: { zh: '请选择配送地区', en: 'Select shipping zone', ms: 'Pilih zon penghantaran' },
    required: true,
    type: 'select',
    options: [
      { value: 'west_malaysia', label: { zh: '西马', en: 'West Malaysia', ms: 'Semenanjung Malaysia' } },
      { value: 'east_malaysia', label: { zh: '东马（沙巴/砂拉越/纳闽）', en: 'East Malaysia (Sabah/Sarawak/Labuan)', ms: 'Malaysia Timur (Sabah/Sarawak/Labuan)' } },
    ],
  },
  {
    id: 'state',
    label: { zh: '州/联邦直辖区', en: 'State / Federal Territory', ms: 'Negeri / Wilayah Persekutuan' },
    placeholder: { zh: '请选择州属', en: 'Select state', ms: 'Pilih negeri' },
    required: true,
    type: 'select',
    // options 由前端根据 shippingZone 动态填充
  },
  {
    id: 'city',
    label: { zh: '城市', en: 'City', ms: 'Bandar' },
    placeholder: { zh: '请输入城市名称', en: 'Enter city name', ms: 'Masukkan nama bandar' },
    required: true,
    type: 'text',
  },
  {
    id: 'postcode',
    label: { zh: '邮政编码', en: 'Postcode', ms: 'Poskod' },
    placeholder: { zh: '例如 50450', en: 'e.g. 50450', ms: 'cth. 50450' },
    required: true,
    type: 'text',
  },
  {
    id: 'address',
    label: { zh: '详细地址', en: 'Full Address', ms: 'Alamat Penuh' },
    placeholder: { zh: '街道/公寓/门牌号', en: 'Street/Apartment/House number', ms: 'Jalan/Apartmen/Nombor rumah' },
    required: true,
    type: 'textarea',
  },
  {
    id: 'note',
    label: { zh: '备注（选填）', en: 'Note (Optional)', ms: 'Nota (Pilihan)' },
    placeholder: { zh: '如有特殊要求请备注', en: 'Any special requests', ms: 'Sebarang permintaan khas' },
    required: false,
    type: 'textarea',
  },
];
