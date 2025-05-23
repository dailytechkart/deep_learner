'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
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
  const { user, signInWithGoogle, signInWithGithub, loading, error: authError } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [returnTo, setReturnTo] = useState('/dashboard');

  useEffect(() => {
    setIsMounted(true);
    // Get the return URL from search params
    const from = searchParams?.get('from');
    if (from) {
      setReturnTo(from);
    }
  }, [searchParams]);

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle redirect after login
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (user && isMounted && !loading) {
      // Debounce the redirect slightly
      timeout = setTimeout(() => {
        router.push(returnTo);
      }, 300); // 300ms debounce
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
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(`Failed to login with ${provider}. Please try again.`);
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
        padding: '2rem'
      }}>
        <AuthCard>
          <AuthTitle>Welcome Back</AuthTitle>
          {(error || authError) && (
            <ErrorMessage>
              {error || authError}
            </ErrorMessage>
          )}
          <SocialButtonGroup>
            <SocialButton
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              style={{ backgroundColor: '#fff', color: '#000' }}
            >
              Continue with Google
            </SocialButton>
            <SocialButton
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
              style={{ backgroundColor: '#24292e', color: '#fff' }}
            >
              Continue with GitHub
            </SocialButton>
          </SocialButtonGroup>
        </AuthCard>
      </div>
    </div>
  );
}
