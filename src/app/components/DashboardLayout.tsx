'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import styled from 'styled-components';

const Logo = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
`;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                  <Logo>Frontendly</Logo>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/practice"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Practice
                </Link>
                <Link
                  href="/profile"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => router.push('/profile')}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {user.email}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 