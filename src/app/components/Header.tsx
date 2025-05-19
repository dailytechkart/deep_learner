'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
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
  MobileSidebarOverlay
} from './StyledComponents';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();

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

  const isActive = (path: string) => pathname === path;

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
              <NavLink 
                href="/learn" 
                className={isActive('/learn') ? 'active' : ''}
                onClick={() => handleNavigation('/learn')}
              >
                Learn
              </NavLink>
              <NavLink 
                href="/practice" 
                className={isActive('/practice') ? 'active' : ''}
                onClick={() => handleNavigation('/practice')}
              >
                Practice
              </NavLink>
              <NavLink 
                href="/system-design" 
                className={isActive('/system-design') ? 'active' : ''}
                onClick={() => handleNavigation('/system-design')}
              >
                System Design
              </NavLink>
              <NavLink 
                href="/roadmap" 
                className={isActive('/roadmap') ? 'active' : ''}
                onClick={() => handleNavigation('/roadmap')}
              >
                Roadmap
              </NavLink>
              <NavLink 
                href="/interview" 
                className={isActive('/interview') ? 'active' : ''}
                onClick={() => handleNavigation('/interview')}
              >
                Interview
              </NavLink>
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
            <UserMenuContainer className="user-menu">
              <UserButton onClick={handleUserMenuToggle}>
                <UserAvatar src="/default-avatar.png" alt="User" />
                <span>John Doe</span>
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
                    onClick={() => handleNavigation('/logout')}
                  >
                    Logout
                  </MenuItem>
                </DropdownMenu>
              )}
            </UserMenuContainer>
          </HeaderRight>
        </HeaderContent>
      </HeaderContainer>

      <MobileSidebarOverlay 
        $isOpen={isMobileMenuOpen} 
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />
      <MobileSidebar 
        $isOpen={isMobileMenuOpen} 
        className="mobile-sidebar"
        aria-hidden={!isMobileMenuOpen}
      >
        <MobileSidebarHeader>
          <Link href="/" passHref>
            <Logo>Frontendly</Logo>
          </Link>
          <MobileSidebarClose 
            onClick={handleMobileMenuToggle}
            aria-label="Close mobile menu"
          >
            ✕
          </MobileSidebarClose>
        </MobileSidebarHeader>
        <MobileSidebarNav>
          <MobileSidebarLink 
            href="/learn" 
            onClick={() => handleNavigation('/learn')}
            className={isActive('/learn') ? 'active' : ''}
          >
            <span className="nav-icon">📚</span>
            Learn
          </MobileSidebarLink>
          <MobileSidebarLink 
            href="/practice" 
            onClick={() => handleNavigation('/practice')}
            className={isActive('/practice') ? 'active' : ''}
          >
            <span className="nav-icon">💻</span>
            Practice
          </MobileSidebarLink>
          <MobileSidebarLink 
            href="/system-design" 
            onClick={() => handleNavigation('/system-design')}
            className={isActive('/system-design') ? 'active' : ''}
          >
            <span className="nav-icon">🏗️</span>
            System Design
          </MobileSidebarLink>
          <MobileSidebarLink 
            href="/roadmap" 
            onClick={() => handleNavigation('/roadmap')}
            className={isActive('/roadmap') ? 'active' : ''}
          >
            <span className="nav-icon">🗺️</span>
            Roadmap
          </MobileSidebarLink>
          <MobileSidebarLink 
            href="/interview" 
            onClick={() => handleNavigation('/interview')}
            className={isActive('/interview') ? 'active' : ''}
          >
            <span className="nav-icon">🎯</span>
            Interview
          </MobileSidebarLink>
        </MobileSidebarNav>
        <MobileSidebarActions>
          <ThemeToggle 
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span>{isDarkMode ? '☀️' : '🌙'}</span>
            <span>Toggle Theme</span>
          </ThemeToggle>
          <UserButton onClick={handleUserMenuToggle}>
            <UserAvatar src="/default-avatar.png" alt="User" />
            <span>John Doe</span>
          </UserButton>
        </MobileSidebarActions>
      </MobileSidebar>
    </>
  );
} 