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
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="currentPassword"
          label="当前密码"
          rules={[{ required: true, message: '请输入当前密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码长度至少6位' },
            { max: 50, message: '密码长度不能超过50位' }
          ]}
        >
          <Input.Password placeholder="请输入新密码（至少6位）" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认新密码"
          rules={[{ required: true, message: '请再次输入新密码' }]}
        >
          <Input.Password />
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