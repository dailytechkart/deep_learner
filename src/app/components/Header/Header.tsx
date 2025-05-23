'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
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
  ThemeToggle,
  SignInButton,
  MobileMenu,
  MobileNavLink,
  StyledLogo,
} from './Header.styled';

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
      setIsMobileMenuOpen(false);
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

  const renderNavLinks = useCallback((isMobile = false) => {
    const NavComponent = isMobile ? MobileNavLink : NavLink;
    return NAV_ITEMS.map(item => (
      <NavComponent
        key={item.href}
        href={item.href}
        aria-current={pathname === item.href ? 'page' : undefined}
      >
        {item.icon}
        {item.label}
      </NavComponent>
    ));
  }, [pathname]);

  return (
    <>
      <MobileHeader onMenuClick={toggleMobileMenu} />
      <PromoStrip>
        <PromoStripText>Get Premium Content Access at 90% OFF – Only ₹499!</PromoStripText>
      </PromoStrip>
      <HeaderContainer>
        <HeaderContent>
          <LeftSection>
            <LogoLink href="/" onClick={handleLogoClick}>
              <StyledLogo />
            </LogoLink>
            <Nav>{renderNavLinks()}</Nav>
          </LeftSection>
          <RightSection>
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

export default memo(Header); 