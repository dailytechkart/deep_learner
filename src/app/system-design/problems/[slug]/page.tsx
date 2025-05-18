'use client';

import { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { FaComments, FaList, FaClock, FaCommentDots, FaClipboardList, FaBolt, FaSearch, FaLayerGroup, FaFilter, FaTimes, FaBuilding } from 'react-icons/fa';

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
  font-family: "Charter", "Georgia", "Cambria", "Times New Roman", "Times", serif;
`;

const LeftPanel = styled.nav<{ isOpen?: boolean }>`
  width: 320px;
  min-width: 280px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  margin-top: 80px;
  transition: all 0.3s ease;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    position: fixed;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    z-index: 1000;
  }
`;

const RightPanel = styled.aside`
  width: 300px;
  min-width: 250px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  margin-top: 80px;
  transition: all 0.3s ease;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const PanelHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 24px 28px 16px 28px;
  font-size: 1.1em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.3px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5em;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const ProblemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 16px 20px;
  flex: 1;
  overflow-y: auto;
`;

const ProblemCard = styled.li<{ selected: boolean }>`
  background: ${({ selected, theme }) => selected ? theme.colors.background : theme.colors.backgroundAlt};
  border: 1px solid ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.border};
  border-radius: 10px;
  margin-bottom: 12px;
  padding: 16px;
  color: ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  cursor: pointer;
  box-shadow: ${({ selected }) => selected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ selected, theme }) => selected ? theme.colors.primary : 'transparent'};
    transition: background 0.2s ease;
  }
`;

const ProblemIcon = styled.div`
  font-size: 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.9;
`;

const ProblemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProblemTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  line-height: 1.4;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
`;

const Badge = styled.span<{ color: string }>`
  background: ${({ color }) => color};
  color: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.8em;
  font-weight: 500;
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
  transition: all 0.3s ease;
  position: relative;
  overflow-y: auto;
`;

const Header = styled.div`
  width: 100%;
  padding: 32px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: 24px;
`;

const HeaderContent = styled.div`
  max-width: 900px;
  width: 100%;
  padding: 0 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const MainTitle = styled.h1`
  font-size: 2.2em;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-family: "GT Alpina", "Georgia", "Cambria", "Times New Roman", "Times", serif;
  letter-spacing: -0.016em;
  line-height: 1.2;
  text-align: center;
  position: relative;
  padding-bottom: 16px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const HeaderBadge = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  color: #fff;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 0.95em;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px ${({ color }) => `${color}40`};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ color }) => `${color}50`};
  }

  svg {
    font-size: 1.1em;
  }
`;

const DifficultyBadge = styled(HeaderBadge)`
  background: ${({ theme }) => theme.colors.primary};
`;

const TimeBadge = styled(HeaderBadge)`
  background: #6c63ff;
`;

const MainBadgeRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const ContentCard = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 36px 40px 36px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 24px 32px 24px;
  }
`;

const FilterSection = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: 16px;
  
  input {
    width: 100%;
    padding: 10px 14px 10px 38px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9em;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}10`};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
      opacity: 0.7;
    }
  }
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.2s ease;
    font-size: 1em;
  }

  &:focus-within svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownFilter = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
`;

const DropdownButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ isOpen, theme }) => isOpen ? theme.colors.primary : theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }

  svg {
    transition: transform 0.2s ease;
    transform: rotate(${({ isOpen }) => isOpen ? '180deg' : '0'});
    font-size: 0.9em;
  }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 6px;
  z-index: 10;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-height: 280px;
  overflow-y: auto;
`;

const DropdownOption = styled.div<{ selected: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.text};
  background: ${({ selected, theme }) => selected ? `${theme.colors.primary}10` : 'transparent'};
  font-weight: ${({ selected }) => selected ? '500' : '400'};
  font-size: 0.9em;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

const PriceRangeInput = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 12px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    font-size: 0.9em;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.div`
  font-size: 0.9em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 0.9em;
    opacity: 0.7;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  border: 2px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.colors.text};
  font-size: 0.85em;
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ active, theme }) => active ? theme.colors.primary : 'rgba(108, 99, 255, 0.1)'};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ClearFilters = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
  width: 100%;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 0.9em;
  }
`;

const InfoSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const InfoTitle = styled.h3`
  font-size: 1.1em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CompanyList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const CompanyTag = styled.div`
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 0.9em;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95em;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1em;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const InfoTag = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85em;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

function DynamicMDX({ slug }: { slug: string }) {
  const MDXComponent = dynamic(() => import(`./${slug}.mdx`), {
    loading: () => <div>Loading...</div>,
    ssr: true
  });

  return (
    <div className="mdx-content">
      <MDXComponent />
    </div>
  );
}

const MDXContent = styled.div`
  h1 {
    display: none;
  }

  h2 {
    font-size: 1.8em;
    font-weight: 600;
    margin: 1.6em 0 0.8em;
    color: ${({ theme }) => theme.colors.text};
    font-family: "GT Alpina", "Georgia", "Cambria", "Times New Roman", "Times", serif;
    letter-spacing: -0.016em;
    line-height: 1.3;
  }

  h3 {
    font-size: 1.4em;
    font-weight: 600;
    margin: 1.4em 0 0.6em;
    color: ${({ theme }) => theme.colors.text};
    font-family: "GT Alpina", "Georgia", "Cambria", "Times New Roman", "Times", serif;
    letter-spacing: -0.016em;
    line-height: 1.4;
  }

  p {
    font-size: 1.1em;
    line-height: 1.7;
    letter-spacing: -0.003em;
    margin-bottom: 1.5em;
    color: ${({ theme }) => theme.colors.text};
    max-width: 65ch;
  }

  ul, ol {
    font-size: 1.1em;
    line-height: 1.7;
    letter-spacing: -0.003em;
    margin: 1.5em 0;
    padding-left: 2em;
    max-width: 65ch;
  }

  li {
    margin-bottom: 0.8em;
    position: relative;
  }

  li::marker {
    color: ${({ theme }) => theme.colors.primary};
  }

  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 0.9em;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 0.2em 0.4em;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.primary};
  }

  pre {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 1.2em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5em 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  pre code {
    background: none;
    padding: 0;
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.text};
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    padding: 0.8em 1.2em;
    margin: 1.5em 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 0 8px 8px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: 0.95em;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    overflow: hidden;
  }

  th, td {
    padding: 0.8em 1em;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }

  th {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  tr:hover {
    background: ${({ theme }) => `${theme.colors.primary}08`};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5em 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    border-bottom: 1px solid transparent;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.primary};
    }
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin: 2em 0;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export default function ProblemPage() {
  const [selectedProblem, setSelectedProblem] = useState(problemsList[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedTimeLimits, setSelectedTimeLimits] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Get unique tags from all problems
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    problemsList.forEach(problem => {
      problem.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const timeLimits = [30, 45, 60, 75, 90, 120];

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

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

  // Close mobile menu when selecting a problem
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [selectedProblem]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-filter')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Layout>
      <LeftPanel isOpen={isMobileMenuOpen}>
        <PanelHeader>
          System Design Problems
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '×' : '☰'}
          </MobileMenuButton>
        </PanelHeader>
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
          
          <DropdownFilter className="dropdown-filter">
            <DropdownButton 
              isOpen={activeDropdown === 'difficulty'}
              onClick={() => toggleDropdown('difficulty')}
            >
              Difficulty Level {selectedDifficulties.length > 0 && `(${selectedDifficulties.length})`}
              <FaFilter />
            </DropdownButton>
            <DropdownContent isOpen={activeDropdown === 'difficulty'}>
              {difficulties.map(difficulty => (
                <DropdownOption
                  key={difficulty}
                  selected={selectedDifficulties.includes(difficulty)}
                  onClick={() => toggleDifficulty(difficulty)}
                >
                  {difficulty}
                </DropdownOption>
              ))}
            </DropdownContent>
          </DropdownFilter>

          <DropdownFilter className="dropdown-filter">
            <DropdownButton 
              isOpen={activeDropdown === 'timeLimit'}
              onClick={() => toggleDropdown('timeLimit')}
            >
              Time Limit {selectedTimeLimits.length > 0 && `(${selectedTimeLimits.length})`}
              <FaFilter />
            </DropdownButton>
            <DropdownContent isOpen={activeDropdown === 'timeLimit'}>
              {timeLimits.map(time => (
                <DropdownOption
                  key={time}
                  selected={selectedTimeLimits.includes(time)}
                  onClick={() => toggleTimeLimit(time)}
                >
                  {time} min
                </DropdownOption>
              ))}
            </DropdownContent>
          </DropdownFilter>

          <DropdownFilter className="dropdown-filter">
            <DropdownButton 
              isOpen={activeDropdown === 'tags'}
              onClick={() => toggleDropdown('tags')}
            >
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
              <FaFilter />
            </DropdownButton>
            <DropdownContent isOpen={activeDropdown === 'tags'}>
              {allTags.map(tag => (
                <DropdownOption
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </DropdownOption>
              ))}
            </DropdownContent>
          </DropdownFilter>

          {(searchQuery || selectedDifficulties.length > 0 || 
            selectedTimeLimits.length > 0 || selectedTags.length > 0) && (
            <ClearFilters onClick={clearAllFilters}>
              <FaTimes />
              Clear All Filters
            </ClearFilters>
          )}
        </FilterSection>
        <ProblemList>
          {problemsList.map((problem) => (
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
                  <Badge color={problem.difficulty === 'Hard' ? '#e74c3c' : problem.difficulty === 'Medium' ? '#f39c12' : '#27ae60'}>
                    {problem.difficulty}
                  </Badge>
                  <Badge color={'#6c63ff'}>{problem.time_limit} min</Badge>
                </BadgeRow>
              </ProblemInfo>
            </ProblemCard>
          ))}
        </ProblemList>
      </LeftPanel>
      <MainPanel>
        <Header>
          <HeaderContent>
            <MainTitle>{selectedProblem.name}</MainTitle>
            <BadgeContainer>
              <HeaderBadge color={selectedProblem.difficulty === 'Hard' ? '#e74c3c' : selectedProblem.difficulty === 'Medium' ? '#f39c12' : '#27ae60'}>
                <FaBolt />
                {selectedProblem.difficulty}
              </HeaderBadge>
              <HeaderBadge color={'#6c63ff'}>
                <FaClock />
                {selectedProblem.time_limit} min
              </HeaderBadge>
            </BadgeContainer>
          </HeaderContent>
        </Header>
        <ContentCard ref={contentRef}>
          <Suspense fallback={<div>Loading...</div>}>
            <MDXContent>
              <DynamicMDX slug={selectedProblem.slug} />
            </MDXContent>
          </Suspense>
        </ContentCard>
      </MainPanel>
      <RightPanel>
        <InfoSection>
          <InfoTitle>
            <FaComments />
            Problem Overview
          </InfoTitle>
          <CompanyList>
            {selectedProblem.company_asked.map(company => (
              <CompanyTag key={company}>
                <FaBuilding />
                {company}
              </CompanyTag>
            ))}
          </CompanyList>
          <InfoRow>
            <FaClock />
            Time Limit: {selectedProblem.time_limit} minutes
          </InfoRow>
          <InfoRow>
            <FaBolt />
            Difficulty: {selectedProblem.difficulty}
          </InfoRow>
          <InfoRow>
            <FaList />
            Tags:
          </InfoRow>
          <TagList>
            {selectedProblem.tags.map(tag => (
              <InfoTag key={tag}>{tag}</InfoTag>
            ))}
          </TagList>
        </InfoSection>

        <InfoSection>
          <InfoTitle>
            <FaCommentDots />
            Problem Description
          </InfoTitle>
          <div style={{ color: '#666', fontSize: '0.95em', lineHeight: 1.5 }}>
            {selectedProblem.description}
          </div>
        </InfoSection>

        <InfoSection>
          <InfoTitle>
            <FaBolt />
            Additional Challenge
          </InfoTitle>
          <div style={{ color: '#666', fontSize: '0.95em', lineHeight: 1.5 }}>
            {selectedProblem.twist}
          </div>
        </InfoSection>
      </RightPanel>
    </Layout>
  );
}

