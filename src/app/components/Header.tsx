'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Header as StyledHeader,
  HeaderContent,
  HeaderLeft,
  QuickActions,
  ActionButton,
  Logo,
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
  UserName,
  NavLink,
  NavLinks,
  Badge,
  NotificationButton,
  MobileMenuButton,
  MobileMenu,
  MobileNavLink,
  NavItem,
  NavDropdown,
  NavDropdownContent,
  NavDropdownItem,
  NavDropdownTitle,
  NavDropdownDescription,
  LandingHeader,
  LandingNavLinks,
  LandingNavLink,
  LandingActions
} from './StyledComponents';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onThemeToggle,
  searchQuery,
  onSearchChange
}) => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        setIsMenuOpen(false);
      }
      if (!target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
      if (!target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainNavItems = [
    {
      label: 'Learn',
      href: '/learn',
      dropdown: {
        title: 'Frontend Learning Paths',
        items: [
          { title: 'HTML & CSS', description: 'Master the fundamentals of web markup and styling', href: '/learn/html-css' },
          { title: 'JavaScript', description: 'Learn modern JavaScript and ES6+ features', href: '/learn/javascript' },
          { title: 'React', description: 'Build modern web applications with React', href: '/learn/react' },
          { title: 'TypeScript', description: 'Add type safety to your JavaScript code', href: '/learn/typescript' }
        ]
      }
    },
    {
      label: 'Practice',
      href: '/practice',
      dropdown: {
        title: 'Frontend Practice',
        items: [
          { title: 'CSS Challenges', description: 'Master layout and styling techniques', href: '/practice/css' },
          { title: 'JavaScript Exercises', description: 'Practice modern JavaScript concepts', href: '/practice/javascript' },
          { title: 'React Projects', description: 'Build real-world React applications', href: '/practice/react' },
          { title: 'TypeScript Tasks', description: 'Apply TypeScript in practical scenarios', href: '/practice/typescript' }
        ]
      }
    },
    {
      label: 'Resources',
      href: '/resources',
      dropdown: {
        title: 'Frontend Resources',
        items: [
          { title: 'Documentation', description: 'Comprehensive frontend guides and references', href: '/resources/docs' },
          { title: 'Code Snippets', description: 'Reusable frontend code examples', href: '/resources/snippets' },
          { title: 'Tools & Libraries', description: 'Essential frontend development tools', href: '/resources/tools' },
          { title: 'Community', description: 'Connect with frontend developers', href: '/resources/community' }
        ]
      }
    }
  ];

  // Landing page header for non-logged-in users
  if (isLandingPage && !user) {
    return (
      <LandingHeader>
        <HeaderContent>
          <HeaderLeft>
            <Link href="/">
              <Logo>
                <span className="logo-icon">🎓</span>
                Deep Learner
              </Logo>
            </Link>
            <LandingNavLinks>
              <Link href="/learn" passHref legacyBehavior>
                <LandingNavLink>Learn</LandingNavLink>
              </Link>
              <Link href="/practice" passHref legacyBehavior>
                <LandingNavLink>Practice</LandingNavLink>
              </Link>
              <Link href="/resources" passHref legacyBehavior>
                <LandingNavLink>Resources</LandingNavLink>
              </Link>
            </LandingNavLinks>
          </HeaderLeft>
          <LandingActions>
            <ThemeToggle onClick={onThemeToggle} aria-label="Toggle theme">
              {isDarkMode ? '☀️' : '🌙'}
            </ThemeToggle>
            <Link href="/login" passHref legacyBehavior>
              <ActionButton>Sign In</ActionButton>
            </Link>
            <Link href="/signup" passHref legacyBehavior>
              <ActionButton primary>Get Started</ActionButton>
            </Link>
          </LandingActions>
        </HeaderContent>
      </LandingHeader>
    );
  }

  // Regular header for logged-in users or non-landing pages
  return (
    <StyledHeader>
      <HeaderContent>
        <HeaderLeft>
          <Link href="/">
            <Logo>
              <span className="logo-icon">🎓</span>
              Deep Learner
            </Logo>
          </Link>
          
          <NavLinks>
            {mainNavItems.map((item) => (
              <NavItem
                key={item.href}
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
                className="nav-dropdown"
              >
                <Link href={item.href} passHref legacyBehavior>
                  <NavLink>
                    {item.label}
                  </NavLink>
                </Link>
                {activeDropdown === item.label && (
                  <NavDropdown>
                    <NavDropdownContent>
                      <NavDropdownTitle>{item.dropdown.title}</NavDropdownTitle>
                      {item.dropdown.items.map((dropdownItem) => (
                        <Link key={dropdownItem.href} href={dropdownItem.href} passHref legacyBehavior>
                          <NavDropdownItem>
                            <NavDropdownTitle>{dropdownItem.title}</NavDropdownTitle>
                            <NavDropdownDescription>{dropdownItem.description}</NavDropdownDescription>
                          </NavDropdownItem>
                        </Link>
                      ))}
                    </NavDropdownContent>
                  </NavDropdown>
                )}
              </NavItem>
            ))}
          </NavLinks>

          {user && (
            <SearchContainer isFocused={isSearchFocused}>
              <SearchInput
                type="text"
                placeholder="Search topics, challenges, or users..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <SearchIcon>🔍</SearchIcon>
            </SearchContainer>
          )}
        </HeaderLeft>

        <QuickActions>
          {user ? (
            <>
              <ActionButton>
                <span>📚</span>
                <span className="action-label">My Learning</span>
              </ActionButton>
              <NotificationButton>
                <span>🔔</span>
                {notifications > 0 && <Badge>{notifications}</Badge>}
              </NotificationButton>
              <ThemeToggle onClick={onThemeToggle} aria-label="Toggle theme">
                {isDarkMode ? '☀️' : '🌙'}
              </ThemeToggle>
              <UserMenuContainer className="user-menu">
                <UserButton onClick={toggleMenu}>
                  <UserAvatar
                    src={user.photoURL || '/default-avatar.svg'}
                    alt={user.displayName || 'User'}
                    width={32}
                    height={32}
                  />
                  <UserName>{user.displayName || user.email}</UserName>
                </UserButton>
                {isMenuOpen && (
                  <DropdownMenu>
                    <Link href="/profile" passHref legacyBehavior>
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link href="/settings" passHref legacyBehavior>
                      <MenuItem>Settings</MenuItem>
                    </Link>
                    <Link href="/notifications" passHref legacyBehavior>
                      <MenuItem>
                        Notifications
                        {notifications > 0 && <Badge>{notifications}</Badge>}
                      </MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={handleSignOut} disabled={isSigningOut}>
                      {isSigningOut ? 'Signing out...' : 'Sign Out'}
                    </MenuItem>
                  </DropdownMenu>
                )}
              </UserMenuContainer>
              <MobileMenuButton onClick={toggleMobileMenu} className="mobile-menu">
                <span>☰</span>
              </MobileMenuButton>
            </>
          ) : (
            <>
              <ThemeToggle onClick={onThemeToggle} aria-label="Toggle theme">
                {isDarkMode ? '☀️' : '🌙'}
              </ThemeToggle>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/login" passHref legacyBehavior>
                  <ActionButton>Sign In</ActionButton>
                </Link>
                <Link href="/signup" passHref legacyBehavior>
                  <ActionButton primary>Get Started</ActionButton>
                </Link>
              </div>
            </>
          )}
        </QuickActions>
      </HeaderContent>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu>
          {mainNavItems.map((item) => (
            <React.Fragment key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <MobileNavLink>
                  <span className="nav-icon">📚</span>
                  {item.label}
                </MobileNavLink>
              </Link>
              {item.dropdown.items.map((dropdownItem) => (
                <MobileNavLink key={dropdownItem.href} href={dropdownItem.href} style={{ paddingLeft: '2rem' }}>
                  {dropdownItem.title}
                </MobileNavLink>
              ))}
            </React.Fragment>
          ))}
          {user && (
            <>
              <Link href="/profile" passHref legacyBehavior>
                <MobileNavLink>
                  <span className="nav-icon">👤</span>
                  Profile
                </MobileNavLink>
              </Link>
              <Link href="/settings" passHref legacyBehavior>
                <MobileNavLink>
                  <span className="nav-icon">⚙️</span>
                  Settings
                </MobileNavLink>
              </Link>
              <Link href="/notifications" passHref legacyBehavior>
                <MobileNavLink>
                  <span className="nav-icon">🔔</span>
                  Notifications
                  {notifications > 0 && <Badge>{notifications}</Badge>}
                </MobileNavLink>
              </Link>
              <MobileNavLink as="button" onClick={handleSignOut} disabled={isSigningOut}>
                <span className="nav-icon">🚪</span>
                {isSigningOut ? 'Signing out...' : 'Sign Out'}
              </MobileNavLink>
            </>
          )}
        </MobileMenu>
      )}
    </StyledHeader>
  );
};

export default Header; 