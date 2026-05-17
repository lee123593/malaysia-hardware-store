"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/i18n";
import { formatCurrency, formatDateMalaysia } from "@/lib/utils";
import { ORDER_STATUS_MAP, ORDER_STATUS_MAP_ZH } from "@/types";

function OrderContent() {
  const { lang, t } = useI18n();
  const searchParams = useSearchParams();
  const [orderNo, setOrderNo] = useState(searchParams.get("no") || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const statusMap = lang === "zh" ? ORDER_STATUS_MAP_ZH : ORDER_STATUS_MAP;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!orderNo.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/orders?no=${encodeURIComponent(orderNo.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.order.notFound);
      } else {
        setOrder(data);
      }
    } catch {
      setError(t.common.error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-8">
      <h1 className="text-2xl font-semibold text-apple-dark tracking-tight mb-6">{t.order.title}</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder={t.order.orderNo}
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-full border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-apple-dark text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-black transition-colors disabled:opacity-50"
        >
          {loading ? t.common.loading : t.order.search}
        </button>
      </form>

      {error && <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm mb-4">{error}</div>}

      {order && (
        <div className="bg-white rounded-apple shadow-apple p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-apple-text">{t.order.orderNo}</p>
              <p className="font-semibold text-apple-dark">{order.orderNo}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-apple-dark text-white text-xs font-medium">
              {statusMap[order.status] || order.status}
            </span>
          </div>

          <div className="border-t border-apple-border/30 pt-3">
            <p className="text-xs text-apple-text mb-1">{t.order.shippingAddress}</p>
            <p className="text-sm text-apple-dark">
              {order.customerName}<br />
              {order.address}, {order.city}<br />
              {order.state}, {order.postcode}
            </p>
          </div>

          <div className="border-t border-apple-border/30 pt-3">
            <p className="text-xs text-apple-text mb-2">{t.order.items}</p>
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>{item.name} x{item.quantity}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-apple-border/30 mt-2 pt-2 space-y-1 text-sm">
              <div className="flex justify-between text-apple-text">
                <span>{t.order.subtotal}</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-apple-text">
                <span>{t.order.shipping}</span>
                <span>
                  {order.shippingCost === 0 ? t.order.free : formatCurrency(order.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-apple-text">
                <span>{t.order.tax}</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between font-semibold text-apple-dark">
                <span>{t.order.total}</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-apple-text">
            {formatDateMalaysia(order.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-5 py-20 text-center text-sm text-apple-text">
        Loading...
      </div>
    }>
      <OrderContent />
    </Suspense>
  );
}
