// GET /api/admin/models — 获取所有品牌和型号
// POST /api/admin/models — 保存所有品牌和型号
// PUT /api/admin/models — 添加/更新品牌或型号

import { NextResponse } from 'next/server';
import { getModels, saveModels } from '@/admin/lib/data';
import type { PhoneBrand, PhoneModel } from '@/types/admin';

export async function GET() {
  try {
    const brands = getModels();
    return NextResponse.json({ success: true, data: brands });
  } catch {
    return NextResponse.json({ success: false, message: '读取数据失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, brandId, brand, model } = body;

    const brands = getModels();

    switch (action) {
      case 'addBrand': {
        if (!brand) return NextResponse.json({ success: false, message: '缺少品牌数据' }, { status: 400 });
        const maxOrder = brands.reduce((max, b) => Math.max(max, b.order), 0);
        brands.push({
          id: brand.id || brand.name.toLowerCase().replace(/\s+/g, '-'),
          name: brand.name,
          nameZh: brand.nameZh || brand.name,
          order: brand.order || maxOrder + 1,
          models: brand.models || [],
        });
        saveModels(brands);
        return NextResponse.json({ success: true, data: brands, message: '品牌添加成功' });
      }

      case 'updateBrand': {
        if (!brandId || !brand) return NextResponse.json({ success: false, message: '缺少品牌数据' }, { status: 400 });
        const idx = brands.findIndex(b => b.id === brandId);
        if (idx === -1) return NextResponse.json({ success: false, message: '品牌不存在' }, { status: 404 });
        brands[idx] = { ...brands[idx], ...brand };
        saveModels(brands);
        return NextResponse.json({ success: true, data: brands, message: '品牌更新成功' });
      }

      case 'deleteBrand': {
        if (!brandId) return NextResponse.json({ success: false, message: '缺少品牌ID' }, { status: 400 });
        const filtered = brands.filter(b => b.id !== brandId);
        saveModels(filtered);
        return NextResponse.json({ success: true, data: filtered, message: '品牌删除成功' });
      }

      case 'addModel': {
        if (!brandId || !model) return NextResponse.json({ success: false, message: '缺少型号数据' }, { status: 400 });
        const brand = brands.find(b => b.id === brandId);
        if (!brand) return NextResponse.json({ success: false, message: '品牌不存在' }, { status: 404 });
        const maxOrder = brand.models.reduce((max, m: PhoneModel) => Math.max(max, m.order), 0);
        brand.models.push({
          id: model.id || model.name.toLowerCase().replace(/\s+/g, '-'),
          name: model.name,
          hot: model.hot || false,
          order: model.order || maxOrder + 1,
        });
        saveModels(brands);
        return NextResponse.json({ success: true, data: brands, message: '型号添加成功' });
      }

      case 'updateModel': {
        if (!brandId || !model || !model.id) return NextResponse.json({ success: false, message: '缺少型号数据' }, { status: 400 });
        const brand = brands.find(b => b.id === brandId);
        if (!brand) return NextResponse.json({ success: false, message: '品牌不存在' }, { status: 404 });
        const mIdx = brand.models.findIndex(m => m.id === model.id);
        if (mIdx === -1) return NextResponse.json({ success: false, message: '型号不存在' }, { status: 404 });
        brand.models[mIdx] = { ...brand.models[mIdx], ...model };
        saveModels(brands);
        return NextResponse.json({ success: true, data: brands, message: '型号更新成功' });
      }

      case 'deleteModel': {
        if (!brandId || !model || !model.id) return NextResponse.json({ success: false, message: '缺少型号ID' }, { status: 400 });
        const brand = brands.find(b => b.id === brandId);
        if (!brand) return NextResponse.json({ success: false, message: '品牌不存在' }, { status: 404 });
        brand.models = brand.models.filter(m => m.id !== model.id);
        saveModels(brands);
        return NextResponse.json({ success: true, data: brands, message: '型号删除成功' });
      }

      case 'reorderBrands': {
        const { orderedIds } = body;
        if (!orderedIds) return NextResponse.json({ success: false, message: '缺少排序数据' }, { status: 400 });
        const reordered = orderedIds.map((id: string, idx: number) => {
          const b = brands.find(b => b.id === id);
          return b ? { ...b, order: idx + 1 } : null;
        }).filter(Boolean);
        saveModels(reordered as PhoneBrand[]);
        return NextResponse.json({ success: true, data: reordered, message: '排序更新成功' });
      }

      default:
        return NextResponse.json({ success: false, message: '未知操作' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, message: '操作失败' }, { status: 500 });
  }
}
