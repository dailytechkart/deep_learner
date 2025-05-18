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

export default function ArchitecturePatternsPage() {
  return (
    <PageContainer>
      <MainContent>
        <Title>Architecture Patterns</Title>
        <Description>
          Explore common architecture patterns used in system design. Learn how to choose
          and implement the right pattern for your system.
        </Description>

        <Section>
          <SectionTitle>Monolithic Architecture</SectionTitle>
          <Content>
            <p>
              A monolithic architecture is a traditional unified model for the design of a
              software program. All components are combined into a single program on a single
              platform.
            </p>
            <h3>Advantages</h3>
            <ul>
              <li>Simple to develop and deploy</li>
              <li>Easier to test and debug</li>
              <li>Lower initial development cost</li>
              <li>Better performance for small applications</li>
            </ul>
            <h3>Disadvantages</h3>
            <ul>
              <li>Difficult to scale</li>
              <li>Hard to maintain as the application grows</li>
              <li>Technology stack is locked</li>
              <li>Single point of failure</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Microservices Architecture</SectionTitle>
          <Content>
            <p>
              Microservices architecture is an approach where an application is structured as
              a collection of small, independent services that communicate over well-defined
              APIs.
            </p>
            <h3>Advantages</h3>
            <ul>
              <li>Independent deployment and scaling</li>
              <li>Technology diversity</li>
              <li>Fault isolation</li>
              <li>Easier maintenance and updates</li>
            </ul>
            <h3>Disadvantages</h3>
            <ul>
              <li>Increased complexity</li>
              <li>Network latency</li>
              <li>Distributed system challenges</li>
              <li>Higher operational overhead</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Event-Driven Architecture</SectionTitle>
          <Content>
            <p>
              Event-driven architecture is a software architecture pattern promoting the
              production, detection, consumption of, and reaction to events.
            </p>
            <h3>Key Components</h3>
            <ul>
              <li>Event producers</li>
              <li>Event channels</li>
              <li>Event processing</li>
              <li>Event consumers</li>
            </ul>
            <h3>Use Cases</h3>
            <ul>
              <li>Real-time data processing</li>
              <li>IoT applications</li>
              <li>Asynchronous workflows</li>
              <li>Decoupled systems</li>
            </ul>
          </Content>
        </Section>

        <Section>
          <SectionTitle>Serverless Architecture</SectionTitle>
          <Content>
            <p>
              Serverless architecture allows developers to build and run applications without
              managing servers. The cloud provider handles the infrastructure.
            </p>
            <h3>Benefits</h3>
            <ul>
              <li>No server management</li>
              <li>Pay-per-use pricing</li>
              <li>Automatic scaling</li>
              <li>Reduced operational costs</li>
            </ul>
            <h3>Considerations</h3>
            <ul>
              <li>Cold start latency</li>
              <li>Execution time limits</li>
              <li>Vendor lock-in</li>
              <li>Debugging complexity</li>
            </ul>
          </Content>
        </Section>
      </MainContent>
    </PageContainer>
  );
} 