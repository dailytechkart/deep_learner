'use client';

import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
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
import BottomNav from './BottomNav';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { Theme } from '@/app/styles/theme';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: Dispatch<SetStateAction<string>>;
}

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
  padding: 0 24px;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
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

const StyledLogo = styled(Logo)<LogoProps>``;
const StyledUserMenu = styled(UserMenu)<UserMenuProps>``;

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleSearch = (query: string) => {
    onSearchChange(query);
  };

  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <LogoLink href="/">
            <StyledLogo onClick={handleLogoClick} />
          </LogoLink>
          <SearchBar value={searchQuery} onChange={handleSearch} placeholder="Search problems..." />
        </LeftSection>
        <RightSection>
          {user ? (
            <UserMenuContainer ref={userMenuRef}>
              <StyledUserMenu user={user} onSignOut={handleSignOut} />
            </UserMenuContainer>
          ) : (
            <NavLink href="/login">Sign In</NavLink>
          )}
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
