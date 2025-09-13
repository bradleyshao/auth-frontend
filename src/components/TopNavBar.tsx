'use client';

import { Button } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function TopNavBar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center space-x-6">
          <div className="text-xl font-bold">系统名称</div>
          <div className="text-white">欢迎, {user?.username}</div>
        </div>
        <div>
          <Button 
            type="text" 
            className="text-white hover:bg-blue-700"
            onClick={handleLogout}
          >
            退出
          </Button>
        </div>
      </div>
    </div>
  );
}