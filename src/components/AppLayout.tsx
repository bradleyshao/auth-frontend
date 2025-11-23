'use client';

import { Layout, Menu, Button } from 'antd';
import { 
  UserOutlined, 
  DashboardOutlined,
  FileOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useAuthStore } from '@/store/authStore';
import type { MenuProps } from 'antd';

const { Sider, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
  selectedKey?: string;
}

export default function AppLayout({ children, selectedKey }: AppLayoutProps) {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

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

  // 根据当前路径自动确定选中的菜单项
  const activeKey = useMemo(() => {
    // 如果传入了 selectedKey，优先使用
    if (selectedKey) {
      return selectedKey;
    }
    
    // 根据路径自动判断
    if (pathname?.startsWith('/homepage') || 
        pathname === '/' || 
        pathname?.startsWith('/card')) {
      return '1';
    }
    if (pathname?.startsWith('/profile')) {
      return '2';
    }
    
    // 默认选中仪表盘
    return '1';
  }, [pathname, selectedKey]);

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <DashboardOutlined style={{ fontSize: '18px' }} />,
      label: '仪表盘',
      onClick: () => router.push('/homepage'),
    },
    {
      key: '2',
      icon: <UserOutlined style={{ fontSize: '18px' }} />,
      label: '个人资料',
      onClick: () => router.push('/profile'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Sider 
        width={240} 
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.06)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* 装饰性背景元素 */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, #667eea15 0%, #764ba205 100%)',
          borderRadius: '0 0 0 100px',
          pointerEvents: 'none'
        }} />
        
        {/* Logo/标题区域 */}
        <div style={{
          padding: '32px 24px 24px 24px',
          borderBottom: '1px solid #f0f0f0',
          marginBottom: '8px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '4px'
          }}>
            控制台
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8c8c8c',
            fontWeight: '400'
          }}>
            Dashboard
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 140px)',
          position: 'relative',
          zIndex: 1
        }}>
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            style={{ 
              flex: 1,
              borderRight: 0, 
              background: 'transparent',
              padding: '8px 12px',
            }}
            items={menuItems}
            className="modern-sidebar-menu"
          />
          
          {/* 登出按钮 */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid #f0f0f0',
            marginTop: 'auto'
          }}>
            <Button
              type="text"
              danger
              icon={<LogoutOutlined style={{ fontSize: '18px' }} />}
              onClick={() => {
                logout();
                router.push('/login');
              }}
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                color: '#ff4d4f',
                border: '1px solid #ffccc7'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff2f0';
                e.currentTarget.style.borderColor = '#ff4d4f';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#ffccc7';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              退出登录
            </Button>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content style={{ padding: '24px', background: 'transparent' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
