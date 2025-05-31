'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { HeroInfoView } from '@/app/system-design/components/HeroInfoView';
import { TopicsGrid } from '@/app/system-design/components/TopicsGrid';
import { TabNavigation, TabType } from '@/app/system-design/components/TabNavigation';
import SEO from '@/components/SEO';
import { FaReact, FaCode, FaMobile, FaShieldAlt, FaLaptopCode } from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export const dynamic = 'force-dynamic';

const ContentSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const systemDesignTopics = [
  {
    id: 'frontend-architecture',
    title: 'Frontend Architecture',
    description:
      'Design scalable frontend applications with modern patterns, state management, and component architecture.',
    icon: <FaReact />,
    tags: ['intermediate', 'premium'],
    technologies: ['React', 'TypeScript', 'State Management'],
    roles: ['Frontend Architect', 'Senior Frontend Developer'],
  },
  {
    id: 'micro-frontends',
    title: 'Micro-Frontends',
    description:
      'Implement micro-frontend architecture for large-scale applications with independent deployment.',
    icon: <FaLaptopCode />,
    tags: ['advanced', 'premium'],
    technologies: ['Module Federation', 'Webpack', 'Single-SPA'],
    roles: ['Frontend Architect', 'Tech Lead'],
  },
  {
    id: 'frontend-performance',
    title: 'Frontend Performance',
    description:
      'Optimize frontend applications for speed, including code splitting, caching, and bundle optimization.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Webpack', 'Vite', 'Performance Monitoring'],
    roles: ['Frontend Developer', 'Performance Engineer'],
  },
  {
    id: 'progressive-web-apps',
    title: 'Progressive Web Apps',
    description:
      'Design and implement PWAs with offline support, push notifications, and app-like experience.',
    icon: <FaMobile />,
    tags: ['intermediate'],
    technologies: ['Service Workers', 'Web App Manifest', 'IndexedDB'],
    roles: ['Frontend Developer', 'Mobile Developer'],
  },
  {
    id: 'frontend-security',
    title: 'Frontend Security',
    description:
      'Implement secure frontend applications with proper authentication, authorization, and data protection.',
    icon: <FaShieldAlt />,
    tags: ['advanced', 'premium'],
    technologies: ['OAuth', 'JWT', 'CSP'],
    roles: ['Frontend Developer', 'Security Engineer'],
  },
  {
    id: 'state-management',
    title: 'State Management',
    description: 'Design efficient state management solutions for complex frontend applications.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Redux', 'MobX', 'Zustand'],
    roles: ['Frontend Developer', 'State Management Expert'],
  },
  {
    id: 'frontend-testing',
    title: 'Frontend Testing',
    description: 'Implement comprehensive testing strategies for frontend applications.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Jest', 'React Testing Library', 'Cypress'],
    roles: ['Frontend Developer', 'QA Engineer'],
  },
  {
    id: 'frontend-monitoring',
    title: 'Frontend Monitoring',
    description: 'Design and implement frontend monitoring and error tracking systems.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Sentry', 'LogRocket', 'New Relic'],
    roles: ['Frontend Developer', 'Performance Engineer'],
  },
  {
    id: 'frontend-caching',
    title: 'Frontend Caching',
    description: 'Implement efficient caching strategies for frontend applications.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['Service Workers', 'IndexedDB', 'LocalStorage'],
    roles: ['Frontend Developer', 'Performance Engineer'],
  },
  {
    id: 'frontend-build',
    title: 'Frontend Build Systems',
    description: 'Design and optimize frontend build systems for large-scale applications.',
    icon: <FaCode />,
    tags: ['advanced'],
    technologies: ['Webpack', 'Vite', 'Rollup'],
    roles: ['Frontend Developer', 'Build Engineer'],
  },
  {
    id: 'frontend-ssr',
    title: 'Server-Side Rendering',
    description: 'Implement SSR strategies for improved performance and SEO.',
    icon: <FaCode />,
    tags: ['advanced', 'premium'],
    technologies: ['Next.js', 'Nuxt.js', 'Remix'],
    roles: ['Frontend Developer', 'Full Stack Developer'],
  },
  {
    id: 'frontend-accessibility',
    title: 'Frontend Accessibility',
    description: 'Design accessible frontend applications following WCAG guidelines.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['ARIA', 'Screen Readers', 'Keyboard Navigation'],
    roles: ['Frontend Developer', 'Accessibility Expert'],
  },
];

const SystemDesignPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const getTopicsByCategory = (category: TabType) => {
    switch (category) {
      case 'frontend':
        return systemDesignTopics.filter(
          topic =>
            topic.roles.some(role => role.includes('Frontend')) ||
            topic.technologies.some(tech =>
              ['React', 'TypeScript', 'Webpack', 'Vite'].includes(tech)
            )
        );
      case 'performance':
        return systemDesignTopics.filter(
          topic =>
            topic.roles.some(role => role.includes('Performance')) ||
            topic.title.toLowerCase().includes('performance') ||
            topic.title.toLowerCase().includes('caching')
        );
      case 'architecture':
        return systemDesignTopics.filter(
          topic =>
            topic.title.toLowerCase().includes('architecture') ||
            topic.title.toLowerCase().includes('system')
        );
      case 'security':
        return systemDesignTopics.filter(
          topic =>
            topic.roles.some(role => role.includes('Security')) ||
            topic.title.toLowerCase().includes('security')
        );
      default:
        return systemDesignTopics;
    }
  };

  const filteredTopics = getTopicsByCategory(activeTab);

  return (
    <ProtectedRoute>
      <MainLayout>
        {/* <SEO
          title="System Design Mastery"
          description="Master the art of designing scalable, reliable, and efficient systems. From distributed systems to cloud architecture, learn everything you need to excel in system design interviews and real-world applications."
          keywords={[
            'system design',
            'scalability',
            'reliability',
            'performance',
            'architecture',
            'distributed systems',
            'design patterns',
            'frontend architecture',
            'microservices',
            'cloud architecture',
          ]}
        /> */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'System Design', href: '/system-design' },
          ]}
        />
        <ContentSection>
          {/* <HeroInfoView
            title="System Design Mastery"
            description="Master the art of designing scalable, reliable, and efficient systems. From distributed systems to cloud architecture, learn everything you need to excel in system design interviews and real-world applications."
          /> */}

          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <TopicsGrid topics={filteredTopics} />
        </ContentSection>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default SystemDesignPage;
