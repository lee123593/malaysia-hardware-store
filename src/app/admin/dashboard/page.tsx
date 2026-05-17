"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDateMalaysia } from "@/lib/utils";
import { ORDER_STATUS_MAP, ORDER_STATUS_MAP_ZH } from "@/types";

const API = (path: string, opts?: RequestInit) =>
  fetch(path, {
    ...opts,
    headers: {
      ...opts?.headers,
      Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      "Content-Type": "application/json",
    },
  });

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"products" | "orders" | "settings">("products");
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  // Data
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [orderTotal, setOrderTotal] = useState(0);

  // Form
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState<any>({});

  const [message, setMessage] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    setToken(t);
    setChecked(true);
    if (!t) router.push("/admin");
  }, [router]);

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // Products
  const fetchProducts = useCallback(async () => {
    const res = await API("/api/admin/products");
    if (res.ok) setProducts(await res.json());
  }, []);

  // Orders
  const fetchOrders = useCallback(async () => {
    const res = await API("/api/admin/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders);
      setOrderTotal(data.total);
    }
  }, []);

  // Settings
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

  // Product CRUD
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(productForm),
    });
    if (res.ok) {
      showMsg("Product created");
      setShowProductForm(false);
      setProductForm({});
      fetchProducts();
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API("/api/admin/products", {
      method: "PUT",
      body: JSON.stringify(productForm),
    });
    if (res.ok) {
      showMsg("Product updated");
      setEditingProduct(null);
      setProductForm({});
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await API(`/api/admin/products?id=${id}`, { method: "DELETE" });
    showMsg("Product deleted");
    fetchProducts();
  };

  const handleTogglePublish = async (product: any) => {
    await API("/api/admin/products", {
      method: "PUT",
      body: JSON.stringify({ id: product.id, published: !product.published }),
    });
    fetchProducts();
  };

  const startEdit = (p: any) => {
    setProductForm({ ...p });
    setEditingProduct(p);
    setShowProductForm(true);
  };

  // Order update
  const handleOrderStatus = async (id: string, status: string) => {
    await API("/api/admin/orders", {
      method: "PUT",
      body: JSON.stringify({ id, status }),
    });
    showMsg(`Order status updated to: ${status}`);
    fetchOrders();
  };

  // Settings update
  const handleSettingsSave = async () => {
    await API("/api/admin/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
    showMsg("Settings saved");
  };

  // Export CSV
  const handleExportCSV = () => {
    const header = "Order No,Date,Name,Phone,State,Items,Subtotal,Shipping,Tax,Total,Status\n";
    const rows = orders.map((o: any) =>
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
    ).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-apple-light">
      {/* Top Bar */}
      <div className="bg-white border-b border-apple-border/40 px-5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-sm font-semibold text-apple-dark">Admin</h1>
          <nav className="flex gap-4 text-sm">
            {(["products", "orders", "settings"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`capitalize transition-colors ${
                  tab === t ? "text-apple-blue font-medium" : "text-apple-text hover:text-apple-dark"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs text-apple-text hover:text-apple-blue">
            View Store &rarr;
          </a>
          <button onClick={handleLogout} className="text-xs text-apple-text hover:text-red-500">
            Logout
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
                Products ({products.length})
              </h2>
              <button
                onClick={() => { setEditingProduct(null); setProductForm({}); setShowProductForm(true); }}
                className="bg-apple-dark text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-black transition-colors"
              >
                + New Product
              </button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <div className="fixed inset-0 z-40 bg-black/20 flex items-center justify-center p-5">
                <div className="bg-white rounded-apple shadow-apple-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                  <h3 className="font-semibold text-apple-dark mb-4">
                    {editingProduct ? "Edit Product" : "New Product"}
                  </h3>
                  <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="space-y-3">
                    <input
                      placeholder="Name (EN)"
                      value={productForm.name || ""}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      required
                    />
                    <input
                      placeholder="Name (中文)"
                      value={productForm.nameZh || ""}
                      onChange={(e) => setProductForm({ ...productForm, nameZh: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                    />
                    <input
                      placeholder="SKU"
                      value={productForm.sku || ""}
                      onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      required
                    />
                    <input
                      placeholder="Slug"
                      value={productForm.slug || ""}
                      onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        placeholder="Price (MYR)"
                        type="number"
                        step="0.01"
                        value={productForm.price || ""}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                        required
                      />
                      <input
                        placeholder="Cost Price"
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
                        <option value="">Category</option>
                        <option value="screws-fasteners">Screws & Fasteners</option>
                        <option value="tools">Hand Tools</option>
                        <option value="building-hardware">Building Hardware</option>
                        <option value="door-window">Door & Window</option>
                        <option value="power-tools">Power Tools</option>
                        <option value="accessories">Accessories</option>
                      </select>
                      <input
                        placeholder="Weight (kg)"
                        type="number"
                        step="0.01"
                        value={productForm.weight || ""}
                        onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      />
                    </div>
                    <textarea
                      placeholder="Description (EN)"
                      value={productForm.description || ""}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      rows={2}
                    />
                    <textarea
                      placeholder="Description (中文)"
                      value={productForm.descriptionZh || ""}
                      onChange={(e) => setProductForm({ ...productForm, descriptionZh: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-apple-border text-sm"
                      rows={2}
                    />
                    <input
                      placeholder="Images (JSON array)"
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
                      Featured
                    </label>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-apple-dark text-white text-sm font-medium py-2 rounded-full hover:bg-black transition-colors"
                      >
                        {editingProduct ? "Update" : "Create"}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowProductForm(false); setEditingProduct(null); }}
                        className="flex-1 border border-apple-border text-sm py-2 rounded-full hover:bg-apple-gray transition-colors"
                      >
                        Cancel
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
                    <th className="text-left p-3 font-medium">Product</th>
                    <th className="text-left p-3 font-medium">SKU</th>
                    <th className="text-right p-3 font-medium">Price</th>
                    <th className="text-center p-3 font-medium">Stock</th>
                    <th className="text-center p-3 font-medium">Published</th>
                    <th className="text-right p-3 font-medium">Actions</th>
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
                          {p.published ? "Yes" : "No"}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => startEdit(p)} className="text-xs text-apple-blue mr-2 hover:underline">Edit</button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="text-xs text-red-500 hover:underline">Delete</button>
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
                Orders ({orderTotal})
              </h2>
              <button
                onClick={handleExportCSV}
                className="bg-apple-dark text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-black transition-colors"
              >
                Export CSV
              </button>
            </div>

            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="bg-white rounded-apple shadow-apple p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="font-semibold text-apple-dark text-sm">{o.orderNo}</span>
                      <span className="text-xs text-apple-text ml-3">{formatDateMalaysia(o.createdAt)}</span>
                    </div>
                    <select
                      value={o.status}
                      onChange={(e) => handleOrderStatus(o.id, e.target.value)}
                      className="text-xs px-2 py-1 rounded-full border border-apple-border"
                    >
                      <option value="pending">Pending Payment</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped_cn">Shipped from China</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered_my">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-apple-text">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider">Customer</span>
                      {o.customerName} | {o.customerPhone}
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider">Address</span>
                      {o.address}, {o.city}, {o.state} ({o.region})
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider">Items</span>
                      {(o.items || []).map((i: any) => `${i.name} x${i.quantity}`).join(", ")}
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider">Total</span>
                      {formatCurrency(o.total)}
                      {" "}
                      <span className="text-[10px]">(Sub:{formatCurrency(o.subtotal)} Ship:{formatCurrency(o.shippingCost)} Tax:{formatCurrency(o.tax)})</span>
                    </div>
                  </div>
                </div>
              ))}

              {orders.length === 0 && (
                <div className="text-center py-12 text-apple-text text-sm">No orders yet</div>
              )}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === "settings" && (
          <div>
            <h2 className="text-lg font-semibold text-apple-dark mb-5">Settings</h2>

            <div className="bg-white rounded-apple shadow-apple p-5 space-y-4">
              {[
                { key: "store_name", label: "Store Name" },
                { key: "store_email", label: "Store Email" },
                { key: "store_phone", label: "Store Phone" },
                { key: "sst_rate", label: "SST Rate (e.g. 0.10 = 10%)" },
                { key: "sst_enabled", label: "SST Enabled (true/false)" },
                { key: "shipping_west", label: "West MY Shipping (RM)" },
                { key: "shipping_east", label: "East MY Shipping (RM)" },
                { key: "free_shipping_min", label: "Free Shipping Min (RM)" },
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
                Save Settings
              </button>
            </div>

            <div className="mt-6 bg-white rounded-apple shadow-apple p-5">
              <h3 className="font-semibold text-apple-dark mb-3 text-sm">Payment Gateway Integration</h3>
              <p className="text-xs text-apple-text leading-relaxed">
                Payment callback webhook: <code className="bg-apple-gray px-1.5 py-0.5 rounded text-xs">/api/payments/callback</code>
                <br /><br />
                Configure your payment gateway (Billplz / Touch n Go / Boost / PayPal) to POST callbacks to this endpoint.
                <br />
                Expected payload:{' '}
                <code className="bg-apple-gray px-1.5 py-0.5 rounded text-xs">
                  {'{'} orderNo, transactionId, status, amount, gateway {'}'}
                </code>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
