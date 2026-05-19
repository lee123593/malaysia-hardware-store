'use client';

// ============================================================
// 手机型号管理 — 品牌和型号的增删改排序
// ============================================================

import { useState, useEffect } from 'react';
import AdminHeader from '@/admin/components/AdminHeader';
import Modal from '@/admin/components/Modal';
import ConfirmDialog from '@/admin/components/ConfirmDialog';
import type { PhoneBrand, PhoneModel } from '@/types/admin';

export default function ModelsPage() {
  const [brands, setBrands] = useState<PhoneBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  // 品牌弹窗
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<PhoneBrand | null>(null);
  const [brandForm, setBrandForm] = useState({ name: '', nameZh: '' });

  // 型号弹窗
  const [modelModalOpen, setModelModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<PhoneModel | null>(null);
  const [currentBrandId, setCurrentBrandId] = useState('');
  const [modelForm, setModelForm] = useState({ name: '', hot: false });

  // 删除确认
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'brand' | 'model'; brandId?: string; modelId?: string; name: string } | null>(null);

  useEffect(() => { fetchBrands(); }, []);

  const fetchBrands = async () => {
    try {
      const res = await fetch('/admin/api/models');
      const data = await res.json();
      if (data.success) setBrands(data.data);
    } catch (err) {
      console.error('Failed to load models:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshAfterAction = async (fn: () => Promise<void>) => {
    await fn();
    await fetchBrands();
  };

  // ===== 品牌操作 =====
  const openAddBrand = () => {
    setEditingBrand(null);
    setBrandForm({ name: '', nameZh: '' });
    setBrandModalOpen(true);
  };

  const openEditBrand = (brand: PhoneBrand) => {
    setEditingBrand(brand);
    setBrandForm({ name: brand.name, nameZh: brand.nameZh });
    setBrandModalOpen(true);
  };

  const saveBrand = async () => {
    if (!brandForm.name.trim()) return;
    const action = editingBrand ? 'updateBrand' : 'addBrand';
    const body = editingBrand
      ? { action, brandId: editingBrand.id, brand: { name: brandForm.name, nameZh: brandForm.nameZh || brandForm.name } }
      : { action, brand: { name: brandForm.name, nameZh: brandForm.nameZh || brandForm.name } };
    await refreshAfterAction(async () => {
      await fetch('/admin/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    });
    setBrandModalOpen(false);
  };

  // ===== 型号操作 =====
  const openAddModel = (brandId: string) => {
    setCurrentBrandId(brandId);
    setEditingModel(null);
    setModelForm({ name: '', hot: false });
    setModelModalOpen(true);
  };

  const openEditModel = (brandId: string, model: PhoneModel) => {
    setCurrentBrandId(brandId);
    setEditingModel(model);
    setModelForm({ name: model.name, hot: model.hot });
    setModelModalOpen(true);
  };

  const saveModel = async () => {
    if (!modelForm.name.trim()) return;
    const action = editingModel ? 'updateModel' : 'addModel';
    const modelData = editingModel
      ? { id: editingModel.id, name: modelForm.name, hot: modelForm.hot }
      : { name: modelForm.name, hot: modelForm.hot };
    await refreshAfterAction(async () => {
      await fetch('/admin/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, brandId: currentBrandId, model: modelData }),
      });
    });
    setModelModalOpen(false);
  };

  // ===== 删除操作 =====
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'brand') {
      await refreshAfterAction(async () => {
        await fetch('/admin/api/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'deleteBrand', brandId: deleteTarget.brandId }),
        });
      });
    } else {
      await refreshAfterAction(async () => {
        await fetch('/admin/api/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'deleteModel',
            brandId: deleteTarget.brandId,
            model: { id: deleteTarget.modelId },
          }),
        });
      });
    }
    setDeleteTarget(null);
    setExpandedBrand(null);
  };

  return (
    <div>
      <AdminHeader
        title="手机型号管理"
        description="管理手机品牌和适配型号，支持无限新增、编辑、删除"
        action={
          <button
            onClick={openAddBrand}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#002FA7] text-white text-sm font-medium rounded-lg hover:bg-[#00268A] active:scale-[0.98] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            添加品牌
          </button>
        }
      />

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="w-8 h-8 mx-auto border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* 品牌行 */}
              <div
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-all"
                onClick={() => setExpandedBrand(expandedBrand === brand.id ? null : brand.id)}
              >
                <div className="flex items-center gap-3">
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`text-gray-400 transition-transform ${expandedBrand === brand.id ? 'rotate-90' : ''}`}
                  >
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                  <div>
                    <span className="font-semibold text-gray-900">{brand.name}</span>
                    <span className="text-sm text-gray-400 ml-2">{brand.nameZh}</span>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {brand.models.length} 个型号
                  </span>
                </div>
                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => openAddModel(brand.id)}
                    className="p-1.5 text-gray-400 hover:text-[#002FA7] hover:bg-blue-50 rounded-lg transition-all"
                    title="添加型号"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </button>
                  <button
                    onClick={() => openEditBrand(brand)}
                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ type: 'brand', brandId: brand.id, name: brand.name })}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>

              {/* 型号列表 */}
              {expandedBrand === brand.id && (
                <div className="border-t border-gray-100 bg-gray-50/30">
                  {brand.models.length === 0 ? (
                    <div className="px-5 py-8 text-center text-sm text-gray-400">
                      暂无型号，点击上方 + 按钮添加
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-4">
                      {brand.models
                        .sort((a, b) => a.order - b.order)
                        .map(model => (
                          <div
                            key={model.id}
                            className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-gray-100 hover:shadow-sm transition-all"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {model.hot && (
                                <span className="shrink-0 inline-flex px-1.5 py-0.5 bg-red-50 text-red-500 rounded text-[10px] font-semibold">热</span>
                              )}
                              <span className="text-sm text-gray-700 truncate">{model.name}</span>
                            </div>
                            <div className="flex gap-1 shrink-0 ml-1">
                              <button
                                onClick={() => openEditModel(brand.id, model)}
                                className="p-1 text-gray-300 hover:text-blue-500 transition-all"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              </button>
                              <button
                                onClick={() => setDeleteTarget({ type: 'model', brandId: brand.id, modelId: model.id, name: model.name })}
                                className="p-1 text-gray-300 hover:text-red-500 transition-all"
                              >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 品牌弹窗 */}
      <Modal isOpen={brandModalOpen} onClose={() => setBrandModalOpen(false)} title={editingBrand ? '编辑品牌' : '添加品牌'} maxWidth="max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">品牌名称 <span className="text-red-500">*</span></label>
            <input
              value={brandForm.name}
              onChange={e => setBrandForm({ ...brandForm, name: e.target.value })}
              placeholder="例如：Apple iPhone"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">中文名称</label>
            <input
              value={brandForm.nameZh}
              onChange={e => setBrandForm({ ...brandForm, nameZh: e.target.value })}
              placeholder="例如：苹果 iPhone"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setBrandModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">取消</button>
            <button onClick={saveBrand} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#002FA7] rounded-lg hover:bg-[#00268A] transition-all">保存</button>
          </div>
        </div>
      </Modal>

      {/* 型号弹窗 */}
      <Modal isOpen={modelModalOpen} onClose={() => setModelModalOpen(false)} title={editingModel ? '编辑手机型号' : '添加手机型号'} maxWidth="max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">型号名称 <span className="text-red-500">*</span></label>
            <input
              value={modelForm.name}
              onChange={e => setModelForm({ ...modelForm, name: e.target.value })}
              placeholder="例如：iPhone 16 Pro Max"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={modelForm.hot}
              onChange={e => setModelForm({ ...modelForm, hot: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-[#002FA7] focus:ring-[#002FA7]"
            />
            <span className="text-sm text-gray-700">设为热门机型</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setModelModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">取消</button>
            <button onClick={saveModel} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#002FA7] rounded-lg hover:bg-[#00268A] transition-all">保存</button>
          </div>
        </div>
      </Modal>

      {/* 删除确认 */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="确认删除"
        message={deleteTarget ? `确定要删除「${deleteTarget.name}」吗？此操作不可撤销。` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
