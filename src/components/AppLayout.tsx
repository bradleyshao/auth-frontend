'use client';

import { Layout, Menu } from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined,
  FileOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const { Sider, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
  selectedKey?: string;
}

export default function AppLayout({ children, selectedKey = '1' }: AppLayoutProps) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  // 处理根路径重定向
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/') {
      if (isAuthenticated) {
        router.replace('/homepage');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, router]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: '100%', borderRight: 0, paddingTop: 24}}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: '仪表盘',
              onClick: () => router.push('/homepage'),
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: '个人资料',
              onClick: () => router.push('/profile'),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: '24px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
