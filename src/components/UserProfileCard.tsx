'use client';

import { Card, Button, Space, Typography } from 'antd';
import { useAuthStore } from '@/store/authStore';

interface UserProfileCardProps {
  onEdit: () => void;
  onChangePassword: () => void;
}

export default function UserProfileCard({ onEdit, onChangePassword }: UserProfileCardProps) {
  const { user } = useAuthStore();

  return (
    <Card title="用户资料" style={{ width: 500, margin: '0 auto' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Text>用户ID: {user?.userId}</Typography.Text>
        <Typography.Text>用户名: {user?.username}</Typography.Text>
        <Space>
          <Button type="primary" onClick={onEdit}>编辑资料</Button>
          <Button onClick={onChangePassword}>修改密码</Button>
        </Space>
      </Space>
    </Card>
  );
}