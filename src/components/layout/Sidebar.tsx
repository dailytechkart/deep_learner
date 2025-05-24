import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBook, FaCode, FaLaptopCode, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/app/hooks/useAuth';

const SidebarContainer = styled.aside`
  width: 280px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 100;

  @media (max-width: 1024px) {
    width: 240px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  padding: 1rem 0;
  text-align: center;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  padding: 0 1rem;
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => (props.isActive ? props.theme.colors.primary : props.theme.colors.text)};
  background: ${props => (props.isActive ? props.theme.colors.primary + '10' : 'transparent')};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background: ${props => props.theme.colors.primary + '10'};
    color: ${props => props.theme.colors.primary};
  }
`;

const NavIcon = styled.div`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spacer = styled.div`
  flex: 1;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.textSecondary};
  background: transparent;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.text};
  }
`;

const navItems = [
  {
    title: 'Main',
    items: [
      { icon: <FaHome />, label: 'Dashboard', href: '/dashboard' },
      { icon: <FaBook />, label: 'Learn', href: '/learn' },
      { icon: <FaCode />, label: 'DSA Practice', href: '/interview?type=dsa' },
      { icon: <FaLaptopCode />, label: 'Machine Coding', href: '/interview?type=machine-coding' },
    ],
  },
  {
    title: 'Account',
    items: [
      { icon: <FaUser />, label: 'Profile', href: '/profile' },
      { icon: <FaCog />, label: 'Settings', href: '/settings' },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <SidebarContainer>
      <Logo>Deep Learner</Logo>
      {navItems.map(section => (
        <NavSection key={section.title}>
          <NavTitle>{section.title}</NavTitle>
          {section.items.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
            >
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </NavLink>
          ))}
        </NavSection>
      ))}
      <Spacer />
      <LogoutButton onClick={signOut}>
        <NavIcon>
          <FaSignOutAlt />
        </NavIcon>
        Logout
      </LogoutButton>
    </SidebarContainer>
  );
};
