import { ReactNode } from 'react';

export interface HeaderProps {}

export interface LogoProps {
  onClick?: () => void;
}

export interface UserMenuProps {
  user: {
    id?: string;
    name?: string;
    email?: string | null;
    avatar?: string;
    [key: string]: any;
  };
  onSignOut: () => Promise<void>;
}

export interface NavItem {
  href: string;
  icon: ReactNode;
  label: string;
} 