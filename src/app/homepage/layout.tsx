'use client';

import AppLayout from '@/components/AppLayout';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout selectedKey="1">
      {children}
    </AppLayout>
  );
}