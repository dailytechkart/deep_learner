import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface HeaderProps {
  className?: string;
  children?: ReactNode;
  isSticky?: boolean;
  isTransparent?: boolean;
  searchQuery?: string;
  onSearchChange?: Dispatch<SetStateAction<string>>;
}

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
