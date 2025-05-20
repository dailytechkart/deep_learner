'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { TopicList } from '../components/TopicList';
import { learningTopics } from '../../data/learningTopics';
import { MainLayout } from '@/components/MainLayout';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaFilter, FaChevronDown, FaStar, FaClock, FaUsers, FaBook, FaJs, FaReact, FaCss3Alt, FaGitAlt, FaShieldAlt, FaSearch as FaSearchIcon, FaRocket, FaChartLine, FaCode } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiJest, SiCypress, SiWebpack, SiVite, SiDocker, SiKubernetes, SiJenkins, SiGithubactions, SiJunit5, SiTestinglibrary, SiCucumber, SiSelenium, SiPostman, SiNewrelic, SiDatadog, SiGrafana, SiPrometheus, SiSentry, SiGoogleanalytics, SiHotjar, SiContentful, SiWordpress, SiShopify, SiMagento, SiWoo, SiBigcommerce } from 'react-icons/si';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const MainContent = styled.main`
  max-width: 1400px;
  width: 100%;
  padding: 2rem;
  display: flex;
  gap: 2rem;
`;

const FilterSidebar = styled.aside`
  width: 300px;
  flex-shrink: 0;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  height: fit-content;
  position: sticky;
  top: 2rem;
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const FilterIcon = styled(FaFilter)`
  color: ${props => props.theme.colors.primary};
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const FilterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

interface SectionTitleProps {
  isOpen: boolean;
}

interface FilterGroupProps {
  isOpen: boolean;
}

const SectionTitle = styled.h4<SectionTitleProps>`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  svg {
    transition: transform 0.2s ease;
    transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const FilterGroup = styled.div<FilterGroupProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.active ? '#FFFFFF' : props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.backgroundAlt};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FilterCount = styled.span`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
`;

const CoursesSection = styled.div`
  flex: 1;
`;

const HeaderSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  transition: all ${props => props.theme.transitions.default};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 800px;
  transition: all ${props => props.theme.transitions.default};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text};
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background: transparent;

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled(FaSearch)`
  color: ${props => props.theme.colors.textSecondary};
  margin-right: ${props => props.theme.spacing.sm};
`;

const StatsBar = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const StatIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const CoursesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const CourseRow = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const CourseImage = styled.div<{ category: string }>`
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
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
`;

const CourseTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
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
`;

const CourseMeta = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: auto;
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

const LearnPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(true);

  // Get unique categories and difficulties
  const categories = ['all', ...new Set(learningTopics.map(topic => topic.category))];
  const difficulties = ['all', ...new Set(learningTopics.map(topic => topic.difficulty))];

  // Filter topics based on selected filters and search query
  const filteredTopics = learningTopics.filter(topic => {
    const categoryMatch = selectedCategory === 'all' || topic.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;
    const searchMatch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && difficultyMatch && searchMatch;
  });

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
    <MainLayout>
      <PageContainer>
        <MainContent>
          <FilterSidebar>
            <FilterHeader>
              <FilterIcon />
              <FilterTitle>Filters</FilterTitle>
            </FilterHeader>

            <FilterSection>
              <SectionTitle isOpen={isCategoryOpen} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                Categories
                <FaChevronDown />
              </SectionTitle>
              <FilterGroup isOpen={isCategoryOpen}>
                {categories.map(category => (
                  <FilterButton
                    key={category}
                    active={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Categories' : category}
                    <FilterCount>
                      {category === 'all' 
                        ? learningTopics.length 
                        : learningTopics.filter(t => t.category === category).length}
                    </FilterCount>
                  </FilterButton>
                ))}
              </FilterGroup>
            </FilterSection>

            <FilterSection>
              <SectionTitle isOpen={isDifficultyOpen} onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}>
                Difficulty
                <FaChevronDown />
              </SectionTitle>
              <FilterGroup isOpen={isDifficultyOpen}>
                {difficulties.map(difficulty => (
                  <FilterButton
                    key={difficulty}
                    active={selectedDifficulty === difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty === 'all' ? 'All Levels' : difficulty}
                    <FilterCount>
                      {difficulty === 'all'
                        ? learningTopics.length
                        : learningTopics.filter(t => t.difficulty === difficulty).length}
                    </FilterCount>
                  </FilterButton>
                ))}
              </FilterGroup>
            </FilterSection>
          </FilterSidebar>

          <CoursesSection>
            <HeaderSection>
              <Title>Learn Frontend Development</Title>
              <Description>
                Master modern frontend technologies with our comprehensive learning paths.
                Start with the basics and progress to advanced concepts at your own pace.
              </Description>

              <SearchBar>
                <SearchIcon />
                <SearchInput
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchBar>

              <StatsBar>
                <StatItem>
                  <StatIcon><FaStar /></StatIcon>
                  <span>4.8 Average Rating</span>
                </StatItem>
                <StatItem>
                  <StatIcon><FaClock /></StatIcon>
                  <span>50+ Hours of Content</span>
                </StatItem>
                <StatItem>
                  <StatIcon><FaUsers /></StatIcon>
                  <span>10k+ Active Learners</span>
                </StatItem>
              </StatsBar>
            </HeaderSection>

            <CoursesGrid>
              {filteredTopics.map(topic => (
                <CourseRow key={topic.id}>
                  <CourseImage category={topic.category}>
                    <IconWrapper>
                      {getCategoryIcon(topic.category)}
                    </IconWrapper>
                  </CourseImage>
                  <CourseContent>
                    <CourseHeader>
                      <CourseTitle>{topic.title}</CourseTitle>
                      <DifficultyBadge difficulty={topic.difficulty}>
                        {topic.difficulty}
                      </DifficultyBadge>
                    </CourseHeader>
                    <CourseDescription>{topic.description}</CourseDescription>
                    <CourseMeta>
                      <MetaItem>
                        <MetaIcon><FaClock /></MetaIcon>
                        <span>{topic.estimatedTime}</span>
                      </MetaItem>
                      <MetaItem>
                        <MetaIcon><FaBook /></MetaIcon>
                        <span>{topic.totalLessons} Lessons</span>
                      </MetaItem>
                      <CategoryBadge>{topic.category}</CategoryBadge>
                    </CourseMeta>
                    <ProgressBar progress={topic.progress} />
                  </CourseContent>
                </CourseRow>
              ))}
            </CoursesGrid>
          </CoursesSection>
        </MainContent>
      </PageContainer>
    </MainLayout>
  );
};

export default LearnPage; 