import React from 'react';
import { FaBook, FaCode, FaServer } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

const BookIcon: React.FC<IconBaseProps> = props => <FaBook {...props} />;
const CodeIcon: React.FC<IconBaseProps> = props => <FaCode {...props} />;
const ServerIcon: React.FC<IconBaseProps> = props => <FaServer {...props} />;

export interface NavItem {
  href: string;
  icon: React.FC<IconBaseProps>;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/learn', icon: BookIcon, label: 'Learn' },
  { href: '/interview', icon: CodeIcon, label: 'Interviews' },
  { href: '/system-design', icon: ServerIcon, label: 'System Design' },
];
