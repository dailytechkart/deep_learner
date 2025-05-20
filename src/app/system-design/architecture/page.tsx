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
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

export default function SystemDesignArchitecturePage() {
  return (
    <>
      <SEO
        title="System Design Architecture"
        description="Learn about different system design architectures and their applications. Understand how to choose and implement the right architecture for your system."
        keywords={[
          'system design',
          'architecture',
          'distributed systems',
          'microservices',
          'monolithic',
          'serverless',
          'cloud architecture',
        ]}
      />
      <PageContainer>
        <MainContent>
          <Breadcrumbs
            items={[{ label: 'System Design', href: '/system-design' }, { label: 'Architecture' }]}
          />
          <Title>System Design Architecture</Title>
          <Description>
            Learn about different system design architectures and their applications. Understand how
            to choose and implement the right architecture for your system.
          </Description>

          <Section>
            <SectionTitle>Monolithic Architecture</SectionTitle>
            <Content>
              <p>
                A traditional approach where all components of an application are tightly coupled
                and deployed as a single unit.
              </p>
              <h3>Characteristics</h3>
              <ul>
                <li>Single codebase</li>
                <li>Unified deployment</li>
                <li>Shared resources</li>
                <li>Simpler development</li>
              </ul>
              <h3>Use Cases</h3>
              <ul>
                <li>Small to medium applications</li>
                <li>Simple business logic</li>
                <li>Limited scaling needs</li>
                <li>Rapid prototyping</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Microservices Architecture</SectionTitle>
            <Content>
              <p>
                An architectural style that structures an application as a collection of small,
                independent services.
              </p>
              <h3>Key Features</h3>
              <ul>
                <li>Service independence</li>
                <li>Distributed deployment</li>
                <li>Technology diversity</li>
                <li>Scalability</li>
              </ul>
              <h3>Benefits</h3>
              <ul>
                <li>Independent scaling</li>
                <li>Fault isolation</li>
                <li>Team autonomy</li>
                <li>Technology flexibility</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Serverless Architecture</SectionTitle>
            <Content>
              <p>
                A cloud computing execution model where the cloud provider manages the
                infrastructure and automatically scales resources.
              </p>
              <h3>Components</h3>
              <ul>
                <li>Function as a Service (FaaS)</li>
                <li>Backend as a Service (BaaS)</li>
                <li>Event-driven execution</li>
                <li>Pay-per-use pricing</li>
              </ul>
              <h3>Advantages</h3>
              <ul>
                <li>No server management</li>
                <li>Automatic scaling</li>
                <li>Cost efficiency</li>
                <li>Reduced operational overhead</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Event-Driven Architecture</SectionTitle>
            <Content>
              <p>
                A software architecture pattern promoting the production, detection, consumption of,
                and reaction to events.
              </p>
              <h3>Components</h3>
              <ul>
                <li>Event producers</li>
                <li>Event consumers</li>
                <li>Event channels</li>
                <li>Event processing</li>
              </ul>
              <h3>Benefits</h3>
              <ul>
                <li>Loose coupling</li>
                <li>Scalability</li>
                <li>Real-time processing</li>
                <li>Asynchronous communication</li>
              </ul>
            </Content>
          </Section>
        </MainContent>
      </PageContainer>
    </>
  );
}
