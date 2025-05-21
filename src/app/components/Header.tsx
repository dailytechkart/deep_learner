'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBook, FaRocket, FaShieldAlt, FaChartLine, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/context/AuthContext';
import Logo from './Logo';

const HeaderContainer = styled.header`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  /* padding: 1rem 2rem; */
  position: fixed;
  top: 24px;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: ${props => props.theme.colors.background}dd;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
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

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
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
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.bold};

  &:hover {
    transform: scale(1.05);
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
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

const MobileNav = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const router = useRouter();

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
              <FaRocket />
            </NavIcon>
            Practice
          </NavLink>
          <NavLink href="/roadmap">
            <NavIcon>
              <FaShieldAlt />
            </NavIcon>
            Roadmap
          </NavLink>
          <NavLink href="/system-design">
            <NavIcon>
              <FaChartLine />
            </NavIcon>
            System Design
          </NavLink>
          <NavLink href="/interview">
            <NavIcon>
              <FaChartLine />
            </NavIcon>
            Interview
          </NavLink>
        </Nav>

        <RightSection>
          <ThemeToggle onClick={toggleTheme}>{isDarkMode ? '🌞' : '🌙'}</ThemeToggle>
          {user ? (
            <UserMenu className="user-menu">
              <UserAvatar onClick={handleUserMenuClick}>
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </UserAvatar>
              <UserDropdown isOpen={isUserMenuOpen}>
                <DropdownItem href="/profile">
                  <FaUser />
                  Profile
                </DropdownItem>
                <DropdownItem href="/dashboard">
                  <FaChartLine />
                  Dashboard
                </DropdownItem>
                <DropdownItem href="/settings">
                  <FaShieldAlt />
                  Settings
                </DropdownItem>
                <SignOutButton onClick={handleSignOut}>
                  <FaSignOutAlt />
                  Sign Out
                </SignOutButton>
              </UserDropdown>
            </UserMenu>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/signup">Sign Up</NavLink>
            </>
          )}
          <MobileMenuButton onClick={toggleMobileMenu}>☰</MobileMenuButton>
        </RightSection>
      </HeaderContent>

      <MobileNav isOpen={isMobileMenuOpen}>
        <NavLink href="/learn">
          <NavIcon>
            <FaBook />
          </NavIcon>
          Learn
        </NavLink>
        <NavLink href="/practice">
          <NavIcon>
            <FaRocket />
          </NavIcon>
          Practice
        </NavLink>
        <NavLink href="/roadmap">
          <NavIcon>
            <FaShieldAlt />
          </NavIcon>
          Roadmap
        </NavLink>
        <NavLink href="/system-design">
          <NavIcon>
            <FaChartLine />
          </NavIcon>
          System Design
        </NavLink>
        <NavLink href="/interview">
          <NavIcon>
            <FaChartLine />
          </NavIcon>
          Interview
        </NavLink>
        {!user && (
          <>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/signup">Sign Up</NavLink>
          </>
        )}
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;
