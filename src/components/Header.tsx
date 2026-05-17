"use client";
import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n";
import { useCartStore } from "@/lib/store";

export default function Header() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const total = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-apple-border/40">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-apple-dark">
          {t.header.storeName}
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link href="/" className="text-apple-text hover:text-apple-dark transition-colors">
            {t.nav.home}
          </Link>
          <Link href="/products" className="text-apple-text hover:text-apple-dark transition-colors">
            {t.nav.products}
          </Link>
          <Link href="/shipping" className="text-apple-text hover:text-apple-dark transition-colors">
            {t.nav.shipping}
          </Link>
          <Link href="/orders" className="text-apple-text hover:text-apple-dark transition-colors">
            {t.nav.orders}
          </Link>
          <Link href="/about" className="text-apple-text hover:text-apple-dark transition-colors">
            {t.nav.about}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="text-xs font-medium text-apple-text hover:text-apple-dark transition-colors"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>

          <Link href="/cart" className="relative text-apple-text hover:text-apple-dark transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {total > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-apple-blue text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {total}
              </span>
            )}
          </Link>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-apple-border/40 bg-white px-5 py-3 flex flex-col gap-3 text-sm">
          <Link href="/" onClick={() => setOpen(false)}>{t.nav.home}</Link>
          <Link href="/products" onClick={() => setOpen(false)}>{t.nav.products}</Link>
          <Link href="/shipping" onClick={() => setOpen(false)}>{t.nav.shipping}</Link>
          <Link href="/orders" onClick={() => setOpen(false)}>{t.nav.orders}</Link>
          <Link href="/about" onClick={() => setOpen(false)}>{t.nav.about}</Link>
        </div>
      )}
    </header>
  );
}
