import React from 'react';
import { FaBook, FaCode, FaServer } from 'react-icons/fa';
import { NavItem } from './Header.types';

export const NAV_ITEMS: NavItem[] = [
  { href: '/learn', icon: <FaBook />, label: 'Learn' },
  { href: '/interview', icon: <FaCode />, label: 'Interviews' },
  { href: '/system-design', icon: <FaServer />, label: 'System Design' },
]; 