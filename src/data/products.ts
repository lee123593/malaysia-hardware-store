// ============================================================
// 商品数据模板 — 全站唯一商品类型：手机壳
// 商品唯一分类维度：手机型号（品牌 → 型号）
// 支持管理员后台无限新增、编辑、删除
// ============================================================

import type { PhoneModel } from './phones';

// ────────────────────────────────────────
// 手机壳款式枚举（仅用作标签展示，不作为一级分类）
// ────────────────────────────────────────

export type CaseStyle =
  | 'clear'           // 透明/清水壳
  | 'matte'           // 磨砂
  | 'glossy'          // 亮面
  | 'leather'         // 皮革/素皮
  | 'silicone'        // 硅胶
  | 'tpu'             // TPU 软壳
  | 'hybrid'          // 混合防摔（TPU+PC）
  | 'metal-bumper'    // 金属边框
  | 'carbon-fiber'    // 碳纤维纹理
  | 'fabric'          // 织物/凯夫拉
  | 'glitter'         // 闪粉/亮片
  | 'magnetic'        // MagSafe 磁吸
  | 'slim'            // 超薄
  | 'heavy-duty'      // 重型防摔
  | 'wallet'          // 钱包/翻盖
  | 'mirror'          // 镜面
  | 'gradient'        // 渐变/晕染
  | 'cartoon'         // 卡通/可爱
  | 'minimalist'      // 极简/纯色
  | 'chinese-style'   // 中国风
  | 'korean-style'    // 韩系/ins风
  | 'japanese-style'  // 日系/和风
  | 'retro'           // 复古/做旧
  | 'abstract'        // 抽象/艺术
  | 'floral'          // 花卉/植物
  | 'geometric'       // 几何/线条
  | 'text'            // 文字/标语
  | 'couple'          // 情侣款
  ;

// ────────────────────────────────────────
// 手机壳材质枚举
// ────────────────────────────────────────

export type CaseMaterial =
  | 'tpu'
  | 'silicone'
  | 'pc'
  | 'tpu+pc'
  | 'leather'
  | 'carbon-fiber'
  | 'aramid'
  | 'aluminum'
  | 'glass'
  | 'acrylic'
  ;

// ────────────────────────────────────────
// 三语字段
// ────────────────────────────────────────

export interface LocalizedString {
  zh: string;
  en: string;
  ms: string;
}

// ────────────────────────────────────────
// 商品图片
// ────────────────────────────────────────

export interface ProductImage {
  id: string;
  url: string;
  alt: LocalizedString;
  sortOrder: number;
}

// ────────────────────────────────────────
// 核心商品接口（仅手机壳）
// ────────────────────────────────────────

export interface PhoneCaseProduct {
  /** 商品唯一 ID */
  id: string;
  /** 商品 SKU 编码 */
  sku: string;
  /** 三语商品名称 */
  name: LocalizedString;
  /** 三语商品描述 */
  description: LocalizedString;
  /** 适配的手机型号 ID（关联 phones.ts） */
  modelId: string;
  /** 适配的手机型号引用（运行时填充） */
  model?: PhoneModel;
  /** 款式标签 */
  styles: CaseStyle[];
  /** 材质 */
  material: CaseMaterial;
  /** 商品图片列表 */
  images: ProductImage[];
  /** 马币售价（MYR） */
  price: number;
  /** 马币原价（用于展示划线价），0 表示无原价 */
  originalPrice: number;
  /** 库存状态 */
  stock: 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';
  /** 商品状态 */
  status: 'active' | 'inactive' | 'draft';
  /** 是否新品 */
  isNew: boolean;
  /** 是否热销 */
  isHot: boolean;
  /** 是否推荐 */
  isFeatured: boolean;
  /** 颜色选项 */
  colorOptions: { name: LocalizedString; hex: string }[];
  /** 上架日期 ISO 字符串 */
  createdAt: string;
  /** 排序权重 */
  sortOrder: number;
}

// ============================================================
// 款式标签三语翻译（供 UI 展示用）
// ============================================================

export const caseStyleLabels: Record<CaseStyle, LocalizedString> = {
  clear:          { zh: '透明壳',       en: 'Clear Case',            ms: 'Sarung Jernih' },
  matte:          { zh: '磨砂壳',       en: 'Matte Case',            ms: 'Sarung Matte' },
  glossy:         { zh: '亮面壳',       en: 'Glossy Case',           ms: 'Sarung Berkilat' },
  leather:        { zh: '素皮壳',       en: 'Leather Case',          ms: 'Sarung Kulit' },
  silicone:       { zh: '硅胶壳',       en: 'Silicone Case',         ms: 'Sarung Silikon' },
  tpu:            { zh: 'TPU软壳',      en: 'TPU Case',              ms: 'Sarung TPU' },
  hybrid:         { zh: '防摔壳',       en: 'Hybrid Case',           ms: 'Sarung Hibrid' },
  'metal-bumper': { zh: '金属边框壳',   en: 'Metal Bumper Case',     ms: 'Sarung Bingkai Logam' },
  'carbon-fiber': { zh: '碳纤维壳',     en: 'Carbon Fiber Case',     ms: 'Sarung Gentian Karbon' },
  fabric:         { zh: '织物壳',       en: 'Fabric Case',           ms: 'Sarung Fabrik' },
  glitter:        { zh: '闪粉壳',       en: 'Glitter Case',          ms: 'Sarung Bergemerlapan' },
  magnetic:       { zh: '磁吸壳',       en: 'MagSafe Case',          ms: 'Sarung Magnetik' },
  slim:           { zh: '超薄壳',       en: 'Slim Case',             ms: 'Sarung Nipis' },
  'heavy-duty':   { zh: '防摔厚壳',     en: 'Heavy Duty Case',       ms: 'Sarung Tahan Lasak' },
  wallet:         { zh: '钱包翻盖壳',   en: 'Wallet Flip Case',      ms: 'Sarung Dompet' },
  mirror:         { zh: '镜面壳',       en: 'Mirror Case',           ms: 'Sarung Cermin' },
  gradient:       { zh: '渐变壳',       en: 'Gradient Case',         ms: 'Sarung Gradien' },
  cartoon:        { zh: '卡通壳',       en: 'Cartoon Case',          ms: 'Sarung Kartun' },
  minimalist:     { zh: '极简壳',       en: 'Minimalist Case',       ms: 'Sarung Minimalis' },
  'chinese-style':{ zh: '中国风壳',     en: 'Chinese Style Case',    ms: 'Sarung Gaya Cina' },
  'korean-style': { zh: '韩系壳',       en: 'Korean Style Case',     ms: 'Sarung Gaya Korea' },
  'japanese-style':{ zh:'日系壳',       en: 'Japanese Style Case',   ms: 'Sarung Gaya Jepun' },
  retro:          { zh: '复古壳',       en: 'Retro Case',            ms: 'Sarung Retro' },
  abstract:       { zh: '抽象艺术壳',   en: 'Abstract Art Case',     ms: 'Sarung Seni Abstrak' },
  floral:         { zh: '花卉壳',       en: 'Floral Case',           ms: 'Sarung Bunga' },
  geometric:      { zh: '几何壳',       en: 'Geometric Case',        ms: 'Sarung Geometri' },
  text:           { zh: '文字壳',       en: 'Text Case',             ms: 'Sarung Teks' },
  couple:         { zh: '情侣壳',       en: 'Couple Case',           ms: 'Sarung Pasangan' },
};

// ============================================================
// 材质标签三语翻译
// ============================================================

export const caseMaterialLabels: Record<CaseMaterial, LocalizedString> = {
  tpu:            { zh: 'TPU',           en: 'TPU',                ms: 'TPU' },
  silicone:       { zh: '硅胶',          en: 'Silicone',           ms: 'Silikon' },
  pc:             { zh: 'PC硬壳',        en: 'PC Hard',            ms: 'PC Keras' },
  'tpu+pc':       { zh: 'TPU+PC双层',    en: 'TPU + PC Dual',      ms: 'TPU + PC Dua Lapis' },
  leather:        { zh: '素皮',          en: 'Vegan Leather',      ms: 'Kulit Vegan' },
  'carbon-fiber': { zh: '碳纤维',        en: 'Carbon Fiber',       ms: 'Gentian Karbon' },
  aramid:         { zh: '凯夫拉',        en: 'Aramid Fiber',       ms: 'Gentian Aramid' },
  aluminum:       { zh: '铝合金',        en: 'Aluminum',           ms: 'Aluminium' },
  glass:          { zh: '钢化玻璃',      en: 'Tempered Glass',     ms: 'Kaca Terbaja' },
  acrylic:        { zh: '亚克力',        en: 'Acrylic',            ms: 'Akrilik' },
};

// ============================================================
// 库存状态三语标签
// ============================================================

export const stockLabels: Record<PhoneCaseProduct['stock'], LocalizedString> = {
  in_stock:     { zh: '现货',     en: 'In Stock',         ms: 'Ada Stok' },
  low_stock:    { zh: '库存紧张', en: 'Low Stock',        ms: 'Stok Rendah' },
  out_of_stock: { zh: '暂时缺货', en: 'Out of Stock',     ms: 'Tiada Stok' },
  pre_order:    { zh: '预售',     en: 'Pre-Order',        ms: 'Pra-Tempahan' },
};

// ============================================================
// 示例种子数据（每种品牌选 1-3 个热门型号生成代表性手机壳）
// 实际商品由管理员在后台无限添加
// ============================================================

export const sampleProducts: PhoneCaseProduct[] = [
  // iPhone 16 Pro Max — 3 款
  {
    id: 'case-001',
    sku: 'CA-APL-16PM-001',
    name: { zh: '极简磨砂磁吸壳', en: 'Minimalist Matte MagSafe Case', ms: 'Sarung Matte Magnetik Minimalis' },
    description: {
      zh: '超薄磨砂质感，支持MagSafe磁吸，防指纹不留痕，极致手感',
      en: 'Ultra-thin matte finish with MagSafe support. Anti-fingerprint with premium hand feel.',
      ms: 'Kemasan matte ultra nipis dengan sokongan MagSafe. Anti-cap jari dengan rasa tangan premium.',
    },
    modelId: 'iphone-16-pro-max',
    styles: ['minimalist', 'matte', 'magnetic'],
    material: 'tpu+pc',
    images: [],
    price: 45,
    originalPrice: 65,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: true,
    isFeatured: true,
    colorOptions: [
      { name: { zh: '曜石黑', en: 'Jet Black', ms: 'Hitam Legam' }, hex: '#1C1C1E' },
      { name: { zh: '克莱因蓝', en: 'Klein Blue', ms: 'Biru Klein' }, hex: '#002FA7' },
      { name: { zh: '雾灰', en: 'Mist Grey', ms: 'Kelabu Kabus' }, hex: '#A0A0A6' },
    ],
    createdAt: '2026-01-15',
    sortOrder: 100,
  },
  {
    id: 'case-002',
    sku: 'CA-APL-16PM-002',
    name: { zh: '中国风青花瓷亮面壳', en: 'Chinese Blue Porcelain Glossy Case', ms: 'Sarung Berkilat Porselin Biru Cina' },
    description: {
      zh: '中国传统青花瓷纹样，高清印刷不掉色，亮面工艺手感温润',
      en: 'Traditional Chinese blue porcelain pattern, HD print that never fades, glossy finish with smooth touch.',
      ms: 'Corak porselin biru tradisional Cina, cetakan HD yang tidak pernah pudar, kemasan berkilat dengan sentuhan licin.',
    },
    modelId: 'iphone-16-pro-max',
    styles: ['chinese-style', 'glossy'],
    material: 'pc',
    images: [],
    price: 49,
    originalPrice: 69,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: false,
    isFeatured: true,
    colorOptions: [
      { name: { zh: '青花蓝', en: 'Porcelain Blue', ms: 'Biru Porselin' }, hex: '#2B5F8A' },
      { name: { zh: '古典白', en: 'Classic White', ms: 'Putih Klasik' }, hex: '#F5F0E8' },
    ],
    createdAt: '2026-01-20',
    sortOrder: 99,
  },
  {
    id: 'case-003',
    sku: 'CA-APL-16PM-003',
    name: { zh: '高级素皮防摔壳', en: 'Premium Vegan Leather Protective Case', ms: 'Sarung Pelindung Kulit Vegan Premium' },
    description: {
      zh: '进口素皮材质，1.5米防摔保护，摄像头全包围，商务质感',
      en: 'Imported vegan leather, 1.5m drop protection, full camera coverage, business-class texture.',
      ms: 'Kulit vegan import, perlindungan jatuh 1.5m, liputan kamera penuh, tekstur kelas perniagaan.',
    },
    modelId: 'iphone-16-pro-max',
    styles: ['leather', 'heavy-duty', 'minimalist'],
    material: 'leather',
    images: [],
    price: 59,
    originalPrice: 89,
    stock: 'in_stock',
    status: 'active',
    isNew: false,
    isHot: true,
    isFeatured: false,
    colorOptions: [
      { name: { zh: '经典黑', en: 'Classic Black', ms: 'Hitam Klasik' }, hex: '#1A1A1A' },
      { name: { zh: '深棕', en: 'Dark Brown', ms: 'Coklat Gelap' }, hex: '#5D4037' },
      { name: { zh: '墨绿', en: 'Forest Green', ms: 'Hijau Hutan' }, hex: '#2E4A2E' },
    ],
    createdAt: '2026-02-01',
    sortOrder: 98,
  },

  // Galaxy S26 Ultra — 2 款
  {
    id: 'case-004',
    sku: 'CA-SAM-S26U-001',
    name: { zh: '透明防摔磁吸壳', en: 'Clear Hybrid MagSafe Case', ms: 'Sarung Hibrid Jernih Magnetik' },
    description: {
      zh: '军用级防摔认证，透明不发黄，MagSafe兼容，展示原机色彩',
      en: 'Military-grade drop protection, anti-yellowing clear back, MagSafe compatible, shows off original phone color.',
      ms: 'Perlindungan jatuh gred tentera, belakang jernih anti-kuning, serasi MagSafe, mempamerkan warna telefon asal.',
    },
    modelId: 'galaxy-s26-ultra',
    styles: ['clear', 'hybrid', 'magnetic'],
    material: 'tpu+pc',
    images: [],
    price: 49,
    originalPrice: 69,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: true,
    isFeatured: true,
    colorOptions: [
      { name: { zh: '全透明', en: 'Crystal Clear', ms: 'Jernih Kristal' }, hex: 'transparent' },
    ],
    createdAt: '2026-01-25',
    sortOrder: 100,
  },
  {
    id: 'case-005',
    sku: 'CA-SAM-S26U-002',
    name: { zh: '碳纤维纹理薄壳', en: 'Carbon Fiber Texture Slim Case', ms: 'Sarung Nipis Tekstur Gentian Karbon' },
    description: {
      zh: '碳纤维纹理工艺，仅重18g，防刮花，商务轻奢风格',
      en: 'Carbon fiber texture, only 18g weight, scratch-resistant, business luxury style.',
      ms: 'Tekstur gentian karbon, berat hanya 18g, tahan calar, gaya mewah perniagaan.',
    },
    modelId: 'galaxy-s26-ultra',
    styles: ['carbon-fiber', 'slim', 'minimalist'],
    material: 'carbon-fiber',
    images: [],
    price: 55,
    originalPrice: 75,
    stock: 'in_stock',
    status: 'active',
    isNew: false,
    isHot: true,
    isFeatured: false,
    colorOptions: [
      { name: { zh: '碳黑', en: 'Carbon Black', ms: 'Hitam Karbon' }, hex: '#1A1A1A' },
    ],
    createdAt: '2026-02-10',
    sortOrder: 99,
  },

  // Redmi Note 14 Pro+ — 2 款
  {
    id: 'case-006',
    sku: 'CA-XM-RN14PP-001',
    name: { zh: '韩系渐变闪粉壳', en: 'Korean Style Glitter Gradient Case', ms: 'Sarung Gradien Bergemerlapan Gaya Korea' },
    description: {
      zh: '韩系ins风渐变设计，嵌入式闪粉不脱落，高透PC材质',
      en: 'Korean Instagram-style gradient design, embedded glitter never falls off, high-transparency PC material.',
      ms: 'Reka bentuk gradien gaya Instagram Korea, glitter terbenam tidak pernah tertanggal, bahan PC ketelusan tinggi.',
    },
    modelId: 'redmi-note-14-pro-plus',
    styles: ['korean-style', 'gradient', 'glitter'],
    material: 'pc',
    images: [],
    price: 35,
    originalPrice: 49,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: true,
    isFeatured: true,
    colorOptions: [
      { name: { zh: '粉紫渐变', en: 'Pink Purple Gradient', ms: 'Gradien Ungu Merah Jambu' }, hex: '#D8B4E2' },
      { name: { zh: '蓝紫渐变', en: 'Blue Purple Gradient', ms: 'Gradien Biru Ungu' }, hex: '#7B68EE' },
      { name: { zh: '橙粉渐变', en: 'Orange Pink Gradient', ms: 'Gradien Jingga Merah Jambu' }, hex: '#FF8C69' },
    ],
    createdAt: '2026-02-15',
    sortOrder: 100,
  },
  {
    id: 'case-007',
    sku: 'CA-XM-RN14PP-002',
    name: { zh: '简约几何线条壳', en: 'Minimalist Geometric Line Case', ms: 'Sarung Garis Geometri Minimalis' },
    description: {
      zh: '抽象几何线条设计，磨砂手感，防指纹防油污，日系简约风',
      en: 'Abstract geometric line design, matte touch, anti-fingerprint and anti-oil, Japanese minimalist style.',
      ms: 'Reka bentuk garis geometri abstrak, sentuhan matte, anti-cap jari dan anti-minyak, gaya minimalis Jepun.',
    },
    modelId: 'redmi-note-14-pro-plus',
    styles: ['geometric', 'matte', 'japanese-style'],
    material: 'tpu',
    images: [],
    price: 29,
    originalPrice: 0,
    stock: 'in_stock',
    status: 'active',
    isNew: false,
    isHot: false,
    isFeatured: false,
    colorOptions: [
      { name: { zh: '极夜黑', en: 'Midnight Black', ms: 'Hitam Tengah Malam' }, hex: '#0D0D0D' },
      { name: { zh: '晨雾白', en: 'Mist White', ms: 'Putih Kabus' }, hex: '#F0F0F0' },
    ],
    createdAt: '2026-03-01',
    sortOrder: 99,
  },

  // vivo V50 — 2 款
  {
    id: 'case-008',
    sku: 'CA-VV-V50-001',
    name: { zh: '花卉浮雕亮面壳', en: 'Floral Embossed Glossy Case', ms: 'Sarung Berkilat Timbul Bunga' },
    description: {
      zh: '3D浮雕花卉工艺，亮面处理，清新文艺风格，手感舒适防滑',
      en: '3D embossed floral craft, glossy finish, fresh artistic style, comfortable and anti-slip grip.',
      ms: 'Kraf bunga timbul 3D, kemasan berkilat, gaya artistik segar, cengkaman selesa dan anti-gelincir.',
    },
    modelId: 'vivo-v50',
    styles: ['floral', 'glossy', 'korean-style'],
    material: 'tpu+pc',
    images: [],
    price: 39,
    originalPrice: 55,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: true,
    isFeatured: true,
    colorOptions: [
      { name: { zh: '樱花粉', en: 'Sakura Pink', ms: 'Merah Jambu Sakura' }, hex: '#FFB7C5' },
      { name: { zh: '薰衣草紫', en: 'Lavender', ms: 'Lavender' }, hex: '#B19CD9' },
    ],
    createdAt: '2026-02-20',
    sortOrder: 100,
  },
  {
    id: 'case-009',
    sku: 'CA-VV-V50-002',
    name: { zh: 'TPU超薄透明壳', en: 'Ultra-Thin TPU Clear Case', ms: 'Sarung Jernih TPU Ultra Nipis' },
    description: {
      zh: '0.3mm超薄TPU，裸机手感，防刮涂层，精准孔位',
      en: '0.3mm ultra-thin TPU, bare-phone feel, anti-scratch coating, precise cutouts.',
      ms: 'TPU ultra nipis 0.3mm, rasa telefon asal, salutan anti-calar, potongan tepat.',
    },
    modelId: 'vivo-v50',
    styles: ['slim', 'clear'],
    material: 'tpu',
    images: [],
    price: 19,
    originalPrice: 29,
    stock: 'in_stock',
    status: 'active',
    isNew: false,
    isHot: false,
    isFeatured: false,
    colorOptions: [
      { name: { zh: '透明', en: 'Transparent', ms: 'Telus' }, hex: 'transparent' },
    ],
    createdAt: '2026-03-05',
    sortOrder: 99,
  },

  // realme 14 Pro+ — 2 款
  {
    id: 'case-010',
    sku: 'CA-RM-14PP-001',
    name: { zh: '街头文字标语壳', en: 'Street Style Text Slogan Case', ms: 'Sarung Teks Slogan Gaya Jalanan' },
    description: {
      zh: '潮流街头文字设计，磨砂手感不掉色，个性态度表达',
      en: 'Trendy street text design, matte finish that never fades, express your attitude.',
      ms: 'Reka bentuk teks jalanan bergaya, kemasan matte yang tidak pernah pudar, nyatakan sikap anda.',
    },
    modelId: 'realme-14-pro-plus',
    styles: ['text', 'matte', 'korean-style'],
    material: 'pc',
    images: [],
    price: 35,
    originalPrice: 45,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: true,
    isFeatured: false,
    colorOptions: [
      { name: { zh: '克莱因蓝', en: 'Klein Blue', ms: 'Biru Klein' }, hex: '#002FA7' },
      { name: { zh: '冷酷黑', en: 'Cool Black', ms: 'Hitam Sejuk' }, hex: '#1C1C1E' },
    ],
    createdAt: '2026-03-10',
    sortOrder: 100,
  },
  {
    id: 'case-011',
    sku: 'CA-RM-14PP-002',
    name: { zh: '情侣款卡通萌宠壳', en: 'Couple Cute Pet Cartoon Case', ms: 'Sarung Kartun Haiwan Comel Pasangan' },
    description: {
      zh: '原创手绘萌宠图案，情侣对装配对设计，高透印刷不褪色',
      en: 'Original hand-drawn cute pet design, couple matching set, HD print that never fades.',
      ms: 'Reka bentuk haiwan comel lukisan tangan asli, set padanan pasangan, cetakan HD yang tidak pernah pudar.',
    },
    modelId: 'realme-14-pro-plus',
    styles: ['cartoon', 'couple'],
    material: 'tpu+pc',
    images: [],
    price: 39,
    originalPrice: 0,
    stock: 'in_stock',
    status: 'active',
    isNew: false,
    isHot: false,
    isFeatured: false,
    colorOptions: [
      { name: { zh: '奶油白', en: 'Cream White', ms: 'Putih Krim' }, hex: '#FFFDD0' },
    ],
    createdAt: '2026-03-15',
    sortOrder: 99,
  },

  // Honor 600 Lite — 1 款
  {
    id: 'case-012',
    sku: 'CA-HN-600L-001',
    name: { zh: '复古胶片风磨砂壳', en: 'Retro Film Camera Matte Case', ms: 'Sarung Matte Kamera Filem Retro' },
    description: {
      zh: '复古胶片相机造型，磨砂质感防指纹，文艺青年专属',
      en: 'Retro film camera design, matte texture anti-fingerprint, perfect for artistic souls.',
      ms: 'Reka bentuk kamera filem retro, tekstur matte anti-cap jari, sesuai untuk jiwa artistik.',
    },
    modelId: 'honor-600-lite',
    styles: ['retro', 'matte', 'minimalist'],
    material: 'tpu+pc',
    images: [],
    price: 35,
    originalPrice: 49,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: true,
    isFeatured: true,
    colorOptions: [
      { name: { zh: '复古棕', en: 'Vintage Brown', ms: 'Coklat Vintaj' }, hex: '#8B7355' },
      { name: { zh: '怀旧黑', en: 'Nostalgic Black', ms: 'Hitam Nostalgia' }, hex: '#2C2C2C' },
    ],
    createdAt: '2026-03-20',
    sortOrder: 100,
  },

  // Tecno Camon 50 Ultra — 1 款
  {
    id: 'case-013',
    sku: 'CA-TC-C50U-001',
    name: { zh: '抽象泼墨艺术壳', en: 'Abstract Ink Splash Art Case', ms: 'Sarung Seni Percikan Dakwat Abstrak' },
    description: {
      zh: '原创抽象泼墨图案，每款独一无二，亮面工艺防刮花',
      en: 'Original abstract ink splash pattern, each piece unique, glossy finish with scratch resistance.',
      ms: 'Corak percikan dakwat abstrak asli, setiap satu unik, kemasan berkilat dengan ketahanan calar.',
    },
    modelId: 'tecno-camon-50-ultra',
    styles: ['abstract', 'glossy'],
    material: 'pc',
    images: [],
    price: 35,
    originalPrice: 49,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: true,
    isFeatured: true,
    colorOptions: [
      { name: { zh: '泼墨黑', en: 'Ink Black', ms: 'Hitam Dakwat' }, hex: '#1A1A1A' },
      { name: { zh: '泼墨蓝', en: 'Ink Blue', ms: 'Biru Dakwat' }, hex: '#1A3A5C' },
    ],
    createdAt: '2026-04-01',
    sortOrder: 100,
  },

  // OPPO Find X8 Pro — 1 款
  {
    id: 'case-014',
    sku: 'CA-OP-FX8P-001',
    name: { zh: '金属边框透明背板壳', en: 'Metal Bumper Clear Back Case', ms: 'Sarung Bingkai Logam Belakang Jernih' },
    description: {
      zh: '航空铝合金边框+钢化玻璃背板，透明展示原机色，全方位防摔',
      en: 'Aviation aluminum frame + tempered glass back, transparent to show off original color, all-round drop protection.',
      ms: 'Bingkai aluminium penerbangan + belakang kaca terbaja, telus untuk mempamerkan warna asal, perlindungan jatuh menyeluruh.',
    },
    modelId: 'oppo-find-x8-pro',
    styles: ['metal-bumper', 'clear', 'heavy-duty'],
    material: 'aluminum',
    images: [],
    price: 65,
    originalPrice: 99,
    stock: 'in_stock',
    status: 'active',
    isNew: true,
    isHot: true,
    isFeatured: true,
    colorOptions: [
      { name: { zh: '银色边框', en: 'Silver Frame', ms: 'Bingkai Perak' }, hex: '#C0C0C0' },
      { name: { zh: '黑色边框', en: 'Black Frame', ms: 'Bingkai Hitam' }, hex: '#1C1C1E' },
    ],
    createdAt: '2026-04-05',
    sortOrder: 100,
  },
];

// ============================================================
// 工具函数
// ============================================================

/** 根据型号 ID 获取该型号所有在售商品 */
export function getProductsByModelId(modelId: string, products: PhoneCaseProduct[]): PhoneCaseProduct[] {
  return products
    .filter((p) => p.modelId === modelId && p.status === 'active')
    .sort((a, b) => b.sortOrder - a.sortOrder);
}

/** 根据品牌 ID 获取该品牌所有在售商品 */
export function getProductsByBrandId(brandId: string, products: PhoneCaseProduct[], modelIds: string[]): PhoneCaseProduct[] {
  return products
    .filter((p) => modelIds.includes(p.modelId) && p.status === 'active')
    .sort((a, b) => b.sortOrder - a.sortOrder);
}

/** 获取新品（按上架日期降序） */
export function getNewProducts(products: PhoneCaseProduct[], limit = 12): PhoneCaseProduct[] {
  return products
    .filter((p) => p.status === 'active')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/** 获取热销商品 */
export function getHotProducts(products: PhoneCaseProduct[], limit = 12): PhoneCaseProduct[] {
  return products
    .filter((p) => p.isHot && p.status === 'active')
    .sort((a, b) => b.sortOrder - a.sortOrder)
    .slice(0, limit);
}

/** 获取首页推荐商品 */
export function getFeaturedProducts(products: PhoneCaseProduct[], limit = 8): PhoneCaseProduct[] {
  return products
    .filter((p) => p.isFeatured && p.status === 'active')
    .sort((a, b) => b.sortOrder - a.sortOrder)
    .slice(0, limit);
}
