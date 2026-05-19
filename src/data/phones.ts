// ============================================================
// 马来西亚 2026 热门手机品牌 → 型号 全分类数据
// 全站唯一商品：手机壳 / 唯一分类维度：手机型号
// 管理员可在后台无限新增、编辑、删除机型
// ============================================================

export interface PhoneModel {
  /** 型号唯一标识，如 "iphone-16-pro-max" */
  id: string;
  /** 型号名称，如 "iPhone 16 Pro Max" */
  name: string;
  /** 屏幕尺寸（英寸），用于前端展示筛选 */
  screenSize?: string;
  /** 发布年份 */
  year: number;
  /** 是否热门机型（置顶展示） */
  hot: boolean;
  /** 排序权重（越大越靠前） */
  sortOrder: number;
}

export interface PhoneBrand {
  /** 品牌唯一标识，如 "apple" */
  id: string;
  /** 品牌名称 */
  name: string;
  /** 品牌 LOGO 路径（可选） */
  logo?: string;
  /** 排序权重 */
  sortOrder: number;
  /** 旗下机型列表 */
  models: PhoneModel[];
}

// ============================================================
// 2026 马来西亚全覆盖热门手机品牌 + 型号
// ============================================================

export const phoneBrands: PhoneBrand[] = [
  // ────────────────────────────────────────
  // 1. Apple iPhone
  // ────────────────────────────────────────
  {
    id: 'apple',
    name: 'Apple',
    logo: '/assets/brands/apple.svg',
    sortOrder: 100,
    models: [
      { id: 'iphone-16-pro-max',    name: 'iPhone 16 Pro Max',    screenSize: '6.9"', year: 2024, hot: true,  sortOrder: 100 },
      { id: 'iphone-16-pro',        name: 'iPhone 16 Pro',        screenSize: '6.3"', year: 2024, hot: true,  sortOrder: 99 },
      { id: 'iphone-16-plus',       name: 'iPhone 16 Plus',       screenSize: '6.7"', year: 2024, hot: true,  sortOrder: 98 },
      { id: 'iphone-16',            name: 'iPhone 16',            screenSize: '6.1"', year: 2024, hot: true,  sortOrder: 97 },
      { id: 'iphone-15-pro-max',    name: 'iPhone 15 Pro Max',    screenSize: '6.7"', year: 2023, hot: true,  sortOrder: 96 },
      { id: 'iphone-15-pro',        name: 'iPhone 15 Pro',        screenSize: '6.1"', year: 2023, hot: true,  sortOrder: 95 },
      { id: 'iphone-15-plus',       name: 'iPhone 15 Plus',       screenSize: '6.7"', year: 2023, hot: false, sortOrder: 94 },
      { id: 'iphone-15',            name: 'iPhone 15',            screenSize: '6.1"', year: 2023, hot: false, sortOrder: 93 },
      { id: 'iphone-14-pro-max',    name: 'iPhone 14 Pro Max',    screenSize: '6.7"', year: 2022, hot: false, sortOrder: 92 },
      { id: 'iphone-14-pro',        name: 'iPhone 14 Pro',        screenSize: '6.1"', year: 2022, hot: false, sortOrder: 91 },
      { id: 'iphone-14-plus',       name: 'iPhone 14 Plus',       screenSize: '6.7"', year: 2022, hot: false, sortOrder: 90 },
      { id: 'iphone-14',            name: 'iPhone 14',            screenSize: '6.1"', year: 2022, hot: false, sortOrder: 89 },
      { id: 'iphone-13-pro-max',    name: 'iPhone 13 Pro Max',    screenSize: '6.7"', year: 2021, hot: false, sortOrder: 88 },
      { id: 'iphone-13-pro',        name: 'iPhone 13 Pro',        screenSize: '6.1"', year: 2021, hot: false, sortOrder: 87 },
      { id: 'iphone-13',            name: 'iPhone 13',            screenSize: '6.1"', year: 2021, hot: false, sortOrder: 86 },
      { id: 'iphone-13-mini',       name: 'iPhone 13 mini',       screenSize: '5.4"', year: 2021, hot: false, sortOrder: 85 },
      { id: 'iphone-12-pro-max',    name: 'iPhone 12 Pro Max',    screenSize: '6.7"', year: 2020, hot: false, sortOrder: 84 },
      { id: 'iphone-12-pro',        name: 'iPhone 12 Pro',        screenSize: '6.1"', year: 2020, hot: false, sortOrder: 83 },
      { id: 'iphone-12',            name: 'iPhone 12',            screenSize: '6.1"', year: 2020, hot: false, sortOrder: 82 },
      { id: 'iphone-12-mini',       name: 'iPhone 12 mini',       screenSize: '5.4"', year: 2020, hot: false, sortOrder: 81 },
    ],
  },

  // ────────────────────────────────────────
  // 2. Samsung Galaxy
  // ────────────────────────────────────────
  {
    id: 'samsung',
    name: 'Samsung',
    logo: '/assets/brands/samsung.svg',
    sortOrder: 90,
    models: [
      // S26 系列（2026）
      { id: 'galaxy-s26-ultra',     name: 'Galaxy S26 Ultra',     screenSize: '6.9"', year: 2026, hot: true,  sortOrder: 100 },
      { id: 'galaxy-s26-plus',      name: 'Galaxy S26+',          screenSize: '6.7"', year: 2026, hot: true,  sortOrder: 99 },
      { id: 'galaxy-s26',           name: 'Galaxy S26',           screenSize: '6.2"', year: 2026, hot: true,  sortOrder: 98 },
      // S25 系列（2025）
      { id: 'galaxy-s25-ultra',     name: 'Galaxy S25 Ultra',     screenSize: '6.9"', year: 2025, hot: true,  sortOrder: 97 },
      { id: 'galaxy-s25-plus',      name: 'Galaxy S25+',          screenSize: '6.7"', year: 2025, hot: true,  sortOrder: 96 },
      { id: 'galaxy-s25',           name: 'Galaxy S25',           screenSize: '6.2"', year: 2025, hot: false, sortOrder: 95 },
      // S24 系列（2024）
      { id: 'galaxy-s24-ultra',     name: 'Galaxy S24 Ultra',     screenSize: '6.8"', year: 2024, hot: true,  sortOrder: 94 },
      { id: 'galaxy-s24-plus',      name: 'Galaxy S24+',          screenSize: '6.7"', year: 2024, hot: false, sortOrder: 93 },
      { id: 'galaxy-s24',           name: 'Galaxy S24',           screenSize: '6.2"', year: 2024, hot: false, sortOrder: 92 },
      // S23 系列（2023）
      { id: 'galaxy-s23-ultra',     name: 'Galaxy S23 Ultra',     screenSize: '6.8"', year: 2023, hot: false, sortOrder: 91 },
      { id: 'galaxy-s23-plus',      name: 'Galaxy S23+',          screenSize: '6.6"', year: 2023, hot: false, sortOrder: 90 },
      { id: 'galaxy-s23',           name: 'Galaxy S23',           screenSize: '6.1"', year: 2023, hot: false, sortOrder: 89 },
      // Z Fold 折叠系列
      { id: 'galaxy-z-fold-7',      name: 'Galaxy Z Fold 7',      screenSize: '7.6"', year: 2026, hot: true,  sortOrder: 88 },
      { id: 'galaxy-z-fold-6',      name: 'Galaxy Z Fold 6',      screenSize: '7.6"', year: 2024, hot: true,  sortOrder: 87 },
      { id: 'galaxy-z-fold-5',      name: 'Galaxy Z Fold 5',      screenSize: '7.6"', year: 2023, hot: false, sortOrder: 86 },
      // Z Flip 折叠系列
      { id: 'galaxy-z-flip-7',      name: 'Galaxy Z Flip 7',      screenSize: '6.7"', year: 2026, hot: true,  sortOrder: 85 },
      { id: 'galaxy-z-flip-6',      name: 'Galaxy Z Flip 6',      screenSize: '6.7"', year: 2024, hot: true,  sortOrder: 84 },
      { id: 'galaxy-z-flip-5',      name: 'Galaxy Z Flip 5',      screenSize: '6.7"', year: 2023, hot: false, sortOrder: 83 },
      // A 系列（马来西亚中端主流）
      { id: 'galaxy-a56',           name: 'Galaxy A56',           screenSize: '6.5"', year: 2025, hot: true,  sortOrder: 82 },
      { id: 'galaxy-a55',           name: 'Galaxy A55',           screenSize: '6.6"', year: 2024, hot: true,  sortOrder: 81 },
      { id: 'galaxy-a54',           name: 'Galaxy A54',           screenSize: '6.4"', year: 2023, hot: false, sortOrder: 80 },
      { id: 'galaxy-a36',           name: 'Galaxy A36',           screenSize: '6.6"', year: 2025, hot: true,  sortOrder: 79 },
      { id: 'galaxy-a35',           name: 'Galaxy A35',           screenSize: '6.6"', year: 2024, hot: true,  sortOrder: 78 },
      { id: 'galaxy-a34',           name: 'Galaxy A34',           screenSize: '6.6"', year: 2023, hot: false, sortOrder: 77 },
      { id: 'galaxy-a26',           name: 'Galaxy A26',           screenSize: '6.5"', year: 2025, hot: false, sortOrder: 76 },
      { id: 'galaxy-a25',           name: 'Galaxy A25',           screenSize: '6.5"', year: 2024, hot: false, sortOrder: 75 },
      { id: 'galaxy-a16',           name: 'Galaxy A16',           screenSize: '6.7"', year: 2025, hot: false, sortOrder: 74 },
      { id: 'galaxy-a15',           name: 'Galaxy A15',           screenSize: '6.5"', year: 2024, hot: false, sortOrder: 73 },
      { id: 'galaxy-a06',           name: 'Galaxy A06',           screenSize: '6.7"', year: 2025, hot: false, sortOrder: 72 },
      { id: 'galaxy-a05',           name: 'Galaxy A05',           screenSize: '6.7"', year: 2024, hot: false, sortOrder: 71 },
      // M 系列（线上/性价比）
      { id: 'galaxy-m55',           name: 'Galaxy M55',           screenSize: '6.7"', year: 2024, hot: false, sortOrder: 70 },
      { id: 'galaxy-m35',           name: 'Galaxy M35',           screenSize: '6.6"', year: 2024, hot: false, sortOrder: 69 },
      { id: 'galaxy-m15',           name: 'Galaxy M15',           screenSize: '6.5"', year: 2024, hot: false, sortOrder: 68 },
    ],
  },

  // ────────────────────────────────────────
  // 3. Xiaomi / Redmi / POCO
  // ────────────────────────────────────────
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logo: '/assets/brands/xiaomi.svg',
    sortOrder: 80,
    models: [
      // Xiaomi 数字旗舰
      { id: 'xiaomi-15-ultra',       name: 'Xiaomi 15 Ultra',      screenSize: '6.73"', year: 2025, hot: true,  sortOrder: 100 },
      { id: 'xiaomi-15-pro',         name: 'Xiaomi 15 Pro',         screenSize: '6.73"', year: 2025, hot: true,  sortOrder: 99 },
      { id: 'xiaomi-15',             name: 'Xiaomi 15',             screenSize: '6.36"', year: 2025, hot: true,  sortOrder: 98 },
      { id: 'xiaomi-14-ultra',       name: 'Xiaomi 14 Ultra',       screenSize: '6.73"', year: 2024, hot: true,  sortOrder: 97 },
      { id: 'xiaomi-14-pro',         name: 'Xiaomi 14 Pro',         screenSize: '6.73"', year: 2024, hot: false, sortOrder: 96 },
      { id: 'xiaomi-14',             name: 'Xiaomi 14',             screenSize: '6.36"', year: 2024, hot: false, sortOrder: 95 },
      { id: 'xiaomi-13-pro',         name: 'Xiaomi 13 Pro',         screenSize: '6.73"', year: 2023, hot: false, sortOrder: 94 },
      { id: 'xiaomi-13',             name: 'Xiaomi 13',             screenSize: '6.36"', year: 2023, hot: false, sortOrder: 93 },
      // Redmi Note 系列（马来西亚最畅销中端）
      { id: 'redmi-note-14-pro-plus', name: 'Redmi Note 14 Pro+',   screenSize: '6.67"', year: 2025, hot: true,  sortOrder: 92 },
      { id: 'redmi-note-14-pro',     name: 'Redmi Note 14 Pro',     screenSize: '6.67"', year: 2025, hot: true,  sortOrder: 91 },
      { id: 'redmi-note-14',         name: 'Redmi Note 14',         screenSize: '6.67"', year: 2025, hot: false, sortOrder: 90 },
      { id: 'redmi-note-13-pro-plus', name: 'Redmi Note 13 Pro+',   screenSize: '6.67"', year: 2024, hot: true,  sortOrder: 89 },
      { id: 'redmi-note-13-pro',     name: 'Redmi Note 13 Pro',     screenSize: '6.67"', year: 2024, hot: true,  sortOrder: 88 },
      { id: 'redmi-note-13',         name: 'Redmi Note 13',         screenSize: '6.67"', year: 2024, hot: false, sortOrder: 87 },
      // Redmi 数字系列
      { id: 'redmi-14c',             name: 'Redmi 14C',             screenSize: '6.88"', year: 2025, hot: false, sortOrder: 86 },
      { id: 'redmi-13c',             name: 'Redmi 13C',             screenSize: '6.74"', year: 2024, hot: false, sortOrder: 85 },
      { id: 'redmi-13',              name: 'Redmi 13',              screenSize: '6.79"', year: 2024, hot: false, sortOrder: 84 },
      // POCO 系列（马来西亚热门性价比品牌）
      { id: 'poco-f7-pro',           name: 'POCO F7 Pro',           screenSize: '6.67"', year: 2025, hot: true,  sortOrder: 83 },
      { id: 'poco-f7',               name: 'POCO F7',               screenSize: '6.67"', year: 2025, hot: true,  sortOrder: 82 },
      { id: 'poco-f6-pro',           name: 'POCO F6 Pro',           screenSize: '6.67"', year: 2024, hot: false, sortOrder: 81 },
      { id: 'poco-f6',               name: 'POCO F6',               screenSize: '6.67"', year: 2024, hot: false, sortOrder: 80 },
      { id: 'poco-x7-pro',           name: 'POCO X7 Pro',           screenSize: '6.67"', year: 2025, hot: true,  sortOrder: 79 },
      { id: 'poco-x7',               name: 'POCO X7',               screenSize: '6.67"', year: 2025, hot: false, sortOrder: 78 },
      { id: 'poco-x6-pro',           name: 'POCO X6 Pro',           screenSize: '6.67"', year: 2024, hot: true,  sortOrder: 77 },
      { id: 'poco-x6',               name: 'POCO X6',               screenSize: '6.67"', year: 2024, hot: false, sortOrder: 76 },
      { id: 'poco-m6-pro',           name: 'POCO M6 Pro',           screenSize: '6.67"', year: 2024, hot: false, sortOrder: 75 },
      { id: 'poco-c75',              name: 'POCO C75',              screenSize: '6.88"', year: 2025, hot: false, sortOrder: 74 },
    ],
  },

  // ────────────────────────────────────────
  // 4. realme
  // ────────────────────────────────────────
  {
    id: 'realme',
    name: 'realme',
    logo: '/assets/brands/realme.svg',
    sortOrder: 75,
    models: [
      // realme 14 系列（2025）
      { id: 'realme-14-pro-plus',    name: 'realme 14 Pro+',        screenSize: '6.7"',  year: 2025, hot: true,  sortOrder: 100 },
      { id: 'realme-14-pro',         name: 'realme 14 Pro',         screenSize: '6.7"',  year: 2025, hot: true,  sortOrder: 99 },
      { id: 'realme-14x',            name: 'realme 14x',            screenSize: '6.67"', year: 2025, hot: true,  sortOrder: 98 },
      { id: 'realme-14',             name: 'realme 14',             screenSize: '6.67"', year: 2025, hot: false, sortOrder: 97 },
      // realme 13 系列（2024）
      { id: 'realme-13-pro-plus',    name: 'realme 13 Pro+',        screenSize: '6.7"',  year: 2024, hot: true,  sortOrder: 96 },
      { id: 'realme-13-pro',         name: 'realme 13 Pro',         screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 95 },
      { id: 'realme-13-plus',        name: 'realme 13+',            screenSize: '6.67"', year: 2024, hot: false, sortOrder: 94 },
      { id: 'realme-13',             name: 'realme 13',             screenSize: '6.67"', year: 2024, hot: false, sortOrder: 93 },
      // realme 12 系列（2024）
      { id: 'realme-12-pro-plus',    name: 'realme 12 Pro+',        screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 92 },
      { id: 'realme-12-pro',         name: 'realme 12 Pro',         screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 91 },
      { id: 'realme-12-plus',        name: 'realme 12+',            screenSize: '6.67"', year: 2024, hot: false, sortOrder: 90 },
      { id: 'realme-12',             name: 'realme 12',             screenSize: '6.67"', year: 2024, hot: false, sortOrder: 89 },
      // realme C 系列（入门）
      { id: 'realme-c75',            name: 'realme C75',            screenSize: '6.72"', year: 2025, hot: false, sortOrder: 88 },
      { id: 'realme-c67',            name: 'realme C67',            screenSize: '6.72"', year: 2024, hot: false, sortOrder: 87 },
      { id: 'realme-c65',            name: 'realme C65',            screenSize: '6.67"', year: 2024, hot: false, sortOrder: 86 },
      { id: 'realme-c63',            name: 'realme C63',            screenSize: '6.74"', year: 2024, hot: false, sortOrder: 85 },
      { id: 'realme-c53',            name: 'realme C53',            screenSize: '6.74"', year: 2023, hot: false, sortOrder: 84 },
      // realme GT 系列
      { id: 'realme-gt-7-pro',       name: 'realme GT 7 Pro',       screenSize: '6.78"', year: 2025, hot: true,  sortOrder: 83 },
      { id: 'realme-gt-6',           name: 'realme GT 6',           screenSize: '6.78"', year: 2024, hot: false, sortOrder: 82 },
    ],
  },

  // ────────────────────────────────────────
  // 5. vivo / iQOO
  // ────────────────────────────────────────
  {
    id: 'vivo',
    name: 'vivo',
    logo: '/assets/brands/vivo.svg',
    sortOrder: 70,
    models: [
      // vivo V 系列（马来西亚主力）
      { id: 'vivo-v50',             name: 'vivo V50',               screenSize: '6.77"', year: 2025, hot: true,  sortOrder: 100 },
      { id: 'vivo-v50-pro',         name: 'vivo V50 Pro',           screenSize: '6.77"', year: 2025, hot: true,  sortOrder: 99 },
      { id: 'vivo-v40',             name: 'vivo V40',               screenSize: '6.78"', year: 2024, hot: true,  sortOrder: 98 },
      { id: 'vivo-v40-pro',         name: 'vivo V40 Pro',           screenSize: '6.78"', year: 2024, hot: false, sortOrder: 97 },
      { id: 'vivo-v30',             name: 'vivo V30',               screenSize: '6.78"', year: 2024, hot: false, sortOrder: 96 },
      { id: 'vivo-v30-pro',         name: 'vivo V30 Pro',           screenSize: '6.78"', year: 2024, hot: false, sortOrder: 95 },
      { id: 'vivo-v29',             name: 'vivo V29',               screenSize: '6.78"', year: 2023, hot: false, sortOrder: 94 },
      // vivo X 系列（旗舰）
      { id: 'vivo-x200-pro',        name: 'vivo X200 Pro',          screenSize: '6.78"', year: 2025, hot: true,  sortOrder: 93 },
      { id: 'vivo-x200',            name: 'vivo X200',              screenSize: '6.67"', year: 2025, hot: true,  sortOrder: 92 },
      { id: 'vivo-x100-pro',        name: 'vivo X100 Pro',          screenSize: '6.78"', year: 2024, hot: false, sortOrder: 91 },
      { id: 'vivo-x100',            name: 'vivo X100',              screenSize: '6.78"', year: 2024, hot: false, sortOrder: 90 },
      // vivo Y 系列（入门/中端）
      { id: 'vivo-y100',            name: 'vivo Y100',              screenSize: '6.67"', year: 2024, hot: false, sortOrder: 89 },
      { id: 'vivo-y56',             name: 'vivo Y56',               screenSize: '6.58"', year: 2023, hot: false, sortOrder: 88 },
      { id: 'vivo-y36',             name: 'vivo Y36',               screenSize: '6.64"', year: 2023, hot: false, sortOrder: 87 },
      { id: 'vivo-y28',             name: 'vivo Y28',               screenSize: '6.56"', year: 2024, hot: false, sortOrder: 86 },
      { id: 'vivo-y18',             name: 'vivo Y18',               screenSize: '6.56"', year: 2024, hot: false, sortOrder: 85 },
      { id: 'vivo-y03',             name: 'vivo Y03',               screenSize: '6.56"', year: 2024, hot: false, sortOrder: 84 },
      // iQOO 系列（马来西亚在售）
      { id: 'iqoo-13',              name: 'iQOO 13',                screenSize: '6.82"', year: 2025, hot: true,  sortOrder: 83 },
      { id: 'iqoo-12',              name: 'iQOO 12',                screenSize: '6.78"', year: 2024, hot: true,  sortOrder: 82 },
      { id: 'iqoo-12-pro',          name: 'iQOO 12 Pro',            screenSize: '6.78"', year: 2024, hot: false, sortOrder: 81 },
      { id: 'iqoo-z9-turbo',        name: 'iQOO Z9 Turbo',          screenSize: '6.78"', year: 2024, hot: true,  sortOrder: 80 },
      { id: 'iqoo-z9',              name: 'iQOO Z9',                screenSize: '6.67"', year: 2024, hot: false, sortOrder: 79 },
      { id: 'iqoo-z9x',             name: 'iQOO Z9x',               screenSize: '6.72"', year: 2024, hot: false, sortOrder: 78 },
      { id: 'iqoo-z8',              name: 'iQOO Z8',                screenSize: '6.64"', year: 2023, hot: false, sortOrder: 77 },
    ],
  },

  // ────────────────────────────────────────
  // 6. OPPO / OnePlus
  // ────────────────────────────────────────
  {
    id: 'oppo',
    name: 'OPPO',
    logo: '/assets/brands/oppo.svg',
    sortOrder: 68,
    models: [
      // OPPO Find 系列（旗舰）
      { id: 'oppo-find-x8-pro',     name: 'OPPO Find X8 Pro',       screenSize: '6.78"', year: 2025, hot: true,  sortOrder: 100 },
      { id: 'oppo-find-x8',         name: 'OPPO Find X8',           screenSize: '6.59"', year: 2025, hot: true,  sortOrder: 99 },
      { id: 'oppo-find-x7-ultra',   name: 'OPPO Find X7 Ultra',     screenSize: '6.82"', year: 2024, hot: false, sortOrder: 98 },
      { id: 'oppo-find-x7',         name: 'OPPO Find X7',           screenSize: '6.78"', year: 2024, hot: false, sortOrder: 97 },
      // OPPO Reno 系列
      { id: 'oppo-reno-14-pro',     name: 'OPPO Reno 14 Pro',       screenSize: '6.7"',  year: 2025, hot: true,  sortOrder: 96 },
      { id: 'oppo-reno-14',         name: 'OPPO Reno 14',           screenSize: '6.7"',  year: 2025, hot: true,  sortOrder: 95 },
      { id: 'oppo-reno-13-pro',     name: 'OPPO Reno 13 Pro',       screenSize: '6.7"',  year: 2025, hot: false, sortOrder: 94 },
      { id: 'oppo-reno-13',         name: 'OPPO Reno 13',           screenSize: '6.7"',  year: 2025, hot: false, sortOrder: 93 },
      { id: 'oppo-reno-12-pro',     name: 'OPPO Reno 12 Pro',       screenSize: '6.7"',  year: 2024, hot: true,  sortOrder: 92 },
      { id: 'oppo-reno-12',         name: 'OPPO Reno 12',           screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 91 },
      { id: 'oppo-reno-11',         name: 'OPPO Reno 11',           screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 90 },
      // OPPO A 系列（入门/中端）
      { id: 'oppo-a5-pro',          name: 'OPPO A5 Pro',            screenSize: '6.7"',  year: 2025, hot: false, sortOrder: 89 },
      { id: 'oppo-a5',              name: 'OPPO A5',                screenSize: '6.7"',  year: 2025, hot: false, sortOrder: 88 },
      { id: 'oppo-a3-pro',          name: 'OPPO A3 Pro',            screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 87 },
      { id: 'oppo-a3',              name: 'OPPO A3',                screenSize: '6.67"', year: 2024, hot: false, sortOrder: 86 },
      { id: 'oppo-a80',             name: 'OPPO A80',               screenSize: '6.56"', year: 2024, hot: false, sortOrder: 85 },
      { id: 'oppo-a60',             name: 'OPPO A60',               screenSize: '6.67"', year: 2024, hot: false, sortOrder: 84 },
      { id: 'oppo-a38',             name: 'OPPO A38',               screenSize: '6.56"', year: 2023, hot: false, sortOrder: 83 },
      // OnePlus（同集团品牌）
      { id: 'oneplus-13',           name: 'OnePlus 13',             screenSize: '6.82"', year: 2025, hot: true,  sortOrder: 82 },
      { id: 'oneplus-13r',          name: 'OnePlus 13R',            screenSize: '6.78"', year: 2025, hot: true,  sortOrder: 81 },
      { id: 'oneplus-12',           name: 'OnePlus 12',             screenSize: '6.82"', year: 2024, hot: false, sortOrder: 80 },
      { id: 'oneplus-12r',          name: 'OnePlus 12R',            screenSize: '6.78"', year: 2024, hot: false, sortOrder: 79 },
      { id: 'oneplus-nord-5',       name: 'OnePlus Nord 5',         screenSize: '6.74"', year: 2025, hot: false, sortOrder: 78 },
      { id: 'oneplus-nord-4',       name: 'OnePlus Nord 4',         screenSize: '6.74"', year: 2024, hot: false, sortOrder: 77 },
      { id: 'oneplus-nord-ce4',     name: 'OnePlus Nord CE 4',      screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 76 },
    ],
  },

  // ────────────────────────────────────────
  // 7. Honor（荣耀）
  // ────────────────────────────────────────
  {
    id: 'honor',
    name: 'Honor',
    logo: '/assets/brands/honor.svg',
    sortOrder: 65,
    models: [
      // Honor 600 系列（2025）
      { id: 'honor-600',            name: 'Honor 600',              screenSize: '6.7"',  year: 2025, hot: true,  sortOrder: 100 },
      { id: 'honor-600-lite',       name: 'Honor 600 Lite',         screenSize: '6.7"',  year: 2025, hot: true,  sortOrder: 99 },
      { id: 'honor-600-pro',        name: 'Honor 600 Pro',          screenSize: '6.78"', year: 2025, hot: true,  sortOrder: 98 },
      // Honor 200 系列（2024）
      { id: 'honor-200-pro',        name: 'Honor 200 Pro',          screenSize: '6.78"', year: 2024, hot: true,  sortOrder: 97 },
      { id: 'honor-200',            name: 'Honor 200',              screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 96 },
      { id: 'honor-200-lite',       name: 'Honor 200 Lite',         screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 95 },
      // Honor X 系列
      { id: 'honor-x9c',            name: 'Honor X9c',              screenSize: '6.78"', year: 2025, hot: true,  sortOrder: 94 },
      { id: 'honor-x9b',            name: 'Honor X9b',              screenSize: '6.78"', year: 2024, hot: true,  sortOrder: 93 },
      { id: 'honor-x8b',            name: 'Honor X8b',              screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 92 },
      { id: 'honor-x7b',            name: 'Honor X7b',              screenSize: '6.56"', year: 2024, hot: false, sortOrder: 91 },
      { id: 'honor-x6b',            name: 'Honor X6b',              screenSize: '6.56"', year: 2024, hot: false, sortOrder: 90 },
      // Honor Magic 系列（旗舰）
      { id: 'honor-magic7-pro',     name: 'Honor Magic 7 Pro',      screenSize: '6.8"',  year: 2025, hot: true,  sortOrder: 89 },
      { id: 'honor-magic7',         name: 'Honor Magic 7',          screenSize: '6.78"', year: 2025, hot: false, sortOrder: 88 },
      { id: 'honor-magic6-pro',     name: 'Honor Magic 6 Pro',      screenSize: '6.8"',  year: 2024, hot: false, sortOrder: 87 },
      // Honor 90 系列
      { id: 'honor-90',             name: 'Honor 90',               screenSize: '6.7"',  year: 2023, hot: false, sortOrder: 86 },
    ],
  },

  // ────────────────────────────────────────
  // 8. Tecno
  // ────────────────────────────────────────
  {
    id: 'tecno',
    name: 'Tecno',
    logo: '/assets/brands/tecno.svg',
    sortOrder: 60,
    models: [
      // Tecno Camon 50 系列（2025）
      { id: 'tecno-camon-50-ultra', name: 'Tecno Camon 50 Ultra',  screenSize: '6.8"',  year: 2025, hot: true,  sortOrder: 100 },
      { id: 'tecno-camon-50-pro',   name: 'Tecno Camon 50 Pro',    screenSize: '6.8"',  year: 2025, hot: true,  sortOrder: 99 },
      { id: 'tecno-camon-50',       name: 'Tecno Camon 50',        screenSize: '6.8"',  year: 2025, hot: false, sortOrder: 98 },
      // Tecno Camon 40 系列（2024）
      { id: 'tecno-camon-40-pro',   name: 'Tecno Camon 40 Pro',    screenSize: '6.78"', year: 2024, hot: true,  sortOrder: 97 },
      { id: 'tecno-camon-40',       name: 'Tecno Camon 40',        screenSize: '6.78"', year: 2024, hot: false, sortOrder: 96 },
      // Tecno Spark 系列
      { id: 'tecno-spark-30-pro',   name: 'Tecno Spark 30 Pro',    screenSize: '6.78"', year: 2025, hot: false, sortOrder: 95 },
      { id: 'tecno-spark-30',       name: 'Tecno Spark 30',        screenSize: '6.78"', year: 2025, hot: false, sortOrder: 94 },
      { id: 'tecno-spark-20-pro',   name: 'Tecno Spark 20 Pro',    screenSize: '6.78"', year: 2024, hot: false, sortOrder: 93 },
      { id: 'tecno-spark-20',       name: 'Tecno Spark 20',        screenSize: '6.56"', year: 2024, hot: false, sortOrder: 92 },
      // Tecno Phantom 系列（高端）
      { id: 'tecno-phantom-v2',     name: 'Tecno Phantom V2 Fold', screenSize: '7.85"', year: 2025, hot: true,  sortOrder: 91 },
      { id: 'tecno-phantom-v',      name: 'Tecno Phantom V Flip',  screenSize: '6.9"',  year: 2024, hot: false, sortOrder: 90 },
      // Tecno Pova 系列（游戏/长续航）
      { id: 'tecno-pova-6-pro',     name: 'Tecno Pova 6 Pro',      screenSize: '6.78"', year: 2024, hot: false, sortOrder: 89 },
      { id: 'tecno-pova-6',         name: 'Tecno Pova 6',          screenSize: '6.78"', year: 2024, hot: false, sortOrder: 88 },
    ],
  },

  // ────────────────────────────────────────
  // 9. Google Pixel（马来西亚小众但有市场）
  // ────────────────────────────────────────
  {
    id: 'google',
    name: 'Google Pixel',
    logo: '/assets/brands/google.svg',
    sortOrder: 55,
    models: [
      { id: 'pixel-9-pro-xl',       name: 'Pixel 9 Pro XL',        screenSize: '6.8"',  year: 2024, hot: false, sortOrder: 100 },
      { id: 'pixel-9-pro',          name: 'Pixel 9 Pro',           screenSize: '6.3"',  year: 2024, hot: false, sortOrder: 99 },
      { id: 'pixel-9',              name: 'Pixel 9',               screenSize: '6.3"',  year: 2024, hot: false, sortOrder: 98 },
      { id: 'pixel-8-pro',          name: 'Pixel 8 Pro',           screenSize: '6.7"',  year: 2023, hot: false, sortOrder: 97 },
      { id: 'pixel-8',              name: 'Pixel 8',               screenSize: '6.2"',  year: 2023, hot: false, sortOrder: 96 },
      { id: 'pixel-8a',             name: 'Pixel 8a',              screenSize: '6.1"',  year: 2024, hot: false, sortOrder: 95 },
    ],
  },

  // ────────────────────────────────────────
  // 10. HUAWEI（马来西亚老牌用户多）
  // ────────────────────────────────────────
  {
    id: 'huawei',
    name: 'HUAWEI',
    logo: '/assets/brands/huawei.svg',
    sortOrder: 50,
    models: [
      { id: 'huawei-pura-80-ultra', name: 'HUAWEI Pura 80 Ultra',  screenSize: '6.8"',  year: 2025, hot: true,  sortOrder: 100 },
      { id: 'huawei-pura-80-pro',   name: 'HUAWEI Pura 80 Pro',    screenSize: '6.8"',  year: 2025, hot: true,  sortOrder: 99 },
      { id: 'huawei-pura-80',       name: 'HUAWEI Pura 80',        screenSize: '6.6"',  year: 2025, hot: false, sortOrder: 98 },
      { id: 'huawei-pura-70-ultra', name: 'HUAWEI Pura 70 Ultra',  screenSize: '6.8"',  year: 2024, hot: false, sortOrder: 97 },
      { id: 'huawei-pura-70-pro',   name: 'HUAWEI Pura 70 Pro',    screenSize: '6.8"',  year: 2024, hot: false, sortOrder: 96 },
      { id: 'huawei-pura-70',       name: 'HUAWEI Pura 70',        screenSize: '6.6"',  year: 2024, hot: false, sortOrder: 95 },
      { id: 'huawei-mate-70-pro',   name: 'HUAWEI Mate 70 Pro',    screenSize: '6.9"',  year: 2024, hot: false, sortOrder: 94 },
      { id: 'huawei-mate-70',       name: 'HUAWEI Mate 70',        screenSize: '6.7"',  year: 2024, hot: false, sortOrder: 93 },
      { id: 'huawei-nova-14-pro',   name: 'HUAWEI nova 14 Pro',    screenSize: '6.7"',  year: 2025, hot: false, sortOrder: 92 },
      { id: 'huawei-nova-14',       name: 'HUAWEI nova 14',        screenSize: '6.7"',  year: 2025, hot: false, sortOrder: 91 },
    ],
  },
];

// ============================================================
// 工具函数
// ============================================================

/** 获取所有品牌的平铺列表（按 sortOrder 降序） */
export function getAllBrands(): PhoneBrand[] {
  return [...phoneBrands].sort((a, b) => b.sortOrder - a.sortOrder);
}

/** 根据品牌 ID 获取品牌信息 */
export function getBrandById(brandId: string): PhoneBrand | undefined {
  return phoneBrands.find((b) => b.id === brandId);
}

/** 根据型号 ID 跨品牌查找型号信息 */
export function findModelById(modelId: string): { brand: PhoneBrand; model: PhoneModel } | undefined {
  for (const brand of phoneBrands) {
    const model = brand.models.find((m) => m.id === modelId);
    if (model) return { brand, model };
  }
  return undefined;
}

/** 获取某品牌下所有型号（按 sortOrder 降序） */
export function getModelsByBrand(brandId: string): PhoneModel[] {
  const brand = getBrandById(brandId);
  if (!brand) return [];
  return [...brand.models].sort((a, b) => b.sortOrder - a.sortOrder);
}

/** 获取所有热门型号（跨品牌，按 sortOrder 降序）*/
export function getHotModels(): { brand: PhoneBrand; model: PhoneModel }[] {
  const results: { brand: PhoneBrand; model: PhoneModel }[] = [];
  for (const brand of phoneBrands) {
    for (const model of brand.models) {
      if (model.hot) {
        results.push({ brand, model });
      }
    }
  }
  return results.sort((a, b) => b.model.sortOrder - a.model.sortOrder);
}

/** 获取所有型号总数 */
export function getTotalModelCount(): number {
  return phoneBrands.reduce((sum, b) => sum + b.models.length, 0);
}
