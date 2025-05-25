import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface ButtonProps {
  primary?: boolean;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.primary ? props.theme.colors.primary : props.theme.colors.border};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.primary ? props.theme.colors.primary + '40' : 'rgba(0, 0, 0, 0.1)'};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9375rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    width: 100%;
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  primary, 
  href, 
  onClick, 
  children, 
  className,
  style 
}) => {
  if (href) {
    return (
      <Link href={href} passHref>
        <StyledButton 
          as="a" 
          primary={primary} 
          onClick={onClick}
          className={className}
          style={style}
        >
          {children}
        </StyledButton>
      </Link>
    );
  }

  return (
    <StyledButton 
      primary={primary} 
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </StyledButton>
  );
}; 