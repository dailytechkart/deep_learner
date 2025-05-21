'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
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
import { useAuth } from '@/app/context/AuthContext';
import Logo from './Logo';
import MobileHeader from './MobileHeader';
import BottomNav from './BottomNav';

const HeaderContainer = styled.header`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  backdrop-filter: blur(8px);
  background: ${props => props.theme.colors.background}dd;
  transition: all 0.3s ease;
  height: 64px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 100%;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const NavIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  border: none;
  padding: 0;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const UserDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  padding: 0.5rem;
  min-width: 200px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  margin-top: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  animation: ${props => (props.isOpen ? 'slideDown' : 'slideUp')} 0.2s ease;
  z-index: 1001;

  @media (max-width: 480px) {
    min-width: 180px;
    right: -0.5rem;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;
  font-size: ${props => props.theme.typography.fontSize.sm};

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.sm};

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${props => props.theme.borderRadius.md};
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  box-shadow: 0 4px 6px ${props => props.theme.colors.border};
  z-index: 9998;
  transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  max-height: calc(100vh - 56px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  text-align: center;
  touch-action: manipulation;
  min-height: 44px;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.875rem;
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

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <LogoLink href="/">
            <Logo />
          </LogoLink>

          <Nav>
            <NavLink href="/learn">
              <NavIcon>
                <FaBook />
              </NavIcon>
              Learn
            </NavLink>
            <NavLink href="/practice">
              <NavIcon>
                <FaCode />
              </NavIcon>
              Practice
            </NavLink>
            <NavLink href="/system-design">
              <NavIcon>
                <FaShieldAlt />
              </NavIcon>
              System Design
            </NavLink>
            <NavLink href="/interview">
              <NavIcon>
                <FaChartLine />
              </NavIcon>
              Interview
            </NavLink>
            <NavLink href="/roadmap">
              <NavIcon>
                <FaRocket />
              </NavIcon>
              Roadmap
            </NavLink>
          </Nav>

          <RightSection>
            <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? '🌞' : '🌙'}
            </ThemeToggle>

            {user ? (
              <UserMenu ref={userMenuRef}>
                <UserAvatar onClick={handleUserMenuClick} aria-label="User menu">
                  {user.email?.[0].toUpperCase()}
                </UserAvatar>
                <UserDropdown isOpen={isUserMenuOpen}>
                  <DropdownItem href="/profile">
                    <FaUser />
                    Profile
                  </DropdownItem>
                  <SignOutButton onClick={handleSignOut}>
                    <FaSignOutAlt />
                    Sign Out
                  </SignOutButton>
                </UserDropdown>
              </UserMenu>
            ) : (
              <NavLink href="/login">Sign In</NavLink>
            )}

            <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </MobileMenuButton>
          </RightSection>
        </HeaderContent>
      </HeaderContainer>
      <MobileHeader onMenuClick={toggleMobileMenu} />
      <BottomNav />
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavLink href="/learn" onClick={() => setIsMobileMenuOpen(false)}>
          Learn
        </MobileNavLink>
        <MobileNavLink href="/projects" onClick={() => setIsMobileMenuOpen(false)}>
          Projects
        </MobileNavLink>
        <MobileNavLink href="/community" onClick={() => setIsMobileMenuOpen(false)}>
          Community
        </MobileNavLink>
        <MobileNavLink href="/progress" onClick={() => setIsMobileMenuOpen(false)}>
          Progress
        </MobileNavLink>
        {!user && (
          <MobileActions>
            <MobileNavLink href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              Sign In
            </MobileNavLink>
          </MobileActions>
        )}
      </MobileMenu>
    </>
  );
};

export default Header;
