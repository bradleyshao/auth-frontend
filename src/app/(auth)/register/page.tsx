'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [form] = Form.useForm();
  const { register, isAuthenticated, loading } = useAuthStore();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 如果已经登录，重定向到主页
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/homepage');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async (values: { username: string; password: string; confirm: string }) => {
    try {
      setSubmitting(true);
      await register(values.username, values.password);
      // 注册成功后重定向到主页
      router.push('/homepage');
    } catch (error: any) {
      console.error('Register error:', error);
      setError(error.response?.data?.message || '注册失败，请稍后再试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <Card className="auth-card w-[400px] bg-white/90">
        <Title level={2} className="auth-title">
          用户注册
        </Title>
        <Divider />
        <Form
          form={form}
          name="register"
          className="auth-form"
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { min: 3, message: '用户名至少3个字符!' },
              { max: 20, message: '用户名最多20个字符!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码至少6个字符!' }
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '请确认密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={submitting || loading}
            >
              注册
            </Button>
          </Form.Item>
        </Form>

        {error && (
          <div className="text-red-500 mb-4 text-center">
            {error}
          </div>
        )}
        
        <div className="auth-footer">
          <Text>
            已有账号？ <Link href="/login">立即登录</Link>
          </Text>
        </div>
      </Card>
  );
}