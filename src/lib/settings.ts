import { prisma } from "./db";

let cache: Record<string, string> = {};
let cacheTime = 0;

export async function getSetting(key: string): Promise<string> {
  const now = Date.now();
  if (now - cacheTime > 60000) {
    const settings = await prisma.setting.findMany();
    cache = {};
    for (const s of settings) cache[s.key] = s.value;
    cacheTime = now;
  }
  return cache[key] || "";
}

export async function getSettings(): Promise<Record<string, string>> {
  await getSetting(""); // refresh
  return { ...cache };
}

export function invalidateCache() {
  cacheTime = 0;
}

export async function getSstRate(): Promise<number> {
  const enabled = await getSetting("sst_enabled");
  if (enabled !== "true") return 0;
  const rate = await getSetting("sst_rate");
  return parseFloat(rate) || 0;
}

export async function getShippingCost(region: "west" | "east"): Promise<number> {
  const key = region === "west" ? "shipping_west" : "shipping_east";
  return parseFloat(await getSetting(key)) || (region === "west" ? 8 : 18);
}

export async function getFreeShippingMin(): Promise<number> {
  return parseFloat(await getSetting("free_shipping_min")) || 200;
}
