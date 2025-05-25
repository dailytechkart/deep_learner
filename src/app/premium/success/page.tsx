'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '@/app/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader } from '@/components/Loader';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const SuccessIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: ${props => props.theme.colors.success};
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const FeaturesList = styled.div`
  margin-top: 3rem;
  text-align: left;
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const FeatureTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const FeatureIcon = styled(FaCheckCircle)`
  color: ${props => props.theme.colors.success};
  flex-shrink: 0;
`;

export default function SuccessPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!user) {
        router.push('/login?redirect=/premium/success');
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsPremium(userData.premium || false);
        }
      } catch (error) {
        console.error('Error checking premium status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkPremiumStatus();
  }, [user, router]);

  useEffect(() => {
    if (!loading && !isPremium) {
      router.push('/premium/order');
    }
  }, [loading, isPremium, router]);

  if (loading) {
    return <Loader text="Verifying your subscription..." />;
  }

  if (!isPremium) {
    return null; // Will redirect in useEffect
  }

  return (
    <Container>
      <SuccessIcon />
      <Title>Payment Successful!</Title>
      <Message>
        Thank you for subscribing to Frontend School Premium. Your account has been upgraded and you
        now have access to all premium features.
      </Message>
      <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>

      <FeaturesList>
        <FeatureTitle>Your Premium Benefits</FeatureTitle>
        <FeatureItem>
          <FeatureIcon size={20} />
          Access to all premium courses and content
        </FeatureItem>
        <FeatureItem>
          <FeatureIcon size={20} />
          Download course materials for offline learning
        </FeatureItem>
        <FeatureItem>
          <FeatureIcon size={20} />
          Priority support and assistance
        </FeatureItem>
        <FeatureItem>
          <FeatureIcon size={20} />
          Certificate of completion for all courses
        </FeatureItem>
        <FeatureItem>
          <FeatureIcon size={20} />
          Exclusive community access
        </FeatureItem>
      </FeaturesList>
    </Container>
  );
}
