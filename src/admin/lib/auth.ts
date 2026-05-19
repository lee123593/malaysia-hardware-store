// ============================================================
// 后台权限验证 — 简单密码模式
// 单管理员账号，无多用户
// ============================================================

import { getSettings } from './data';

const TOKEN_KEY = 'admin_token';

export function verifyPassword(password: string): boolean {
  const settings = getSettings();
  return password === settings.adminPassword;
}

export function generateToken(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 15);
  return `atk_${ts}_${rand}`;
}

// 服务端 token 验证
export function validateToken(token: string): boolean {
  if (!token) return false;
  // 简单验证：token 格式正确即有效
  // 生产环境应使用 JWT 或 session
  return token.startsWith('atk_') && token.length > 20;
}

// 修改管理员密码
export function changePassword(oldPassword: string, newPassword: string): boolean {
  if (!verifyPassword(oldPassword)) return false;
  const settings = getSettings();
  settings.adminPassword = newPassword;
  const { saveSettings } = require('./data');
  saveSettings(settings);
  return true;
}
