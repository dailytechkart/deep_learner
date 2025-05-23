import React from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import { CourseCard } from './CourseCard';

const CoursesGrid = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.primary};

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const NoResultsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const NoResultsIllustration = styled.figure`
  width: 200px;
  height: 200px;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textSecondary};
  opacity: 0.5;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const NoResultsTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const NoResultsText = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 400px;
`;

const NoResultsAction = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

interface CourseListProps {
  topics: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    role: string;
    estimatedTime: string;
    totalLessons: number;
    progress: number;
  }>;
  isLoading: boolean;
  onClearFilters: () => void;
}

export const CourseList: React.FC<CourseListProps> = ({ topics, isLoading, onClearFilters }) => {
  const isCourseLocked = (index: number) => {
    return index >= 2; // First 2 courses are unlocked, rest are locked
  };

  const renderNoResults = () => (
    <NoResultsContainer aria-label="No courses found">
      <NoResultsIllustration>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16H12.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </NoResultsIllustration>
      <NoResultsTitle>No Courses Found</NoResultsTitle>
      <NoResultsText>
        We couldn't find any courses matching your current filters. Try adjusting your search
        criteria or clear all filters to see all available courses.
      </NoResultsText>
      <NoResultsAction onClick={onClearFilters}>Clear All Filters</NoResultsAction>
    </NoResultsContainer>
  );

  if (isLoading) {
    return (
      <LoadingSpinner role="status" aria-label="Loading courses">
        <FaSpinner aria-hidden="true" />
      </LoadingSpinner>
    );
  }

  if (topics.length === 0) {
    return renderNoResults();
  }

  return (
    <CoursesGrid aria-label="Course list">
      {topics.map((topic, index) => (
        <CourseCard key={topic.id} topic={topic} isLocked={isCourseLocked(index)} />
      ))}
    </CoursesGrid>
  );
};
