'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { FaUser, FaSignOutAlt, FaCog, FaUserCircle } from 'react-icons/fa';

const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const UserAvatar = styled.div<{ $src?: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: ${props => (props.$src ? `url(${props.$src})` : 'none')};
  background-color: ${props => props.theme.colors.backgroundAlt};
  background-size: cover;
  background-position: center;
  border: 2px solid ${props => props.theme.colors.primary};
  box-shadow: 0 2px 4px ${props => props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.25rem;
`;

const UserName = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;

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
`;

const MenuHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
`;

const MenuHeaderName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const MenuHeaderEmail = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.textSecondary};
  }

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};

    svg {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.border};
  margin: 0.5rem 0;
`;

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0];
  const userEmail = user?.email;
  const userAvatar = user?.user_metadata?.avatar_url;

  return (
    <UserMenuContainer ref={menuRef}>
      <UserButton onClick={() => setIsOpen(!isOpen)}>
        <UserAvatar $src={userAvatar}>{!userAvatar && <FaUser />}</UserAvatar>
        <UserName>{userName}</UserName>
      </UserButton>

      {isOpen && (
        <DropdownMenu>
          <MenuHeader>
            <MenuHeaderName>{userName}</MenuHeaderName>
            <MenuHeaderEmail>{userEmail}</MenuHeaderEmail>
          </MenuHeader>
          <MenuItem onClick={() => router.push('/profile')}>
            <FaUserCircle />
            Profile
          </MenuItem>
          <MenuItem onClick={() => router.push('/settings')}>
            <FaCog />
            Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </MenuItem>
        </DropdownMenu>
      )}
    </UserMenuContainer>
  );
}
