'use client';

import React, { useState, useEffect } from 'react';
import { Problem, ProblemData, Topic, Difficulty, Company, Tag } from '@/types/problem';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { MainLayout } from '@/components/MainLayout';
import { useSearch } from '@/hooks/useSearch';
import { InterviewTabs } from '@/components/interview/InterviewTabs';
import { InterviewSearch } from '@/components/interview/InterviewSearch';
import { InterviewProblemsList } from '@/components/interview/InterviewProblemsList';
import { InterviewLayout } from '@/components/interview/InterviewLayout';
import { SystemDesignHero } from '@/components/shared/SystemDesignHero';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { FaBook, FaClipboardList, FaUsers, FaCode } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa';
import styled from 'styled-components';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const FilterButton = styled.button`
  display: none;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  position: fixed;
  bottom: 88px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  box-shadow: ${props => props.theme.shadows.md};

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

type ProblemType = 'dsa' | 'machine-coding';
type SortOption = 'most-asked' | 'difficulty' | 'recent' | 'alphabetical';

interface SelectedFilters {
  topics: Topic[];
  difficulty: Difficulty[];
  companies: Company[];
  tags: Tag[];
}

interface FilterSection {
  title: string;
  options: { id: string; label: string; count: number }[];
  selected: string[];
  onSelect: (value: string) => void;
}

const systemDesignTitle = 'Frontend Interview Mastery';
const systemDesignDescription =
  'Master frontend development interviews with our comprehensive collection of coding challenges, system design questions, and real-world projects. From React to TypeScript, learn everything you need to ace your frontend interviews.';
const systemDesignStats = [
  { icon: <FaCode />, value: '150+', label: 'Coding Problems' },
  { icon: <FaClipboardList />, value: '30+', label: 'Machine Coding' },
  { icon: <FaUsers />, value: '10k+', label: 'Active Learners' },
];

const InterviewPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [problemType, setProblemType] = useState<ProblemType>('dsa');
  const [dsaProblemData, setDsaProblemData] = useState<ProblemData | null>(null);
  const [machineCodingProblemData, setMachineCodingProblemData] = useState<ProblemData | null>(
    null
  );
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    topics: [],
    difficulty: [],
    companies: [],
    tags: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useSearch();
  const [sortBy, setSortBy] = useState<SortOption>('most-asked');
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading) {
      setIsAuthChecked(true);
      if (!user) {
        router.push('/login?from=/interview');
        return;
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setError(null);
        setIsLoading(true);

        const dsaResponse = await fetch('/data/dsa-150-problems.json');
        if (!dsaResponse.ok) {
          throw new Error(
            `Failed to fetch DSA problems: ${dsaResponse.status} ${dsaResponse.statusText}`
          );
        }
        const dsaData = await dsaResponse.json();

        const machineCodingResponse = await fetch('/data/machine-coding-problems.json');
        if (!machineCodingResponse.ok) {
          throw new Error(
            `Failed to fetch Machine Coding problems: ${machineCodingResponse.status} ${machineCodingResponse.statusText}`
          );
        }
        const machineCodingData = await machineCodingResponse.json();

        setDsaProblemData(dsaData);
        setMachineCodingProblemData(machineCodingData);
        setFilteredProblems(dsaData.problems);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching problem data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch problem data');
        setIsLoading(false);
      }
    };

    if (isAuthChecked && user) {
      fetchData();
    }
  }, [user, isAuthChecked]);

  useEffect(() => {
    const currentProblemData = problemType === 'dsa' ? dsaProblemData : machineCodingProblemData;
    if (!currentProblemData) return;

    const filtered = currentProblemData.problems.filter(problem => {
      const matchesTopic =
        selectedFilters.topics.length === 0 || selectedFilters.topics.includes(problem.topic);
      const matchesDifficulty =
        selectedFilters.difficulty.length === 0 ||
        selectedFilters.difficulty.includes(problem.difficulty);
      const matchesCompany =
        selectedFilters.companies.length === 0 ||
        problem.companies.some(company => selectedFilters.companies.includes(company));
      const matchesTag =
        selectedFilters.tags.length === 0 ||
        problem.tags.some(tag => selectedFilters.tags.includes(tag));

      return matchesTopic && matchesDifficulty && matchesCompany && matchesTag;
    });

    setFilteredProblems(filtered);
  }, [selectedFilters, problemType, dsaProblemData, machineCodingProblemData]);

  const handleProblemTypeChange = (type: ProblemType) => {
    setProblemType(type);
    const currentProblemData = type === 'dsa' ? dsaProblemData : machineCodingProblemData;
    if (currentProblemData) {
      setFilteredProblems(currentProblemData.problems);
    }
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      topics: [],
      difficulty: [],
      companies: [],
      tags: [],
    });
    setSearchQuery('');
  };

  const getSortedProblems = (problems: Problem[]) => {
    switch (sortBy) {
      case 'most-asked':
        return [...problems].sort((a, b) => b.companies.length - a.companies.length);
      case 'difficulty':
        const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };
        return [...problems].sort(
          (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        );
      case 'recent':
        return [...problems].sort((a, b) => parseInt(b.id) - parseInt(a.id));
      case 'alphabetical':
        return [...problems].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return problems;
    }
  };

  const filteredProblemsWithSearch = getSortedProblems(
    filteredProblems.filter(
      problem =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getStats = () => {
    const stats = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    filteredProblems.forEach(problem => {
      switch (problem.difficulty) {
        case 'Easy':
          stats.easy++;
          break;
        case 'Medium':
          stats.medium++;
          break;
        case 'Hard':
          stats.hard++;
          break;
      }
    });

    return stats;
  };

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'machine-coding') {
      setProblemType('machine-coding');
    }
  }, [searchParams]);

  const stats = getStats();

  const topics = [
    'Array',
    'String',
    'Linked List',
    'Tree',
    'Graph',
    'Dynamic Programming',
  ] as Topic[];
  const difficulties = ['Easy', 'Medium', 'Hard'] as Difficulty[];
  const companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix'] as Company[];
  const tags = [
    'Two Pointers',
    'Sliding Window',
    'Recursion',
    'Greedy',
    'Backtracking',
    'Hashing',
    'Sorting',
  ] as Tag[];

  const filterSections: FilterSection[] = [
    {
      title: 'Topics',
      options: topics.map(topic => ({
        id: topic,
        label: topic,
        count: filteredProblems.filter(p => p.topic === topic).length,
      })),
      selected: selectedFilters.topics,
      onSelect: (value: string) => handleFilterChange('topics', value as Topic),
    },
    {
      title: 'Difficulty',
      options: difficulties.map(difficulty => ({
        id: difficulty,
        label: difficulty,
        count: filteredProblems.filter(p => p.difficulty === difficulty).length,
      })),
      selected: selectedFilters.difficulty,
      onSelect: (value: string) => handleFilterChange('difficulty', value as Difficulty),
    },
    {
      title: 'Companies',
      options: companies.map(company => ({
        id: company,
        label: company,
        count: filteredProblems.filter(p => p.companies.includes(company)).length,
      })),
      selected: selectedFilters.companies,
      onSelect: (value: string) => handleFilterChange('companies', value as Company),
    },
    {
      title: 'Tags',
      options: tags.map(tag => ({
        id: tag,
        label: tag,
        count: filteredProblems.filter(p => p.tags.includes(tag)).length,
      })),
      selected: selectedFilters.tags,
      onSelect: (value: string) => handleFilterChange('tags', value as Tag),
    },
  ];

  const handleFilterChange = (section: keyof SelectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const currentSection = prev[section] as string[];
      const newSection = currentSection.includes(value)
        ? currentSection.filter(v => v !== value)
        : [...currentSection, value];
      return {
        ...prev,
        [section]: newSection,
      } as SelectedFilters;
    });
  };

  if (loading || !isAuthChecked) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Interview Preparation', href: '/interview' },
          ]}
        />
        <SystemDesignHero
          title={systemDesignTitle}
          description={systemDesignDescription}
          stats={systemDesignStats}
        />

        <div style={{ width: '100%' }}>
          <InterviewTabs
            problemType={problemType}
            onProblemTypeChange={handleProblemTypeChange}
            dsaCount={dsaProblemData?.problems.length || 0}
            machineCodingCount={machineCodingProblemData?.problems.length || 0}
          />

          <InterviewLayout filterSections={filterSections} onClearAllFilters={clearAllFilters}>
            <InterviewSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <InterviewProblemsList problems={filteredProblemsWithSearch} />
          </InterviewLayout>

          <FilterButton onClick={() => setShowFilters(!showFilters)}>
            <FaFilter />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </FilterButton>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default InterviewPage;
