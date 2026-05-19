'use client';

// ============================================================
// 三语文案编辑 — 全站翻译内容管理
// ============================================================

import { useState, useEffect } from 'react';
import AdminHeader from '@/admin/components/AdminHeader';
import Modal from '@/admin/components/Modal';
import ConfirmDialog from '@/admin/components/ConfirmDialog';
import type { Trilingual } from '@/types/admin';

interface TransEntry {
  section: string;
  key: string;
  zh: string;
  en: string;
  ms: string;
}

export default function TranslationsPage() {
  const [entries, setEntries] = useState<TransEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');

  // 弹窗
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TransEntry | null>(null);
  const [form, setForm] = useState({ section: '', key: '', zh: '', en: '', ms: '' });

  // 删除
  const [deleteTarget, setDeleteTarget] = useState<{ section: string; key: string; label: string } | null>(null);

  useEffect(() => { fetchTranslations(); }, []);

  const fetchTranslations = async () => {
    try {
      const res = await fetch('/admin/api/translations');
      const data = await res.json();
      if (data.success) {
        const list: TransEntry[] = [];
        Object.entries(data.data as Record<string, Record<string, Trilingual>>).forEach(([section, keys]) => {
          Object.entries(keys).forEach(([key, value]) => {
            list.push({ section, key, zh: value.zh, en: value.en, ms: value.ms });
          });
        });
        setEntries(list);
      }
    } catch (err) {
      console.error('Failed to load translations:', err);
    } finally {
      setLoading(false);
    }
  };

  const sections = ['all', ...new Set(entries.map(e => e.section))];

  const filtered = entries.filter(e => {
    if (selectedSection !== 'all' && e.section !== selectedSection) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.key.toLowerCase().includes(q) ||
        e.zh.toLowerCase().includes(q) ||
        e.en.toLowerCase().includes(q) ||
        e.ms.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openAdd = () => {
    setEditingEntry(null);
    setForm({ section: entries[0]?.section || 'nav', key: '', zh: '', en: '', ms: '' });
    setModalOpen(true);
  };

  const openEdit = (entry: TransEntry) => {
    setEditingEntry(entry);
    setForm({ section: entry.section, key: entry.key, zh: entry.zh, en: entry.en, ms: entry.ms });
    setModalOpen(true);
  };

  const saveEntry = async () => {
    if (!form.section.trim() || !form.key.trim()) return;
    const action = editingEntry ? 'updateKey' : 'addKey';
    const res = await fetch('/admin/api/translations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        section: form.section,
        key: form.key,
        translations: { zh: form.zh, en: form.en, ms: form.ms },
      }),
    });
    const data = await res.json();
    if (data.success) {
      await fetchTranslations();
      setModalOpen(false);
    } else {
      alert(data.message || '保存失败');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await fetch('/admin/api/translations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'deleteKey',
        section: deleteTarget.section,
        key: deleteTarget.key,
      }),
    });
    const data = await res.json();
    if (data.success) await fetchTranslations();
    setDeleteTarget(null);
  };

  return (
    <div>
      <AdminHeader
        title="三语文案编辑"
        description="管理中/英/马来语全站文本，修改保存后前端实时生效"
        action={
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#002FA7] text-white text-sm font-medium rounded-lg hover:bg-[#00268A] active:scale-[0.98] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            添加文案
          </button>
        }
      />

      {/* 筛选栏 */}
      <div className="flex gap-3 mb-4">
        <select
          value={selectedSection}
          onChange={e => setSelectedSection(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
        >
          {sections.map(s => (
            <option key={s} value={s}>{s === 'all' ? '全部板块' : s}</option>
          ))}
        </select>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜索文案..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="w-8 h-8 mx-auto border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-24">板块</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-36">Key</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">中文</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">English</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bahasa Melayu</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-24">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(entry => (
                  <tr key={`${entry.section}.${entry.key}`} className="hover:bg-gray-50/50 transition-all">
                    <td className="px-4 py-3 text-xs text-gray-400">{entry.section}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{entry.key}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{entry.zh}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{entry.en}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{entry.ms}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEdit(entry)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-all"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ section: entry.section, key: entry.key, label: entry.zh || entry.key })}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
            共 {filtered.length} 条文案
          </div>
        </div>
      )}

      {/* 编辑弹窗 */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingEntry ? '编辑文案' : '添加文案'} maxWidth="max-w-2xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">板块名 <span className="text-red-500">*</span></label>
              <input
                value={form.section}
                onChange={e => setForm({ ...form, section: e.target.value })}
                disabled={!!editingEntry}
                placeholder="例如：nav, home, product"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Key名 <span className="text-red-500">*</span></label>
              <input
                value={form.key}
                onChange={e => setForm({ ...form, key: e.target.value })}
                disabled={!!editingEntry}
                placeholder="例如：home, addToCart"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7] disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">🇨🇳 中文 <span className="text-red-500">*</span></label>
            <input
              value={form.zh}
              onChange={e => setForm({ ...form, zh: e.target.value })}
              placeholder="中文文案"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">🇬🇧 English</label>
            <input
              value={form.en}
              onChange={e => setForm({ ...form, en: e.target.value })}
              placeholder="English text"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">🇲🇾 Bahasa Melayu</label>
            <input
              value={form.ms}
              onChange={e => setForm({ ...form, ms: e.target.value })}
              placeholder="Teks Bahasa Melayu"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">取消</button>
            <button onClick={saveEntry} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#002FA7] rounded-lg hover:bg-[#00268A] transition-all">保存</button>
          </div>
        </div>
      </Modal>

      {/* 删除确认 */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="确认删除"
        message={deleteTarget ? `确定要删除文案「${deleteTarget.label}」吗？` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
