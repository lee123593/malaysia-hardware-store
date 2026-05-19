// ============================================================
// 全局工具函数
// ============================================================

// 类名合并 (供组件拼接 className 使用)
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// 格式化 MYR 价格
export function formatMYR(amount: number): string {
  return `RM ${amount.toFixed(2)}`;
}

// 生成唯一 ID (简版，供前端临时使用)
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// 防抖
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
