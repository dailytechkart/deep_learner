import React from 'react';
import CourseDetail from '../../components/CourseDetail';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

const CoursePage: React.FC<CoursePageProps> = ({ params }) => {
  return <CourseDetail courseId={params.courseId} />;
};

export default CoursePage; 