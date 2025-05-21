'use client';

import React from 'react';
import styled from 'styled-components';
import CourseList from '../components/CourseList';
import { useCourses } from '../hooks/useCourses';

export const dynamic = 'force-dynamic';

const CoursesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CoursesHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid
    ${props => (props.active ? props.theme.colors.primary : props.theme.colors.border)};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => (props.active ? props.theme.colors.primary : 'transparent')};
  color: ${props =>
    props.active ? props.theme.colors.background : props.theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => (props.active ? props.theme.colors.background : props.theme.colors.primary)};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${props => props.theme.colors.textSecondary};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  padding: 1rem;
`;

const CoursesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const { courses, userCourses, loading, error } = useCourses();

  const filteredCourses = React.useMemo(() => {
    if (!courses || !userCourses) return [];

    if (activeFilter === 'all') return courses;
    if (activeFilter === 'enrolled') {
      return courses.filter(course => userCourses.some(uc => uc.courseId === course.id));
    }
    if (activeFilter === 'completed') {
      return courses.filter(course =>
        userCourses.some(uc => uc.courseId === course.id && uc.status === 'completed')
      );
    }
    return courses;
  }, [courses, userCourses, activeFilter]);

  if (loading) {
    return (
      <LoadingContainer>
        <p>Loading courses...</p>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <p>Error: {error}</p>
      </ErrorContainer>
    );
  }

  return (
    <CoursesContainer>
      <CoursesHeader>
        <Title>Explore Courses</Title>
        <Subtitle>
          Discover a wide range of courses designed to help you master new skills and advance your
          career.
        </Subtitle>
      </CoursesHeader>

      <FilterSection>
        <FilterButton active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
          All Courses
        </FilterButton>
        <FilterButton
          active={activeFilter === 'enrolled'}
          onClick={() => setActiveFilter('enrolled')}
        >
          My Courses
        </FilterButton>
        <FilterButton
          active={activeFilter === 'completed'}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </FilterButton>
      </FilterSection>

      <CourseList courses={filteredCourses} />
    </CoursesContainer>
  );
};

export default CoursesPage;
