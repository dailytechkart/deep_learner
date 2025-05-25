import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  imageUrl?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getSize = (size: AvatarProps['size']): string => {
  switch (size) {
    case 'sm':
      return '32px';
    case 'lg':
      return '48px';
    default:
      return '40px';
  }
};

const AvatarContainer = styled.div<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Avatar: React.FC<AvatarProps> = ({ imageUrl, name, size = 'md' }) => {
  const sizeValue = getSize(size);
  const initials = getInitials(name);

  return (
    <AvatarContainer size={sizeValue}>
      {imageUrl ? <AvatarImage src={imageUrl} alt={name} /> : initials}
    </AvatarContainer>
  );
};
