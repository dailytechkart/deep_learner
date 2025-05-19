'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  Header as HeaderContainer,
  HeaderContent,
  HeaderLeft,
  Logo,
  NavLinks,
  NavLink,
  HeaderRight,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ThemeToggle,
  UserMenuContainer,
  UserButton,
  UserAvatar,
  DropdownMenu,
  MenuItem,
  MenuDivider,
  MobileMenuButton,
  MobileSidebar,
  MobileSidebarHeader,
  MobileSidebarClose,
  MobileSidebarNav,
  MobileSidebarLink,
  MobileSidebarActions,
  MobileSidebarOverlay,
  UserName
} from './StyledComponents';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md};
  gap: ${props => props.theme.spacing.sm};
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

interface StyledNavLinkProps {
  $active?: boolean;
}

const StyledNavLink = styled(Link)<StyledNavLinkProps>`
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

const StyledMobileNavLink = styled(Link)<StyledNavLinkProps>`
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [activePath, setActivePath] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleRouteChange = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.mobile-sidebar') && !target.closest('.mobile-menu-button')) {
      setIsMobileMenuOpen(false);
    }
    if (!target.closest('.user-menu')) {
      setIsUserMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen || isUserMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isUserMenuOpen]);

  const handleMobileMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false);
  };

  const handleUserMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => pathname === path;

  React.useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const navLinks = [
    { href: '/learn', label: 'Learn' },
    { href: '/practice', label: 'Practice' },
    { href: '/system-design', label: 'System Design' },
    { href: '/interview', label: 'Interview' }
  ];

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <HeaderLeft>
            <MobileMenuButton 
              className="mobile-menu-button"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              ☰
            </MobileMenuButton>
            <Link href="/" passHref>
              <Logo>Frontendly</Logo>
            </Link>
            <NavLinks>
              {navLinks.map((link) => (
                <StyledNavLink 
                  key={link.href} 
                  href={link.href}
                  $active={activePath === link.href}
                  onClick={() => handleNavigation(link.href)}
                >
                  {link.label}
                </StyledNavLink>
              ))}
            </NavLinks>
          </HeaderLeft>
          <HeaderRight>
            <form onSubmit={handleSearch}>
              <SearchContainer $isFocused={isSearchFocused}>
                <SearchInput
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  aria-label="Search topics"
                />
                <SearchIcon>🔍</SearchIcon>
              </SearchContainer>
            </form>
            <ThemeToggle 
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span>{isDarkMode ? '☀️' : '🌙'}</span>
            </ThemeToggle>
            {user && (
              <UserMenuContainer className="user-menu">
                <UserButton onClick={handleUserMenuToggle}>
                  <UserAvatar 
                    src={user.photoURL || '/default-avatar.png'} 
                    alt={user.displayName || 'User'} 
                  />
                  <UserName>{user.displayName || user.email}</UserName>
                </UserButton>
                {isUserMenuOpen && (
                  <DropdownMenu>
                    <MenuItem 
                      data-icon="profile"
                      onClick={() => handleNavigation('/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem 
                      data-icon="settings"
                      onClick={() => handleNavigation('/settings')}
                    >
                      Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem 
                      data-icon="logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </DropdownMenu>
                )}
              </UserMenuContainer>
            )}
          </HeaderRight>
        </HeaderContent>
      </HeaderContainer>

      {isMobileMenuOpen && (
        <>
          <MobileSidebarOverlay 
            $isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <MobileSidebar 
            $isOpen={isMobileMenuOpen}
            className="mobile-sidebar"
          >
            <MobileSidebarHeader>
              <Logo>Frontendly</Logo>
              <MobileSidebarClose onClick={() => setIsMobileMenuOpen(false)}>
                ✕
              </MobileSidebarClose>
            </MobileSidebarHeader>
            <MobileSidebarNav>
              <MobileMenu $isOpen={isMobileMenuOpen}>
                {navLinks.map((link) => (
                  <StyledMobileNavLink 
                    key={link.href} 
                    href={link.href}
                    $active={activePath === link.href}
                    onClick={() => {
                      handleNavigation(link.href);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </StyledMobileNavLink>
                ))}
                {user && (
                  <StyledMobileNavLink 
                    href="/profile" 
                    onClick={() => {
                      handleNavigation('/profile');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Profile
                  </StyledMobileNavLink>
                )}
              </MobileMenu>
            </MobileSidebarNav>
            <MobileSidebarActions>
              <ThemeToggle 
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <span>{isDarkMode ? '☀️' : '🌙'}</span>
                <span>Toggle Theme</span>
              </ThemeToggle>
              {user && (
                <UserButton onClick={handleUserMenuToggle}>
                  <UserAvatar 
                    src={user.photoURL || '/default-avatar.png'} 
                    alt={user.displayName || 'User'} 
                  />
                  <UserName>{user.displayName || user.email}</UserName>
                </UserButton>
              )}
            </MobileSidebarActions>
          </MobileSidebar>
        </>
      )}
    </>
  );
} 