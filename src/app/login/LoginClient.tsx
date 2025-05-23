'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  AuthContainer,
  AuthCard,
  AuthTitle,
  AuthForm,
  ErrorMessage,
  SocialButtonGroup,
  SocialButton,
} from '../components/StyledComponents';

// Testimonial data
const testimonials = [
  {
    quote: "FrontendPro Academy transformed my career. The hands-on projects and mentorship were invaluable.",
    author: "Sarah Johnson",
    role: "Senior Frontend Developer",
    company: "TechCorp"
  },
  {
    quote: "The structured learning path and real-world projects helped me land my dream job in just 6 months.",
    author: "Michael Chen",
    role: "Frontend Engineer",
    company: "InnovateX"
  },
  {
    quote: "Best investment in my career. The community and support are unmatched.",
    author: "Emma Rodriguez",
    role: "UI/UX Developer",
    company: "DesignHub"
  }
];

export default function LoginClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, signInWithGoogle, signInWithGithub, loading } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Debug user state
  useEffect(() => {
    if (user && isMounted) {
      console.log('User state:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      });
    }
  }, [user, isMounted]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (user && isMounted && !loading) {
      const returnTo = searchParams.get('from') || '/dashboard';
      console.log('Redirecting to:', returnTo);

      // Debounce the redirect slightly
      timeout = setTimeout(() => {
        router.push(returnTo);
      }, 300); // 300ms debounce
    }

    return () => clearTimeout(timeout);
  }, [user, router, searchParams, isMounted, loading]);

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setError('');
      setIsLoading(true);

      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(`Failed to login with ${provider}. Please try again.`);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // If not mounted yet or still loading auth state, show loading state
  if (!isMounted || loading) {
    return (
      <AuthContainer>
        <AuthCard>
          <AuthTitle>Loading...</AuthTitle>
        </AuthCard>
      </AuthContainer>
    );
  }

  // If user is already logged in, show loading state
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
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Left side - Testimonials */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        color: 'white',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '2rem',
            fontWeight: 'bold'
          }}>
            Join thousands of successful developers
          </h1>
          <div style={{
            position: 'relative',
            minHeight: '200px'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: currentTestimonial === index ? 1 : 0,
                  transform: `translateY(${currentTestimonial === index ? '0' : '20px'})`,
                  transition: 'all 0.5s ease-in-out',
                }}
              >
                <p style={{
                  fontSize: '1.5rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {testimonial.author}
                  </p>
                  <p style={{ opacity: 0.8 }}>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Login */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#1f2937'
          }}>
            Welcome to FrontendPro Academy
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: '2rem'
          }}>
            Sign in to continue your learning journey
          </p>

          <AuthForm>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SocialButtonGroup>
              <SocialButton
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                style={{
                  background: '#fff',
                  color: '#333',
                  border: '1px solid #ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  width: '100%',
                  marginBottom: '1rem',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: '#f8f9fa',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </SocialButton>
              <SocialButton
                type="button"
                onClick={() => handleSocialLogin('github')}
                disabled={isLoading}
                style={{
                  background: '#333',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  width: '100%',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: '#444',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {isLoading ? 'Signing in...' : 'Continue with GitHub'}
              </SocialButton>
            </SocialButtonGroup>
          </AuthForm>
        </div>
      </div>
    </div>
  );
}
