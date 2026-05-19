// POST /api/admin/login — 管理员登录

import { NextResponse } from 'next/server';
import { verifyPassword, generateToken } from '@/admin/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: '请输入密码' },
        { status: 400 }
      );
    }

    if (verifyPassword(password)) {
      const token = generateToken();
      return NextResponse.json({
        success: true,
        token,
        message: '登录成功',
      });
    }

    return NextResponse.json(
      { success: false, message: '密码错误，请重试' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}
