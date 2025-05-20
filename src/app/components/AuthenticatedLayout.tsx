'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from './Header';
import { PageContainer } from './StyledComponents';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return null; // or a loading spinner
  }

  if (!user) {
    return null;
  }

  return (
    <PageContainer>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {children}
    </PageContainer>
  );
}
