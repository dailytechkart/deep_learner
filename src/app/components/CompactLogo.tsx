import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.25rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const LogoIcon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.background};
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
`;

const CompactLogo = () => {
  return (
    <LogoLink href="/">
      <LogoIcon>FS</LogoIcon>
    </LogoLink>
  );
};

export default CompactLogo;
