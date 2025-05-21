'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaBook,
  FaServer,
  FaDatabase,
  FaCloud,
  FaMicrochip,
  FaNetworkWired,
  FaShieldAlt,
  FaUsers,
  FaStar,
  FaReact,
  FaCode,
  FaMobile,
  FaGlobe,
  FaLaptopCode,
  FaTools,
  FaQuestionCircle,
} from 'react-icons/fa';
import MainLayout from '@/components/MainLayout';
import { useTheme } from '@/app/context/ThemeContext';

// Styled Components
const PageContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ContentSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 4rem;
  padding: 0;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  line-height: 1.7;
`;

const StatsBar = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const StatIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const ProblemsCTA = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: ${props => props.theme.colors.primary}10;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem 2.5rem;
  margin: 2.5rem 0 2rem 0;
  box-shadow: 0 4px 24px ${props => props.theme.colors.primary}15;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.25rem 1rem;
    gap: 1rem;
  }
`;

const ProblemsCTAText = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const ProblemsCTAIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2.2rem;
  display: flex;
  align-items: center;
`;

const ProblemsCTAContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ProblemsCTAHeading = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const ProblemsCTADesc = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ProblemsButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  padding: 0.85rem 2.25rem;
  text-decoration: none;
  box-shadow: 0 2px 12px ${props => props.theme.colors.primary}30;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: #fff;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 4px 18px ${props => props.theme.colors.primary}40;
  }
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 2rem;
  position: relative;
  padding-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TopicCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid ${props => props.theme.colors.border};

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

const Tag = styled.span<{ type: 'beginner' | 'intermediate' | 'advanced' | 'technology' | 'role' | 'premium' }>`
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
  background: #FFF8E1;
  color: #FF8F00;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(255, 143, 0, 0.2);
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  position: relative;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 0.5rem;
  background: transparent;
`;

const StyledTab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: ${props => (props.active ? 700 : 500)};
  color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.textSecondary)};
  background: ${props => (props.active ? props.theme.colors.primary + '10' : 'transparent')};
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem 0.75rem 0 0;
  position: relative;
  transition: color 0.2s, background 0.2s;

  & svg {
    color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.textSecondary)};
    font-size: 1.2em;
    transition: color 0.2s;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary + '08'};
    & svg {
      color: ${props => props.theme.colors.primary};
    }
  }

  &::after {
    content: '';
    display: ${props => (props.active ? 'block' : 'none')};
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.5rem;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px 2px 0 0;
  }
`;

const TabContent = styled.div`
  margin-top: 2rem;
`;

interface SystemDesignTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  technologies: string[];
  roles: string[];
}

const systemDesignTopics: SystemDesignTopic[] = [
  {
    id: 'frontend-architecture',
    title: 'Frontend Architecture',
    description: 'Design scalable frontend applications with modern patterns, state management, and component architecture.',
    icon: <FaReact />,
    tags: ['intermediate', 'premium'],
    technologies: ['React', 'TypeScript', 'State Management'],
    roles: ['Frontend Architect', 'Senior Frontend Developer'],
  },
  {
    id: 'micro-frontends',
    title: 'Micro-Frontends',
    description: 'Implement micro-frontend architecture for large-scale applications with independent deployment.',
    icon: <FaLaptopCode />,
    tags: ['advanced', 'premium'],
    technologies: ['Module Federation', 'Webpack', 'Single-SPA'],
    roles: ['Frontend Architect', 'Tech Lead'],
  },
  {
    id: 'frontend-performance',
    title: 'Frontend Performance',
    description: 'Optimize frontend applications for speed, including code splitting, caching, and bundle optimization.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Webpack', 'Vite', 'Performance Monitoring'],
    roles: ['Frontend Developer', 'Performance Engineer'],
  },
  {
    id: 'progressive-web-apps',
    title: 'Progressive Web Apps',
    description: 'Design and implement PWAs with offline support, push notifications, and app-like experience.',
    icon: <FaMobile />,
    tags: ['intermediate'],
    technologies: ['Service Workers', 'Web App Manifest', 'IndexedDB'],
    roles: ['Frontend Developer', 'Mobile Developer'],
  },
  {
    id: 'frontend-security',
    title: 'Frontend Security',
    description: 'Implement secure frontend applications with proper authentication, authorization, and data protection.',
    icon: <FaShieldAlt />,
    tags: ['advanced', 'premium'],
    technologies: ['OAuth', 'JWT', 'CSP'],
    roles: ['Frontend Developer', 'Security Engineer'],
  },
  {
    id: 'state-management',
    title: 'State Management',
    description: 'Design efficient state management solutions for complex frontend applications.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Redux', 'MobX', 'Zustand'],
    roles: ['Frontend Developer', 'State Management Expert'],
  },
  {
    id: 'frontend-testing',
    title: 'Frontend Testing',
    description: 'Implement comprehensive testing strategies for frontend applications.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Jest', 'React Testing Library', 'Cypress'],
    roles: ['Frontend Developer', 'QA Engineer'],
  },
  {
    id: 'frontend-monitoring',
    title: 'Frontend Monitoring',
    description: 'Design and implement frontend monitoring and error tracking systems.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Sentry', 'LogRocket', 'New Relic'],
    roles: ['Frontend Developer', 'Performance Engineer'],
  },
  {
    id: 'frontend-caching',
    title: 'Frontend Caching',
    description: 'Implement efficient caching strategies for frontend applications.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Service Workers', 'IndexedDB', 'LocalStorage'],
    roles: ['Frontend Developer', 'Performance Engineer'],
  },
  {
    id: 'frontend-build',
    title: 'Frontend Build Systems',
    description: 'Design and optimize frontend build systems for large-scale applications.',
    icon: <FaCode />,
    tags: ['advanced'],
    technologies: ['Webpack', 'Vite', 'Rollup'],
    roles: ['Frontend Developer', 'Build Engineer'],
  },
  {
    id: 'frontend-ssr',
    title: 'Server-Side Rendering',
    description: 'Implement SSR strategies for improved performance and SEO.',
    icon: <FaCode />,
    tags: ['advanced', 'premium'],
    technologies: ['Next.js', 'Nuxt.js', 'Remix'],
    roles: ['Frontend Developer', 'Full Stack Developer'],
  },
  {
    id: 'frontend-accessibility',
    title: 'Frontend Accessibility',
    description: 'Design accessible frontend applications following WCAG guidelines.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['ARIA', 'Screen Readers', 'Keyboard Navigation'],
    roles: ['Frontend Developer', 'Accessibility Expert'],
  }
];

const SystemDesignPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'performance' | 'architecture' | 'security'>('all');

  const allTechnologies = Array.from(new Set(systemDesignTopics.flatMap(topic => topic.technologies)));
  const allRoles = Array.from(new Set(systemDesignTopics.flatMap(topic => topic.roles)));

  const getTopicsByCategory = (category: string) => {
    switch (category) {
      case 'frontend':
        return systemDesignTopics.filter(topic => 
          topic.roles.some(role => role.includes('Frontend')) ||
          topic.technologies.some(tech => ['React', 'TypeScript', 'Webpack', 'Vite'].includes(tech))
        );
      case 'performance':
        return systemDesignTopics.filter(topic => 
          topic.roles.some(role => role.includes('Performance')) ||
          topic.title.toLowerCase().includes('performance') ||
          topic.title.toLowerCase().includes('caching')
        );
      case 'architecture':
        return systemDesignTopics.filter(topic => 
          topic.title.toLowerCase().includes('architecture') ||
          topic.title.toLowerCase().includes('system')
        );
      case 'security':
        return systemDesignTopics.filter(topic => 
          topic.roles.some(role => role.includes('Security')) ||
          topic.title.toLowerCase().includes('security')
        );
      default:
        return systemDesignTopics;
    }
  };

  const filteredTopics = getTopicsByCategory(activeTab).filter(topic => {
    const matchesDifficulty =
      selectedDifficulty.length === 0 || topic.tags.some(tag => selectedDifficulty.includes(tag));
    const matchesTechnology =
      selectedTechnologies.length === 0 ||
      topic.technologies.some(tech => selectedTechnologies.includes(tech));
    const matchesRole =
      selectedRoles.length === 0 || topic.roles.some(role => selectedRoles.includes(role));
    return matchesDifficulty && matchesTechnology && matchesRole;
  });

  return (
    <MainLayout>
      <PageContainer>
        <ContentSection>
          <Header>
            <Title>System Design Mastery</Title>
            <Description>
              Master the art of designing scalable, reliable, and efficient systems. From distributed
              systems to cloud architecture, learn everything you need to excel in system design
              interviews and real-world applications.
            </Description>

            <StatsBar>
              <StatItem>
                <StatIcon>
                  <FaBook />
                </StatIcon>
                <span>100+ Design Patterns</span>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FaServer />
                </StatIcon>
                <span>50+ Case Studies</span>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FaUsers />
                </StatIcon>
                <span>5k+ Success Stories</span>
              </StatItem>
            </StatsBar>

            <ProblemsCTA>
              <ProblemsCTAText>
                <ProblemsCTAIcon>
                  <FaQuestionCircle />
                </ProblemsCTAIcon>
                <ProblemsCTAContent>
                  <ProblemsCTAHeading>Practice System Design Problems</ProblemsCTAHeading>
                  <ProblemsCTADesc>
                    Ready to apply your knowledge? Jump into real-world system design problems and sharpen your skills with hands-on practice.
                  </ProblemsCTADesc>
                </ProblemsCTAContent>
              </ProblemsCTAText>
              <ProblemsButton href="/system-design/problems">
                Go to Problems
              </ProblemsButton>
            </ProblemsCTA>
          </Header>

          <TabContainer>
            <TabBar>
              <StyledTab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
                <FaServer /> Topics
              </StyledTab>
              <StyledTab active={activeTab === 'frontend'} onClick={() => setActiveTab('frontend')}>
                <FaReact /> Frontend
              </StyledTab>
              <StyledTab active={activeTab === 'performance'} onClick={() => setActiveTab('performance')}>
                <FaCode /> Performance
              </StyledTab>
              <StyledTab active={activeTab === 'architecture'} onClick={() => setActiveTab('architecture')}>
                <FaLaptopCode /> Architecture
              </StyledTab>
              <StyledTab active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
                <FaShieldAlt /> Security
              </StyledTab>
            </TabBar>
          </TabContainer>

          <SectionHeading>
            <FaServer /> System Design Topics
          </SectionHeading>
          <SectionDescription>
            Explore comprehensive system design topics and patterns. Click a topic to start learning
            and practicing system design concepts.
          </SectionDescription>

          <TopicsGrid>
            {filteredTopics.map(topic => (
              <TopicCard key={topic.id}>
                {topic.tags.includes('premium') && (
                  <PremiumBadge>
                    <FaStar size={12} /> Premium
                  </PremiumBadge>
                )}
                <TopicIcon className="topic-icon">{topic.icon}</TopicIcon>
                <TopicTitle>{topic.title}</TopicTitle>
                <TopicDescription>{topic.description}</TopicDescription>
                <TagGroup>
                  {topic.tags.filter(tag => tag !== 'premium').map(tag => (
                    <Tag key={tag} type={tag as 'beginner' | 'intermediate' | 'advanced'}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Tag>
                  ))}
                  {topic.technologies.map(tech => (
                    <Tag key={tech} type="technology">
                      {tech}
                    </Tag>
                  ))}
                  {topic.roles.map(role => (
                    <Tag key={role} type="role">
                      {role}
                    </Tag>
                  ))}
                </TagGroup>
                <ActionBar>
                  <StartButton>
                    {topic.tags.includes('premium') ? 'Upgrade to Access' : 'Start Learning'}
                  </StartButton>
                </ActionBar>
              </TopicCard>
            ))}
          </TopicsGrid>
        </ContentSection>
      </PageContainer>
    </MainLayout>
  );
};

export default SystemDesignPage;
