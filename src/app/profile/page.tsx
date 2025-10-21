'use client';

import { useState } from 'react';
import { Layout } from 'antd';
import UserProfileCard from '@/components/UserProfileCard';
import UserProfileForm from '@/components/UserProfileForm';
import PasswordUpdateForm from '@/components/PasswordUpdateForm';
import { Card } from 'antd';
import HomeLayout from '../homepage/layout';

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  return (
    <HomeLayout>
      <Layout.Content style={{ padding: '24px' }}>
        <div className="pt-16 px-4">
          {!editMode && !passwordMode && (
            <UserProfileCard 
              onEdit={() => setEditMode(true)}
              onChangePassword={() => setPasswordMode(true)}
            />
          )}
          {editMode && (
            <Card title="编辑资料" style={{ margin: '0 auto', maxWidth: '100%' }}>
              <UserProfileForm onCancel={() => setEditMode(false)} />
            </Card>
          )}
          {passwordMode && (
            <Card title="修改密码" style={{ margin: '0 auto', maxWidth: '100%' }}>
              <PasswordUpdateForm onCancel={() => setPasswordMode(false)} />
            </Card>
          )}
        </div>
      </Layout.Content>
    </HomeLayout>
  );
}