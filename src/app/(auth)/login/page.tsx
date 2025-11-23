'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message, Alert } from 'antd';
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
      setError(null); // 清除之前的错误
      const response = await login(values.username, values.password);
      setSuccessMsg(response?.message || '登录成功');
      router.push('/homepage');
    } catch (error: any) {
      console.error('Login error:', error);
      // 从错误对象中提取详细的错误信息
      const errorMessage = error.message || error.response?.data?.message || '登录失败，请检查用户名和密码';
      setError(errorMessage);
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
            用户登录
          </Title>
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#8c8c8c',
            marginBottom: '32px'
          }}>
            欢迎回来，请登录您的账号
          </div>
          
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
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#667eea' }} />}
                placeholder="密码"
                autoComplete="current-password"
                style={{
                  borderRadius: '12px',
                  fontSize: '15px',
                  height: '48px'
                }}
              />
            </Form.Item>

            {/* 错误提示显示在密码输入框和登录按钮之间 */}
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
                登录
              </Button>
            </Form.Item>
          </Form>
          
          {successMsg && (
            <div style={{
              textAlign: 'center',
              marginBottom: '16px',
              padding: '12px',
              background: 'linear-gradient(135deg, #52c41a15 0%, #73d13d15 100%)',
              borderRadius: '12px',
              color: '#52c41a',
              fontWeight: '500'
            }}>
              {successMsg}
            </div>
          )}
          
          <div className="auth-footer" style={{
            textAlign: 'center',
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #f0f0f0'
          }}>
            <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
              还没有账号？{' '}
              <Link 
                href="/register"
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
                立即注册
              </Link>
            </Text>
          </div>
        </div>
      </Card>
  );
}