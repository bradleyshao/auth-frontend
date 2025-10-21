'use client';

import { useAuthStore } from '@/store/authStore';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button, Card, Typography, Avatar, Space, Divider } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function HomePage() {
  const { user, logout } = useAuthStore();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar size={64} icon={<UserOutlined />} className="bg-blue-500" />
                <div className="ml-4">
                  <Title level={3} className="m-0">
                    欢迎回来，{user?.username}
                  </Title>
                  <Text type="secondary">用户ID: {user?.userId}</Text>
                </div>
              </div>
              <Button 
                type="primary" 
                danger 
                icon={<LogoutOutlined />} 
                onClick={logout}
                size="large"
              >
                退出登录
              </Button>
            </div>

            <Divider />

            <Title level={4}>登录成功</Title>
            <Paragraph>
              您已成功登录系统。这是一个受保护的页面，只有登录后才能访问。
            </Paragraph>
            
            <Paragraph>
              您的登录凭证已保存在浏览器的本地存储中，关闭浏览器后仍然有效。
              如果需要退出登录，请点击右上角的"退出登录"按钮。
            </Paragraph>

            <Divider />

            <Title level={4}>JWT认证说明</Title>
            <Paragraph>
              本系统使用JWT(JSON Web Token)进行认证。JWT是一种基于JSON的开放标准，
              用于在各方之间安全地传输信息。当您登录成功后，服务器会生成一个JWT令牌，
              并返回给前端。前端将这个令牌保存在本地存储中，并在后续的请求中通过
              Authorization头部发送给服务器，以证明您的身份。
            </Paragraph>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}