'use client';

import { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { FaComments, FaList, FaClock, FaCommentDots, FaClipboardList, FaBolt, FaSearch, FaLayerGroup, FaFilter, FaTimes } from 'react-icons/fa';

const problemsList = [
  {
    name: 'Chat App (Messenger Clone)',
    slug: 'chat-app',
    company_asked: ['Meta', 'Microsoft', 'Swiggy'],
    time_limit: 90,
    difficulty: 'Hard',
    tags: ['WebSocket', 'Real-time', 'Chat', 'React', 'State Management'],
    description: 'Build a real-time chat interface with message history, typing indicator, and file sharing.',
    twist: 'Add group chat and unread count badges.',
    icon: <FaComments />,
  },
  {
    name: 'News Feed (Facebook/Twitter)',
    slug: 'news-feed',
    company_asked: ['Meta', 'LinkedIn'],
    time_limit: 120,
    difficulty: 'Hard',
    tags: ['Pagination', 'Virtualization', 'React', 'Feed System', 'Infinite Scroll'],
    description: 'Create a responsive, paginated news feed with likes, comments, and post creation.',
    twist: 'Add real-time update for new posts and optimistic UI.',
    icon: <FaList />,
  },
  {
    name: 'E-commerce Product Listing Page',
    slug: 'product-listing-page',
    company_asked: ['Amazon', 'Meesho', 'Flipkart'],
    time_limit: 60,
    difficulty: 'Medium',
    tags: ['Filters', 'Sorting', 'Pagination', 'React', 'UI Performance'],
    description: 'Build a product list page with filters, sorting, and lazy loading of images.',
    twist: 'Support comparison view and wishlist functionality.',
    icon: <FaClipboardList />,
  },
  {
    name: 'Google Timer Clone',
    slug: 'google-timer',
    company_asked: ['Uber', 'Microsoft'],
    time_limit: 45,
    difficulty: 'Easy',
    tags: ['Timer', 'Hooks', 'React', 'Ref', 'Controlled Inputs'],
    description: 'Create a timer component that counts down and allows multiple timers sequentially.',
    twist: 'Show an alert and allow rescheduling expired timers.',
    icon: <FaClock />,
  },
  {
    name: 'Comment Thread (YouTube/Facebook)',
    slug: 'comment-thread',
    company_asked: ['Google', 'Meesho', 'Meta'],
    time_limit: 75,
    difficulty: 'Medium',
    tags: ['Nested Comments', 'Recursion', 'React', 'UX'],
    description: 'Implement a comment section that supports replies, editing, deleting and collapse.',
    twist: 'Add real-time updates and lazy loading of replies.',
    icon: <FaCommentDots />,
  },
  {
    name: 'Kanban Board (Trello Clone)',
    slug: 'kanban-board',
    company_asked: ['Atlassian', 'Jira', 'Microsoft'],
    time_limit: 90,
    difficulty: 'Hard',
    tags: ['Drag and Drop', 'React', 'State Sync', 'UX'],
    description: 'Build a board with draggable cards across columns with editable tasks.',
    twist: 'Support offline mode and sync when back online.',
    icon: <FaLayerGroup />,
  },
  {
    name: 'Multi-step Form Wizard',
    slug: 'form-wizard',
    company_asked: ['Google', 'Adobe'],
    time_limit: 45,
    difficulty: 'Medium',
    tags: ['Form Validation', 'React', 'Step Navigation', 'UX'],
    description: 'Create a multi-step form with validation, progress indicator, and summary view.',
    twist: 'Add auto-save and form state recovery after refresh.',
    icon: <FaBolt />,
  },
  {
    name: 'Search Suggestion (Typeahead)',
    slug: 'search-suggestion',
    company_asked: ['Amazon', 'Zomato', 'Swiggy'],
    time_limit: 30,
    difficulty: 'Easy',
    tags: ['Debounce', 'Fetch', 'React', 'UX'],
    description: 'Implement a search bar that shows suggestions with debounce and highlight.',
    twist: 'Group results by category and support keyboard navigation.',
    icon: <FaSearch />,
  }
];

const Layout = styled.div`
  display: flex;
  height: 100vh;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const LeftPanel = styled.nav`
  width: 340px;
  min-width: 220px;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  margin-top: 80px;
`;

const PanelHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 28px 32px 18px 32px;
  font-size: 1.18em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProblemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 24px 0 24px;
  flex: 1;
  overflow-y: auto;
`;

const ProblemCard = styled.li<{ selected: boolean }>`
  background: ${({ selected, theme }) => selected ? theme.colors.background : theme.colors.backgroundAlt};
  border: 2px solid ${({ selected, theme }) => selected ? theme.colors.primary : 'transparent'};
  border-radius: 12px;
  margin-bottom: 18px;
  padding: 18px 16px 14px 16px;
  color: ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  cursor: pointer;
  box-shadow: ${({ selected }) => selected ? '0 4px 16px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.04)'};
  transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  gap: 16px;
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
`;

const ProblemIcon = styled.div`
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProblemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProblemTitle = styled.div`
  font-size: 1.08em;
  font-weight: 600;
  margin-bottom: 2px;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 8px;
`;

const Badge = styled.span<{ color: string }>`
  background: ${({ color }) => color};
  color: #fff;
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 0.85em;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
`;

const MainPanel = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  height: 100vh;
  margin-top: 80px;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  padding: 36px 0 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.h1`
  font-size: 2em;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const MainBadgeRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 0;
`;

const ContentCard = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 140px 36px 48px 36px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const FilterSection = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: 16px;
  
  input {
    width: 100%;
    padding: 10px 16px 10px 40px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95em;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.div`
  font-size: 0.9em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.colors.text};
  font-size: 0.85em;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ active, theme }) => active ? theme.colors.primary : 'rgba(108, 99, 255, 0.1)'};
  }
`;

const ClearFilters = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9em;
  cursor: pointer;
  margin-top: 16px;
  width: 100%;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

function DynamicMDX({ slug }: { slug: string }) {
  const MDXComponent = dynamic(() => import(`./${slug}.mdx`).then(mod => mod.default), { ssr: false });
  return <MDXComponent />;
}

export default function ProblemPage() {
  const [selectedProblem, setSelectedProblem] = useState(problemsList[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedTimeLimits, setSelectedTimeLimits] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get unique tags from all problems
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    problemsList.forEach(problem => {
      problem.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter problems based on all criteria
  const filteredProblems = useMemo(() => {
    return problemsList.filter(problem => {
      // Search query filter
      if (searchQuery && !problem.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Difficulty filter
      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(problem.difficulty)) {
        return false;
      }
      
      // Time limit filter
      if (selectedTimeLimits.length > 0 && !selectedTimeLimits.includes(problem.time_limit)) {
        return false;
      }
      
      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => problem.tags.includes(tag))) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedDifficulties, selectedTimeLimits, selectedTags]);

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const toggleTimeLimit = (time: number) => {
    setSelectedTimeLimits(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDifficulties([]);
    setSelectedTimeLimits([]);
    setSelectedTags([]);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [selectedProblem]);

  return (
    <Layout>
      <LeftPanel aria-label="System Design Problem List">
        <PanelHeader>System Design Problems</PanelHeader>
        <FilterSection>
          <SearchInput>
            <FaSearch />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInput>
          
          <FilterGroup>
            <FilterLabel>Difficulty</FilterLabel>
            <FilterOptions>
              {['Easy', 'Medium', 'Hard'].map(difficulty => (
                <FilterChip
                  key={difficulty}
                  active={selectedDifficulties.includes(difficulty)}
                  onClick={() => toggleDifficulty(difficulty)}
                >
                  {difficulty}
                </FilterChip>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Time Limit</FilterLabel>
            <FilterOptions>
              {[30, 45, 60, 75, 90, 120].map(time => (
                <FilterChip
                  key={time}
                  active={selectedTimeLimits.includes(time)}
                  onClick={() => toggleTimeLimit(time)}
                >
                  {time} min
                </FilterChip>
              ))}
            </FilterOptions>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Tags</FilterLabel>
            <FilterOptions>
              {allTags.map(tag => (
                <FilterChip
                  key={tag}
                  active={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </FilterChip>
              ))}
            </FilterOptions>
          </FilterGroup>

          {(searchQuery || selectedDifficulties.length > 0 || selectedTimeLimits.length > 0 || selectedTags.length > 0) && (
            <ClearFilters onClick={clearAllFilters}>
              <FaTimes />
              Clear All Filters
            </ClearFilters>
          )}
        </FilterSection>
        <ProblemList>
          {filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.slug}
              selected={selectedProblem.slug === problem.slug}
              onClick={() => setSelectedProblem(problem)}
              tabIndex={0}
              aria-current={selectedProblem.slug === problem.slug ? 'page' : undefined}
              aria-label={problem.name}
            >
              <ProblemIcon>{problem.icon}</ProblemIcon>
              <ProblemInfo>
                <ProblemTitle>{problem.name}</ProblemTitle>
                <BadgeRow>
                  <Badge color={problem.difficulty === 'Hard' ? '#e74c3c' : problem.difficulty === 'Medium' ? '#f39c12' : '#27ae60'}>{problem.difficulty}</Badge>
                  <Badge color={'#6c63ff'}>{problem.time_limit} min</Badge>
                </BadgeRow>
                <div style={{ fontSize: '0.92em', color: '#aaa', marginTop: 4 }}>{problem.description}</div>
                <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {problem.tags.map(tag => (
                    <Badge key={tag} color={'#222'} style={{ background: '#222', color: '#fff', fontWeight: 400, fontSize: '0.78em' }}>{tag}</Badge>
                  ))}
                </div>
              </ProblemInfo>
            </ProblemCard>
          ))}
        </ProblemList>
      </LeftPanel>
      <MainPanel>
        <StickyHeader>
          <MainTitle>{selectedProblem.name}</MainTitle>
          <MainBadgeRow>
            <Badge color={selectedProblem.difficulty === 'Hard' ? '#e74c3c' : selectedProblem.difficulty === 'Medium' ? '#f39c12' : '#27ae60'}>{selectedProblem.difficulty}</Badge>
            <Badge color={'#6c63ff'}>{selectedProblem.time_limit} min</Badge>
          </MainBadgeRow>
        </StickyHeader>
        <ContentCard ref={contentRef}>
          <Suspense fallback={<div>Loading...</div>}>
            <DynamicMDX slug={selectedProblem.slug} />
          </Suspense>
        </ContentCard>
      </MainPanel>
    </Layout>
  );
}
