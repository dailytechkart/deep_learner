import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../shared/Avatar';
import { useAuth } from '@/app/hooks/useAuth';

const HeaderContainer = styled.header`
  height: 64px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 50;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export const Header: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userImage = user?.photoURL;

  return (
    <HeaderContainer>
      <UserSection>
        <UserName>{userName}</UserName>
        <Avatar name={userName} imageUrl={userImage || undefined} size="sm" />
      </UserSection>
    </HeaderContainer>
  );
};
