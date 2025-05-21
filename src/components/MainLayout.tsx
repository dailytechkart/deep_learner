'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '@/app/components/Header';
import { AppFooter } from './Footer';
import { FaLock } from 'react-icons/fa';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBreadcrumb?: boolean;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};
  padding-top: 24px; // Push content below the fixed promo strip
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-top: 64px; // Height of the header
  transition: all ${props => props.theme.transitions.default};
  background: ${props => props.theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
`;

const PromoStripText = styled.span`
  width: 100%;
  text-align: center;
  font-size: 0.92rem;
  font-weight: 700;
  color: #7c4a00;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 1px 2px #fff8, 0 0px 1px #ffd54f99;
`;

const PromoStrip = styled.div`
  width: 100vw;
  height: 24px;
  background: linear-gradient(90deg, #ffe082 0%, #ffd54f 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PromoIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff8f00;
  animation: pulse 1.2s infinite alternate;
  @keyframes pulse {
    0% { transform: scale(1); }
    100% { transform: scale(1.15); }
  }
`;

const PromoText = styled.span`
  font-weight: 700;
  color: #b26a00;
`;

const PromoButton = styled.a`
  background: #ff8f00;
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  border-radius: 999px;
  padding: 0.7rem 2rem;
  text-decoration: none;
  box-shadow: 0 2px 12px #ff8f0030;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  &:hover {
    background: #ffa726;
    color: #fff;
    transform: scale(1.04);
    box-shadow: 0 4px 18px #ff8f0040;
  }
`;

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  showBreadcrumb = true,
}) => {
  return (
    <>
      <PromoStrip>
        <PromoStripText>
          Get Premium Content Access at 90% OFF – Only ₹499!
        </PromoStripText>
      </PromoStrip>
      <LayoutContainer>
        <Header />
        <ContentWrapper>
          <Main>{children}</Main>
        </ContentWrapper>
        <AppFooter />
      </LayoutContainer>
    </>
  );
};

export default MainLayout;
