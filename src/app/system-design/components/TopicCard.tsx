import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Card = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${props => props.theme.colors.border}40;
  }
`;

const TopicIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
`;

const TopicTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const TopicDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span<{
  type: 'beginner' | 'intermediate' | 'advanced' | 'technology' | 'role' | 'premium';
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.type) {
      case 'beginner':
        return '#E0F7FA';
      case 'intermediate':
        return '#FFF3E0';
      case 'advanced':
        return '#FCE4EC';
      case 'technology':
        return '#E3F2FD';
      case 'role':
        return '#EDE7F6';
      case 'premium':
        return '#FFF8E1';
      default:
        return '#F5F5F5';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'beginner':
        return '#00796B';
      case 'intermediate':
        return '#F57C00';
      case 'advanced':
        return '#C2185B';
      case 'technology':
        return '#1976D2';
      case 'role':
        return '#512DA8';
      case 'premium':
        return '#FF8F00';
      default:
        return '#616161';
    }
  }};
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const StartButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  padding: 0.75rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px ${props => props.theme.colors.primary}40;
  transition: all 0.2s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${props => props.theme.colors.primary}50;

    &::before {
      transform: translateX(100%);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const PremiumBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: #fff8e1;
  color: #ff8f00;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 143, 0, 0.2);
`;

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  technologies: string[];
  roles: string[];
  isPremium?: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  id,
  title,
  description,
  icon,
  tags,
  technologies,
  roles,
  isPremium = false,
}) => {
  const router = useRouter();

  return (
    <Card>
      {isPremium && (
        <PremiumBadge>
          <FaStar size={12} /> Premium
        </PremiumBadge>
      )}
      <TopicIcon>{icon}</TopicIcon>
      <TopicTitle>{title}</TopicTitle>
      <TopicDescription>{description}</TopicDescription>
      <TagGroup>
        {tags
          .filter(tag => tag !== 'premium')
          .map(tag => (
            <Tag key={tag} type={tag as 'beginner' | 'intermediate' | 'advanced'}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Tag>
          ))}
        {technologies.map(tech => (
          <Tag key={tech} type="technology">
            {tech}
          </Tag>
        ))}
        {roles.map(role => (
          <Tag key={role} type="role">
            {role}
          </Tag>
        ))}
      </TagGroup>
      <ActionBar>
        <StartButton
          onClick={() =>
            isPremium ? router.push('/premium/order') : router.push(`/system-design/${id}`)
          }
        >
          {isPremium ? 'Upgrade to Access' : 'Start Learning'}
        </StartButton>
      </ActionBar>
    </Card>
  );
};
