// GET /api/admin/translations — 获取翻译文本
// POST /api/admin/translations — 保存翻译文本

import { NextResponse } from 'next/server';
import { getTranslations, saveTranslations } from '@/admin/lib/data';

export async function GET() {
  try {
    const translations = getTranslations();
    return NextResponse.json({ success: true, data: translations });
  } catch {
    return NextResponse.json({ success: false, message: '读取数据失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, section, key, translations: transValue } = body;

    const allTranslations = getTranslations();

    switch (action) {
      case 'updateKey': {
        if (!section || !key || !transValue) {
          return NextResponse.json({ success: false, message: '缺少数据' }, { status: 400 });
        }
        if (!allTranslations[section]) {
          allTranslations[section] = {};
        }
        allTranslations[section][key] = {
          zh: transValue.zh || '',
          en: transValue.en || '',
          ms: transValue.ms || '',
        };
        saveTranslations(allTranslations);
        return NextResponse.json({ success: true, data: allTranslations, message: '翻译已更新' });
      }

      case 'addKey': {
        if (!section || !key || !transValue) {
          return NextResponse.json({ success: false, message: '缺少数据' }, { status: 400 });
        }
        if (!allTranslations[section]) {
          allTranslations[section] = {};
        }
        if (allTranslations[section][key]) {
          return NextResponse.json({ success: false, message: '该Key已存在' }, { status: 400 });
        }
        allTranslations[section][key] = {
          zh: transValue.zh || '',
          en: transValue.en || '',
          ms: transValue.ms || '',
        };
        saveTranslations(allTranslations);
        return NextResponse.json({ success: true, data: allTranslations, message: '翻译Key已添加' });
      }

      case 'deleteKey': {
        if (!section || !key) {
          return NextResponse.json({ success: false, message: '缺少数据' }, { status: 400 });
        }
        if (allTranslations[section]?.[key]) {
          delete allTranslations[section][key];
          saveTranslations(allTranslations);
        }
        return NextResponse.json({ success: true, data: allTranslations, message: '翻译Key已删除' });
      }

      case 'saveAll': {
        if (!body.data) {
          return NextResponse.json({ success: false, message: '缺少数据' }, { status: 400 });
        }
        saveTranslations(body.data);
        return NextResponse.json({ success: true, data: body.data, message: '全部翻译已保存' });
      }

      default:
        return NextResponse.json({ success: false, message: '未知操作' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, message: '操作失败' }, { status: 500 });
  }
}
