'use client';

// ============================================================
// 订单管理 — 查看、搜索、筛选、状态变更
// ============================================================

import { useState, useEffect } from 'react';
import AdminHeader from '@/admin/components/AdminHeader';
import Modal from '@/admin/components/Modal';
import ConfirmDialog from '@/admin/components/ConfirmDialog';
import type { Order, OrderStatus } from '@/types/admin';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // 详情弹窗
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  // 删除确认
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);

  useEffect(() => { fetchOrders(); }, [statusFilter, search]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search) params.set('search', search);
      const res = await fetch(`/admin/api/orders?${params.toString()}`);
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    const res = await fetch('/admin/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateStatus', orderId, status }),
    });
    const data = await res.json();
    if (data.success) {
      setOrders(data.data);
      // 更新详情弹窗
      if (detailOrder?.id === orderId) {
        const updated = data.data.find((o: Order) => o.id === orderId);
        if (updated) setDetailOrder(updated);
      }
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await fetch('/admin/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', orderId: deleteTarget.id }),
    });
    const data = await res.json();
    if (data.success) setOrders(data.data);
    setDeleteTarget(null);
  };

  const statusMap: Record<string, { label: string; className: string }> = {
    pending: { label: '待处理', className: 'bg-orange-100 text-orange-700' },
    shipped: { label: '已发货', className: 'bg-blue-100 text-blue-700' },
    completed: { label: '已完成', className: 'bg-green-100 text-green-700' },
    cancelled: { label: '已取消', className: 'bg-red-100 text-red-700' },
  };

  const regionMap: Record<string, string> = { wm: '西马', em: '东马' };

  const statusOptions: { value: string; label: string }[] = [
    { value: 'all', label: '全部状态' },
    { value: 'pending', label: '待处理' },
    { value: 'shipped', label: '已发货' },
    { value: 'completed', label: '已完成' },
    { value: 'cancelled', label: '已取消' },
  ];

  return (
    <div>
      <AdminHeader title="订单管理" description="查看和管理所有用户订单" />

      {/* 筛选栏 */}
      <div className="flex gap-3 mb-4">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
        >
          {statusOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="搜索订单号、客户名、电话..."
          className="flex-1 max-w-md px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002FA7]/20 focus:border-[#002FA7]"
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <div className="w-8 h-8 mx-auto border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">订单号</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">客户</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">联系电话</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">地区</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">金额</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">状态</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">日期</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-all">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDetailOrder(order)}
                        className="text-sm font-mono text-[#002FA7] hover:underline"
                      >
                        {order.id}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{order.customerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{order.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{regionMap[order.region] ?? order.region}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">RM {order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[order.status]?.className}`}>
                        {statusMap[order.status]?.label ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(order.id, 'shipped')}
                            className="px-2 py-1 text-[11px] font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-all"
                          >
                            发货
                          </button>
                        )}
                        {order.status === 'shipped' && (
                          <button
                            onClick={() => updateStatus(order.id, 'completed')}
                            className="px-2 py-1 text-[11px] font-medium text-green-600 bg-green-50 rounded hover:bg-green-100 transition-all"
                          >
                            完成
                          </button>
                        )}
                        {(order.status === 'pending' || order.status === 'shipped') && (
                          <button
                            onClick={() => updateStatus(order.id, 'cancelled')}
                            className="px-2 py-1 text-[11px] font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 transition-all"
                          >
                            取消
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteTarget(order)}
                          className="px-2 py-1 text-[11px] font-medium text-gray-500 bg-gray-100 rounded hover:bg-gray-200 transition-all"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">暂无订单</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
            共 {orders.length} 条订单
          </div>
        </div>
      )}

      {/* 订单详情弹窗 */}
      <Modal isOpen={!!detailOrder} onClose={() => setDetailOrder(null)} title="订单详情" maxWidth="max-w-2xl">
        {detailOrder && (
          <div className="space-y-5">
            {/* 订单信息 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-gray-400">订单号</span>
                <p className="text-sm font-mono font-semibold text-gray-900">{detailOrder.id}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">下单时间</span>
                <p className="text-sm text-gray-700">{new Date(detailOrder.createdAt).toLocaleString('zh-CN')}</p>
              </div>
              <div>
                <span className="text-xs text-gray-400">状态</span>
                <p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[detailOrder.status]?.className}`}>
                    {statusMap[detailOrder.status]?.label}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400">配送地区</span>
                <p className="text-sm text-gray-700">{regionMap[detailOrder.region] ?? detailOrder.region}</p>
              </div>
            </div>

            {/* 客户信息 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">收货信息</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-400">姓名：</span>{detailOrder.customerName}</div>
                <div><span className="text-gray-400">电话：</span>{detailOrder.phone}</div>
                <div><span className="text-gray-400">邮箱：</span>{detailOrder.email || '-'}</div>
                <div className="col-span-2"><span className="text-gray-400">地址：</span>{detailOrder.address}</div>
                {detailOrder.notes && (
                  <div className="col-span-2"><span className="text-gray-400">备注：</span>{detailOrder.notes}</div>
                )}
              </div>
            </div>

            {/* 商品明细 */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">商品明细</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400">
                    <th className="text-left py-2">商品</th>
                    <th className="text-right py-2">单价</th>
                    <th className="text-center py-2">数量</th>
                    <th className="text-right py-2">小计</th>
                  </tr>
                </thead>
                <tbody>
                  {detailOrder.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-2 text-gray-700">{item.name}</td>
                      <td className="py-2 text-right text-gray-500">RM {item.price.toFixed(2)}</td>
                      <td className="py-2 text-center text-gray-700">{item.quantity}</td>
                      <td className="py-2 text-right text-gray-900 font-medium">RM {(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 space-y-1 text-sm text-right">
                <p className="text-gray-500">小计：RM {detailOrder.subtotal.toFixed(2)}</p>
                <p className="text-gray-500">运费：RM {detailOrder.shipping.toFixed(2)}</p>
                <p className="text-lg font-bold text-gray-900">总计：RM {detailOrder.total.toFixed(2)}</p>
              </div>
            </div>

            {/* 状态操作 */}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              {detailOrder.status === 'pending' && (
                <button onClick={() => updateStatus(detailOrder.id, 'shipped')} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">标记已发货</button>
              )}
              {detailOrder.status === 'shipped' && (
                <button onClick={() => updateStatus(detailOrder.id, 'completed')} className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all">标记已完成</button>
              )}
              {(detailOrder.status === 'pending' || detailOrder.status === 'shipped') && (
                <button onClick={() => updateStatus(detailOrder.id, 'cancelled')} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all">取消订单</button>
              )}
              <button onClick={() => setDetailOrder(null)} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all ml-auto">关闭</button>
            </div>
          </div>
        )}
      </Modal>

      {/* 删除确认 */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="确认删除"
        message={deleteTarget ? `确定要删除订单「${deleteTarget.id}」吗？此操作不可撤销。` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
