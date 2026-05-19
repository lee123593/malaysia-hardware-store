// GET /api/admin/dashboard — 获取仪表盘统计数据

import { NextResponse } from 'next/server';
import { getProducts, getModels, getOrders } from '@/admin/lib/data';

export async function GET() {
  try {
    const products = getProducts();
    const models = getModels();
    const orders = getOrders();

    const totalModels = models.reduce((sum, b) => sum + b.models.length, 0);

    const pendingOrders = orders.filter(o => o.status === 'pending');
    const shippedOrders = orders.filter(o => o.status === 'shipped');
    const completedOrders = orders.filter(o => o.status === 'completed');

    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        totalProducts: products.length,
        activeProducts: products.filter(p => p.status === 'active').length,
        totalModels,
        totalOrders: orders.length,
        pendingOrders: pendingOrders.length,
        shippedOrders: shippedOrders.length + completedOrders.length,
        totalRevenue,
        recentOrders,
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: '获取数据失败' }, { status: 500 });
  }
}
