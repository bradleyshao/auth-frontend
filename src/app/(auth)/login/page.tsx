'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated, loading, setLoading } = useAuthStore();

  useEffect(() => {
    // 确保组件挂载时loading状态为false
    setLoading(false);
  }, [setLoading]);

  // 如果已经登录，重定向到主页
  if (isAuthenticated) {
    router.push('/homepage');
    return null;
  }

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      setSubmitting(true);
      await login(values.username, values.password);
      // 登录成功后重定向到主页
      router.push('/homepage');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={2} className="auth-title">
          用户登录
        </Title>
        <Divider />
        <Form
          form={form}
          name="login"
          className="auth-form"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={submitting || loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        
        <div className="auth-footer">
          <Text>
            还没有账号？ <Link href="/register">立即注册</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}