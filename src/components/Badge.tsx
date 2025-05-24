import React from 'react';
import styled from 'styled-components';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  isSelected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const getColorFromVariant = (variant: BadgeVariant, theme: any) => {
  switch (variant) {
    case 'success':
      return theme.colors.status.success;
    case 'warning':
      return theme.colors.status.warning;
    case 'danger':
      return theme.colors.status.error;
    case 'info':
      return theme.colors.status.info;
    case 'secondary':
      return theme.colors.secondary;
    case 'primary':
    default:
      return theme.colors.primary;
  }
};

const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => {
    switch (props.size) {
      case 'sm':
        return '0.25rem 0.5rem';
      case 'lg':
        return '0.5rem 1rem';
      default:
        return '0.375rem 0.75rem';
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'sm':
        return '0.75rem';
      case 'lg':
        return '1rem';
      default:
        return '0.875rem';
    }
  }};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  transition: all 0.2s ease;
  border: 1px solid transparent;
  white-space: nowrap;

  ${props => {
    const isSelected = props.isSelected;
    const baseColor = getColorFromVariant(props.variant || 'primary', props.theme);

    return `
      background: ${isSelected ? baseColor : `${baseColor}10`};
      color: ${isSelected ? props.theme.colors.background : baseColor};
      border-color: ${isSelected ? baseColor : 'transparent'};

      &:hover {
        background: ${isSelected ? baseColor : `${baseColor}20`};
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    `;
  }}
`;

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  isSelected = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <StyledBadge variant={variant} size={size} isSelected={isSelected} onClick={onClick} {...props}>
      {children}
    </StyledBadge>
  );
};
