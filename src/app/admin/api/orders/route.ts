// GET /api/admin/orders — 获取订单列表
// POST /api/admin/orders — 更新订单状态/删除订单

import { NextResponse } from 'next/server';
import { getOrders, saveOrders } from '@/admin/lib/data';
import type { OrderStatus } from '@/types/admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let orders = getOrders();

    // 筛选
    if (status && status !== 'all') {
      orders = orders.filter(o => o.status === status);
    }

    // 搜索
    if (search) {
      const q = search.toLowerCase();
      orders = orders.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        o.email.toLowerCase().includes(q)
      );
    }

    // 按创建时间倒序
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, data: orders });
  } catch {
    return NextResponse.json({ success: false, message: '读取数据失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, orderId, status } = body;
    const orders = getOrders();

    switch (action) {
      case 'updateStatus': {
        if (!orderId || !status) {
          return NextResponse.json({ success: false, message: '缺少参数' }, { status: 400 });
        }
        const validStatuses: OrderStatus[] = ['pending', 'shipped', 'completed', 'cancelled'];
        if (!validStatuses.includes(status as OrderStatus)) {
          return NextResponse.json({ success: false, message: '无效的状态值' }, { status: 400 });
        }
        const order = orders.find(o => o.id === orderId);
        if (!order) return NextResponse.json({ success: false, message: '订单不存在' }, { status: 404 });
        order.status = status as OrderStatus;
        saveOrders(orders);
        return NextResponse.json({ success: true, data: orders, message: '订单状态已更新' });
      }

      case 'delete': {
        if (!orderId) return NextResponse.json({ success: false, message: '缺少订单ID' }, { status: 400 });
        const filtered = orders.filter(o => o.id !== orderId);
        saveOrders(filtered);
        return NextResponse.json({ success: true, data: filtered, message: '订单已删除' });
      }

      default:
        return NextResponse.json({ success: false, message: '未知操作' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, message: '操作失败' }, { status: 500 });
  }
}
