import React from 'react';
import styled, { css } from 'styled-components';
import { typography } from '@/styles/theme/typography';

type FontSize = keyof typeof typography.fontSize;
type FontWeight = keyof typeof typography.fontWeight;
type FontFamily = keyof typeof typography.fontFamily;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: FontSize;
  weight?: FontWeight;
  fontFamily?: FontFamily;
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const variantToSize: Record<NonNullable<TypographyProps['variant']>, FontSize> = {
  h1: '6xl',
  h2: '5xl',
  h3: '4xl',
  h4: '3xl',
  h5: '2xl',
  h6: 'xl',
  p: 'base',
  span: 'base',
};

const variantToWeight: Record<NonNullable<TypographyProps['variant']>, FontWeight> = {
  h1: 'bold',
  h2: 'bold',
  h3: 'semibold',
  h4: 'semibold',
  h5: 'medium',
  h6: 'medium',
  p: 'normal',
  span: 'normal',
};

const StyledTypography = styled.div<{
  $variant: NonNullable<TypographyProps['variant']>;
  $size?: FontSize;
  $weight?: FontWeight;
  $fontFamily?: FontFamily;
}>`
  ${({ $variant, $size, $weight, $fontFamily = 'primary' }) => css`
    font-family: ${typography.fontFamily[$fontFamily]};
    font-size: ${typography.fontSize[$size || variantToSize[$variant]][0]};
    line-height: ${typography.fontSize[$size || variantToSize[$variant]][1].lineHeight};
    font-weight: ${typography.fontWeight[$weight || variantToWeight[$variant]]};
  `}
`;

export const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  size,
  weight,
  fontFamily = 'primary',
  className,
  children,
  as,
  ...props
}) => {
  const Component = as || variant;

  return (
    <StyledTypography
      as={Component}
      $variant={variant}
      $size={size}
      $weight={weight}
      $fontFamily={fontFamily}
      className={className}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

Typography.displayName = 'Typography';
