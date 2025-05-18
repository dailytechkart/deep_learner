import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCourses } from '../hooks/useCourses';
import { Course, UserProgress, Lesson } from '../types/course';

const CourseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CourseHeader = styled.div`
  margin-bottom: 2rem;
`;

const CourseTitle = styled.h1`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const CourseMeta = styled.div`
  display: flex;
  gap: 2rem;
  color: #666;
  margin-bottom: 1rem;
`;

const CourseDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2rem;
`;

const ProgressSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 1rem 0;
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

const LessonsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const LessonCard = styled.div<{ isCompleted: boolean; isCurrent: boolean }>`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => {
    if (props.isCompleted) return '#4CAF50';
    if (props.isCurrent) return '#007bff';
    return '#e0e0e0';
  }};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateX(4px);
  }
`;

const LessonTitle = styled.h3`
  margin: 0 0 0.5rem;
  color: #1a1a1a;
`;

const LessonMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
`;

const LessonContent = styled.div`
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface CourseDetailProps {
  courseId: string;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId }) => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [courseProgress, setCourseProgress] = useState<UserProgress | null>(null);
  const {
    courses,
    loading,
    error,
    updateProgress,
    getCourseProgress
  } = useCourses();

  const course = courses.find((c: Course) => c.id === courseId);

  useEffect(() => {
    const fetchProgress = async () => {
      const progress = await getCourseProgress(courseId);
      setCourseProgress(progress);
    };
    fetchProgress();
  }, [courseId, getCourseProgress]);

  if (loading) {
    return <div>Loading course details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleLessonClick = (lessonId: string) => {
    setSelectedLesson(lessonId);
  };

  const handleLessonComplete = async (lessonId: string, isCompleted: boolean) => {
    await updateProgress(courseId, lessonId, isCompleted);
    const progress = await getCourseProgress(courseId);
    setCourseProgress(progress);
  };

  const currentLesson = course.lessons.find((l: Lesson) => l.id === selectedLesson);

  return (
    <CourseContainer>
      <CourseHeader>
        <CourseTitle>{course.title}</CourseTitle>
        <CourseMeta>
          <span>{course.duration} hours</span>
          <span>{course.level}</span>
          <span>{course.category}</span>
        </CourseMeta>
        <CourseDescription>{course.description}</CourseDescription>
      </CourseHeader>

      {courseProgress && (
        <ProgressSection>
          <h2>Your Progress</h2>
          <ProgressBar progress={courseProgress.progress} />
          <p>{courseProgress.progress}% Complete</p>
        </ProgressSection>
      )}

      <LessonsList>
        {course.lessons.map((lesson: Lesson) => {
          const isCompleted = courseProgress?.completedLessons.includes(lesson.id);
          const isCurrent = lesson.id === courseProgress?.currentLesson;

          return (
            <LessonCard
              key={lesson.id}
              isCompleted={!!isCompleted}
              isCurrent={isCurrent}
              onClick={() => handleLessonClick(lesson.id)}
            >
              <LessonTitle>{lesson.title}</LessonTitle>
              <LessonMeta>
                <span>{lesson.duration} minutes</span>
                {isCompleted && <span>✓ Completed</span>}
              </LessonMeta>
            </LessonCard>
          );
        })}
      </LessonsList>

      {currentLesson && (
        <LessonContent>
          <h2>{currentLesson.title}</h2>
          <div>{currentLesson.content}</div>
          {currentLesson.videoUrl && (
            <div style={{ marginTop: '1rem' }}>
              <video
                controls
                width="100%"
                src={currentLesson.videoUrl}
              />
            </div>
          )}
          <button
            onClick={() => handleLessonComplete(
              currentLesson.id,
              !courseProgress?.completedLessons.includes(currentLesson.id)
            )}
          >
            {courseProgress?.completedLessons.includes(currentLesson.id)
              ? 'Mark as Incomplete'
              : 'Mark as Complete'}
          </button>
        </LessonContent>
      )}
    </CourseContainer>
  );
};

export default CourseDetail; 