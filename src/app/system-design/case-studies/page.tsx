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

export default function SystemDesignCaseStudiesPage() {
  return (
    <>
      <SEO
        title="System Design Case Studies"
        description="Explore real-world system design case studies from top tech companies. Learn from practical examples and understand how large-scale systems are built."
        keywords={[
          'system design',
          'case studies',
          'real-world examples',
          'tech companies',
          'architecture',
          'scalability',
          'distributed systems',
        ]}
      />
      <PageContainer>
        <MainContent>
          <Breadcrumbs
            items={[{ label: 'System Design', href: '/system-design' }, { label: 'Case Studies' }]}
          />
          <Title>System Design Case Studies</Title>
          <Description>
            Explore real-world system design case studies from top tech companies. Learn from
            practical examples and understand how large-scale systems are built.
          </Description>

          <Section>
            <SectionTitle>Netflix</SectionTitle>
            <Content>
              <h3>Global Content Delivery</h3>
              <p>
                Netflix's content delivery system is a prime example of distributed systems design.
                Key aspects include:
              </p>
              <ul>
                <li>Content Delivery Network (CDN) architecture</li>
                <li>Microservices-based architecture</li>
                <li>Data replication and caching strategies</li>
                <li>Load balancing across regions</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Uber</SectionTitle>
            <Content>
              <h3>Real-time Location Tracking</h3>
              <p>Uber's system handles millions of real-time location updates. Key components:</p>
              <ul>
                <li>Geospatial data processing</li>
                <li>Real-time matching algorithms</li>
                <li>Distributed database architecture</li>
                <li>High availability requirements</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Twitter</SectionTitle>
            <Content>
              <h3>Social Media Feed System</h3>
              <p>Twitter's feed system demonstrates handling high-volume data streams:</p>
              <ul>
                <li>Timeline generation algorithms</li>
                <li>Real-time data processing</li>
                <li>Fan-out on write vs. read</li>
                <li>Cache optimization strategies</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Amazon</SectionTitle>
            <Content>
              <h3>E-commerce Platform</h3>
              <p>Amazon's e-commerce system showcases complex distributed architecture:</p>
              <ul>
                <li>Product catalog management</li>
                <li>Order processing pipeline</li>
                <li>Inventory management</li>
                <li>Recommendation engine</li>
              </ul>
            </Content>
          </Section>
        </MainContent>
      </PageContainer>
    </>
  );
}
