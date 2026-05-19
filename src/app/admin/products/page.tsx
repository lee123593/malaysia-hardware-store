'use client';

// ============================================================
// 商品管理 — 手机壳的增删改、上下架
// ============================================================

import { useState, useEffect } from 'react';
import AdminHeader from '@/admin/components/AdminHeader';
import Modal from '@/admin/components/Modal';
import ConfirmDialog from '@/admin/components/ConfirmDialog';
import { TrilingualInput } from '@/admin/components/FormField';
import type { Product, PhoneBrand, Trilingual } from '@/types/admin';

const emptyTrilingual: Trilingual = { zh: '', en: '', ms: '' };
const emptyProduct = {
  name: { ...emptyTrilingual },
  description: { ...emptyTrilingual },
  modelId: '',
  price: 0,
  originalPrice: null as number | null,
  images: [''],
  status: 'active' as Product['status'],
  isNew: false,
  isHot: false,
  stock: 'in_stock' as Product['stock'],
  style: '',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<PhoneBrand[]>([]);
  const [loading, setLoading] = useState(true);

  // 弹窗状态
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);

  // 删除确认
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, mRes] = await Promise.all([
        fetch('/admin/api/products'),
        fetch('/admin/api/models'),
      ]);
      const [pData, mData] = await Promise.all([pRes.json(), mRes.json()]);
      if (pData.success) setProducts(pData.data);
      if (mData.success) setBrands(mData.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyProduct);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: { ...product.name },
      description: { ...product.description },
      modelId: product.modelId,
      price: product.price,
      originalPrice: product.originalPrice,
      images: [...product.images],
      status: product.status,
      isNew: product.isNew,
      isHot: product.isHot,
      stock: product.stock,
      style: product.style,
    });
    setModalOpen(true);
  };

  const saveProduct = async () => {
    if (!form.name.zh.trim() || !form.modelId || form.price <= 0) return;
    const action = editingProduct ? 'update' : 'add';
    const product = editingProduct
      ? { ...form, id: editingProduct.id }
      : form;
    const res = await fetch('/admin/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, product }),
    });
    const data = await res.json();
    if (data.success) {
      setProducts(data.data);
      setModalOpen(false);
    }
  };

  const toggleStatus = async (product: Product) => {
    const res = await fetch('/admin/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'toggleStatus', product: { id: product.id } }),
    });
    const data = await res.json();
    if (data.success) setProducts(data.data);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await fetch('/admin/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', product: { id: deleteTarget.id } }),
    });
    const data = await res.json();
    if (data.success) setProducts(data.data);
    setDeleteTarget(null);
  };

  const getModelName = (modelId: string) => {
    for (const brand of brands) {
      const model = brand.models.find(m => m.id === modelId);
      if (model) return `${brand.name} ${model.name}`;
    }
    return modelId;
  };

  const handleImageAdd = () => setForm({ ...form, images: [...form.images, ''] });
  const handleImageRemove = (idx: number) => {
    const imgs = form.images.filter((_, i) => i !== idx);
    setForm({ ...form, images: imgs.length ? imgs : [''] });
  };
  const handleImageChange = (idx: number, value: string) => {
    const imgs = [...form.images];
    imgs[idx] = value;
    setForm({ ...form, images: imgs });
  };

  const updateTrilingualField = (field: 'name' | 'description', lang: 'zh' | 'en' | 'ms', value: string) => {
    setForm({
      ...form,
      [field]: { ...form[field], [lang]: value },
    });
  };

  return (
    <div>
      <AdminHeader
        title="商品管理"
        description="管理所有手机壳商品，支持上架/下架、编辑、删除"
        action={
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#002FA7] text-white text-sm font-medium rounded-lg hover:bg-[#00268A] active:scale-[0.98] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            添加商品
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="w-8 h-8 mx-auto border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className={`bg-white rounded-xl border transition-all hover:shadow-md ${
                product.status === 'inactive' ? 'opacity-60 border-gray-100' : 'border-gray-100'
              }`}
            >
              <div className="flex p-4 gap-4">
                {/* 商品图片占位 */}
                <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-xs text-gray-400">
                  {product.images[0] ? (
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-[10px] text-gray-500">IMG</div>
                  ) : '无图'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name.zh}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{getModelName(product.modelId)}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => toggleStatus(product)}
                        className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                          product.status === 'active'
                            ? 'bg-green-50 text-green-600 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {product.status === 'active' ? '已上架' : '已下架'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-[#002FA7]">RM {product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">RM {product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    {product.isNew && (
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium">新品</span>
                    )}
                    {product.isHot && (
                      <span className="px-1.5 py-0.5 bg-red-50 text-red-500 rounded text-[10px] font-medium">热销</span>
                    )}
                    {product.stock === 'out_of_stock' && (
                      <span className="px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium">缺货</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => openEdit(product)}
                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                    title="编辑"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(product)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="删除"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 商品编辑弹窗 */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProduct ? '编辑商品' : '添加商品'} maxWidth="max-w-3xl">
        <div className="space-y-6">
          {/* 三语名称 */}
          <TrilingualInput
            label="商品名称"
            values={form.name}
            onChange={(lang, val) => updateTrilingualField('name', lang, val)}
            required
          />

          {/* 三语描述 */}
          <TrilingualInput
            label="商品描述"
            values={form.description}
            onChange={(lang, val) => updateTrilingualField('description', lang, val)}
            type="textarea"
          />

          {/* 适配型号 + 价格 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">适配型号 <span className="text-red-500">*</span></label>
              <select
                value={form.modelId}
                onChange={e => setForm({ ...form, modelId: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              >
                <option value="">请选择型号</option>
                {brands.map(brand => (
                  <optgroup key={brand.id} label={brand.name}>
                    {brand.models.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">售价 MYR <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.price || ''}
                onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                step="0.01"
                min="0"
                placeholder="29.90"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">原价 (可选)</label>
              <input
                type="number"
                value={form.originalPrice ?? ''}
                onChange={e => {
                  const v = e.target.value ? parseFloat(e.target.value) : null;
                  setForm({ ...form, originalPrice: v });
                }}
                step="0.01"
                min="0"
                placeholder="49.90"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">风格标签</label>
              <input
                value={form.style}
                onChange={e => setForm({ ...form, style: e.target.value })}
                placeholder="例如：minimalist"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
          </div>

          {/* 图片 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">商品图片</label>
            {form.images.map((img, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  value={img}
                  onChange={e => handleImageChange(idx, e.target.value)}
                  placeholder={`图片URL #${idx + 1}，例如 /images/products/case.jpg`}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
                />
                {form.images.length > 1 && (
                  <button
                    onClick={() => handleImageRemove(idx)}
                    className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    删除
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={handleImageAdd}
              className="text-sm text-[#002FA7] hover:text-[#00268A] font-medium"
            >
              + 添加图片
            </button>
          </div>

          {/* 属性标签 */}
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-[#002FA7] focus:ring-[#002FA7]" />
              标记为新品
            </label>
            <label className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={form.isHot} onChange={e => setForm({ ...form, isHot: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-[#002FA7] focus:ring-[#002FA7]" />
              标记为热销
            </label>
            <label className="flex items-center gap-1.5 text-sm text-gray-700">
              <span>库存状态：</span>
              <select
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value as typeof form.stock })}
                className="px-2 py-1 border border-gray-200 rounded text-sm"
              >
                <option value="in_stock">现货</option>
                <option value="out_of_stock">缺货</option>
                <option value="pre_order">预定</option>
              </select>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">取消</button>
            <button onClick={saveProduct} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#002FA7] rounded-lg hover:bg-[#00268A] transition-all">保存</button>
          </div>
        </div>
      </Modal>

      {/* 删除确认 */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="确认删除"
        message={deleteTarget ? `确定要删除商品「${deleteTarget.name.zh}」吗？此操作不可撤销。` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
