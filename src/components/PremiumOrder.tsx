'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { initiatePayment } from '@/utils/razorpay';
import { useAuth } from '@/app/context/AuthContext';
import { doc, updateDoc, setDoc, Timestamp, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaCheck } from 'react-icons/fa';
import { Loader } from './Loader';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 999,
    duration: 'month',
    features: [
      'Access to all premium courses',
      'Download course materials',
      'Priority support',
      'Certificate of completion',
      'Community access',
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 9990,
    duration: 'year',
    features: [
      'Everything in Monthly plan',
      '2 months free',
      'Early access to new courses',
      '1-on-1 mentoring sessions',
      'Project reviews',
    ],
    popular: true,
  },
];

const Container = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PlanCard = styled.div<{ isPopular?: boolean }>`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid
    ${props => (props.isPopular ? props.theme.colors.primary : props.theme.colors.border)};
  box-shadow: ${props => (props.isPopular ? props.theme.shadows.lg : props.theme.shadows.md)};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: ${props => props.theme.shadows.md};
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const PlanName = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Price = styled.span`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
`;

const Duration = styled.span`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const CheckIcon = styled(FaCheck)`
  color: ${props => props.theme.colors.success};
  flex-shrink: 0;
  margin-top: 0.25rem;
`;

const SelectButton = styled.button<{ isSelected?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  margin-top: 2rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => (props.isSelected ? 'white' : props.theme.colors.text)};
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    background: ${props =>
      props.isSelected ? props.theme.colors.primaryDark : props.theme.colors.backgroundAlt};
  }
`;

const SubscribeButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 2rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:disabled {
    background: ${props => props.theme.colors.primary}40;
    cursor: not-allowed;
    transform: none;
  }
`;

const PaymentNote = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const AlreadyPremiumContainer = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-top: 2rem;
`;

const AlreadyPremiumTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const AlreadyPremiumMessage = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const DashboardButton = styled.button`
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

const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

export const PremiumOrder = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('yearly');
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const router = useRouter();
  const { user, profile } = useAuth();
  console.log(user, 'user', profile, 'profile');
  useEffect(() => {
    setCheckingStatus(true);

    const checkPremiumStatus = async () => {
      if (!user?.uid || !db) {
        setCheckingStatus(false);
        return;
      }

      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsPremium(userData.premium || false);
          if (userData.premiumExpiresAt) {
            setExpiryDate(userData.premiumExpiresAt.toDate().toLocaleDateString());
          }
        }
      } catch (error) {
        console.error('Error checking premium status:', error);
      } finally {
        setCheckingStatus(false);
      }
    };

    if (user) {
      checkPremiumStatus();
    }
  }, [user]);

  const handleSubscribe = async () => {
    if (!user?.uid || !profile) {
      router.push('/login?redirect=/premium/order');
      return;
    }

    if (!db) {
      console.error('Firestore is not initialized');
      return;
    }

    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    setLoading(true);
    try {
      await initiatePayment({
        amount: plan.price,
        currency: 'INR',
        name: 'Frontend School',
        description: `${plan.name} Premium Subscription`,
        handler: async response => {
          try {
            const now = Timestamp.now();
            const durationInDays = plan.duration === 'month' ? 30 : 365;

            // Create payment record
            const paymentRef = doc(db, 'payments', response.razorpay_payment_id);
            await setDoc(paymentRef, {
              uid: user.uid,
              email: profile.email,
              amount: plan.price,
              currency: 'INR',
              provider: 'Razorpay',
              status: 'success',
              sessionId: response.razorpay_order_id,
              timestamp: now,
              metadata: {
                plan: plan.id,
                durationInDays: durationInDays,
              },
            });

            // Update user document
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
              premium: true,
              premiumActivatedAt: now,
              premiumExpiresAt: Timestamp.fromDate(
                new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000)
              ),
              coursesEnrolled: [], // Initialize empty array for new premium users
              progress: {}, // Initialize empty progress object
              createdAt: now,
            });

            router.push('/premium/success');
          } catch (error) {
            console.error('Error updating subscription:', error);
            // Handle error appropriately
          }
        },
        prefill: {
          name: profile.full_name || '',
          email: profile.email,
        },
        theme: {
          color: '#6366f1',
        },
      });
    } catch (error) {
      console.error('Payment error:', error);
      // Handle payment error
    } finally {
      setLoading(false);
    }
  };
  console.log(checkingStatus, loading, isPremium, 'checkingStatus, loading, isPremium,  ');
  if (checkingStatus === true) {
    return <Loader text="Checking subscription status..." />;
  }

  if (loading) {
    return <Loader text="Processing payment..." />;
  }

  if (isPremium) {
    return (
      <AlreadyPremiumContainer>
        <AlreadyPremiumTitle>You Already Have Premium Access!</AlreadyPremiumTitle>
        <AlreadyPremiumMessage>
          {expiryDate
            ? `Your premium subscription is active until ${expiryDate}.`
            : 'You already have premium access to all features.'}
        </AlreadyPremiumMessage>
        <DashboardButton onClick={() => router.push('/dashboard')}>Go to Dashboard</DashboardButton>
      </AlreadyPremiumContainer>
    );
  }

  return (
    <Container>
      {plans?.map(plan => (
        <PlanCard key={plan.id} isPopular={plan.popular}>
          {plan.popular && <PopularBadge>Most Popular</PopularBadge>}
          <PlanHeader>
            <PlanName>{plan.name}</PlanName>
            <PriceContainer>
              <Price>₹{plan.price}</Price>
              <Duration>/{plan.duration}</Duration>
            </PriceContainer>
          </PlanHeader>
          <FeaturesList>
            {plan.features.map((feature, index) => (
              <FeatureItem key={index}>
                <CheckIcon size={16} />
                {feature}
              </FeatureItem>
            ))}
          </FeaturesList>
          <SelectButton
            isSelected={selectedPlan === plan.id}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
          </SelectButton>
        </PlanCard>
      ))}
      <SubscribeButton onClick={handleSubscribe} disabled={loading}>
        {loading ? 'Processing...' : 'Subscribe Now'}
      </SubscribeButton>
      <PaymentNote>Secure payment powered by Razorpay</PaymentNote>
    </Container>
  );
};
