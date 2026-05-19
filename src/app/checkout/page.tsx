'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/i18n/i18n-context';
import { formatMYR } from '@/data/pricing';
import type { CartItem, CheckoutForm } from '@/types';

export default function CheckoutPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState<CheckoutForm>({
    fullName: '', phone: '', email: '', address: '', city: '', state: '', postcode: '',
    shippingZone: 'west_malaysia', note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem('caseart-cart') || '[]')); }
    catch { setItems([]); }
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = form.shippingZone === 'east_malaysia' ? (subtotal >= 120 ? 0 : 15) : (subtotal >= 80 ? 0 : 8);
  const total = subtotal + shipping;

  function updateField(field: keyof CheckoutForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.address || !form.city) return;
    // Generate order ID and clear cart
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    localStorage.setItem('caseart-cart', '[]');
    window.dispatchEvent(new Event('cartUpdate'));
    setItems([]);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-[#F5F5F7] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-10 text-center max-w-md mx-4 shadow-sm">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">{t.checkout.submitOrder}!</h2>
            <p className="text-[#86868B] mb-6">{t.checkout.paymentNotice}</p>
            <Link href="/products" className="btn-primary inline-flex px-8 py-3.5 bg-[#002FA7] text-white font-bold rounded-xl hover:bg-[#2959C0] transition-all">
              {t.cart.continueShopping}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <h1 className="text-3xl font-bold text-[#1D1D1F] mb-8">{t.checkout.title}</h1>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">{t.cart.empty}</h3>
              <Link href="/products" className="btn-primary inline-flex px-8 py-3.5 bg-[#002FA7] text-white font-bold rounded-xl">{t.cart.continueShopping}</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">{t.checkout.shippingInfo}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1D1D1F] mb-1">{t.checkout.fullName} *</label>
                      <input type="text" required value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#002FA7] focus:ring-1 focus:ring-[#002FA7] outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1D1D1F] mb-1">{t.checkout.phone} *</label>
                      <input type="tel" required value={form.phone} onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#002FA7] focus:ring-1 focus:ring-[#002FA7] outline-none transition-all" placeholder="012-345 6789" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#1D1D1F] mb-1">{t.checkout.region} *</label>
                      <div className="flex gap-3">
                        {[
                          { value: 'west_malaysia', label: t.checkout.regionWM },
                          { value: 'east_malaysia', label: t.checkout.regionEM },
                        ].map((opt) => (
                          <button key={opt.value} type="button"
                            onClick={() => updateField('shippingZone', opt.value)}
                            className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                              form.shippingZone === opt.value ? 'border-[#002FA7] bg-[#E8EDFA] text-[#002FA7]' : 'border-gray-200 text-[#86868B] hover:border-gray-300'
                            }`}
                          >{opt.label}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1D1D1F] mb-1">{t.checkout.city} *</label>
                      <input type="text" required value={form.city} onChange={(e) => updateField('city', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#002FA7] focus:ring-1 focus:ring-[#002FA7] outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1D1D1F] mb-1">{t.checkout.state} *</label>
                      <input type="text" required value={form.state} onChange={(e) => updateField('state', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#002FA7] focus:ring-1 focus:ring-[#002FA7] outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1D1D1F] mb-1">{t.checkout.postcode} *</label>
                      <input type="text" required value={form.postcode} onChange={(e) => updateField('postcode', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#002FA7] focus:ring-1 focus:ring-[#002FA7] outline-none transition-all" placeholder="50450" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-[#1D1D1F] mb-1">{t.checkout.address} *</label>
                      <textarea required value={form.address} onChange={(e) => updateField('address', e.target.value)} rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-[#002FA7] focus:ring-1 focus:ring-[#002FA7] outline-none transition-all resize-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 h-fit sticky top-24">
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">{t.checkout.orderSummary}</h3>
                <div className="space-y-3 text-sm mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-[#86868B] truncate max-w-[200px]">{item.name} x{item.qty}</span>
                      <span className="font-semibold">{formatMYR(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#86868B]">{t.cart.subtotal}</span>
                    <span>{formatMYR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#86868B]">{t.checkout.region}</span>
                    <span className={shipping === 0 ? 'text-[#34C759]' : ''}>{shipping === 0 ? 'FREE' : formatMYR(shipping)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between text-base font-bold">
                    <span>{t.cart.total}</span>
                    <span className="text-[#002FA7]">{formatMYR(total)}</span>
                  </div>
                </div>
                <button type="submit"
                  className="btn-primary mt-6 w-full flex items-center justify-center px-6 py-3.5 bg-[#002FA7] text-white font-bold rounded-xl hover:bg-[#2959C0] hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!form.fullName || !form.phone || !form.address || !form.city}
                >
                  {t.checkout.submitOrder}
                </button>
                <p className="text-xs text-[#86868B] text-center mt-4">{t.checkout.paymentNotice}</p>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
