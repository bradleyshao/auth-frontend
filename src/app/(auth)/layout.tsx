'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/homepage');
    }
  }, [isAuthenticated, router]);

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      {/* 移动的紫色背景元素 */}
      <div className="floating-blob floating-blob-1"></div>
      <div className="floating-blob floating-blob-2"></div>
      <div className="floating-blob floating-blob-3"></div>
      <div className="floating-blob floating-blob-4"></div>
      <div className="floating-blob floating-blob-5"></div>
      
      {/* 内容层，确保在背景元素之上 */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}