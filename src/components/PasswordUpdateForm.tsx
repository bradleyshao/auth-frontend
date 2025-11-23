'use client';

import { useState } from 'react';
import { Form, Input, Button, Space, Alert } from 'antd';
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';

export default function PasswordUpdateForm({ onCancel }: { onCancel: () => void }) {
  const [form] = Form.useForm();
  const { user, setUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onFinish = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    // 清除之前的错误和成功信息
    setError(null);
    setSuccess(null);

    if (values.newPassword !== values.confirmPassword) {
      setError('两次输入的新密码不一致');
      return;
    }

    // 检查新密码是否与当前密码相同
    if (values.newPassword === values.currentPassword) {
      setError('新密码不能与当前密码相同，请设置不同的密码');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('请先登录');
      return;
    }

    try {
      const response = await api.put('/auth/profile', {
        newPassword: values.newPassword,
        currentPassword: values.currentPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // 更新本地存储的token
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
      
      // 更新用户状态
      if (response.data.user) {
        setUser(response.data.user);
      }
      
      // 显示成功信息
      setSuccess('密码修改成功！请使用新密码登录');
      
      // 清空表单
      form.resetFields();
      
      // 延迟关闭，让用户看到成功提示
      setTimeout(() => {
        onCancel();
      }, 2000);
    } catch (error: any) {
      console.error('Password update error:', error);
      setError(error.response?.data?.message || '密码修改失败');
    }
  };

  return (
    <div>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          style={{ 
            marginBottom: 20,
            borderRadius: '12px'
          }}
        />
      )}
      {success && (
        <Alert
          message={success}
          type="success"
          showIcon
          style={{ 
            marginBottom: 20,
            borderRadius: '12px'
          }}
        />
      )}
      <Form 
        form={form} 
        onFinish={onFinish} 
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="currentPassword"
          label={<span style={{ fontWeight: '600', color: '#1a1a1a' }}>当前密码</span>}
          rules={[{ required: true, message: '请输入当前密码' }]}
        >
          <Input.Password 
            placeholder="请输入当前密码"
            style={{
              borderRadius: '12px',
              padding: '10px 12px',
              fontSize: '15px'
            }}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={<span style={{ fontWeight: '600', color: '#1a1a1a' }}>新密码</span>}
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码长度至少6位' },
            { max: 50, message: '密码长度不能超过50位' }
          ]}
        >
          <Input.Password 
            placeholder="请输入新密码（至少6位）"
            style={{
              borderRadius: '12px',
              padding: '10px 12px',
              fontSize: '15px'
            }}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={<span style={{ fontWeight: '600', color: '#1a1a1a' }}>确认新密码</span>}
          rules={[{ required: true, message: '请再次输入新密码' }]}
        >
          <Input.Password 
            placeholder="请再次输入新密码"
            style={{
              borderRadius: '12px',
              padding: '10px 12px',
              fontSize: '15px'
            }}
          />
        </Form.Item>
        <Form.Item style={{ marginTop: '24px', marginBottom: 0 }}>
          <Space size="middle">
            <Button 
              type="primary" 
              htmlType="submit"
              style={{
                height: '48px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                padding: '0 32px',
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
              保存
            </Button>
            <Button 
              onClick={onCancel}
              style={{
                height: '48px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '600',
                padding: '0 32px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.color = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d9d9d9';
                e.currentTarget.style.color = 'inherit';
              }}
            >
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}