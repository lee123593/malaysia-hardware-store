"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { MALAYSIA_STATES } from "@/types";

export default function CheckoutPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    paymentMethod: "bank_transfer",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-20 text-center">
        <h1 className="text-xl font-semibold text-apple-dark mb-3">{t.checkout.cartEmpty}</h1>
        <button onClick={() => router.push("/products")} className="text-sm text-apple-blue">
          {t.checkout.continueShopping}
        </button>
      </div>
    );
  }

  const sub = subtotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.customerName || !form.customerPhone || !form.address || !form.city || !form.state) {
      setError(t.checkout.fillRequired);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.common.somethingWrong);
        setSubmitting(false);
        return;
      }

      clearCart();
      router.push(`/orders?no=${data.orderNo}`);
    } catch {
      setError(t.checkout.networkError);
      setSubmitting(false);
    }
  };

  const paymentMethods = [
    { value: "tng", label: t.checkout.paymentMethods.tng },
    { value: "boost", label: t.checkout.paymentMethods.boost },
    { value: "card", label: t.checkout.paymentMethods.card },
    { value: "bank_transfer", label: t.checkout.paymentMethods.bank_transfer },
  ];

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-semibold text-apple-dark tracking-tight mb-8">{t.checkout.title}</h1>

      <form onSubmit={handleSubmit}>
        {/* Customer Info */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-apple-dark mb-4">{t.checkout.customerInfo}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-apple-text mb-1.5">{t.checkout.name} *</label>
              <input
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-apple-text mb-1.5">{t.checkout.email}</label>
                <input
                  name="customerEmail"
                  type="email"
                  value={form.customerEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-apple-text mb-1.5">{t.checkout.phone} *</label>
                <input
                  name="customerPhone"
                  value={form.customerPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-apple-text mb-1.5">{t.checkout.address} *</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-apple-text mb-1.5">{t.checkout.city} *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-apple-text mb-1.5">{t.checkout.postcode} *</label>
                <input
                  name="postcode"
                  value={form.postcode}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-apple-text mb-1.5">{t.checkout.state} *</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors bg-white"
                required
              >
                <option value="">{t.checkout.selectState}</option>
                {MALAYSIA_STATES.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({s.region === "east" ? t.checkout.regionEast : t.checkout.regionWest})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-apple-dark mb-4">{t.checkout.paymentMethod}</h2>
          <div className="space-y-2">
            {paymentMethods.map((pm) => (
              <label
                key={pm.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  form.paymentMethod === pm.value
                    ? "border-apple-blue bg-blue-50/30"
                    : "border-apple-border hover:border-apple-mid"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={pm.value}
                  checked={form.paymentMethod === pm.value}
                  onChange={handleChange}
                  className="accent-apple-blue"
                />
                <span className="text-sm">{pm.label}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-apple-text mt-2">{t.checkout.paymentGatewayNote}</p>
        </div>

        {/* Order Summary */}
        <div className="mb-8 bg-apple-light rounded-apple p-5">
          <h2 className="text-lg font-semibold text-apple-dark mb-4">{t.checkout.orderSummary}</h2>
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm py-1.5">
              <span className="text-apple-text truncate mr-4">
                {lang === "zh" && item.nameZh ? item.nameZh : item.name} x{item.quantity}
              </span>
              <span className="text-apple-dark flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-apple-border/50 mt-3 pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-apple-text">{t.cart.subtotal}</span>
              <span>{formatCurrency(sub)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-apple-text">{t.cart.shipping} + {t.cart.tax}</span>
              <span className="text-apple-text">{t.checkout.autoCalculated}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-apple-dark text-white text-sm font-medium py-3 rounded-full hover:bg-black transition-colors disabled:opacity-50"
        >
          {submitting ? t.checkout.processing : t.checkout.placeOrder}
        </button>
      </form>
    </div>
  );
}
