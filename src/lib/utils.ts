import { MalaysiaRegion } from "@/types";

export function determineRegion(state: string): MalaysiaRegion {
  const eastStates = ["sabah", "sarawak", "labuan"];
  const s = state.toLowerCase().trim();
  return eastStates.some((e) => s.includes(e)) ? "east" : "west";
}

export function formatCurrency(amount: number): string {
  return `RM ${amount.toFixed(2)}`;
}

export function generateOrderNo(): string {
  const now = new Date();
  const d = now.toISOString().slice(0, 10).replace(/-/g, "");
  const r = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `MYH-${d}-${r}`;
}

export function formatDateMalaysia(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString("en-MY", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kuala_Lumpur",
  });
}

export function calculateShipping(
  region: MalaysiaRegion,
  subtotal: number,
  shippingWest: number,
  shippingEast: number,
  freeMin: number
): number {
  if (subtotal >= freeMin) return 0;
  return region === "west" ? shippingWest : shippingEast;
}

export function calculateTax(subtotal: number, sstRate: number): number {
  return Math.round(subtotal * sstRate * 100) / 100;
}
