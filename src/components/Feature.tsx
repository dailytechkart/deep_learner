import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits?: string[];
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureBenefits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FeatureBenefit = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const FeatureCTA = styled.button`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 0.875rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

export const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  benefits,
  onClick,
  className,
  style,
}) => {
  return (
    <Card onClick={onClick} className={className} style={style}>
      <FeatureIcon>{icon}</FeatureIcon>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
      {benefits && benefits.length > 0 && (
        <FeatureBenefits>
          {benefits.map((benefit, index) => (
            <FeatureBenefit key={index}>{benefit}</FeatureBenefit>
          ))}
        </FeatureBenefits>
      )}
      <FeatureCTA onClick={onClick}>Learn More</FeatureCTA>
    </Card>
  );
};
