import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBook, FaUser, FaClipboardList } from 'react-icons/fa';

const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: ${props => props.theme.colors.background}dd;
  backdrop-filter: blur(8px);
  border-top: 1px solid ${props => props.theme.colors.border};
  z-index: 9999;
  display: none;
  padding-bottom: env(safe-area-inset-bottom);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 0.5rem;
  }

  @media (max-width: 360px) {
    height: 64px;
    padding: 0 0.25rem;
  }
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: ${props =>
    props.$isActive ? props.theme.colors.primary : props.theme.colors.textSecondary};
  text-decoration: none;
  padding: 8px;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  min-width: 64px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${props => (props.$isActive ? props.theme.colors.primary : 'transparent')};
    transition: all 0.2s ease;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 360px) {
    min-width: 56px;
    padding: 6px;
  }
`;

const NavIcon = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  @media (max-width: 360px) {
    font-size: 1.125rem;
  }
`;

const NavLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 360px) {
    font-size: 0.7rem;
  }
`;

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: <FaHome />, label: 'Home' },
    { href: '/learn', icon: <FaBook />, label: 'Learn' },
    { href: '/interview', icon: <FaClipboardList />, label: 'Interview' },
    { href: '/account', icon: <FaUser />, label: 'Account' },
  ];

  return (
    <BottomNavContainer>
      {navItems.map(item => (
        <NavItem
          key={item.href}
          href={item.href}
          $isActive={pathname === item.href}
          aria-label={item.label}
        >
          <NavIcon>{item.icon}</NavIcon>
          <NavLabel>{item.label}</NavLabel>
        </NavItem>
      ))}
    </BottomNavContainer>
  );
};

export default BottomNav;
