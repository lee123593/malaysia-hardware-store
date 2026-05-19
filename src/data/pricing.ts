// ============================================================
// 马币 MYR 定价规则 — 全站唯一货币
// 价格区间基于材质、工艺复杂度、品牌定位
// 管理员可在后台修改任意商品售价
// ============================================================

import type { CaseMaterial, CaseStyle } from './products';

// ────────────────────────────────────────
// 价格档位定义（MYR）
// ────────────────────────────────────────

export type PriceTier = 'budget' | 'standard' | 'premium' | 'flagship';

export interface PriceRange {
  tier: PriceTier;
  label: { zh: string; en: string; ms: string };
  min: number;
  max: number;
}

/** 价格档位说明 */
export const priceTiers: PriceRange[] = [
  {
    tier: 'budget',
    label: { zh: '入门实惠', en: 'Budget Friendly', ms: 'Mesra Bajet' },
    min: 9,
    max: 25,
  },
  {
    tier: 'standard',
    label: { zh: '主流精品', en: 'Standard Premium', ms: 'Standard Premium' },
    min: 26,
    max: 49,
  },
  {
    tier: 'premium',
    label: { zh: '高端设计', en: 'Premium Design', ms: 'Rekaan Premium' },
    min: 50,
    max: 79,
  },
  {
    tier: 'flagship',
    label: { zh: '旗舰定制', en: 'Flagship Custom', ms: 'Tersuai Flagship' },
    min: 80,
    max: 129,
  },
];

// ────────────────────────────────────────
// 材质基础价（MYR）
// ────────────────────────────────────────

export const materialBasePrice: Record<CaseMaterial, number> = {
  'tpu':            12,   // 基础 TPU
  'silicone':       15,   // 硅胶
  'pc':             18,   // PC 硬壳
  'tpu+pc':         25,   // 双层防摔
  'leather':        39,   // 素皮
  'carbon-fiber':   45,   // 碳纤维
  'aramid':         55,   // 凯夫拉
  'aluminum':       65,   // 金属边框
  'glass':          35,   // 钢化玻璃背板
  'acrylic':        28,   // 亚克力
};

// ────────────────────────────────────────
// 工艺/款式加价（MYR）
// ────────────────────────────────────────

export const styleSurcharge: Partial<Record<CaseStyle, number>> = {
  'magnetic':       8,    // MagSafe 磁吸模块
  'metal-bumper':   20,   // 金属边框工艺
  'heavy-duty':     10,   // 重型防摔结构
  'leather':        15,   // 素皮贴合工艺
  'carbon-fiber':   10,   // 碳纤维纹理
  'wallet':         12,   // 钱包翻盖结构
  'mirror':         8,    // 镜面镀层
  'glitter':        8,    // 闪粉嵌入式
  'fabric':         15,   // 织物贴合
  'hybrid':         5,    // 双层结构
};

// ────────────────────────────────────────
// 品牌机型溢价系数
// 旗舰机型壳溢价（因模具精度、开模成本）
// ────────────────────────────────────────

export const flagshipBrandPremium: Record<string, number> = {
  'apple':    1.0,   // iPhone：基准（量最大，不另加价）
  'samsung':  0.95,  // 三星旗舰系列
  'xiaomi':   0.85,
  'oppo':     0.85,
  'vivo':     0.85,
  'honor':    0.80,
  'realme':   0.80,
  'tecno':    0.75,
  'google':   0.90,
  'huawei':   0.85,
};

// ────────────────────────────────────────
// 建议零售价计算公式
// 建议价 = (材质基础价 + Σ款式加价) × 品牌系数
// 实际售价由管理员在后台自由设定
// ────────────────────────────────────────

export function calculateSuggestedPrice(
  material: CaseMaterial,
  styles: CaseStyle[],
  brandId: string,
): number {
  const base = materialBasePrice[material] ?? 18;
  const surcharge = styles.reduce((sum, s) => sum + (styleSurcharge[s] ?? 0), 0);
  const coefficient = flagshipBrandPremium[brandId] ?? 0.85;

  const raw = (base + surcharge) * coefficient;
  // 取整到最近 RM1，最小 RM9
  return Math.max(9, Math.round(raw));
}

// ────────────────────────────────────────
// 定价 UI 展示配置
// ────────────────────────────────────────

export const pricingConfig = {
  /** 货币代码 */
  currencyCode: 'MYR',

  /** 货币符号 */
  currencySymbol: 'RM',

  /** 货币显示格式: "RM 29.00" / "RM29.00" */
  symbolSpaced: true,

  /** 小数点后位数 */
  decimalPlaces: 2,

  /** 千分位分隔符 */
  thousandsSeparator: ',',

  /** 小数点符号 */
  decimalSeparator: '.',

  /** 默认展示格式示例 */
  formatExample: 'RM 29.00',

  /** 是否展示划线原价（促销感） */
  showOriginalPrice: true,

  /** 价格排序选项 */
  sortOptions: [
    { id: 'default',     label: { zh: '默认排序',   en: 'Default',          ms: 'Lalai' } },
    { id: 'price_asc',   label: { zh: '价格从低到高', en: 'Price: Low to High', ms: 'Harga: Rendah ke Tinggi' } },
    { id: 'price_desc',  label: { zh: '价格从高到低', en: 'Price: High to Low', ms: 'Harga: Tinggi ke Rendah' } },
    { id: 'newest',      label: { zh: '最新上架',   en: 'Newest First',      ms: 'Terbaru Dahulu' } },
    { id: 'popular',     label: { zh: '热销优先',   en: 'Best Selling',      ms: 'Paling Laris' } },
  ],
} as const;

// ────────────────────────────────────────
// 格式化价格函数
// ────────────────────────────────────────

/**
 * 将数字格式化为马币展示字符串
 * @example formatMYR(29) → "RM 29.00"
 * @example formatMYR(29.9) → "RM 29.90"
 */
export function formatMYR(amount: number): string {
  const { symbolSpaced, currencySymbol, thousandsSeparator, decimalSeparator, decimalPlaces } = pricingConfig;
  const space = symbolSpaced ? ' ' : '';
  const numStr = amount.toFixed(decimalPlaces);
  const [intPart, decPart] = numStr.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  return `${currencySymbol}${space}${formattedInt}${decimalSeparator}${decPart}`;
}

/**
 * 计算折扣百分比（整数）
 * @example calcDiscount(29, 49) → 41 (即 41% OFF)
 */
export function calcDiscountPercent(price: number, originalPrice: number): number {
  if (originalPrice <= 0 || price >= originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * 价格范围格式化（用于筛选标签）
 * @example "RM 9 – RM 25"
 */
export function priceRangeLabel(min: number, max: number): string {
  return `RM ${min} – RM ${max}`;
}
