'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useTheme as useStyledTheme } from 'styled-components';
import { useSession } from 'next-auth/react';
import { useTheme } from '../context/ThemeContext';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.background}dd;
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px ${props => props.theme.colors.border};
  height: 64px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  
  .logo-icon {
    font-size: 1.75rem;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.2s ease;
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
  gap: 1rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
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
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  .avatar-initials {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
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
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  min-width: 200px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  margin-top: 0.5rem;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  
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
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

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
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

const MobileNavLink = styled.a`
  display: block;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 1rem;
`;

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession();
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

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <HeaderContainer>
      <Logo>
        <span className="logo-icon">🚀</span>
        DeepLearner
      </Logo>

      <NavLinks>
        <NavLink href="/learn">Learn</NavLink>
        <NavLink href="/practice">Practice</NavLink>
        <NavLink href="/roadmap">Roadmap</NavLink>
        <NavLink href="/system-design">System Design</NavLink>
      </NavLinks>

      <Actions>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? '🌞' : '🌙'}
        </ThemeToggle>
        {session ? (
          <UserMenu className="user-menu">
            <UserAvatar onClick={handleUserMenuClick}>
              <div className="avatar-initials">
                {session?.user?.name?.charAt(0) || 'U'}
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
              <DropdownItem href="/api/auth/signout">
                Sign Out
              </DropdownItem>
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
        <MobileActions>
          {session ? (
            <>
              <MobileNavLink href="/profile">Profile</MobileNavLink>
              <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
              <MobileNavLink href="/settings">Settings</MobileNavLink>
              <MobileNavLink href="/api/auth/signout">Sign Out</MobileNavLink>
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

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  width: 200px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const ThemeToggle = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`; 