'use client';

import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { LoginButtons } from '../components/auth/LoginButtons';
import { useRouter } from 'next/navigation';

// This tells Next.js that this page should be dynamically rendered
export const dynamic = 'force-dynamic';

// This tells Next.js that this page should not be cached
export const revalidate = 0;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

const LoginCard = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  background: ${props => props.theme.colors.errorBackground};
  padding: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: 1rem;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

export default function LoginPage() {
  const { error } = useAuth();
  const router = useRouter();

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome Back</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <LoginButtons />
      </LoginCard>
    </LoginContainer>
  );
}
