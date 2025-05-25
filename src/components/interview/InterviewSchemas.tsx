import React from 'react';
import Script from 'next/script';

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Frontend Interview Mastery',
  description: 'Prepare for top tech interviews with 150+ frontend DSA problems, machine coding challenges, and system design questions covering React, JavaScript, and TypeScript.',
  provider: {
    '@type': 'Organization',
    name: 'Deep Learner',
    sameAs: 'https://deeplearner.com'
  },
  educationalLevel: 'Advanced',
  courseCode: 'FIM-2024',
  numberOfCredits: '150+',
  timeToComplete: 'P3M',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    offers: {
      '@type': 'Offer',
      category: 'Online Course',
      availability: 'https://schema.org/InStock'
    }
  },
  teaches: [
    'Data Structures and Algorithms',
    'Machine Coding',
    'System Design',
    'React',
    'JavaScript',
    'TypeScript'
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What topics are covered in the Frontend Interview Mastery course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The course covers Data Structures and Algorithms (DSA), Machine Coding challenges, and System Design questions specifically focused on frontend development. It includes comprehensive coverage of React, JavaScript, and TypeScript.'
      }
    },
    {
      '@type': 'Question',
      name: 'How many problems are included in the course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The course includes over 150 frontend DSA problems, 30+ machine coding challenges, and various system design questions.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is this course suitable for beginners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While the course is primarily designed for intermediate to advanced developers preparing for frontend interviews, beginners with basic JavaScript knowledge can also benefit from the structured learning path.'
      }
    },
    {
      '@type': 'Question',
      name: 'How long does it take to complete the course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The course is self-paced, but we recommend dedicating 2-3 months of consistent practice to complete all problems and challenges effectively.'
      }
    }
  ]
};

export const InterviewSchemas: React.FC = () => {
  return (
    <>
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}; 