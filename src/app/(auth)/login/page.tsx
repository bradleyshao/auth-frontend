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
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated, loading, setLoading } = useAuthStore();

  useEffect(() => {
    // 确保组件挂载时loading状态为false
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/homepage');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      setSubmitting(true);
      const response = await login(values.username, values.password);
      setSuccessMsg(response?.message || '登录成功');
      router.push('/homepage');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || '登录失败，请检查用户名和密码');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <Card className="auth-card w-[400px] bg-white/90">
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
        
        {(successMsg || error) && (
          <div className={`text-center mb-4 ${successMsg ? 'text-green-500' : 'text-red-500'}`}>
            {successMsg || error}
          </div>
        )}
        <div className="auth-footer">
          <Text>
            还没有账号？ <Link href="/register">立即注册</Link>
          </Text>
        </div>
      </Card>
  );
}