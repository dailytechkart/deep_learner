import React from 'react';
import styled from 'styled-components';
import { FaStar, FaClock, FaBook, FaLock } from 'react-icons/fa';
import { SiJavascript, SiJest } from 'react-icons/si';
import {
  FaReact,
  FaCss3Alt,
  FaGitAlt,
  FaShieldAlt,
  FaSearch as FaSearchIcon,
  FaRocket,
  FaChartLine,
  FaCode,
} from 'react-icons/fa';

const CourseRow = styled.article<{ isLocked?: boolean }>`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;
  cursor: ${props => (props.isLocked ? 'default' : 'pointer')};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  overflow: visible;

  @media (max-width: 1024px) {
    padding: ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: ${props => props.theme.spacing.sm};
  }

  &:hover {
    transform: ${props => (props.isLocked ? 'none' : 'translateY(-2px)')};
    box-shadow: ${props => (props.isLocked ? props.theme.shadows.sm : props.theme.shadows.md)};
  }
`;

const PremiumTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background: linear-gradient(135deg, #ffd700, #ffa500);
  color: #000;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  box-shadow: 0 2px 8px rgba(255, 165, 0, 0.3);
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  opacity: 1;
  visibility: visible;

  svg {
    font-size: 0.875rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 165, 0, 0.4);
  }
`;

const CourseImage = styled.figure<{ category: string; isLocked?: boolean }>`
  width: 200px;
  height: 120px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => {
    switch (props.category) {
      case 'JavaScript':
        return 'linear-gradient(135deg, #F7DF1E 0%, #F0DB4F 100%)';
      case 'CSS':
        return 'linear-gradient(135deg, #264DE4 0%, #2965f1 100%)';
      case 'React':
        return 'linear-gradient(135deg, #61DAFB 0%, #282c34 100%)';
      case 'CI/CD':
        return 'linear-gradient(135deg, #F05032 0%, #f14e32 100%)';
      case 'Testing':
        return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
      case 'System Design':
        return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
      case 'Security':
        return 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)';
      case 'SEO':
        return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)';
      case 'Performance':
        return 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)';
      default:
        return 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)';
    }
  }};
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: ${props => (props.isLocked ? 'grayscale(0.5)' : 'none')};
  transition: all 0.3s ease;
  margin: 0;

  @media (max-width: 1024px) {
    width: 180px;
    height: 108px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 160px;
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background};
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.2s ease;

  svg {
    width: 40px;
    height: 40px;
    color: ${props => props.theme.colors.primary};
  }
`;

const CourseContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  min-width: 0;
`;

const CourseHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const CourseTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.md};
  }
`;

const CourseDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const CourseMeta = styled.footer`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: auto;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const MetaIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const CategoryBadge = styled.span`
  padding: 4px 8px;
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 2px;
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.sm};

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.theme.colors.primary};
    transition: width 0.2s ease;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.difficulty) {
      case 'Beginner':
        return '#4CAF50';
      case 'Intermediate':
        return '#FFC107';
      case 'Advanced':
        return '#F44336';
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: ${props => props.theme.colors.text};
  white-space: nowrap;
  height: fit-content;
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.role) {
      case 'SDE1':
        return '#4CAF50';
      case 'SDE2':
        return '#FFC107';
      case 'SDE3':
        return '#F44336';
      case 'Frontend Specialist':
        return '#2196F3';
      case 'Frontend Architect':
        return '#9C27B0';
      case 'UI/UX Developer':
        return '#FF9800';
      case 'Frontend Performance Engineer':
        return '#00BCD4';
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: ${props => props.theme.colors.text};
  white-space: nowrap;
`;

const LockedBadge = styled.span`
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: rgba(0, 0, 0, 0.6);
  color: ${props => props.theme.colors.primary};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${props => props.theme.colors.primary};

  svg {
    font-size: 12px;
  }
`;

const LockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.lg};
  z-index: 1;
  transition: all 0.3s ease;
`;

const LockContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  max-width: 300px;
`;

const LockIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);

    &::after {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::after {
    content: 'This course is currently under development';
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 2;
  }

  svg {
    font-size: 24px;
    color: ${props => props.theme.colors.primary};
  }
`;

const LockTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: white;
  margin: 0;
`;

interface CourseCardProps {
  topic: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    role: string;
    estimatedTime: string;
    totalLessons: number;
    progress: number;
  };
  isLocked: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ topic, isLocked }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'JavaScript':
        return <SiJavascript />;
      case 'CSS':
        return <FaCss3Alt />;
      case 'React':
        return <FaReact />;
      case 'CI/CD':
        return <FaGitAlt />;
      case 'Testing':
        return <SiJest />;
      case 'System Design':
        return <FaRocket />;
      case 'Security':
        return <FaShieldAlt />;
      case 'SEO':
        return <FaSearchIcon />;
      case 'Performance':
        return <FaChartLine />;
      default:
        return <FaCode />;
    }
  };

  return (
    <CourseRow isLocked={isLocked}>
      <PremiumTag>
        <FaStar aria-hidden="true" />
        Premium
      </PremiumTag>
      <CourseImage category={topic.category} isLocked={isLocked}>
        <IconWrapper aria-hidden="true">{getCategoryIcon(topic.category)}</IconWrapper>
      </CourseImage>
      <CourseContent>
        <CourseHeader>
          <CourseTitle>{topic.title}</CourseTitle>
          <BadgeContainer>
            <DifficultyBadge difficulty={topic.difficulty}>{topic.difficulty}</DifficultyBadge>
            <RoleBadge role={topic.role}>{topic.role}</RoleBadge>
            {isLocked && (
              <LockedBadge>
                <FaLock aria-hidden="true" />
                Coming Soon
              </LockedBadge>
            )}
          </BadgeContainer>
        </CourseHeader>
        <CourseDescription>{topic.description}</CourseDescription>
        <CourseMeta>
          <MetaItem>
            <MetaIcon aria-hidden="true">
              <FaClock />
            </MetaIcon>
            <span>{topic.estimatedTime}</span>
          </MetaItem>
          <MetaItem>
            <MetaIcon aria-hidden="true">
              <FaBook />
            </MetaIcon>
            <span>{topic.totalLessons} Lessons</span>
          </MetaItem>
          <CategoryBadge>{topic.category}</CategoryBadge>
        </CourseMeta>
        <ProgressBar progress={topic.progress} aria-label={`Progress: ${topic.progress}%`} />
      </CourseContent>
      {isLocked && (
        <LockOverlay>
          <LockContent>
            <LockIcon>
              <FaLock aria-hidden="true" />
            </LockIcon>
            <LockTitle>Coming Soon</LockTitle>
          </LockContent>
        </LockOverlay>
      )}
    </CourseRow>
  );
};
