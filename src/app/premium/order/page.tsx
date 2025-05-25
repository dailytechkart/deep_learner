'use client';

import { PremiumOrder } from '@/components/PremiumOrder';
import styled from 'styled-components';

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin: 1rem 0 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export default function OrderPage() {
  return (
    <>
      <PageHeader>
        <Title>Choose Your Premium Plan</Title>
        <Subtitle>
          Unlock all premium features and accelerate your learning journey with our comprehensive
          plans
        </Subtitle>
      </PageHeader>
      <PremiumOrder />
    </>
  );
}
