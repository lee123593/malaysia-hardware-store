'use client';

// ============================================================
// 后台通用布局 — 带侧边栏和权限守卫
// ============================================================

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/admin/components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // 白名单：不需要登录的页面
  const publicPaths = ['/admin/login'];
  const isPublic = pathname ? publicPaths.includes(pathname) : false;

  useEffect(() => {
    if (isPublic) {
      setAuthorized(true);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('admin_token');
    if (!token || token.length < 10) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  }, [isPublic, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
          <p className="text-sm text-gray-400 mt-3">验证权限中...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  // 登录页面不用侧边栏布局
  if (isPublic) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-60 min-h-screen">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
