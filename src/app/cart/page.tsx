'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/i18n/i18n-context';
import { formatMYR } from '@/data/pricing';
import type { CartItem } from '@/types';

export default function CartPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem('caseart-cart') || '[]'));
    } catch { setItems([]); }
    setLoading(false);
  }, []);

  function updateQty(id: string, qty: number) {
    if (qty < 1) {
      removeItem(id);
      return;
    }
    const updated = items.map((i) => (i.id === id ? { ...i, qty } : i));
    setItems(updated);
    localStorage.setItem('caseart-cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdate'));
  }

  function removeItem(id: string) {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem('caseart-cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdate'));
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 80 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold text-[#1D1D1F] mb-8">{t.cart.title}</h1>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-xl" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">{t.cart.empty}</h3>
              <p className="text-[#86868B] mb-8">{t.cart.emptyHint}</p>
              <Link
                href="/products"
                className="btn-primary inline-flex px-8 py-3.5 bg-[#002FA7] text-white font-bold rounded-xl hover:bg-[#2959C0] hover:scale-105 hover:shadow-[0_4px_14px_rgba(0,47,167,0.25)] transition-all duration-200"
              >
                {t.cart.continueShopping}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 items-center">
                    <img
                      src={item.image || `https://placehold.co/120x120/002FA7/white?text=Case`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl bg-[#F5F5F7]"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#1D1D1F] truncate">{item.name}</h3>
                      <p className="text-xs text-[#86868B]">{item.model}</p>
                      <p className="text-sm font-bold text-[#002FA7] mt-1">{formatMYR(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:border-[#002FA7] hover:text-[#002FA7] transition-colors"
                      >-</button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm hover:border-[#002FA7] hover:text-[#002FA7] transition-colors"
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[#86868B] hover:text-[#FF3B30] transition-colors"
                      title={t.cart.remove}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 h-fit sticky top-24">
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">{t.cart.total}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#86868B]">{t.cart.subtotal}</span>
                    <span className="font-semibold">{formatMYR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#86868B]">{t.checkout.region}</span>
                    <span className={shipping === 0 ? 'text-[#34C759] font-semibold' : 'font-semibold'}>
                      {shipping === 0 ? 'FREE' : formatMYR(shipping)}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-base">
                    <span className="font-bold">{t.cart.total}</span>
                    <span className="font-bold text-[#002FA7]">{formatMYR(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="btn-primary mt-6 w-full flex items-center justify-center px-6 py-3.5 bg-[#002FA7] text-white font-bold rounded-xl hover:bg-[#2959C0] hover:scale-105 transition-all duration-200"
                >
                  {t.cart.checkout}
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
