'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert } from 'antd';
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
      <Card 
        style={{
          width: '420px',
          maxWidth: '100%',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          border: 'none',
          background: 'white',
          overflow: 'hidden',
          position: 'relative'
        }}
        bodyStyle={{
          padding: '40px'
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
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Title 
            level={2} 
            style={{
              textAlign: 'center',
              marginBottom: '8px',
              fontSize: '28px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            用户注册
          </Title>
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#8c8c8c',
            marginBottom: '32px'
          }}>
            创建新账号，开始您的旅程
          </div>
          
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
                prefix={<UserOutlined style={{ color: '#667eea' }} />} 
                placeholder="用户名" 
                autoComplete="username"
                style={{
                  borderRadius: '12px',
                  fontSize: '15px',
                  height: '48px'
                }}
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
                prefix={<LockOutlined style={{ color: '#667eea' }} />}
                placeholder="密码"
                autoComplete="new-password"
                style={{
                  borderRadius: '12px',
                  fontSize: '15px',
                  height: '48px'
                }}
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
                prefix={<LockOutlined style={{ color: '#667eea' }} />}
                placeholder="确认密码"
                autoComplete="new-password"
                style={{
                  borderRadius: '12px',
                  fontSize: '15px',
                  height: '48px'
                }}
              />
            </Form.Item>

            {/* 错误提示显示在确认密码输入框和注册按钮之间 */}
            {error && (
              <Form.Item>
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  closable
                  onClose={() => setError(null)}
                  style={{
                    borderRadius: '12px',
                    marginBottom: '8px'
                  }}
                />
              </Form.Item>
            )}

            <Form.Item style={{ marginBottom: '24px', marginTop: '8px' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={submitting || loading}
                style={{
                  height: '48px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
          
          <div className="auth-footer" style={{
            textAlign: 'center',
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
              已有账号？{' '}
              <Link 
                href="/login"
                style={{
                  color: '#667eea',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#764ba2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#667eea';
                }}
              >
                立即登录
              </Link>
            </Text>
          </div>
        </div>
      </Card>
  );
}