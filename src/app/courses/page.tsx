import React from 'react';
import styled from 'styled-components';
import CourseList from '../components/CourseList';
import { useCourses } from '../hooks/useCourses';

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
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
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
  border: 2px solid ${props => (props.active ? '#007bff' : '#e0e0e0')};
  border-radius: 6px;
  background: ${props => (props.active ? '#007bff' : 'white')};
  color: ${props => (props.active ? 'white' : '#666')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #007bff;
    color: ${props => (props.active ? 'white' : '#007bff')};
  }
`;

const CoursesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const { courses, userCourses, loading, error } = useCourses();

  const filteredCourses = React.useMemo(() => {
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
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
