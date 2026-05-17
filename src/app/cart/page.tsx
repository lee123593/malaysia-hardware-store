"use client";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { lang, t } = useI18n();
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <div className="text-6xl text-apple-mid mb-6">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="mx-auto">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-apple-dark mb-3">{t.cart.empty}</h1>
        <Link href="/products" className="text-sm text-apple-blue hover:text-apple-dark transition-colors">
          {t.cart.continueShopping} &rarr;
        </Link>
      </div>
    );
  }

  const sub = subtotal();

  return (
    <div className="max-w-3xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-semibold text-apple-dark tracking-tight mb-8">{t.cart.title}</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4 p-4 bg-white rounded-apple shadow-apple">
            <Link href={`/products/${item.slug}`} className="w-20 h-20 rounded-lg bg-apple-gray overflow-hidden flex-shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-apple-mid" />
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="text-sm font-medium text-apple-dark line-clamp-1">
                {lang === "zh" && item.nameZh ? item.nameZh : item.name}
              </Link>
              <p className="text-sm font-semibold text-apple-dark mt-1">{formatCurrency(item.price)}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-7 h-7 rounded-full border border-apple-border flex items-center justify-center text-xs"
                  >
                    -
                  </button>
                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-7 h-7 rounded-full border border-apple-border flex items-center justify-center text-xs"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-apple-text hover:text-red-500 transition-colors"
                >
                  {t.cart.remove}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-apple-light rounded-apple p-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-apple-text">{t.cart.subtotal}</span>
          <span className="text-apple-dark">{formatCurrency(sub)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-apple-text">{t.cart.shipping}</span>
          <span className="text-apple-text">{t.cart.calculatedAtCheckout}</span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span className="text-apple-text">{t.cart.tax}</span>
          <span className="text-apple-text">{t.cart.calculatedAtCheckout}</span>
        </div>
        <p className="text-xs text-apple-text mb-4">{t.cart.freeShippingNote}</p>
        <Link
          href="/checkout"
          className="block w-full bg-apple-dark text-white text-sm font-medium text-center py-3 rounded-full hover:bg-black transition-colors"
        >
          {t.cart.checkout}
        </Link>
      </div>
    </div>
  );
}
