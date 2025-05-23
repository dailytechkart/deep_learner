'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaBook, FaShieldAlt, FaChartLine, FaUser, FaCode, FaServer } from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/hooks/useAuth';
import Logo from './Logo';
import MobileHeader from './MobileHeader';
import UserMenu from './UserMenu';

interface HeaderProps {}

interface LogoProps {
  onClick?: () => void;
}

interface UserMenuProps {
  user: any; // Replace with your User type
  onSignOut: () => Promise<void>;
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all ${({ theme }) => theme.transitions.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const HeaderContent = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
`;

const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.2s ease;
  }

  &:hover::after,
  &[aria-current='page']::after {
    width: 100%;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SignInButton = styled(NavLink)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: white;
    transform: translateY(-1px);
  }

  &::after {
    display: none;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 1;
  transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
  transition: transform ${({ theme }) => theme.transitions.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  max-height: calc(100vh - 56px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.default};
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const StyledLogo = styled(Logo)<LogoProps>``;
const StyledUserMenu = styled(UserMenu)<UserMenuProps>``;

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await logout();
    router.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <MobileHeader onMenuClick={toggleMobileMenu} />
      <HeaderContainer>
        <HeaderContent>
          <LeftSection>
            <LogoLink href="/" onClick={handleLogoClick}>
              <StyledLogo />
            </LogoLink>
            <Nav>
              <NavLink href="/learn" aria-current={pathname === '/learn' ? 'page' : undefined}>
                <FaBook />
                Learn
              </NavLink>
              <NavLink
                href="/interview"
                aria-current={pathname === '/interview' ? 'page' : undefined}
              >
                <FaCode />
                Interviews
              </NavLink>
              <NavLink
                href="/system-design"
                aria-current={pathname === '/system-design' ? 'page' : undefined}
              >
                <FaServer />
                System Design
              </NavLink>
            </Nav>
          </LeftSection>
          <RightSection>
            <ThemeToggle
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </ThemeToggle>
            {user ? (
              <UserMenuContainer>
                <StyledUserMenu user={user} onSignOut={handleSignOut} />
              </UserMenuContainer>
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
        <MobileNavLink href="/learn" aria-current={pathname === '/learn' ? 'page' : undefined}>
          <FaBook />
          Learn
        </MobileNavLink>
        <MobileNavLink
          href="/interview"
          aria-current={pathname === '/interview' ? 'page' : undefined}
        >
          <FaCode />
          Interviews
        </MobileNavLink>
        <MobileNavLink
          href="/system-design"
          aria-current={pathname === '/system-design' ? 'page' : undefined}
        >
          <FaServer />
          System Design
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

export default Header;
