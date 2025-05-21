'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  UserMenuContainer,
  UserButton,
  UserAvatar,
  UserName,
  DropdownMenu,
  MenuItem,
  MenuDivider,
} from './StyledComponents';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  return (
    <UserMenuContainer>
      <UserButton onClick={() => setIsOpen(!isOpen)}>
        <UserAvatar
          src={user.photoURL || '/default-avatar.png'}
          alt={user.displayName || 'User'}
          width={32}
          height={32}
        />
        <UserName>{user.displayName || user.email}</UserName>
      </UserButton>

      {isOpen && (
        <DropdownMenu>
          <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
          <MenuItem onClick={() => router.push('/settings')}>Settings</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
        </DropdownMenu>
      )}
    </UserMenuContainer>
  );
}
