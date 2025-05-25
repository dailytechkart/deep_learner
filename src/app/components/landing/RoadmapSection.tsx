import React from 'react';
import styled from 'styled-components';
import {
  RoadmapSection as StyledRoadmapSection,
  SectionHeader,
  SectionTitle,
  RoadmapTimeline,
  RoadmapItem,
  RoadmapContent,
  RoadmapTitle,
  RoadmapDescription,
  RoadmapSkills,
  RoadmapSkill,
} from '../StyledComponents';

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const roadmapData = [
  {
    title: 'Foundation',
    description: 'Master HTML5 semantics, responsive layouts, CSS Grid/Flexbox, and JavaScript fundamentals. Build interactive websites with DOM manipulation, event handling, and form validation. Learn Git basics and modern development workflows.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Responsive Design'],
  },
  {
    title: 'Advanced Frontend',
    description: 'Deep dive into React hooks, custom hooks, context API, and state management (Redux/Context). Master TypeScript types, interfaces, and generics. Learn modern build tools (Webpack/Vite), testing (Jest/React Testing Library), and component architecture.',
    skills: ['React', 'TypeScript', 'Redux', 'Testing', 'Build Tools'],
  },
  {
    title: 'Performance & Optimization',
    description: 'Master code splitting, lazy loading, and bundle optimization. Learn performance monitoring, caching strategies, and Core Web Vitals. Implement accessibility (WCAG), SEO best practices, and progressive enhancement techniques.',
    skills: ['Performance', 'Accessibility', 'SEO', 'Core Web Vitals', 'Optimization'],
  },
  {
    title: 'Frontend Interview Prep',
    description: 'Master frontend-specific DSA problems, React internals, and browser fundamentals. Practice coding challenges, system design for frontend applications, and debugging techniques. Learn to explain technical concepts clearly and handle edge cases.',
    skills: ['DSA', 'System Design', 'Debugging', 'Problem Solving', 'Technical Communication'],
  },
  {
    title: 'Behavioral & Leadership',
    description: 'Develop communication skills for technical discussions and presentations. Learn conflict resolution, team management, and project leadership. Master behavioral interview techniques, STAR method, and leadership principles for tech teams.',
    skills: ['Leadership', 'Communication', 'Team Management', 'Conflict Resolution', 'Project Management'],
  },
  {
    title: 'System Design & Architecture',
    description: 'Master micro-frontends, state management patterns, and API design. Learn to design scalable frontend architectures, handle data flow, and implement security best practices. Understand trade-offs in technical decisions and system constraints.',
    skills: ['Architecture', 'Micro-frontends', 'API Design', 'Security', 'Scalability'],
  },
  {
    title: 'Mock Interviews & Feedback',
    description: 'Practice with senior engineers from top tech companies. Receive detailed feedback on coding style, problem-solving approach, and communication. Learn to handle pressure, think on your feet, and present solutions effectively.',
    skills: ['Mock Interviews', 'Code Review', 'Feedback', 'Problem Solving', 'Communication'],
  },
  {
    title: 'Career Growth & Negotiation',
    description: 'Master salary negotiation techniques, career path planning, and professional branding. Learn to evaluate job offers, build a strong portfolio, and maintain work-life balance. Develop strategies for continuous learning and career advancement.',
    skills: ['Career Planning', 'Negotiation', 'Portfolio', 'Professional Branding', 'Work-Life Balance'],
  },
];

const RoadmapItemComponent: React.FC<{
  title: string;
  description: string;
  skills: string[];
}> = React.memo(({ title, description, skills }) => (
  <RoadmapItem role="listitem">
    <RoadmapContent>
      <RoadmapTitle>{title}</RoadmapTitle>
      <RoadmapDescription>{description}</RoadmapDescription>
      <RoadmapSkills>
        {skills.map((skill, skillIndex) => (
          <RoadmapSkill key={skillIndex}>{skill}</RoadmapSkill>
        ))}
      </RoadmapSkills>
    </RoadmapContent>
  </RoadmapItem>
));

RoadmapItemComponent.displayName = 'RoadmapItemComponent';

const RoadmapSection: React.FC = () => {
  return (
    <StyledRoadmapSection id="roadmap" aria-labelledby="roadmap-title">
      <SectionHeader>
        <SectionTitle id="roadmap-title">Your Learning Journey</SectionTitle>
        <HeroDescription style={{ maxWidth: '800px', margin: '0 auto' }}>
          Follow our comprehensive roadmap designed to take you from beginner to professional
          developer
        </HeroDescription>
      </SectionHeader>
      <RoadmapTimeline role="list">
        {roadmapData.map((item, index) => (
          <RoadmapItemComponent
            key={index}
            title={item.title}
            description={item.description}
            skills={item.skills}
          />
        ))}
      </RoadmapTimeline>
    </StyledRoadmapSection>
  );
};

export default React.memo(RoadmapSection); 