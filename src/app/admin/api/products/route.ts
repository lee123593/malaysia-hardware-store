// GET /api/admin/products — 获取所有商品
// POST /api/admin/products — 添加/编辑/删除商品

import { NextResponse } from 'next/server';
import { getProducts, saveProducts, generateId } from '@/admin/lib/data';
import type { Product } from '@/types/admin';

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json({ success: true, data: products });
  } catch {
    return NextResponse.json({ success: false, message: '读取数据失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, product } = body;
    const products = getProducts();

    switch (action) {
      case 'add': {
        if (!product) return NextResponse.json({ success: false, message: '缺少商品数据' }, { status: 400 });
        const maxOrder = products.reduce((max, p) => Math.max(max, p.order), 0);
        const newProduct: Product = {
          ...product,
          id: product.id || generateId('p'),
          createdAt: product.createdAt || new Date().toISOString().split('T')[0],
          order: product.order || maxOrder + 1,
        };
        products.push(newProduct);
        saveProducts(products);
        return NextResponse.json({ success: true, data: products, message: '商品添加成功' });
      }

      case 'update': {
        if (!product || !product.id) return NextResponse.json({ success: false, message: '缺少商品ID' }, { status: 400 });
        const idx = products.findIndex(p => p.id === product.id);
        if (idx === -1) return NextResponse.json({ success: false, message: '商品不存在' }, { status: 404 });
        products[idx] = { ...products[idx], ...product };
        saveProducts(products);
        return NextResponse.json({ success: true, data: products, message: '商品更新成功' });
      }

      case 'delete': {
        if (!product?.id) return NextResponse.json({ success: false, message: '缺少商品ID' }, { status: 400 });
        const filtered = products.filter(p => p.id !== product.id);
        saveProducts(filtered);
        return NextResponse.json({ success: true, data: filtered, message: '商品删除成功' });
      }

      case 'toggleStatus': {
        if (!product?.id) return NextResponse.json({ success: false, message: '缺少商品ID' }, { status: 400 });
        const idx = products.findIndex(p => p.id === product.id);
        if (idx === -1) return NextResponse.json({ success: false, message: '商品不存在' }, { status: 404 });
        products[idx].status = products[idx].status === 'active' ? 'inactive' : 'active';
        saveProducts(products);
        return NextResponse.json({ success: true, data: products, message: '商品状态已切换' });
      }

      default:
        return NextResponse.json({ success: false, message: '未知操作' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, message: '操作失败' }, { status: 500 });
  }
}
