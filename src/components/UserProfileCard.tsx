'use client';

import { Card, Button, Space, Typography } from 'antd';
import { useAuthStore } from '@/store/authStore';
import { UserOutlined, EditOutlined, LockOutlined } from '@ant-design/icons';

interface UserProfileCardProps {
  onEdit: () => void;
  onChangePassword: () => void;
}

export default function UserProfileCard({ onEdit, onChangePassword }: UserProfileCardProps) {
  const { user } = useAuthStore();

  return (
    <Card 
      style={{ 
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: 'none',
        overflow: 'hidden',
        position: 'relative',
        background: 'white'
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
        {/* 用户头像区域 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
          }}>
            <UserOutlined style={{ fontSize: '40px', color: 'white' }} />
          </div>
        </div>

        {/* 用户信息 */}
        <Space direction="vertical" size="large" style={{ width: '100%', marginBottom: '32px' }}>
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #f8f9fa 100%)',
            borderRadius: '12px',
            border: '1px solid #f0f0f0'
          }}>
            <Typography.Text style={{ 
              fontSize: '12px', 
              color: '#8c8c8c',
              display: 'block',
              marginBottom: '4px'
            }}>
              用户ID
            </Typography.Text>
            <Typography.Text style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              {user?.userId}
            </Typography.Text>
          </div>
          
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #f8f9fa 100%)',
            borderRadius: '12px',
            border: '1px solid #f0f0f0'
          }}>
            <Typography.Text style={{ 
              fontSize: '12px', 
              color: '#8c8c8c',
              display: 'block',
              marginBottom: '4px'
            }}>
              用户名
            </Typography.Text>
            <Typography.Text style={{ 
              fontSize: '16px', 
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              {user?.username}
            </Typography.Text>
          </div>
        </Space>

        {/* 操作按钮 */}
        <Space size="middle" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            onClick={onEdit}
            icon={<EditOutlined />}
            style={{
              flex: 1,
              height: '48px',
              borderRadius: '12px',
              fontSize: '15px',
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
            编辑资料
          </Button>
          <Button 
            onClick={onChangePassword}
            icon={<LockOutlined />}
            style={{
              flex: 1,
              height: '48px',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              border: '1px solid #d9d9d9',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.color = '#667eea';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#d9d9d9';
              e.currentTarget.style.color = 'inherit';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            修改密码
          </Button>
        </Space>
      </div>
    </Card>
  );
}