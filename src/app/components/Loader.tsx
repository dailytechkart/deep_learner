'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

interface LoaderProps {
  variant?: 'spinner' | 'pulse' | 'shimmer';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoaderContainer = styled.div<LoaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '24px';
      case 'lg':
        return '48px';
      default:
        return '32px';
    }
  }};
`;

const Spinner = styled.div<LoaderProps>`
  width: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '20px';
      case 'lg':
        return '40px';
      default:
        return '30px';
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '20px';
      case 'lg':
        return '40px';
      default:
        return '30px';
    }
  }};
  border: 3px solid ${(props) => props.theme.colors.border};
  border-top-color: ${(props) => props.color || props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const PulseLoader = styled.div<LoaderProps>`
  width: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '20px';
      case 'lg':
        return '40px';
      default:
        return '30px';
    }
  }};
  height: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '20px';
      case 'lg':
        return '40px';
      default:
        return '30px';
    }
  }};
  background-color: ${(props) => props.color || props.theme.colors.primary};
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const ShimmerLoader = styled.div<LoaderProps>`
  width: 100%;
  height: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '20px';
      case 'lg':
        return '40px';
      default:
        return '30px';
    }
  }};
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.border} 25%,
    ${(props) => props.theme.colors.backgroundAlt} 50%,
    ${(props) => props.theme.colors.border} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const Loader: React.FC<LoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  color,
}) => {
  return (
    <LoaderContainer size={size}>
      {variant === 'spinner' && <Spinner size={size} color={color} />}
      {variant === 'pulse' && <PulseLoader size={size} color={color} />}
      {variant === 'shimmer' && <ShimmerLoader size={size} color={color} />}
    </LoaderContainer>
  );
};

export default Loader;
