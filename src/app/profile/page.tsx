'use client';

import { useState } from 'react';
import { Layout } from 'antd';
import UserProfileCard from '@/components/UserProfileCard';
import UserProfileForm from '@/components/UserProfileForm';
import PasswordUpdateForm from '@/components/PasswordUpdateForm';
import { Card, Typography } from 'antd';
import HomeLayout from '../homepage/layout';

const { Title } = Typography;

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  return (
    <HomeLayout>
      <Layout.Content style={{ padding: '24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          padding: '40px 32px',
          minHeight: 'calc(100vh - 48px)',
          borderRadius: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* 移动的紫色背景元素 */}
          <div className="floating-blob floating-blob-1" style={{ top: '5%', left: '5%' }}></div>
          <div className="floating-blob floating-blob-2" style={{ top: '55%', right: '10%' }}></div>
          <div className="floating-blob floating-blob-3" style={{ bottom: '15%', left: '15%' }}></div>
          <div className="floating-blob floating-blob-4" style={{ top: '25%', right: '25%' }}></div>
          <div className="floating-blob floating-blob-5" style={{ bottom: '5%', right: '5%' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
          {!editMode && !passwordMode && (
            <div>
              <Title 
                level={2}
                style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  margin: '0 0 32px 0',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                个人资料
              </Title>
              <UserProfileCard 
                onEdit={() => setEditMode(true)}
                onChangePassword={() => setPasswordMode(true)}
              />
            </div>
          )}
          {editMode && (
            <Card 
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: 'none',
                overflow: 'hidden',
                position: 'relative'
              }}
              bodyStyle={{
                padding: '40px'
              }}
            >
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
                  level={3}
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  编辑资料
                </Title>
                <UserProfileForm onCancel={() => setEditMode(false)} />
              </div>
            </Card>
          )}
          {passwordMode && (
            <Card 
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: 'none',
                overflow: 'hidden',
                position: 'relative'
              }}
              bodyStyle={{
                padding: '40px'
              }}
            >
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
                  level={3}
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  修改密码
                </Title>
                <PasswordUpdateForm onCancel={() => setPasswordMode(false)} />
              </div>
            </Card>
          )}
          </div>
        </div>
      </Layout.Content>
    </HomeLayout>
  );
}