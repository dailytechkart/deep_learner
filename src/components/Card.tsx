import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const StyledCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.2s ease-in-out;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  style,
  onClick 
}) => {
  return (
    <StyledCard 
      className={className} 
      style={style}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
};

export const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.h4.fontSize};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 1rem 0;
`;

export const CardContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

export const CardFooter = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`; 