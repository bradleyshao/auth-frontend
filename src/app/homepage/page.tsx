'use client';

import { useEffect } from 'react';
import { Typography, Card } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import TopNavBar from '@/components/TopNavBar';

const { Title } = Typography;

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // 如果未登录，重定向到登录页
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <TopNavBar />
      <div className="container mx-auto p-4 mt-20">
        <Card className="w-full shadow-md">
          <Title level={1} className="text-center">HOMEPAGE</Title>
        </Card>
      </div>
    </>
  );
}