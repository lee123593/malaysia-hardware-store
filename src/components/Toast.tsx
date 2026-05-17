"use client";

let toastFn: ((msg: string) => void) | null = null;

export function setToastFunction(fn: (msg: string) => void) {
  toastFn = fn;
}

export default function toast(msg: string) {
  if (toastFn) toastFn(msg);
}

export function Toaster() {
  // Using a simple inline toast instead of sonner to keep dependencies minimal
  if (typeof window === "undefined") return null;
  return null; // Toast handled via simple div in layout
}
