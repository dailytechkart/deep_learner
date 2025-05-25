'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { LoginContainer, AuthContainer, AuthCard, AuthTitle } from './components/styles';
import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';

export default function LoginClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    user,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    loading,
    error: authError,
  } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [returnTo, setReturnTo] = useState('/dashboard');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setIsMounted(true);
    const from = searchParams?.get('from');
    if (from) {
      setReturnTo(from);
    }
  }, [searchParams]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (user && isMounted && !loading) {
      timeout = setTimeout(() => {
        router.push(returnTo);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [user, router, returnTo, isMounted, loading]);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setError('');
      setIsLoading(true);
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
    } catch (err: any) {
      console.error(`${provider} login error:`, err);
      setError(err.message || `Failed to login with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setIsLoading(true);
      await signIn(formData.email, formData.password);
    } catch (err: any) {
      console.error('Email login error:', err);
      setError(err.message || 'Failed to login with email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked');
  };

  if (!isMounted || loading) {
    return (
      <AuthContainer>
        <AuthCard>
          <AuthTitle>Loading...</AuthTitle>
        </AuthCard>
      </AuthContainer>
    );
  }

  if (user) {
    return (
      <AuthContainer>
        <AuthCard>
          <AuthTitle>Redirecting...</AuthTitle>
        </AuthCard>
      </AuthContainer>
    );
  }

  return (
    <LoginContainer>
      <LeftSection />
      <RightSection
        isLoading={isLoading}
        error={error || authError || ''}
        onGoogleLogin={() => handleSocialLogin('google')}
        onGithubLogin={() => handleSocialLogin('github')}
        onEmailLogin={handleEmailLogin}
        onForgotPassword={handleForgotPassword}
      />
    </LoginContainer>
  );
}
