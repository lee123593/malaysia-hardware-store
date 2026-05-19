// GET /api/admin/settings — 获取站点设置
// POST /api/admin/settings — 保存站点设置

import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/admin/lib/data';

export async function GET() {
  try {
    const settings = getSettings();
    // 不返回密码给前端
    const { adminPassword, ...safe } = settings;
    return NextResponse.json({ success: true, data: safe });
  } catch {
    return NextResponse.json({ success: false, message: '读取数据失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, settings } = body;

    switch (action) {
      case 'save': {
        if (!settings) return NextResponse.json({ success: false, message: '缺少设置数据' }, { status: 400 });
        const current = getSettings();
        // 合并设置，保留原密码
        const updated = { ...current, ...settings, adminPassword: current.adminPassword };
        saveSettings(updated);
        const { adminPassword, ...safe } = updated;
        return NextResponse.json({ success: true, data: safe, message: '设置已保存' });
      }

      case 'changePassword': {
        const { oldPassword, newPassword } = body;
        if (!oldPassword || !newPassword) {
          return NextResponse.json({ success: false, message: '请输入新旧密码' }, { status: 400 });
        }
        if (newPassword.length < 6) {
          return NextResponse.json({ success: false, message: '新密码至少6位字符' }, { status: 400 });
        }
        const current = getSettings();
        if (oldPassword !== current.adminPassword) {
          return NextResponse.json({ success: false, message: '旧密码不正确' }, { status: 400 });
        }
        current.adminPassword = newPassword;
        saveSettings(current);
        return NextResponse.json({ success: true, message: '密码修改成功' });
      }

      default:
        return NextResponse.json({ success: false, message: '未知操作' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, message: '操作失败' }, { status: 500 });
  }
}
