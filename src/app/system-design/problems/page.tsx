'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaFilter, 
  FaSearch, 
  FaTimes, 
  FaClock, 
  FaCode, 
  FaServer, 
  FaLaptopCode,
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
  FaFacebook,
  FaApple,
  FaPlay
} from 'react-icons/fa';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

// Types
interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  category: 'Frontend' | 'Backend' | 'Full Stack';
  estimatedTime: string;
  link: string;
  companies?: string[];
}

interface Theme {
  colors: {
    background: {
      primary: string;
      secondary: string;
      hover: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    border: string;
    primary: string;
    success: string;
    warning: string;
    error: string;
  };
}

// Styled Components
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    width: 90%;
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    width: 70%;
  }
`;

const BreadcrumbWrapper = styled.div`
  position: sticky;
  top: 80px;
  z-index: 10;
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md} 0;
  margin-bottom: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  width: 100%;
`;

const FiltersSection = styled.div<{ theme: Theme }>`
  width: 100%;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    width: 280px;
    flex-shrink: 0;
  }
`;

const FilterGroup = styled.div<{ theme: Theme }>`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${props => props.theme.colors.background.primary};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.border};
`;

const FilterTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterOption = styled.label<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  color: ${props => props.theme.colors.text.secondary};
  
  &:hover {
    background: ${props => props.theme.colors.background.hover};
    color: ${props => props.theme.colors.text.primary};
  }

  input {
    margin: 0;
  }
`;

const SearchBar = styled.div<{ theme: Theme }>`
  position: relative;
  margin-bottom: 1.5rem;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 8px;
    background: ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.text.primary};
    font-size: 0.95rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
    }
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const ProblemsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-content: start;

  @media (min-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.div)<{ theme: Theme }>`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 240px;
    max-height: none;
  }
`;

const CardTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardDescription = styled.p<{ theme: Theme }>`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
  line-height: 1.5;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Badge = styled.span<{ difficulty: string; theme: Theme }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch (props.difficulty) {
      case 'Easy':
        return props.theme.colors.success + '20';
      case 'Medium':
        return props.theme.colors.warning + '20';
      case 'Hard':
        return props.theme.colors.error + '20';
      default:
        return props.theme.colors.background.hover;
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'Easy':
        return props.theme.colors.success;
      case 'Medium':
        return props.theme.colors.warning;
      case 'Hard':
        return props.theme.colors.error;
      default:
        return props.theme.colors.text.primary;
    }
  }};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: hidden;
`;

const Tag = styled.span<{ theme: Theme }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background: ${props => props.theme.colors.background.hover};
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;

  svg {
    font-size: 0.9rem;
    flex-shrink: 0;
  }
`;

const CompanyTag = styled(Tag)<{ theme: Theme }>`
  background: ${props => props.theme.colors.primary}10;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const TimeEstimate = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: 0.5rem;
`;

const NoResults = styled.div<{ theme: Theme }>`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 12px;
  color: ${props => props.theme.colors.text.secondary};
  border: 1px dashed ${props => props.theme.colors.border};
`;

// Data
const problems: Problem[] = [
  {
    id: '1',
    title: 'Design a Real-time Dashboard',
    description: 'Create a system for displaying real-time data with live updates, data visualization, and performance optimization.',
    difficulty: 'Medium',
    tags: ['Real-time', 'Data Visualization', 'WebSocket', 'Performance'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/real-time-dashboard',
    companies: ['Google', 'Meta', 'Netflix']
  },
  {
    id: '2',
    title: 'Design a Micro Frontend Architecture',
    description: 'Design a scalable micro frontend architecture for a large e-commerce application with multiple teams.',
    difficulty: 'Hard',
    tags: ['Micro Frontends', 'Module Federation', 'Team Collaboration'],
    category: 'Frontend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/micro-frontend',
    companies: ['Amazon', 'Microsoft']
  },
  {
    id: '3',
    title: 'Design a Frontend Caching System',
    description: 'Implement an efficient caching strategy for a content-heavy web application with dynamic content.',
    difficulty: 'Medium',
    tags: ['Caching', 'Performance', 'State Management'],
    category: 'Frontend',
    estimatedTime: '30-45 mins',
    link: '/system-design/problems/frontend-caching',
    companies: ['Google', 'Apple']
  },
  {
    id: '4',
    title: 'Design a Progressive Web App',
    description: 'Create a PWA with offline support, push notifications, and seamless updates.',
    difficulty: 'Medium',
    tags: ['PWA', 'Service Workers', 'Offline Support'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/pwa',
    companies: ['Google', 'Microsoft']
  },
  {
    id: '5',
    title: 'Design a Scalable API Gateway',
    description: 'Create an API gateway that can handle high traffic, rate limiting, and service discovery.',
    difficulty: 'Hard',
    tags: ['API Gateway', 'Load Balancing', 'Rate Limiting'],
    category: 'Backend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/api-gateway',
    companies: ['Amazon', 'Netflix']
  },
  {
    id: '6',
    title: 'Design a Distributed Caching System',
    description: 'Implement a distributed caching system that can handle high read/write loads.',
    difficulty: 'Hard',
    tags: ['Caching', 'Distributed Systems', 'Performance'],
    category: 'Backend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/distributed-cache',
    companies: ['Amazon', 'Meta']
  }
];

const getCompanyIcon = (company: string) => {
  switch (company.toLowerCase()) {
    case 'google':
      return <FaGoogle />;
    case 'amazon':
      return <FaAmazon />;
    case 'microsoft':
      return <FaMicrosoft />;
    case 'meta':
      return <FaFacebook />;
    case 'apple':
      return <FaApple />;
    case 'netflix':
      return <FaPlay />;
    default:
      return null;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Frontend':
      return <FaCode />;
    case 'Backend':
      return <FaServer />;
    case 'Full Stack':
      return <FaLaptopCode />;
    default:
      return null;
  }
};

export default function SystemDesignProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = Array.from(new Set(problems.flatMap(p => p.tags)));

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(problem.category);
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => problem.tags.includes(tag));

    return matchesSearch && matchesDifficulty && matchesCategory && matchesTags;
  });

  const toggleFilter = (filter: string, currentFilters: string[], setFilters: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFilters(currentFilters.includes(filter)
      ? currentFilters.filter(f => f !== filter)
      : [...currentFilters, filter]);
  };

  return (
    <>
      <SEO
        title="System Design Problems"
        description="Practice system design problems with real-world scenarios. Filter by difficulty, category, and tags. Learn from industry examples and improve your system design skills."
        keywords={[
          'system design',
          'practice problems',
          'frontend architecture',
          'backend architecture',
          'scalability',
          'performance',
          'interview preparation'
        ]}
      />
      <BreadcrumbWrapper>
        <Container>
          <Breadcrumbs
            items={[
              { label: 'System Design', href: '/system-design' },
              { label: 'Practice Problems' }
            ]}
          />
        </Container>
      </BreadcrumbWrapper>
      <Container>
        <FiltersSection>
          <SearchBar>
            <FaSearch />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
          
          <FilterGroup>
            <FilterTitle>
              <FaFilter />
              Difficulty
            </FilterTitle>
            {['Easy', 'Medium', 'Hard'].map(difficulty => (
              <FilterOption key={difficulty}>
                <input
                  type="checkbox"
                  checked={selectedDifficulties.includes(difficulty)}
                  onChange={() => toggleFilter(difficulty, selectedDifficulties, setSelectedDifficulties)}
                />
                {difficulty}
              </FilterOption>
            ))}
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>
              <FaFilter />
              Category
            </FilterTitle>
            {['Frontend', 'Backend', 'Full Stack'].map(category => (
              <FilterOption key={category}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                />
                {getCategoryIcon(category)}
                {category}
              </FilterOption>
            ))}
          </FilterGroup>

          <FilterGroup>
            <FilterTitle>
              <FaFilter />
              Tags
            </FilterTitle>
            {allTags.map(tag => (
              <FilterOption key={tag}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleFilter(tag, selectedTags, setSelectedTags)}
                />
                {tag}
              </FilterOption>
            ))}
          </FilterGroup>
        </FiltersSection>

        <ProblemsGrid>
          {filteredProblems.length > 0 ? (
            filteredProblems.map(problem => (
              <Card
                key={problem.id}
                whileHover={{ y: -5 }}
                onClick={() => window.location.href = problem.link}
              >
                <CardTitle>{problem.title}</CardTitle>
                <CardDescription>{problem.description}</CardDescription>
                <CardFooter>
                  <Badge difficulty={problem.difficulty}>{problem.difficulty}</Badge>
                  <TagList>
                    {problem.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                  {problem.companies && (
                    <TagList>
                      {problem.companies.map(company => (
                        <CompanyTag key={company}>
                          {getCompanyIcon(company)}
                          {company}
                        </CompanyTag>
                      ))}
                    </TagList>
                  )}
                  <TimeEstimate>
                    <FaClock />
                    {problem.estimatedTime}
                  </TimeEstimate>
                </CardFooter>
              </Card>
            ))
          ) : (
            <NoResults>
              <h3>No problems found</h3>
              <p>Try adjusting your filters or search query</p>
            </NoResults>
          )}
        </ProblemsGrid>
      </Container>
    </>
  );
} 