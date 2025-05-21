'use client';

import React from 'react';
import {
  PageContainer,
  MainContent,
  Title,
  Description,
  Section,
  SectionTitle,
  Content,
} from '../../components/StyledComponents';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

export default function SystemDesignBasicsPage() {
  return (
    <>
      <SEO
        title="System Design Basics"
        description="Learn the fundamental concepts and principles of system design. Understand how to create scalable, reliable, and efficient systems."
        keywords={[
          'system design',
          'scalability',
          'reliability',
          'performance',
          'architecture',
          'distributed systems',
          'design principles',
        ]}
      />
      <PageContainer>
        <MainContent>
          <Breadcrumbs
            items={[{ label: 'System Design', href: '/system-design' }, { label: 'Basics' }]}
          />
          <Title>System Design Basics</Title>
          <Description>
            Learn the fundamental concepts and principles of system design. Understand how to create
            scalable, reliable, and efficient systems.
          </Description>

          <Section>
            <SectionTitle>What is System Design?</SectionTitle>
            <Content>
              <p>
                System design is the process of defining the architecture, components, modules,
                interfaces, and data for a system to satisfy specified requirements. It involves
                making high-level decisions about the system's structure and behavior.
              </p>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Key Concepts</SectionTitle>
            <Content>
              <h3>Scalability</h3>
              <p>
                The ability of a system to handle growing amounts of work by adding resources to the
                system. This can be achieved through:
              </p>
              <ul>
                <li>Horizontal scaling (adding more machines)</li>
                <li>Vertical scaling (adding more power to existing machines)</li>
                <li>Load balancing</li>
                <li>Database sharding</li>
              </ul>

              <h3>Reliability</h3>
              <p>
                The ability of a system to perform its required functions under stated conditions
                for a specified period of time. This includes:
              </p>
              <ul>
                <li>Fault tolerance</li>
                <li>High availability</li>
                <li>Data redundancy</li>
                <li>Disaster recovery</li>
              </ul>

              <h3>Performance</h3>
              <p>
                The speed and efficiency with which a system processes requests. Key factors
                include:
              </p>
              <ul>
                <li>Response time</li>
                <li>Throughput</li>
                <li>Resource utilization</li>
                <li>Caching strategies</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Design Principles</SectionTitle>
            <Content>
              <h3>Modularity</h3>
              <p>
                Breaking down a system into smaller, independent components that can be developed,
                tested, and maintained separately.
              </p>

              <h3>Abstraction</h3>
              <p>
                Hiding complex implementation details behind simple interfaces, making the system
                easier to understand and use.
              </p>

              <h3>Loose Coupling</h3>
              <p>
                Minimizing dependencies between components to make the system more flexible and
                easier to modify.
              </p>

              <h3>High Cohesion</h3>
              <p>
                Keeping related functionality together in the same component, making the system more
                maintainable and easier to understand.
              </p>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Let&apos;s dive into the fundamentals of system design</SectionTitle>
            <Content>
              <p>
                System design is the process of defining the architecture, components, modules,
                interfaces, and data for a system to satisfy specified requirements. It involves
                making high-level decisions about the system's structure and behavior.
              </p>
            </Content>
          </Section>
        </MainContent>
      </PageContainer>
    </>
  );
}
