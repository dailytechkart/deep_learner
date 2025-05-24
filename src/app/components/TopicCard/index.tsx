import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  FaCode,
  FaCss3,
  FaReact,
  FaGitAlt,
  FaVial,
  FaServer,
  FaShieldAlt,
  FaSearch,
  FaTachometerAlt,
  FaJs,
  FaDatabase,
  FaNetworkWired,
  FaLock,
  FaChartLine,
  FaTools,
  FaLaptopCode,
  FaMobile,
  FaGlobe,
  FaCloud,
  FaRobot,
  FaBrain,
  FaBook,
  FaRocket,
  FaGraduationCap,
  FaProjectDiagram,
  FaBug,
} from 'react-icons/fa';

interface TopicCardProps {
  topic: {
    id: string;
    title: string;
    description: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
  };
}

interface IconWrapperProps {
  category: string;
  children: React.ReactNode;
}

const Card = styled.div`
  background: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CardImage = styled.div<{ category: string }>`
  width: 100%;
  height: 100px;
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${props => {
      switch (props.category) {
        case 'JavaScript':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`;
        case 'CSS':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 100 L0 100 Z M20 20 L80 20 L80 80 L20 80 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`;
        case 'React':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'/%3E%3C/svg%3E")`;
        case 'CI/CD':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 50 L40 20 L40 80 Z M60 20 L60 80 L90 50 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`;
        case 'Testing':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L80 20 L80 80 L20 80 Z M30 30 L70 30 L70 70 L30 70 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`;
        case 'System Design':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L80 20 L80 80 L20 80 Z M40 40 L60 40 L60 60 L40 60 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`;
        case 'Security':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 L80 40 L80 80 L20 80 L20 40 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`;
        case 'SEO':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L80 20 L80 80 L20 80 Z M30 30 L70 30 L70 70 L30 70 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`;
        case 'Performance':
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 80 L40 40 L60 60 L80 20' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'/%3E%3C/svg%3E")`;
        default:
          return `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L80 20 L80 80 L20 80 Z' fill='rgba(255,255,255,0.1)'/%3E%3C/svg%3E")`;
      }
    }};
    background-size: 100px 100px;
    opacity: 0.5;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);
  }
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
`;

const Title = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  line-height: 1.3;
  margin: 0;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
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
  color: white;
  white-space: nowrap;
  height: fit-content;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProgressLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.textSecondary};
`;

const ProgressValue = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.theme.colors.primary};
    transition: width 0.2s ease;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xs};
  margin-top: auto;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 8px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const StatValue = styled.p`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin: 0 0 2px 0;
`;

const StatLabel = styled.p`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
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

const IconWrapper = styled.div<IconWrapperProps>`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    switch (props.category) {
      case 'JavaScript':
        return '#F7DF1E';
      case 'CSS':
        return '#264DE4';
      case 'React':
        return '#61DAFB';
      case 'CI/CD':
        return '#F05032';
      case 'Testing':
        return '#4CAF50';
      case 'System Design':
        return '#2196F3';
      case 'Security':
        return '#FFC107';
      case 'SEO':
        return '#9C27B0';
      case 'Performance':
        return '#00BCD4';
      default:
        return props.theme.colors.primary;
    }
  }};
  font-size: 1.1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const getTopicIcon = (category: string, title: string) => {
  // Category-based icons
  switch (category) {
    case 'JavaScript':
      return <FaJs />;
    case 'CSS':
      return <FaCss3 />;
    case 'React':
      return <FaReact />;
    case 'CI/CD':
      return <FaGitAlt />;
    case 'Testing':
      return <FaVial />;
    case 'System Design':
      return <FaServer />;
    case 'Security':
      return <FaShieldAlt />;
    case 'SEO':
      return <FaSearch />;
    case 'Performance':
      return <FaTachometerAlt />;
    default:
      // Title-based icons for specific topics
      if (title.toLowerCase().includes('fundamentals')) return <FaBook />;
      if (title.toLowerCase().includes('advanced')) return <FaRocket />;
      if (title.toLowerCase().includes('basics')) return <FaGraduationCap />;
      if (title.toLowerCase().includes('patterns')) return <FaProjectDiagram />;
      if (title.toLowerCase().includes('optimization')) return <FaChartLine />;
      if (title.toLowerCase().includes('security')) return <FaLock />;
      if (title.toLowerCase().includes('testing')) return <FaBug />;
      if (title.toLowerCase().includes('architecture')) return <FaNetworkWired />;
      if (title.toLowerCase().includes('database')) return <FaDatabase />;
      if (title.toLowerCase().includes('api')) return <FaCode />;
      if (title.toLowerCase().includes('cloud')) return <FaCloud />;
      if (title.toLowerCase().includes('mobile')) return <FaMobile />;
      if (title.toLowerCase().includes('web')) return <FaGlobe />;
      if (title.toLowerCase().includes('ai')) return <FaRobot />;
      if (title.toLowerCase().includes('machine learning')) return <FaBrain />;
      if (title.toLowerCase().includes('frontend')) return <FaLaptopCode />;
      if (title.toLowerCase().includes('backend')) return <FaServer />;
      if (title.toLowerCase().includes('fullstack')) return <FaCode />;
      if (title.toLowerCase().includes('devops')) return <FaTools />;
      if (title.toLowerCase().includes('database')) return <FaDatabase />;
      if (title.toLowerCase().includes('api')) return <FaCode />;
      if (title.toLowerCase().includes('cloud')) return <FaCloud />;
      if (title.toLowerCase().includes('mobile')) return <FaMobile />;
      if (title.toLowerCase().includes('web')) return <FaGlobe />;
      if (title.toLowerCase().includes('ai')) return <FaRobot />;
      if (title.toLowerCase().includes('machine learning')) return <FaBrain />;
      if (title.toLowerCase().includes('frontend')) return <FaLaptopCode />;
      if (title.toLowerCase().includes('backend')) return <FaServer />;
      if (title.toLowerCase().includes('fullstack')) return <FaCode />;
      if (title.toLowerCase().includes('devops')) return <FaTools />;
      return <FaCode />; // Default icon
  }
};

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <Link href={`/topics/${topic.id}`}>
      <Card>
        <CardImage category={topic.category}>
          <IconWrapper category={topic.category}>
            {getTopicIcon(topic.category, topic.title)}
          </IconWrapper>
        </CardImage>
        <CardContent>
          <div>
            <CardHeader>
              <Title>{topic.title}</Title>
              <DifficultyBadge difficulty={topic.difficulty}>{topic.difficulty}</DifficultyBadge>
            </CardHeader>
            <Description>{topic.description}</Description>
          </div>

          <ProgressContainer>
            <ProgressHeader>
              <ProgressLabel>Progress</ProgressLabel>
              <ProgressValue>{topic.progress}%</ProgressValue>
            </ProgressHeader>
            <ProgressBar progress={topic.progress} />
          </ProgressContainer>

          <StatsGrid>
            <StatItem>
              <StatValue>{topic.completedLessons}</StatValue>
              <StatLabel>Completed</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{topic.totalLessons}</StatValue>
              <StatLabel>Total</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{topic.estimatedTime}</StatValue>
              <StatLabel>Est. Time</StatLabel>
            </StatItem>
          </StatsGrid>

          <CategoryBadge>{topic.category}</CategoryBadge>
        </CardContent>
      </Card>
    </Link>
  );
};
