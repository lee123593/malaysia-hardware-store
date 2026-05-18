"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import { formatCurrency, formatDateMalaysia } from "@/lib/utils";

const API = (path: string, opts?: RequestInit) =>
  fetch(path, {
    ...opts,
    headers: {
      ...opts?.headers,
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      "Content-Type": "application/json",
    },
  });

const CATEGORIES: Record<string, string> = {
  "screws-fasteners": "Screws & Fasteners",
  tools: "Hand Tools",
  "building-hardware": "Building Hardware",
  "door-window": "Door & Window",
  "power-tools": "Power Tools",
  accessories: "Accessories",
};

export default function AdminDashboard() {
  const router = useRouter();
  const { t } = useI18n();
  const [tab, setTab] = useState<"products" | "orders" | "settings">("products");
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [orderTotal, setOrderTotal] = useState(0);

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState<any>({});

  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    setToken(stored);
    setChecked(true);
    if (!stored) router.push("/admin");
  }, [router]);

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchProducts = useCallback(async () => {
    const res = await API("/api/admin/products");
    if (res.ok) setProducts(await res.json());
  }, []);

  const fetchOrders = useCallback(async () => {
    const res = await API("/api/admin/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders);
      setOrderTotal(data.total);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    const res = await API("/api/admin/settings");
    if (res.ok) setSettings(await res.json());
  }, []);

  useEffect(() => {
    if (!token) return;
    if (tab === "products") fetchProducts();
    if (tab === "orders") fetchOrders();
    if (tab === "settings") fetchSettings();
  }, [tab, token, fetchProducts, fetchOrders, fetchSettings]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(productForm),
    });
    if (res.ok) {
      showMsg(t.admin.productCreated);
      setShowProductForm(false);
      setProductForm({});
      fetchProducts();
    } else {
      const data = await res.json().catch(() => ({}));
      showMsg(data.error || t.admin.productCreateFailed);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API("/api/admin/products", {
      method: "PUT",
      body: JSON.stringify(productForm),
    });
    if (res.ok) {
      showMsg(t.admin.productUpdated);
      setEditingProduct(null);
      setProductForm({});
      fetchProducts();
    } else {
      const data = await res.json().catch(() => ({}));
      showMsg(data.error || t.admin.productUpdateFailed);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm(t.admin.confirmDelete)) return;
    const res = await API(`/api/admin/products?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      showMsg(t.admin.productDeleted);
      fetchProducts();
    } else {
      const data = await res.json().catch(() => ({}));
      showMsg(data.error || t.admin.productDeleteFailed);
    }
  };

  const handleTogglePublish = async (product: any) => {
    const res = await API("/api/admin/products", {
      method: "PUT",
      body: JSON.stringify({ id: product.id, published: !product.published }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      showMsg(data.error || t.admin.productUpdateFailed);
    }
    fetchProducts();
  };

  const startEdit = (p: any) => {
    setProductForm({ ...p });
    setEditingProduct(p);
    setShowProductForm(true);
  };

  const handleOrderStatus = async (id: string, status: string) => {
    const res = await API("/api/admin/orders", {
      method: "PUT",
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      showMsg(`${t.admin.orderStatusUpdated}: ${status}`);
      fetchOrders();
    } else {
      const data = await res.json().catch(() => ({}));
      showMsg(data.error || t.admin.orderUpdateFailed);
    }
  };

  const handleSettingsSave = async () => {
    const res = await API("/api/admin/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
    if (res.ok) {
      showMsg(t.admin.settingsSaved);
    } else {
      const data = await res.json().catch(() => ({}));
      showMsg(data.error || t.admin.settingsSaveFailed);
    }
  };

  const handleExportCSV = () => {
    const header = "Order No,Date,Name,Phone,State,Items,Subtotal,Shipping,Tax,Total,Status\n";
    const rows = orders
      .map((o: any) =>
        [
          o.orderNo,
          formatDateMalaysia(o.createdAt),
          o.customerName,
          o.customerPhone,
          o.state,
          o.items?.length || 0,
          o.subtotal,
          o.shippingCost,
          o.tax,
          o.total,
          o.status,
        ].join(",")
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusOpts = t.admin.statusOptions;

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-apple-light">
      {/* Top Bar */}
      <div className="bg-white border-b border-apple-border/40 px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-sm font-semibold text-apple-dark">Admin</h1>
          <nav className="flex gap-4 text-sm">
            {(["products", "orders", "settings"] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setTab(tabKey)}
                className={`transition-colors ${
                  tab === tabKey ? "text-apple-blue font-medium" : "text-apple-text hover:text-apple-dark"
                }`}
              >
                {tabKey === "products"
                  ? t.admin.navProducts
                  : tabKey === "orders"
                    ? t.admin.navOrders
                    : t.admin.navSettings}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleLogout} className="text-xs text-apple-text hover:text-red-500">
            {t.admin.logout}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-apple-dark text-white text-sm px-5 py-2.5 rounded-full shadow-apple-lg">
          {message}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-5 py-6">
        {/* PRODUCTS TAB */}
        {tab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-apple-dark">
                {t.admin.productsTitle} ({products.length})
              </h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({});
                  setShowProductForm(true);
                }}
                className="bg-apple-dark text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-black transition-colors"
              >
                {t.admin.newProduct}
              </button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 z-40 bg-black/20 flex items-center justify-center p-5">
                <div className="bg-white rounded-apple shadow-apple-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                  <h3 className="font-semibold text-apple-dark mb-4">
                    {editingProduct ? t.admin.editProduct : t.admin.addProduct}
                  </h3>
                  <form
                    onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                    className="space-y-3"
                  >
                    <input
                      placeholder={t.admin.nameEn}
                      value={productForm.name || ""}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      required
                    />
                    <input
                      placeholder={t.admin.nameZh}
                      value={productForm.nameZh || ""}
                      onChange={(e) => setProductForm({ ...productForm, nameZh: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                    />
                    <input
                      placeholder={t.admin.sku}
                      value={productForm.sku || ""}
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      required
                    />
                    <input
                      placeholder={t.admin.slug}
                      value={productForm.slug || ""}
                      onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder={t.admin.price}
                        type="number"
                        step="0.01"
                        value={productForm.price || ""}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                        required
                      />
                      <input
                        placeholder={t.admin.costPrice}
                        type="number"
                        step="0.01"
                        value={productForm.costPrice || ""}
                        onChange={(e) => setProductForm({ ...productForm, costPrice: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={productForm.category || ""}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      >
                        <option value="">{t.admin.category}</option>
                        {Object.entries(CATEGORIES).map(([val, label]) => (
                          <option key={val} value={val}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <input
                        placeholder={t.admin.weight}
                        type="number"
                        step="0.01"
                        value={productForm.weight || ""}
                        onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      />
                    </div>
                    <textarea
                      placeholder={t.admin.descriptionEn}
                      value={productForm.description || ""}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      rows={2}
                    />
                    <textarea
                      placeholder={t.admin.descriptionZh}
                      value={productForm.descriptionZh || ""}
                      onChange={(e) => setProductForm({ ...productForm, descriptionZh: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      rows={2}
                    />
                    <input
                      placeholder={t.admin.images}
                      value={productForm.images || ""}
                      onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={productForm.featured || false}
                        onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                      />
                      {t.admin.featured}
                    </label>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-apple-dark text-white text-sm font-medium py-2 rounded-full hover:bg-black transition-colors"
                      >
                        {editingProduct ? t.admin.update : t.admin.create}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowProductForm(false);
                          setEditingProduct(null);
                        }}
                        className="flex-1 border border-apple-border text-sm py-2 rounded-full hover:bg-apple-gray transition-colors"
                      >
                        {t.admin.cancel}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-apple shadow-apple overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-apple-border/40 text-apple-text text-xs">
                    <th className="text-left p-3 font-medium">{t.admin.tableProduct}</th>
                    <th className="text-left p-3 font-medium">{t.admin.tableSku}</th>
                    <th className="text-right p-3 font-medium">{t.admin.tablePrice}</th>
                    <th className="text-center p-3 font-medium">{t.admin.tableStock}</th>
                    <th className="text-center p-3 font-medium">{t.admin.tablePublished}</th>
                    <th className="text-right p-3 font-medium">{t.admin.tableActions}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-apple-border/20 hover:bg-apple-light/50">
                      <td className="p-3">
                        <div className="font-medium text-apple-dark">{p.name}</div>
                        <div className="text-xs text-apple-text">{p.nameZh}</div>
                      </td>
                      <td className="p-3 text-xs text-apple-text">{p.sku}</td>
                      <td className="p-3 text-right">{formatCurrency(p.price)}</td>
                      <td className="p-3 text-center">{p.stock}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            p.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {p.published ? t.admin.yes : t.admin.no}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => startEdit(p)}
                          className="text-xs text-apple-blue mr-2 hover:underline"
                        >
                          {t.admin.edit}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          {t.admin.delete}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-apple-dark">
                {t.admin.ordersTitle} ({orderTotal})
              </h2>
              <button
                onClick={handleExportCSV}
                className="bg-apple-dark text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-black transition-colors"
              >
                {t.admin.exportCSV}
              </button>
            </div>

            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="bg-white rounded-apple shadow-apple p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-semibold text-apple-dark text-sm">{o.orderNo}</span>
                      <span className="text-xs text-apple-text ml-3">
                        {formatDateMalaysia(o.createdAt)}
                      </span>
                    </div>
                    <select
                      value={o.status}
                      onChange={(e) => handleOrderStatus(o.id, e.target.value)}
                      className="text-xs px-2 py-1 rounded-full border border-apple-border"
                    >
                      {Object.entries(statusOpts).map(([val, label]) => (
                        <option key={val} value={val}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-apple-text">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider">
                        {t.admin.customer}
                      </span>
                      {o.customerName} | {o.customerPhone}
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider">
                        {t.admin.address}
                      </span>
                      {o.address}, {o.city}, {o.state} ({o.region})
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider">
                        {t.admin.items}
                      </span>
                      {(o.items || []).map((i: any) => `${i.name} x${i.quantity}`).join(", ")}
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider">
                        {t.admin.total}
                      </span>
                      {formatCurrency(o.total)}{" "}
                      <span className="text-[10px]">
                        (Sub:{formatCurrency(o.subtotal)} Ship:{formatCurrency(o.shippingCost)}{" "}
                        Tax:{formatCurrency(o.tax)})
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {orders.length === 0 && (
                <div className="text-center py-12 text-apple-text text-sm">{t.admin.noOrders}</div>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === "settings" && (
          <div>
            <h2 className="text-lg font-semibold text-apple-dark mb-5">{t.admin.settingsTitle}</h2>

            <div className="bg-white rounded-apple shadow-apple p-5 space-y-4">
              {[
                { key: "store_name", label: t.admin.storeName },
                { key: "store_email", label: t.admin.storeEmail },
                { key: "store_phone", label: t.admin.storePhone },
                { key: "sst_rate", label: t.admin.sstRate },
                { key: "sst_enabled", label: t.admin.sstEnabled },
                { key: "shipping_west", label: t.admin.shippingWest },
                { key: "shipping_east", label: t.admin.shippingEast },
                { key: "free_shipping_min", label: t.admin.freeShippingMin },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-apple-text mb-1">{label}</label>
                  <input
                    value={settings[key] || ""}
                    onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                    className="w-full max-w-xs px-3 py-2 rounded-lg border border-apple-border text-sm"
                  />
                </div>
              ))}

              <button
                onClick={handleSettingsSave}
                className="bg-apple-dark text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-black transition-colors"
              >
                {t.admin.saveSettings}
              </button>
            </div>

            <div className="mt-6 bg-white rounded-apple shadow-apple p-5">
              <h3 className="font-semibold text-apple-dark mb-3 text-sm">
                {t.admin.paymentGateway}
              </h3>
              <p className="text-xs text-apple-text leading-relaxed">{t.admin.paymentCallbackNote}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
