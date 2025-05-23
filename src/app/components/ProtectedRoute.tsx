'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const LoadingText = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  text-align: center;
`;

const ErrorText = styled.div`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Debug logging
  console.log('ProtectedRoute - Component Mounted');
  console.log('ProtectedRoute - User:', !!user);
  console.log('ProtectedRoute - Loading:', loading);
  console.log('ProtectedRoute - Error:', error);
  console.log('ProtectedRoute - Pathname:', pathname);

  useEffect(() => {
    console.log('ProtectedRoute - useEffect triggered');
    console.log('ProtectedRoute - Current user state:', !!user);
    console.log('ProtectedRoute - Current loading state:', loading);

    if (!loading && !user) {
      console.log('ProtectedRoute - Redirecting to login');
      const returnUrl = encodeURIComponent(pathname);
      console.log('ProtectedRoute - Return URL:', returnUrl);
      router.replace(`/login?from=${returnUrl}`);
    }
  }, [user, loading, router, pathname]);

  // Show loading state while checking authentication
  if (loading) {
    console.log('ProtectedRoute - Showing loading state');
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  // Show error state if there's an authentication error
  if (error) {
    console.log('ProtectedRoute - Showing error state:', error);
    return (
      <ErrorContainer>
        <ErrorText>Authentication Error: {error}</ErrorText>
        <RetryButton onClick={() => window.location.reload()}>Retry</RetryButton>
      </ErrorContainer>
    );
  }

  // Don't render anything while redirecting
  if (!user) {
    console.log('ProtectedRoute - No user, not rendering');
    return null;
  }

  // User is authenticated, render the protected content
  console.log('ProtectedRoute - Rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
