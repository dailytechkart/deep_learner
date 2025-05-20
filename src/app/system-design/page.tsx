'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { useTheme } from '@/app/context/ThemeContext';
import {
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaCloud,
  FaShieldAlt,
  FaChartLine,
  FaCogs,
  FaUsers,
  FaCode,
  FaLaptopCode,
  FaMobile,
  FaGlobe,
  FaReact,
  FaNodeJs,
  FaAws,
  FaFilter,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiWebpack,
} from 'react-icons/si';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 3rem;
  position: relative;
`;

const FilterSidebar = styled.div`
  width: 320px;
  flex-shrink: 0;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 84px;
  border: 1px solid ${props => props.theme.colors.border};
  align-self: flex-start;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.primary + '20'};
`;

const FilterSection = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const FilterSectionTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 16px;
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
  }
`;

const FilterChip = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
  margin: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${props => (props.active ? props.theme.colors.primary : props.theme.colors.border)};
  background: ${props => (props.active ? props.theme.colors.primary + '15' : 'transparent')};
  color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.textSecondary)};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: ${props => props.theme.colors.primary + '15'};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const FilterChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ClearFiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primary + '15'};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
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
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 2.5rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const TopicIcon = styled.div`
  font-size: 2.75rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  transition: transform 0.3s ease;

  ${TopicCard}:hover & {
    transform: scale(1.1);
  }
`;

const TopicTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: 1.3;
`;

const TopicDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

// Color palette for tags
const tagColors = {
  beginner: { bg: '#E0F7FA', color: '#00796B' },
  intermediate: { bg: '#FFF3E0', color: '#F57C00' },
  advanced: { bg: '#FCE4EC', color: '#C2185B' },
  technology: { bg: '#E3F2FD', color: '#1976D2' },
  role: { bg: '#EDE7F6', color: '#512DA8' },
  company: {
    Google: { bg: '#E8F0FE', color: '#4285F4' },
    Meta: { bg: '#E7F3FF', color: '#1877F2' },
    Amazon: { bg: '#FFF7E0', color: '#FF9900' },
    Microsoft: { bg: '#EAF1FB', color: '#0078D4' },
    Apple: { bg: '#F5F5F7', color: '#000000' },
    default: { bg: '#F3E5F5', color: '#8E24AA' },
  },
};

const getCompanyTagColor = (company: string) => {
  return tagColors.company[company as keyof typeof tagColors.company] || tagColors.company.default;
};

const Tag = styled.span<{
  type?: 'beginner' | 'intermediate' | 'advanced' | 'technology' | 'role';
  color?: string;
  bgColor?: string;
}>`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ type, bgColor }) =>
    bgColor
      ? bgColor
      : type === 'beginner'
        ? tagColors.beginner.bg
        : type === 'intermediate'
          ? tagColors.intermediate.bg
          : type === 'advanced'
            ? tagColors.advanced.bg
            : type === 'technology'
              ? tagColors.technology.bg
              : type === 'role'
                ? tagColors.role.bg
                : tagColors.beginner.bg};
  color: ${({ type, color }) =>
    color
      ? color
      : type === 'beginner'
        ? tagColors.beginner.color
        : type === 'intermediate'
          ? tagColors.intermediate.color
          : type === 'advanced'
            ? tagColors.advanced.color
            : type === 'technology'
              ? tagColors.technology.color
              : type === 'role'
                ? tagColors.role.color
                : tagColors.beginner.color};
  transition: all 0.2s ease;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  &:hover {
    transform: translateY(-1px) scale(1.05);
    filter: brightness(1.08);
  }
`;

const CompanyTag = styled(Tag)<{ company: string }>`
  background: ${({ company }) => getCompanyTagColor(company).bg};
  color: ${({ company }) => getCompanyTagColor(company).color};
`;

const TechIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  color: inherit;
  opacity: 0.9;
`;

const frontendTopics = [
  {
    id: 'react-architecture',
    title: 'React Architecture',
    description:
      'Learn advanced React patterns, component design, state management, and performance optimization techniques.',
    icon: <FaReact />,
    tags: ['intermediate'],
    technologies: ['React', 'TypeScript', 'Redux'],
  },
  {
    id: 'nextjs',
    title: 'Next.js & SSR',
    description:
      'Master server-side rendering, static generation, and advanced Next.js features for production applications.',
    icon: <SiNextdotjs />,
    tags: ['intermediate'],
    technologies: ['Next.js', 'React', 'TypeScript'],
  },
  {
    id: 'state-management',
    title: 'State Management',
    description:
      'Explore different state management solutions, from local state to global state management patterns.',
    icon: <SiRedux />,
    tags: ['intermediate'],
    technologies: ['Redux', 'Context', 'Zustand'],
  },
  {
    id: 'typescript',
    title: 'TypeScript Patterns',
    description:
      'Learn TypeScript best practices, type system, and advanced patterns for robust frontend development.',
    icon: <SiTypescript />,
    tags: ['intermediate'],
    technologies: ['TypeScript', 'React', 'Node.js'],
  },
  {
    id: 'performance',
    title: 'Frontend Performance',
    description:
      'Master performance optimization techniques, code splitting, and bundle optimization strategies.',
    icon: <SiWebpack />,
    tags: ['advanced'],
    technologies: ['Webpack', 'React', 'JavaScript'],
  },
  {
    id: 'styling',
    title: 'CSS & Styling',
    description:
      'Learn modern CSS techniques, styling patterns, and best practices for maintainable styles.',
    icon: <SiTailwindcss />,
    tags: ['intermediate'],
    technologies: ['Tailwind', 'CSS', 'Styled Components'],
  },
  {
    id: 'testing',
    title: 'Testing Strategies',
    description:
      'Master frontend testing techniques, from unit tests to end-to-end testing approaches.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Jest', 'React Testing', 'Cypress'],
  },
  {
    id: 'security',
    title: 'Frontend Security',
    description:
      'Learn about frontend security best practices, authentication, and data protection.',
    icon: <FaShieldAlt />,
    tags: ['advanced'],
    technologies: ['JWT', 'OAuth', 'CORS'],
  },
  {
    id: 'deployment',
    title: 'Deployment & CI/CD',
    description:
      'Master deployment strategies, CI/CD pipelines, and cloud hosting for frontend applications.',
    icon: <FaAws />,
    tags: ['intermediate'],
    technologies: ['AWS', 'Vercel', 'Netlify'],
  },
  {
    id: 'mobile',
    title: 'Mobile-First Design',
    description:
      'Learn responsive design patterns, mobile optimization, and progressive web app development.',
    icon: <FaMobile />,
    tags: ['intermediate'],
    technologies: ['PWA', 'Responsive', 'Mobile'],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description:
      'Master web accessibility standards, ARIA patterns, and inclusive design practices.',
    icon: <FaUsers />,
    tags: ['intermediate'],
    technologies: ['WCAG', 'ARIA', 'Semantic HTML'],
  },
  {
    id: 'architecture',
    title: 'Frontend Architecture',
    description:
      'Learn about frontend architecture patterns, micro-frontends, and scalable application design.',
    icon: <FaLaptopCode />,
    tags: ['advanced'],
    technologies: ['Micro-frontends', 'Monorepo', 'Architecture'],
  },
];

const getTechIcon = (tech: string) => {
  switch (tech) {
    case 'React':
      return <FaReact />;
    case 'TypeScript':
      return <SiTypescript />;
    case 'Next.js':
      return <SiNextdotjs />;
    case 'Redux':
      return <SiRedux />;
    case 'Tailwind':
      return <SiTailwindcss />;
    case 'Webpack':
      return <SiWebpack />;
    case 'JavaScript':
      return <SiJavascript />;
    default:
      return null;
  }
};

const SystemDesignPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  const allTechnologies = Array.from(new Set(frontendTopics.flatMap(topic => topic.technologies)));

  const filteredTopics = frontendTopics.filter(topic => {
    const matchesDifficulty =
      selectedDifficulty.length === 0 || topic.tags.some(tag => selectedDifficulty.includes(tag));
    const matchesTechnology =
      selectedTechnologies.length === 0 ||
      topic.technologies.some(tech => selectedTechnologies.includes(tech));
    return matchesDifficulty && matchesTechnology;
  });

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    );
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  return (
    <MainLayout>
      <PageContainer>
        <FilterSidebar>
          <FilterTitle>
            <FaFilter />
            Filters
          </FilterTitle>

          <FilterSection>
            <FilterSectionTitle>Difficulty Level</FilterSectionTitle>
            <FilterChipGroup>
              <FilterChip
                active={selectedDifficulty.includes('beginner')}
                onClick={() => toggleDifficulty('beginner')}
              >
                <span>Beginner</span>
              </FilterChip>
              <FilterChip
                active={selectedDifficulty.includes('intermediate')}
                onClick={() => toggleDifficulty('intermediate')}
              >
                <span>Intermediate</span>
              </FilterChip>
              <FilterChip
                active={selectedDifficulty.includes('advanced')}
                onClick={() => toggleDifficulty('advanced')}
              >
                <span>Advanced</span>
              </FilterChip>
            </FilterChipGroup>
          </FilterSection>

          <FilterSection>
            <FilterSectionTitle>Technologies</FilterSectionTitle>
            <FilterChipGroup>
              {allTechnologies.map(tech => (
                <FilterChip
                  key={tech}
                  active={selectedTechnologies.includes(tech)}
                  onClick={() => toggleTechnology(tech)}
                >
                  <span>{tech}</span>
                </FilterChip>
              ))}
            </FilterChipGroup>
          </FilterSection>

          {(selectedDifficulty.length > 0 || selectedTechnologies.length > 0) && (
            <ClearFiltersButton
              onClick={() => {
                setSelectedDifficulty([]);
                setSelectedTechnologies([]);
              }}
            >
              Clear All Filters
            </ClearFiltersButton>
          )}
        </FilterSidebar>

        <ContentSection>
          <Header>
            <Title>Frontend System Design</Title>
            <Description>
              Master the art of designing scalable, maintainable, and performant frontend
              applications. Learn from real-world examples and best practices used by top tech
              companies.
            </Description>
          </Header>

          <TopicsGrid>
            {filteredTopics.map(topic => (
              <TopicCard key={topic.id}>
                <TopicIcon>{topic.icon}</TopicIcon>
                <TopicTitle>{topic.title}</TopicTitle>
                <TopicDescription>{topic.description}</TopicDescription>
                <TagGroup>
                  {topic.tags.map(tag => (
                    <Tag key={tag} type={tag as 'beginner' | 'intermediate' | 'advanced'}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Tag>
                  ))}
                  {topic.technologies.map(tech => (
                    <Tag key={tech} type="technology">
                      <TechIcon>{getTechIcon(tech)}</TechIcon>
                      {tech}
                    </Tag>
                  ))}
                </TagGroup>
              </TopicCard>
            ))}
          </TopicsGrid>
        </ContentSection>
      </PageContainer>
    </MainLayout>
  );
};

export default SystemDesignPage;
