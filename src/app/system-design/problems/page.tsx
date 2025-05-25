'use client';

import React, { useState, useMemo, useEffect } from 'react';
import SEO from '@/components/SEO';
import { problems } from './data/problems';
import { ProblemCard } from './components/ProblemCard';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
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
const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'difficulty', label: 'Difficulty' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
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
    <>
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
      <PageContainer>
        <PageHeader>
          <HeaderContent>
            <PageTitle>System Design Problems</PageTitle>
          </HeaderContent>
        </PageHeader>
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
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <SortContainer>
              <ResultsCount>
                {filteredProblems.length} {filteredProblems.length === 1 ? 'problem' : 'problems'}{' '}
                found
              </ResultsCount>
              <SortSelect value={sortBy} onChange={handleSortChange}>
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SortSelect>
            </SortContainer>
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
    </>
  );
}
