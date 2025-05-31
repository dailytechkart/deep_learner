'use client';

import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { MainLayout } from '@/components/MainLayout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { SystemDesignHero } from '@/components/shared/SystemDesignHero';
import { problems } from './data/problems';
import { ProblemCard } from './components/ProblemCard';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { FaCode, FaClipboardList, FaUsers } from 'react-icons/fa';
import SEO from '@/components/SEO';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import {
  PageContainer,
  PageHeader,
  HeaderContent,
  PageTitle,
  MainContent,
  ProblemsSection,
  ProblemsGrid,
  NoResults,
  LoaderContainer,
  Loader,
  PaginationContainer,
  PaginationButton,
  SortContainer,
  SortSelect,
  ResultsCount,
} from './styles/PageStyles';

export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 12;
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'difficulty-asc', label: 'Difficulty: Easy to Hard' },
  { value: 'difficulty-desc', label: 'Difficulty: Hard to Easy' },
  { value: 'title-asc', label: 'Title: A to Z' },
  { value: 'title-desc', label: 'Title: Z to A' },
];

const systemDesignTitle = 'System Design Mastery';
const systemDesignDescription =
  'Master system design interviews with our comprehensive collection of frontend system design problems. From chat applications to collaborative editors, learn how to design scalable and efficient frontend systems.';
const systemDesignStats = [
  { icon: <FaCode />, value: '50+', label: 'System Design Problems' },
  { icon: <FaClipboardList />, value: '10+', label: 'Case Studies' },
  { icon: <FaUsers />, value: '5k+', label: 'Active Learners' },
];

export default function SystemDesignProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch =
        searchQuery === '' ||
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        problem.keyConcepts.some(concept =>
          concept.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTopics =
        selectedTopics.length === 0 ||
        selectedTopics.some(topic =>
          problem.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
        );

      const matchesCompanies =
        selectedCompanies.length === 0 ||
        selectedCompanies.some(company => problem.companies.includes(company));

      const matchesDifficulty =
        selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty);

      return matchesSearch && matchesTopics && matchesCompanies && matchesDifficulty;
    });
  }, [searchQuery, selectedTopics, selectedCompanies, selectedDifficulties]);

  const sortedProblems = useMemo(() => {
    return [...filteredProblems].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'difficulty':
          const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'oldest':
          return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
        default:
          return 0;
      }
    });
  }, [filteredProblems, sortBy]);

  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProblems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProblems, currentPage]);

  const totalPages = Math.ceil(sortedProblems.length / ITEMS_PER_PAGE);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
    setCurrentPage(1);
  };

  const handleCompanyChange = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    );
    setCurrentPage(1);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    );
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  return (
    <ProtectedRoute>
      <SEO
        title="System Design Problems | Frontend School"
        description="Practice system design problems with detailed solutions. Learn how to design scalable and efficient systems."
        keywords={[
          'system design',
          'frontend',
          'backend',
          'full stack',
          'distributed systems',
          'cloud',
          'database',
          'security',
        ]}
      />
      <MainLayout>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'System Design', href: '/system-design' },
            { label: 'Problems', href: '/system-design/problems' },
          ]}
        />
        <SystemDesignHero
          title={systemDesignTitle}
          description={systemDesignDescription}
          stats={systemDesignStats}
        />
        <PageContainer>
          <MainContent>
            <Filters
              problems={problems}
              selectedTopics={selectedTopics}
              selectedCompanies={selectedCompanies}
              selectedDifficulties={selectedDifficulties}
              onTopicChange={handleTopicChange}
              onCompanyChange={handleCompanyChange}
              onDifficultyChange={handleDifficultyChange}
            />
            <ProblemsSection>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                totalResults={filteredProblems.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
                sortOptions={sortOptions}
              />
              {isLoading ? (
                <LoaderContainer>
                  <Loader />
                </LoaderContainer>
              ) : paginatedProblems.length > 0 ? (
                <>
                  <ProblemsGrid>
                    {paginatedProblems.map(problem => (
                      <ProblemCard key={problem.id} problem={problem} />
                    ))}
                  </ProblemsGrid>
                  {totalPages > 1 && (
                    <PaginationContainer>
                      <PaginationButton
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </PaginationButton>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <PaginationButton
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </PaginationButton>
                    </PaginationContainer>
                  )}
                </>
              ) : (
                <NoResults>
                  <h3>No Problems Found</h3>
                  <p>
                    Try adjusting your search query or filters to find what you&apos;re looking for.
                  </p>
                </NoResults>
              )}
            </ProblemsSection>
          </MainContent>
        </PageContainer>
      </MainLayout>
    </ProtectedRoute>
  );
}
