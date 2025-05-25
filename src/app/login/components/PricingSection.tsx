import React from 'react';
import styled from 'styled-components';

const PricingSectionContainer = styled.div`
  margin-top: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  text-align: center;
`;

const PricingHeader = styled.div`
  margin-bottom: 0.75rem;
`;

const PricingTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #ffffff;
`;

const PricingSubtitle = styled.p`
  font-size: 0.8rem;
  color: #cccccc;
`;

const PriceContainer = styled.div`
  margin-bottom: 0.75rem;
`;

const CurrentPrice = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const OriginalPrice = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: line-through;
  margin-bottom: 0.25rem;
`;

const DiscountBadge = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PricingFeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 0.75rem 0;
  text-align: left;
`;

const PricingFeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
  color: #e0e0e0;

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const PricingCTA = styled.a`
  display: inline-block;
  padding: 0.6rem 1.25rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.full};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

interface PricingSectionProps {
  title: string;
  subtitle: string;
  originalPrice: string;
  currentPrice: string;
  discount: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  title,
  subtitle,
  originalPrice,
  currentPrice,
  discount,
  features,
  ctaText,
  ctaLink,
}) => {
  return (
    <PricingSectionContainer>
      <PricingHeader>
        <PricingTitle>{title}</PricingTitle>
        <PricingSubtitle>{subtitle}</PricingSubtitle>
      </PricingHeader>

      <PriceContainer>
        <OriginalPrice>{originalPrice}</OriginalPrice>
        <CurrentPrice>{currentPrice}</CurrentPrice>
        <DiscountBadge>{discount}</DiscountBadge>
      </PriceContainer>

      <PricingFeaturesList>
        {features.map((feature, index) => (
          <PricingFeatureItem key={index}>{feature}</PricingFeatureItem>
        ))}
      </PricingFeaturesList>

      <PricingCTA href={ctaLink}>{ctaText}</PricingCTA>
    </PricingSectionContainer>
  );
};

export default PricingSection;
