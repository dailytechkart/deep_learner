'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  FaBook,
  FaRocket,
  FaShieldAlt,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCode,
} from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/hooks/useAuth';
import Logo from './Logo';
import MobileHeader from './MobileHeader';
import UserMenu from './UserMenu';
import { Theme } from '@/app/styles/theme';

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
  height: 64px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all ${({ theme }) => theme.transitions.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
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
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-left: auto;
`;

const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.default};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

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

const NavIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all ${({ theme }) => theme.transitions.default};
  }

  &:active::after {
    background: ${({ theme }) => theme.colors.backgroundHover};
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
  z-index: 9998;
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

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 1rem;

  @media (max-width: 480px) {
    gap: 0.75rem;
    padding: 0.875rem;
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
                href="/projects"
                aria-current={pathname === '/projects' ? 'page' : undefined}
              >
                <FaCode />
                Projects
              </NavLink>
              <NavLink
                href="/security"
                aria-current={pathname === '/security' ? 'page' : undefined}
              >
                <FaShieldAlt />
                Security
              </NavLink>
              <NavLink
                href="/analytics"
                aria-current={pathname === '/analytics' ? 'page' : undefined}
              >
                <FaChartLine />
                Analytics
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
              <NavLink href="/login">
                <FaUser />
                Sign In
              </NavLink>
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
          href="/projects"
          aria-current={pathname === '/projects' ? 'page' : undefined}
        >
          <FaCode />
          Projects
        </MobileNavLink>
        <MobileNavLink
          href="/security"
          aria-current={pathname === '/security' ? 'page' : undefined}
        >
          <FaShieldAlt />
          Security
        </MobileNavLink>
        <MobileNavLink
          href="/analytics"
          aria-current={pathname === '/analytics' ? 'page' : undefined}
        >
          <FaChartLine />
          Analytics
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
