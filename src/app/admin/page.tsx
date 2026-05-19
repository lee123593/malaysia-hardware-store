'use client';

// ============================================================
// 仪表盘 — 后台首页
// ============================================================

import { useState, useEffect } from 'react';
import StatsCard from '@/admin/components/StatsCard';
import type { DashboardStats, Order } from '@/types/admin';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/admin/api/dashboard');
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
          <p className="text-sm text-gray-400 mt-3">加载中...</p>
        </div>
      </div>
    );
  }

  const statusMap: Record<string, { label: string; className: string }> = {
    pending: { label: '待处理', className: 'bg-orange-100 text-orange-700' },
    shipped: { label: '已发货', className: 'bg-blue-100 text-blue-700' },
    completed: { label: '已完成', className: 'bg-green-100 text-green-700' },
    cancelled: { label: '已取消', className: 'bg-red-100 text-red-700' },
  };

  const regionMap: Record<string, string> = { wm: '西马', em: '东马' };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="text-sm text-gray-500 mt-1">欢迎回来，这是您的店铺数据概览</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard
          title="商品总数"
          value={stats?.totalProducts ?? 0}
          subtitle={`上架中: ${stats?.activeProducts ?? 0}`}
          color="blue"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>}
        />
        <StatsCard
          title="手机型号"
          value={stats?.totalModels ?? 0}
          subtitle="覆盖8大品牌"
          color="green"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>}
        />
        <StatsCard
          title="订单总数"
          value={stats?.totalOrders ?? 0}
          subtitle={`待处理: ${stats?.pendingOrders ?? 0}`}
          color="orange"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
        />
        <StatsCard
          title="营业额(RM)"
          value={stats?.totalRevenue?.toFixed(2) ?? '0.00'}
          subtitle={`已发货: ${stats?.shippedOrders ?? 0} 单`}
          color="red"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
        />
      </div>

      {/* 最近订单 */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">最近订单</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">订单号</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">客户</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">地区</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">金额</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">状态</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats?.recentOrders?.map((order: Order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-all">
                  <td className="px-4 py-3 text-sm font-mono text-[#002FA7]">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{order.customerName}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{regionMap[order.region] ?? order.region}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">RM {order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[order.status]?.className ?? ''}`}>
                      {statusMap[order.status]?.label ?? order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('zh-CN')}
                  </td>
                </tr>
              ))}
              {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">暂无订单</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
