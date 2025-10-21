'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, Space, Alert } from 'antd';
import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';

export default function UserProfileForm({ onCancel }: { onCancel: () => void }) {
  const { user, setUser } = useAuthStore();
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log('Component mounted - Token check:', {
      hasToken: !!token,
      tokenLength: token?.length,
      userAuthenticated: !!user
    });
    
    if (!token) {
      console.warn('No token found - redirecting to login');
      setError('请先登录');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      return;
    }
  }, []);


  const onFinish = async (values: { newUsername: string; currentPassword: string }) => {
    // 清除之前的错误和成功信息
    setError(null);
    setSuccess(null);

    console.log('Current auth state:', {
      user: user,
      hasToken: !!localStorage.getItem('access_token'),
      token: localStorage.getItem('access_token')
    });

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.warn('No token found in localStorage');
      setError('请先登录');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
      return;
    }

    // 检查新用户名是否与当前用户名相同
    if (values.newUsername === user?.username) {
      setError('新用户名不能与当前用户名相同，请设置不同的用户名');
      return;
    }

    try {
      console.log('Sending profile update request...');
      const response = await api.put('/auth/profile', {
        newUsername: values.newUsername,
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
      setSuccess('用户名修改成功！');
      
      // 清空表单
      form.resetFields();
      
      // 延迟关闭，让用户看到成功提示
      setTimeout(() => {
        onCancel();
      }, 2000);
    } catch (error: any) {
      console.error('Profile update error:', error);
      setError(error.response?.data?.message || '更新失败');
    }
  };

  return (
    <div>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      {success && (
        <Alert
          message={success}
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Form
        form={form}
        initialValues={{ newUsername: user?.username }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="newUsername"
          label="新用户名"
          rules={[{ required: true, message: '请输入新用户名' }]}
        >
          <Input placeholder="请输入新用户名" />
        </Form.Item>
        <Form.Item
          name="currentPassword"
          label="当前密码"
          rules={[{ required: true, message: '请输入当前密码验证' }]}
        >
          <Input.Password placeholder="请输入当前密码验证" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button onClick={onCancel}>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}