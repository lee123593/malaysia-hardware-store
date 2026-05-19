'use client';

// ============================================================
// 网站设置 — 站点基础信息、配送、售后、密码
// ============================================================

import { useState, useEffect } from 'react';
import AdminHeader from '@/admin/components/AdminHeader';
import type { SiteSettings } from '@/types/admin';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Omit<SiteSettings, 'adminPassword'> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // 密码修改
  const [pwdForm, setPwdForm] = useState({ old: '', newPwd: '', confirm: '' });
  const [pwdMessage, setPwdMessage] = useState('');

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/admin/api/settings');
      const data = await res.json();
      if (data.success) setSettings(data.data);
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/admin/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', settings }),
      });
      const data = await res.json();
      setMessage(data.success ? '✅ 设置已保存' : '❌ 保存失败');
    } catch {
      setMessage('❌ 网络错误');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const changePassword = async () => {
    if (!pwdForm.old || !pwdForm.newPwd) {
      setPwdMessage('请填写新旧密码');
      return;
    }
    if (pwdForm.newPwd.length < 6) {
      setPwdMessage('新密码至少6位字符');
      return;
    }
    if (pwdForm.newPwd !== pwdForm.confirm) {
      setPwdMessage('两次输入的新密码不一致');
      return;
    }

    try {
      const res = await fetch('/admin/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'changePassword',
          oldPassword: pwdForm.old,
          newPassword: pwdForm.newPwd,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPwdMessage('✅ 密码修改成功');
        setPwdForm({ old: '', newPwd: '', confirm: '' });
      } else {
        setPwdMessage(`❌ ${data.message}`);
      }
    } catch {
      setPwdMessage('❌ 网络错误');
    }
    setTimeout(() => setPwdMessage(''), 4000);
  };

  const updateTrilingual = (field: string, lang: 'zh' | 'en' | 'ms', value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [field]: {
        ...(settings[field as keyof typeof settings] as Record<string, string>),
        [lang]: value,
      },
    });
  };

  const langLabels = [
    { code: 'zh' as const, label: '中文', flag: '🇨🇳' },
    { code: 'en' as const, label: 'English', flag: '🇬🇧' },
    { code: 'ms' as const, label: 'Bahasa Melayu', flag: '🇲🇾' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 mx-auto border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
      </div>
    );
  }

  if (!settings) return <div className="text-center text-gray-400 py-12">加载失败</div>;

  const SectionTitle = ({ children }: { children: string }) => (
    <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">{children}</h3>
  );

  const TrilingualField = ({ label, field }: { label: string; field: string }) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      <div className="space-y-1.5">
        {langLabels.map(lang => (
          <div key={lang.code} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 min-w-[70px]">{lang.flag} {lang.label}</span>
            <input
              value={(settings[field as keyof typeof settings] as Record<string, string>)[lang.code] ?? ''}
              onChange={e => updateTrilingual(field, lang.code, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <AdminHeader title="网站设置" description="管理网站基础信息、配送售后文案、管理员密码" />

      {message && (
        <div className={`mb-4 px-4 py-2.5 rounded-lg text-sm font-medium ${
          message.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* 基础信息 */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <SectionTitle>基础信息</SectionTitle>
          <TrilingualField label="网站名称" field="siteName" />

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Logo 路径</label>
              <input
                value={settings.logo}
                onChange={e => setSettings({ ...settings, logo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">默认语言</label>
              <select
                value={settings.defaultLanguage}
                onChange={e => setSettings({ ...settings, defaultLanguage: e.target.value as 'zh' | 'en' | 'ms' })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              >
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="ms">Bahasa Melayu</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableLanguageSwitch}
                onChange={e => setSettings({ ...settings, enableLanguageSwitch: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-[#002FA7] focus:ring-[#002FA7]"
              />
              <span className="text-sm text-gray-700">启用前端语言切换功能</span>
            </label>
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-600 mb-1.5">货币符号</label>
            <input
              value={settings.currency.symbol}
              onChange={e => setSettings({ ...settings, currency: { ...settings.currency, symbol: e.target.value } })}
              className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
            />
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <SectionTitle>联系方式</SectionTitle>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">邮箱</label>
              <input
                value={settings.contact.email}
                onChange={e => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">WhatsApp</label>
              <input
                value={settings.contact.whatsapp}
                onChange={e => setSettings({ ...settings, contact: { ...settings.contact, whatsapp: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Instagram</label>
              <input
                value={settings.contact.instagram}
                onChange={e => setSettings({ ...settings, contact: { ...settings.contact, instagram: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
          </div>
        </div>

        {/* 三语文案：配送、售后、关于、版权 */}
        {(['shippingInfo', 'afterSalesInfo', 'aboutUs', 'footerCopyright'] as const).map(field => (
          <div key={field} className="bg-white rounded-xl border border-gray-100 p-6">
            <SectionTitle>
              {field === 'shippingInfo' ? '配送说明' :
               field === 'afterSalesInfo' ? '售后说明' :
               field === 'aboutUs' ? '关于我们' : '底部版权'}
            </SectionTitle>
            <div className="space-y-3">
              {langLabels.map(lang => (
                <div key={lang.code}>
                  <label className="text-xs text-gray-400 mb-1 block">{lang.flag} {lang.label}</label>
                  <textarea
                    value={settings[field][lang.code]}
                    onChange={e => updateTrilingual(field, lang.code, e.target.value)}
                    rows={field === 'aboutUs' ? 4 : 3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7] resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SEO */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <SectionTitle>SEO 设置</SectionTitle>
          <TrilingualField label="SEO 标题" field="seo.title" />
          <TrilingualField label="SEO 描述" field="seo.description" />
        </div>

        {/* 保存按钮 */}
        <button
          onClick={saveSettings}
          disabled={saving}
          className="px-8 py-3 bg-[#002FA7] text-white text-sm font-semibold rounded-lg hover:bg-[#00268A] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {saving ? '保存中...' : '保存所有设置'}
        </button>

        {/* 管理员密码 */}
        <div className="bg-white rounded-xl border border-red-100 p-6">
          <SectionTitle>修改管理员密码</SectionTitle>
          {pwdMessage && (
            <div className={`mb-4 px-4 py-2.5 rounded-lg text-sm font-medium ${
              pwdMessage.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {pwdMessage}
            </div>
          )}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">旧密码</label>
              <input
                type="password"
                value={pwdForm.old}
                onChange={e => setPwdForm({ ...pwdForm, old: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">新密码</label>
              <input
                type="password"
                value={pwdForm.newPwd}
                onChange={e => setPwdForm({ ...pwdForm, newPwd: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">确认新密码</label>
              <input
                type="password"
                value={pwdForm.confirm}
                onChange={e => setPwdForm({ ...pwdForm, confirm: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
              />
            </div>
          </div>
          <button
            onClick={changePassword}
            className="mt-4 px-6 py-2.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 active:scale-[0.98] transition-all"
          >
            修改密码
          </button>
        </div>
      </div>
    </div>
  );
}
