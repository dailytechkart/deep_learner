'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useTheme as useStyledTheme } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background}dd;
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: ${props => props.theme.shadows.sm};
  height: 64px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: all ${props => props.theme.transitions.default};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.default};
  
  .logo-icon {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
  }

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.md};
  transition: all ${props => props.theme.transitions.default};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.theme.colors.primary};
    transition: width ${props => props.theme.transitions.default};
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.fontSize.md};
  text-decoration: none;
  transition: all ${props => props.theme.transitions.default};
  box-shadow: 0 4px 20px ${props => props.theme.colors.primary}40;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px ${props => props.theme.colors.primary}60;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};

  .avatar-initials {
    color: white;
    font-size: ${props => props.theme.typography.fontSize.md};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const UserDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing.sm};
  min-width: 200px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  margin-top: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  animation: ${props => props.$isOpen ? 'slideDown' : 'slideUp'} ${props => props.theme.transitions.default};

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
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.default};
  
  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }
`;

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all ${props => props.theme.transitions.default};
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  
  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.xl};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.md};
  z-index: 999;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  animation: ${props => props.$isOpen ? 'slideDown' : 'slideUp'} ${props => props.theme.transitions.default};

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

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

const MobileNavLink = styled.a`
  display: block;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: ${props => props.theme.spacing.md};
`;

const MobileSignOutButton = styled.button`
  display: block;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.default};
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.xl};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }
`;

export interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery = '', onSearchChange }: HeaderProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = useStyledTheme();

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (isUserMenuOpen && !(e.target as Element).closest('.user-menu')) {
      setIsUserMenuOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <HeaderContainer>
      <Logo href="/">
        <span className="logo-icon">🚀</span>
        Frontendly
      </Logo>

      <SearchContainer>
        <SearchInput
          type="search"
          placeholder="Search courses, topics, or resources..."
          value={localSearchQuery}
          onChange={handleSearchChange}
        />
      </SearchContainer>

      <NavLinks>
        <NavLink href="/learn">Learn</NavLink>
        <NavLink href="/practice">Practice</NavLink>
        <NavLink href="/roadmap">Roadmap</NavLink>
        <NavLink href="/system-design">System Design</NavLink>
        <NavLink href="/interview">Interview</NavLink>
      </NavLinks>

      <Actions>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? '🌞' : '🌙'}
        </ThemeToggle>
        {user ? (
          <UserMenu className="user-menu">
            <UserAvatar onClick={handleUserMenuClick}>
              <div className="avatar-initials">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
            </UserAvatar>
            <UserDropdown $isOpen={isUserMenuOpen}>
              <DropdownItem href="/profile">
                Profile
              </DropdownItem>
              <DropdownItem href="/dashboard">
                Dashboard
              </DropdownItem>
              <DropdownItem href="/settings">
                Settings
              </DropdownItem>
              <SignOutButton onClick={handleSignOut}>
                Sign Out
              </SignOutButton>
            </UserDropdown>
          </UserMenu>
        ) : (
          <>
            <Link href="/login" passHref>
              <NavLink>Login</NavLink>
            </Link>
            <Link href="/signup" passHref>
              <CTAButton href="/signup">Get Started</CTAButton>
            </Link>
          </>
        )}
      </Actions>

      <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        ☰
      </MobileMenuButton>

      <MobileMenu $isOpen={isMobileMenuOpen}>
        <MobileNavLink href="/learn">Learn</MobileNavLink>
        <MobileNavLink href="/practice">Practice</MobileNavLink>
        <MobileNavLink href="/roadmap">Roadmap</MobileNavLink>
        <MobileNavLink href="/system-design">System Design</MobileNavLink>
        <MobileNavLink href="/interview">Interview</MobileNavLink>
        <MobileActions>
          {user ? (
            <>
              <MobileNavLink href="/profile">Profile</MobileNavLink>
              <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
              <MobileNavLink href="/settings">Settings</MobileNavLink>
              <MobileSignOutButton onClick={handleSignOut}>Sign Out</MobileSignOutButton>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <MobileNavLink href="/login">Login</MobileNavLink>
              </Link>
              <Link href="/signup" passHref>
                <CTAButton href="/signup" style={{ width: '100%', textAlign: 'center' }}>Get Started</CTAButton>
              </Link>
            </>
          )}
        </MobileActions>
      </MobileMenu>
    </HeaderContainer>
  );
} 