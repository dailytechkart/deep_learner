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

export default function ScalabilityPage() {
  return (
    <PageContainer>
      <MainContent>
        <Title>Scalability</Title>
        <Description>
          Learn about different approaches to scaling systems and how to implement them effectively.
          Understand the trade-offs and best practices for building scalable applications.
        </Description>

        <Section>
          <SectionTitle>Horizontal vs Vertical Scaling</SectionTitle>
          <Content>
            <h3>Horizontal Scaling (Scale Out)</h3>
            <p>Adding more machines or nodes to your system to handle increased load.</p>
            <ul>
              <li>Adds more servers to your pool of resources</li>
              <li>Better fault tolerance</li>
              <li>More flexible and cost-effective</li>
              <li>Requires load balancing</li>
            </ul>

            <h3>Vertical Scaling (Scale Up)</h3>
            <p>Adding more power (CPU, RAM) to your existing machines.</p>
            <ul>
              <li>Increases capacity of existing hardware</li>
              <li>Simpler to implement</li>
              <li>No need for load balancing</li>
              <li>Limited by hardware constraints</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Load Balancing</SectionTitle>
          <Content>
            <p>
              Load balancing distributes incoming network traffic across multiple servers to ensure
              no single server becomes overwhelmed.
            </p>
            <h3>Types of Load Balancers</h3>
            <ul>
              <li>Application Load Balancer (ALB)</li>
              <li>Network Load Balancer (NLB)</li>
              <li>Classic Load Balancer</li>
              <li>Global Server Load Balancer (GSLB)</li>
            </ul>
            <h3>Load Balancing Algorithms</h3>
            <ul>
              <li>Round Robin</li>
              <li>Least Connections</li>
              <li>IP Hash</li>
              <li>Weighted Round Robin</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Database Scaling</SectionTitle>
          <Content>
            <h3>Read Replicas</h3>
            <p>Creating copies of the database for read operations to distribute the load.</p>
            <ul>
              <li>Improves read performance</li>
              <li>Reduces load on primary database</li>
              <li>Provides disaster recovery</li>
              <li>May have replication lag</li>
            </ul>

            <h3>Sharding</h3>
            <p>Splitting data across multiple databases based on a sharding key.</p>
            <ul>
              <li>Distributes data across multiple servers</li>
              <li>Improves write performance</li>
              <li>Enables horizontal scaling</li>
              <li>Adds complexity to queries</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Caching Strategies</SectionTitle>
          <Content>
            <h3>Types of Caching</h3>
            <ul>
              <li>Application Cache (In-memory)</li>
              <li>Distributed Cache (Redis, Memcached)</li>
              <li>CDN (Content Delivery Network)</li>
              <li>Browser Cache</li>
            </ul>
            <h3>Cache Invalidation</h3>
            <ul>
              <li>Time-based expiration</li>
              <li>Event-based invalidation</li>
              <li>Cache-aside pattern</li>
              <li>Write-through caching</li>
            </ul>
          </Content>
        </Section>
      </MainContent>
    </PageContainer>
  );
}
