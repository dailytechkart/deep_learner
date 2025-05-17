'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';
import {
  AuthContainer,
  AuthCard,
  AuthTitle,
  SocialButtonGroup,
  SocialButton,
  Divider,
  DividerText,
  ErrorMessage
} from '../components/StyledComponents';

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      await signInWithGithub();
      router.push('/dashboard');
    } catch (err) {
      console.error('GitHub sign-in error:', err);
      setError(err instanceof Error ? err.message : 'Failed to sign in with GitHub');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthTitle>Welcome Back</AuthTitle>
        <SocialButtonGroup>
          <SocialButton
            provider="google"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <Image
              src="/google-icon.svg"
              alt="Google"
              width={24}
              height={24}
            />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </SocialButton>
          <SocialButton
            provider="github"
            onClick={handleGithubSignIn}
            disabled={loading}
          >
            <Image
              src="/github-icon.svg"
              alt="GitHub"
              width={24}
              height={24}
            />
            {loading ? 'Signing in...' : 'Continue with GitHub'}
          </SocialButton>
        </SocialButtonGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </AuthCard>
    </AuthContainer>
  );
} 