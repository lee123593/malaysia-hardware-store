'use client';

// ============================================================
// 通用数据表格组件
// ============================================================

interface Column<T> {
  key: string;
  title: string;
  width?: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  keyField?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading,
  emptyText = '暂无数据',
  onRowClick,
  keyField = 'id',
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-12 text-center">
          <div className="inline-block w-8 h-8 border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
          <p className="text-sm text-gray-400 mt-3">加载中...</p>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
            </svg>
          </div>
          <p className="text-sm text-gray-400">{emptyText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, idx) => (
              <tr
                key={String(row[keyField] ?? idx)}
                onClick={() => onRowClick?.(row)}
                className={`transition-all duration-150 ${
                  onRowClick ? 'cursor-pointer hover:bg-gray-50/80' : ''
                }`}
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3.5 text-sm text-gray-700">
                    {col.render ? col.render(row, idx) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          共 {data.length} 条数据
        </div>
      )}
    </div>
  );
}
