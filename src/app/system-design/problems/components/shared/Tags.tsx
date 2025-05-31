import React from 'react';
import styled from 'styled-components';
import { Badge } from '@/components/Badge';
import { FaStar } from 'react-icons/fa';

const BadgeContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;

const PremiumBadge = styled(Badge)`
  background: ${props => props.theme.colors.warning};
  color: ${props => props.theme.colors.background};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};

  svg {
    width: 12px;
    height: 12px;
  }
`;

const DifficultyBadge = styled(Badge)`
  font-size: ${props => props.theme.typography.fontSize.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
`;

export const PremiumTag: React.FC = () => (
  <PremiumBadge>
    <FaStar />
    Premium
  </PremiumBadge>
);

interface DifficultyTagProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const DifficultyTag: React.FC<DifficultyTagProps> = ({ difficulty }) => {
  const getVariant = () => {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'danger';
      default:
        return 'success';
    }
  };

  return <DifficultyBadge variant={getVariant()}>{difficulty}</DifficultyBadge>;
};

interface TagsContainerProps {
  children: React.ReactNode;
}

export const TagsContainer: React.FC<TagsContainerProps> = ({ children }) => (
  <BadgeContainer>{children}</BadgeContainer>
);
