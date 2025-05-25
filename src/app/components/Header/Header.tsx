'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaUser, FaBook, FaCode, FaServer, FaTimes } from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/hooks/useAuth';
import { UserMenu } from '@/app/components/UserMenu';
import MobileHeader from '../MobileHeader';
import { HeaderProps } from './Header.types';
import { NAV_ITEMS } from './Header.constants';
import {
  HeaderContainer,
  HeaderContent,
  LeftSection,
  RightSection,
  NavLink,
  LogoLink,
  Nav,
  PromoStripText,
  PromoStrip,
  PromoStripContent,
  CloseButton,
  ThemeToggle,
  SignInButton,
  MobileMenu,
  MobileNavLink,
  StyledLogo,
  SearchInput,
  PricingDropdown,
  PricingDropdownHeader,
  PricingDropdownTitle,
  PricingDropdownPrice,
  CurrentPrice,
  OriginalPrice,
  DiscountBadge,
  PricingFeatures,
  PricingFeature,
  PricingCTA,
  PricingNote,
  MemberButton,
} from './Header.styled';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'book':
      return FaBook;
    case 'code':
      return FaCode;
    case 'server':
      return FaServer;
    default:
      return FaBook;
  }
};

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme, promoStripVisible, setPromoStripVisible } = useTheme();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
      setIsMobileMenuOpen(false);
    }
    if (pricingRef.current && !pricingRef.current.contains(event.target as Node)) {
      setIsPricingOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleLogoClick = useCallback(() => {
    router.push('/');
    setIsMobileMenuOpen(false);
  }, [router]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const togglePricing = useCallback(() => {
    setIsPricingOpen(prev => !prev);
  }, []);

  const handleClosePromoStrip = useCallback(() => {
    setPromoStripVisible(false);
  }, [setPromoStripVisible]);

  const renderNavLinks = useCallback(
    (isMobile = false) => {
      const NavComponent = isMobile ? MobileNavLink : NavLink;
      return NAV_ITEMS.map(item => {
        const Icon = item.icon;
        return (
          <NavComponent
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            <Icon size={20} />
            {item.label}
          </NavComponent>
        );
      });
    },
    [pathname]
  );

  const pricingFeatures = [
    'Access to all current courses',
    'Access to all future courses',
    'Lifetime community access',
    'Priority support',
    'Certificate of completion',
    'Project-based learning',
  ];

  return (
    <>
      <MobileHeader onMenuClick={toggleMobileMenu} />
      <PromoStrip isVisible={promoStripVisible}>
        <PromoStripContent>
          <PromoStripText>Get Premium Content Access at 90% OFF – Only ₹499!</PromoStripText>
          <CloseButton onClick={handleClosePromoStrip} aria-label="Close promo strip">
            <FaTimes size={14} />
          </CloseButton>
        </PromoStripContent>
      </PromoStrip>
      <HeaderContainer promoStripVisible={promoStripVisible}>
        <HeaderContent>
          <LeftSection>
            <LogoLink href="/" onClick={handleLogoClick}>
              <StyledLogo />
            </LogoLink>
            <Nav>{renderNavLinks()}</Nav>
          </LeftSection>
          <RightSection>
            {searchQuery !== undefined && onSearchChange && (
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchChange(e.target.value)
                }
              />
            )}
            <MemberButton onClick={togglePricing}>
              Become a Member
            </MemberButton>
            {isPricingOpen && (
              <PricingDropdown ref={pricingRef}>
                <PricingDropdownHeader>
                  <PricingDropdownTitle>Get Full Access</PricingDropdownTitle>
                  <PricingDropdownPrice>
                    <CurrentPrice>₹499</CurrentPrice>
                    <OriginalPrice>₹8,000</OriginalPrice>
                    <DiscountBadge>94% OFF</DiscountBadge>
                  </PricingDropdownPrice>
                </PricingDropdownHeader>
                <PricingFeatures>
                  {pricingFeatures.map((feature, index) => (
                    <PricingFeature key={index}>{feature}</PricingFeature>
                  ))}
                </PricingFeatures>
                <PricingCTA href="/signup">Get Lifetime Access</PricingCTA>
                <PricingNote>One-time payment. No hidden fees. 7-day money-back guarantee.</PricingNote>
              </PricingDropdown>
            )}
            <ThemeToggle
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </ThemeToggle>
            {user ? (
              <UserMenu />
            ) : (
              <SignInButton href="/login">
                <FaUser />
                Sign In
              </SignInButton>
            )}
          </RightSection>
        </HeaderContent>
      </HeaderContainer>
      <MobileMenu ref={mobileMenuRef} isOpen={isMobileMenuOpen}>
        {renderNavLinks(true)}
        <MobileNavLink href="/signup">
          Become a Member
        </MobileNavLink>
        {!user && (
          <MobileNavLink href="/login">
            <FaUser />
            Sign In
          </MobileNavLink>
        )}
      </MobileMenu>
    </>
  );
};

export default memo(Header) as React.FC<HeaderProps>;
