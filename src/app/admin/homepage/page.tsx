'use client';

// ============================================================
// 首页装修 — 控制Banner、卖点、板块
// ============================================================

import { useState, useEffect } from 'react';
import AdminHeader from '@/admin/components/AdminHeader';
import type { HomepageConfig, Trilingual } from '@/types/admin';

const emptyTrilingual: Trilingual = { zh: '', en: '', ms: '' };

export default function HomepagePage() {
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { fetchConfig(); }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/admin/api/homepage');
      const data = await res.json();
      if (data.success) setConfig(data.data);
    } catch (err) {
      console.error('Failed to load homepage config:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateBanner = (field: string, lang: 'zh' | 'en' | 'ms', value: string) => {
    if (!config) return;
    setConfig({
      ...config,
      banner: {
        ...config.banner,
        [field]: {
          ...(config.banner[field as keyof typeof config.banner] as Trilingual),
          [lang]: value,
        },
      },
    });
  };

  const saveBanner = async () => {
    if (!config) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/admin/api/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'saveBanner', config: config.banner }),
      });
      const data = await res.json();
      setMessage(data.success ? '✅ Banner已保存' : '❌ 保存失败');
    } catch {
      setMessage('❌ 网络错误');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const toggleSection = (sectionId: string) => {
    if (!config) return;
    setConfig({
      ...config,
      sections: config.sections.map(s =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      ),
    });
  };

  const saveSections = async () => {
    if (!config) return;
    setSaving(true);
    try {
      const res = await fetch('/admin/api/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'saveSections', config: config.sections }),
      });
      const data = await res.json();
      setMessage(data.success ? '✅ 板块配置已保存' : '❌ 保存失败');
    } catch {
      setMessage('❌ 网络错误');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const sectionLabels: Record<string, string> = {
    hotModels: '热门机型快捷入口',
    newProducts: '新品上架展示区',
    hotProducts: '热销推荐展示区',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 mx-auto border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
      </div>
    );
  }

  if (!config) return <div className="text-center text-gray-400 py-12">加载失败，请刷新页面</div>;

  const langLabels: { code: 'zh' | 'en' | 'ms'; label: string; flag: string }[] = [
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
  ];

  return (
    <div>
      <AdminHeader title="首页装修" description="修改首页Banner、控制板块显示、管理卖点内容" />

      {/* 状态提示 */}
      {message && (
        <div className={`mb-4 px-4 py-2.5 rounded-lg text-sm font-medium ${
          message.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Banner 编辑区 */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">首页 Banner 编辑</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner 主标题</label>
            <div className="space-y-2">
              {langLabels.map(lang => (
                <div key={lang.code} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 min-w-[70px]">{lang.flag} {lang.label}</span>
                  <input
                    value={config.banner.title[lang.code]}
                    onChange={e => updateBanner('title', lang.code, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner 副标题</label>
            <div className="space-y-2">
              {langLabels.map(lang => (
                <div key={lang.code} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 min-w-[70px]">{lang.flag} {lang.label}</span>
                  <input
                    value={config.banner.subtitle[lang.code]}
                    onChange={e => updateBanner('subtitle', lang.code, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">按钮文字 + 链接</label>
            <div className="space-y-2 mb-3">
              {langLabels.map(lang => (
                <div key={lang.code} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 min-w-[70px]">{lang.flag} {lang.label}</span>
                  <input
                    value={config.banner.buttonText[lang.code]}
                    onChange={e => updateBanner('buttonText', lang.code, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 min-w-[70px]">链接</span>
              <input
                value={config.banner.buttonLink}
                onChange={e => setConfig({ ...config, banner: { ...config.banner, buttonLink: e.target.value } })}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner 图片</label>
            <input
              value={config.banner.image}
              onChange={e => setConfig({ ...config, banner: { ...config.banner, image: e.target.value } })}
              placeholder="/images/banner.jpg"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>

          <button
            onClick={saveBanner}
            disabled={saving}
            className="px-6 py-2.5 bg-[#002FA7] text-white text-sm font-medium rounded-lg hover:bg-[#00268A] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {saving ? '保存中...' : '保存 Banner 配置'}
          </button>
        </div>

        {/* 首页板块控制 */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">首页板块控制</h2>

          <div className="space-y-3">
            {config.sections
              .sort((a, b) => a.order - b.order)
              .map(section => (
                <div key={section.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{sectionLabels[section.id] || section.id}</p>
                    <p className="text-xs text-gray-400">类型: {section.type} | ID: {section.id}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={section.visible}
                      onChange={() => toggleSection(section.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#002FA7]"></div>
                  </label>
                </div>
              ))}
          </div>

          <button
            onClick={saveSections}
            disabled={saving}
            className="mt-4 px-6 py-2.5 bg-[#002FA7] text-white text-sm font-medium rounded-lg hover:bg-[#00268A] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {saving ? '保存中...' : '保存板块配置'}
          </button>
        </div>
      </div>
    </div>
  );
}
