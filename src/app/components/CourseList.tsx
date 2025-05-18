import React from 'react';
import styled from 'styled-components';
import { Course, UserCourse } from '../types/course';
import { useCourses } from '../hooks/useCourses';

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const CourseCard = styled.div<{ isEnrolled: boolean }>`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  border: 2px solid ${props => props.isEnrolled ? '#4CAF50' : 'transparent'};

  &:hover {
    transform: translateY(-4px);
  }
`;

const CourseImage = styled.div`
  height: 200px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #666;
`;

const CourseContent = styled.div`
  padding: 1.5rem;
`;

const CourseTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #1a1a1a;
`;

const CourseDescription = styled.p`
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: #4CAF50;
    transition: width 0.3s ease-in-out;
  }
`;

const EnrollButton = styled.button<{ isEnrolled: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.isEnrolled ? '#4CAF50' : '#007bff'};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: ${props => props.isEnrolled ? '#45a049' : '#0056b3'};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const { userCourses, enrollInCourse } = useCourses();

  const getUserCourse = (courseId: string): UserCourse | undefined => {
    return userCourses.find(uc => uc.courseId === courseId);
  };

  return (
    <CourseGrid>
      {courses.map((course) => {
        const userCourse = getUserCourse(course.id);
        const isEnrolled = !!userCourse;

        return (
          <CourseCard key={course.id} isEnrolled={isEnrolled}>
            <CourseImage>
              {course.title.charAt(0)}
            </CourseImage>
            <CourseContent>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <CourseMeta>
                <span>{course.duration} hours</span>
                <span>{course.level}</span>
              </CourseMeta>
              {isEnrolled && userCourse && (
                <ProgressBar progress={userCourse.progress} />
              )}
              <EnrollButton
                isEnrolled={isEnrolled}
                onClick={() => enrollInCourse(course.id)}
                disabled={isEnrolled}
              >
                {isEnrolled ? 'Enrolled' : 'Enroll Now'}
              </EnrollButton>
            </CourseContent>
          </CourseCard>
        );
      })}
    </CourseGrid>
  );
};

export default CourseList; 