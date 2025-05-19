'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FaComments, FaList, FaClock, FaCommentDots, FaClipboardList, FaBolt, FaSearch, FaLayerGroup, FaFilter, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RoleTag = styled.span`
  background: #e3e8ff;
  color: #3a3a7c;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.8em;
  font-weight: 500;
  margin-right: 4px;
  margin-bottom: 2px;
  display: inline-block;
  border: 1px solid #bfcfff;
`;

const problemsList = [
  {
    name: 'Chat App (Messenger Clone)',
    slug: 'chat-app',
    company_asked: ['Meta', 'Microsoft', 'Swiggy'],
    time_limit: 90,
    difficulty: 'Hard',
    roles: ['SDE2', 'SDE3'],
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
    roles: ['SDE2', 'SDE3'],
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
    roles: ['SDE1', 'SDE2'],
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
    roles: ['SDE1'],
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
    roles: ['SDE1', 'SDE2'],
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
    roles: ['SDE2', 'SDE3'],
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
    roles: ['SDE1'],
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
    roles: ['SDE1'],
    tags: ['Debounce', 'Fetch', 'React', 'UX'],
    description: 'Implement a search bar that shows suggestions with debounce and highlight.',
    twist: 'Group results by category and support keyboard navigation.',
    icon: <FaSearch />,
  }
];

const PageContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-top: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const FilterSection = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};

  input {
    flex: 1;
    border: none;
    background: none;
    font-size: ${props => props.theme.typography.fontSize.md};
    color: ${props => props.theme.colors.text};
    outline: none;

    &::placeholder {
      color: ${props => props.theme.colors.textSecondary};
    }
  }
`;

const FilterGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: 9999px;
  border: 1px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
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
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.md};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ProblemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ProblemCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ProblemIcon = styled.div`
  font-size: 1.5em;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProblemTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const BadgeRow = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Badge = styled.span<{ color: string }>`
  background: ${({ color }) => color};
  color: #fff;
  border-radius: 9999px;
  padding: 3px 12px;
  font-size: 0.85em;
  font-weight: 600;
`;

const ProblemDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.5;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
`;

export default function ProblemsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedTimeLimits, setSelectedTimeLimits] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  // Get unique tags from all problems
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    problemsList.forEach(problem => {
      problem.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Get unique companies from all problems
  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    problemsList.forEach(problem => {
      problem.company_asked.forEach(company => companies.add(company));
    });
    return Array.from(companies).sort();
  }, []);

  // Get unique roles from all problems
  const allRoles = useMemo(() => {
    const roles = new Set<string>();
    problemsList.forEach(problem => {
      problem.roles?.forEach(role => roles.add(role));
    });
    return Array.from(roles);
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

      // Companies filter
      if (selectedCompanies.length > 0 && !selectedCompanies.some(company => problem.company_asked.includes(company))) {
        return false;
      }

      // Role filter
      const matchesRoles = selectedRoles.length === 0 || (problem.roles && problem.roles.some(role => selectedRoles.includes(role)));

      return matchesRoles;
    });
  }, [searchQuery, selectedDifficulties, selectedTimeLimits, selectedTags, selectedCompanies, selectedRoles]);

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

  const toggleCompany = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDifficulties([]);
    setSelectedTimeLimits([]);
    setSelectedTags([]);
    setSelectedCompanies([]);
    setSelectedRoles([]);
  };

  return (
    <PageContainer>
      <Header>
        <Title>System Design Problems</Title>
        <Description>
          Practice your system design skills with these real-world problems. Each problem includes detailed requirements, solution approaches, and implementation considerations.
        </Description>
      </Header>

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
          <FilterLabel>Companies</FilterLabel>
          <FilterOptions>
            {allCompanies.map(company => (
              <FilterChip
                key={company}
                active={selectedCompanies.includes(company)}
                onClick={() => toggleCompany(company)}
              >
                {company}
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

        <FilterGroup>
          <FilterLabel>Role Level</FilterLabel>
          <FilterOptions>
            {allRoles.map(role => (
              <FilterChip
                key={role}
                active={selectedRoles.includes(role)}
                onClick={() => toggleRole(role)}
              >
                {role}
              </FilterChip>
            ))}
          </FilterOptions>
        </FilterGroup>

        {(searchQuery || selectedDifficulties.length > 0 || selectedTimeLimits.length > 0 || selectedTags.length > 0 || selectedCompanies.length > 0 || selectedRoles.length > 0) && (
          <ClearFilters onClick={clearAllFilters}>
            <FaTimes />
            Clear All Filters
          </ClearFilters>
        )}
      </FilterSection>

      <ProblemsGrid>
        {filteredProblems.map((problem) => (
          <ProblemCard
            key={problem.slug}
            onClick={() => router.push(`/system-design/problems/${problem.slug}`)}
          >
            <ProblemIcon>{problem.icon}</ProblemIcon>
            <ProblemTitle>{problem.name}</ProblemTitle>
            <BadgeRow>
              <Badge color={problem.difficulty === 'Hard' ? '#e74c3c' : problem.difficulty === 'Medium' ? '#f39c12' : '#27ae60'}>
                {problem.difficulty}
              </Badge>
              <Badge color={'#6c63ff'}>{problem.time_limit} min</Badge>
            </BadgeRow>
            <ProblemDescription>{problem.description}</ProblemDescription>
            <TagsContainer>
              {problem.tags.map(tag => (
                <Badge key={tag} color={'#222'} style={{ background: '#222', color: '#fff', fontWeight: 400, fontSize: '0.78em' }}>
                  {tag}
                </Badge>
              ))}
            </TagsContainer>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
              {problem.roles && problem.roles.map(role => (
                <RoleTag key={role}>{role}</RoleTag>
              ))}
            </div>
          </ProblemCard>
        ))}
      </ProblemsGrid>
    </PageContainer>
  );
} 