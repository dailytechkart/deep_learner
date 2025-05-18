'use client';

import React from 'react';
import {
  PageContainer,
  MainContent,
  Title,
  Description,
  Section,
  SectionTitle,
  Content
} from '../../components/StyledComponents';

export default function CaseStudiesPage() {
  return (
    <PageContainer>
      <MainContent>
        <Title>System Design Case Studies</Title>
        <Description>
          Explore real-world examples of system design implementations. Learn from the
          challenges and solutions of successful companies.
        </Description>

        <Section>
          <SectionTitle>Netflix</SectionTitle>
          <Content>
            <p>
              Netflix's system design evolution from a DVD rental service to a global
              streaming platform.
            </p>
            <h3>Key Components</h3>
            <ul>
              <li>Microservices architecture</li>
              <li>Content Delivery Network (CDN)</li>
              <li>Distributed caching</li>
              <li>Load balancing</li>
            </ul>
            <h3>Challenges Solved</h3>
            <ul>
              <li>Global content delivery</li>
              <li>High availability</li>
              <li>Scalable video streaming</li>
              <li>Personalized recommendations</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Uber</SectionTitle>
          <Content>
            <p>
              How Uber built a real-time ride-hailing system that handles millions of
              concurrent users.
            </p>
            <h3>System Components</h3>
            <ul>
              <li>Geospatial indexing</li>
              <li>Real-time matching</li>
              <li>Payment processing</li>
              <li>Driver tracking</li>
            </ul>
            <h3>Technical Challenges</h3>
            <ul>
              <li>Real-time location updates</li>
              <li>Dynamic pricing</li>
              <li>Payment reliability</li>
              <li>Driver-rider matching</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Twitter</SectionTitle>
          <Content>
            <p>
              Twitter's journey in building a scalable social media platform that handles
              real-time updates and high traffic.
            </p>
            <h3>Architecture Evolution</h3>
            <ul>
              <li>Monolithic to microservices</li>
              <li>Real-time feed updates</li>
              <li>Search functionality</li>
              <li>Media handling</li>
            </ul>
            <h3>Key Solutions</h3>
            <ul>
              <li>Fan-out on write</li>
              <li>Distributed caching</li>
              <li>Message queues</li>
              <li>Content delivery optimization</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Airbnb</SectionTitle>
          <Content>
            <p>
              How Airbnb built a scalable platform for property listings and bookings.
            </p>
            <h3>System Features</h3>
            <ul>
              <li>Search and discovery</li>
              <li>Booking management</li>
              <li>Payment processing</li>
              <li>Review system</li>
            </ul>
            <h3>Technical Solutions</h3>
            <ul>
              <li>Elasticsearch for search</li>
              <li>Service-oriented architecture</li>
              <li>Payment gateway integration</li>
              <li>Image processing pipeline</li>
            </ul>
          </Content>
        </Section>
      </MainContent>
    </PageContainer>
  );
} 