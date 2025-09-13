'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

// 这个组件用于在客户端初始化zustand状态
export function AuthInitializer() {
  const { loading } = useAuthStore();

  useEffect(() => {
    // 这里不需要做任何事情，因为zustand的persist中间件会自动从localStorage加载状态
    // 这个组件主要是为了确保zustand在客户端正确初始化
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthInitializer />
      {children}
    </>
  );
}