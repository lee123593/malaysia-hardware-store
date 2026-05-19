// GET /api/admin/homepage — 获取首页配置
// POST /api/admin/homepage — 保存首页配置

import { NextResponse } from 'next/server';
import { getHomepageConfig, saveHomepageConfig } from '@/admin/lib/data';

export async function GET() {
  try {
    const config = getHomepageConfig();
    return NextResponse.json({ success: true, data: config });
  } catch {
    return NextResponse.json({ success: false, message: '读取数据失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, config } = body;

    switch (action) {
      case 'saveBanner': {
        if (!config) return NextResponse.json({ success: false, message: '缺少Banner数据' }, { status: 400 });
        const current = getHomepageConfig();
        current.banner = { ...current.banner, ...config };
        saveHomepageConfig(current);
        return NextResponse.json({ success: true, data: current, message: 'Banner已保存' });
      }

      case 'saveSections': {
        if (!config) return NextResponse.json({ success: false, message: '缺少板块数据' }, { status: 400 });
        const current = getHomepageConfig();
        current.sections = config;
        saveHomepageConfig(current);
        return NextResponse.json({ success: true, data: current, message: '板块配置已保存' });
      }

      case 'saveSellingPoints': {
        if (!config) return NextResponse.json({ success: false, message: '缺少卖点数据' }, { status: 400 });
        const current = getHomepageConfig();
        current.sellingPoints = config;
        saveHomepageConfig(current);
        return NextResponse.json({ success: true, data: current, message: '卖点配置已保存' });
      }

      case 'saveAll': {
        if (!config) return NextResponse.json({ success: false, message: '缺少配置数据' }, { status: 400 });
        saveHomepageConfig(config);
        return NextResponse.json({ success: true, data: config, message: '首页配置已全部保存' });
      }

      default:
        return NextResponse.json({ success: false, message: '未知操作' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, message: '操作失败' }, { status: 500 });
  }
}
