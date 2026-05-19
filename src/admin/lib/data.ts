// ============================================================
// 后台数据读写工具 — 基于 JSON 文件
// 所有数据通过 fs 模块直接操作 JSON 文件（本地存储）
// 生产环境可替换为数据库驱动
// ============================================================

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

function readJson<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

function writeJson<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ========== 手机型号 ==========
import type { PhoneBrand } from '@/types/admin';

export function getModels(): PhoneBrand[] {
  const data = readJson<{ brands: PhoneBrand[] }>('models.json');
  return data.brands;
}

export function saveModels(brands: PhoneBrand[]): void {
  writeJson('models.json', { brands });
}

// ========== 商品 ==========
import type { Product } from '@/types/admin';

export function getProducts(): Product[] {
  const data = readJson<{ products: Product[] }>('products.json');
  return data.products;
}

export function saveProducts(products: Product[]): void {
  writeJson('products.json', { products });
}

// ========== 翻译/语言包 ==========
import type { TranslationPack } from '@/types/admin';

export function getTranslations(): TranslationPack {
  return readJson<TranslationPack>('translations.json');
}

export function saveTranslations(translations: TranslationPack): void {
  writeJson('translations.json', translations);
}

// ========== 首页配置 ==========
import type { HomepageConfig } from '@/types/admin';

export function getHomepageConfig(): HomepageConfig {
  return readJson<HomepageConfig>('homepage.json');
}

export function saveHomepageConfig(config: HomepageConfig): void {
  writeJson('homepage.json', config);
}

// ========== 订单 ==========
import type { Order } from '@/types/admin';

export function getOrders(): Order[] {
  const data = readJson<{ orders: Order[] }>('orders.json');
  return data.orders;
}

export function saveOrders(orders: Order[]): void {
  writeJson('orders.json', { orders });
}

// ========== 站点设置 ==========
import type { SiteSettings } from '@/types/admin';

export function getSettings(): SiteSettings {
  return readJson<SiteSettings>('settings.json');
}

export function saveSettings(settings: SiteSettings): void {
  writeJson('settings.json', settings);
}

// ========== 通用 ID 生成 ==========
export function generateId(prefix: string): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 6);
  return `${prefix}_${ts}${rand}`;
}

export function generateOrderId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `ORD${y}${m}${d}${rand}`;
}
