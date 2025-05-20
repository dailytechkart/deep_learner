'use client';

import React, { ReactNode } from 'react';
import Mermaid from '@/components/Mermaid';
import SystemDesignLayout from '@/components/SystemDesignLayout';
import styled from 'styled-components';

const hldDiagram = `flowchart TD
  Client[Client Apps]
  LB[Load Balancer]
  WS[WebSocket Servers]
  API[REST API Servers]
  MQ[Message Queue]
  MS[Message Service]
  DB[(Database)]
  Cache[(Cache)]
  Search[Search Service]

  Client --> LB
  LB --> WS
  LB --> API
  WS --> MQ
  API --> MQ
  MQ --> MS
  MS --> DB
  MS --> Cache
  MS --> Search
`;

const dataModelDiagram = `erDiagram
  User {
    string id
    string username
    string email
    string status
    datetime lastSeen
  }
  Conversation {
    string id
    string type
    string name
    array participants
    datetime createdAt
  }
  Message {
    string id
    string conversationId
    string senderId
    string content
    string type
    datetime timestamp
    string status
  }
  MessageStatus {
    string id
    string messageId
    string userId
    string status
    datetime timestamp
  }
  User ||--o{ Conversation : participates
  Conversation ||--o{ Message : contains
  Message ||--o{ MessageStatus : has
`;

const messageFlowDiagram = `sequenceDiagram
  participant Client
  participant WS as WebSocket
  participant MQ as Message Queue
  participant MS as Message Service
  participant DB as Database
  participant Cache

  Client->>WS: Connect
  WS->>Cache: Get user status
  Cache-->>WS: Return status
  WS-->>Client: Connection established

  Client->>WS: Send message
  WS->>MQ: Publish message
  MQ->>MS: Process message
  MS->>DB: Store message
  MS->>Cache: Update conversation
  MS->>MQ: Publish delivery status
  MQ->>WS: Broadcast status
  WS-->>Client: Message delivered
`;

const Section = styled.section`
  margin: 0 0 4.5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxlarge};
  font-weight: 700;
  margin: 3.5rem 0 1.5rem 0;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  line-height: 1.18;
  letter-spacing: -0.01em;
  text-align: left;
`;

const SectionContent = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.85;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const List = styled.ul`
  margin: 0 0 2.2rem 0;
  padding-left: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 18px;
  padding-left: 32px;
  position: relative;
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  min-height: 28px;
  display: flex;
  align-items: flex-start;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.textSecondary};
    margin-right: 16px;
    display: inline-block;
    flex-shrink: 0;
  }
`;

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem 0 2.5rem 0;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};

  > div {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    max-width: 100%;
    height: auto;
  }
`;

const DiagramCaption = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  margin-top: ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  max-width: 700px;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Article = styled.article`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) => theme.colors.text};
`;

const ContentWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 4.5rem 2rem 5rem 2rem;
  min-height: 100vh;
  box-sizing: border-box;
`;

const Header = styled.header`
  text-align: left;
  margin-bottom: 3.5rem;
`;

const HeaderText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  margin: 0;
  max-width: 540px;
  line-height: 1.7;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const section = (title: string, children: ReactNode) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    <SectionContent>{children}</SectionContent>
  </Section>
);

const ChatSystemAnswer = () => {
  const mainContent = (
    <Article>
      <ContentWrapper>
        <Header>
          <HeaderText>
            A scalable, real-time chat system architecture supporting millions of concurrent users,
            with features like message delivery, read receipts, typing indicators, and message
            persistence.
          </HeaderText>
        </Header>

        {section(
          '1. Clarifying Questions',
          <List>
            <ListItem>What is the expected number of concurrent users?</ListItem>
            <ListItem>What is the expected message volume per second?</ListItem>
            <ListItem>What is the maximum group size?</ListItem>
            <ListItem>What are the message delivery guarantees required?</ListItem>
            <ListItem>What is the expected message retention period?</ListItem>
            <ListItem>What are the security requirements?</ListItem>
            <ListItem>What are the compliance requirements (GDPR, etc.)?</ListItem>
            <ListItem>What are the backup and disaster recovery requirements?</ListItem>
          </List>
        )}

        {section(
          '2. Requirements',
          <>
            <strong>Functional Requirements:</strong>
            <List>
              <ListItem>Real-time message delivery with WebSocket support</ListItem>
              <ListItem>One-to-one and group chat functionality</ListItem>
              <ListItem>Message persistence and history</ListItem>
              <ListItem>User presence indicators</ListItem>
              <ListItem>Message delivery and read receipts</ListItem>
              <ListItem>Typing indicators</ListItem>
              <ListItem>Message search functionality</ListItem>
              <ListItem>File sharing capabilities</ListItem>
            </List>
            <strong style={{ display: 'block', marginTop: 18 }}>Non-Functional Requirements:</strong>
            <List>
              <ListItem>High availability (99.99%)</ListItem>
              <ListItem>Low latency (&lt;100ms for message delivery)</ListItem>
              <ListItem>Scalability to handle millions of concurrent users</ListItem>
              <ListItem>Data consistency and durability</ListItem>
              <ListItem>Security and encryption</ListItem>
              <ListItem>Message delivery guarantees</ListItem>
            </List>
          </>
        )}

        {section(
          '3. High-Level Architecture',
          <>
            <DiagramContainer>
              <Mermaid chart={hldDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              System architecture showing client apps, load balancers, WebSocket servers, message
              queue, and storage layers.
            </DiagramCaption>
            <p style={{ margin: 0 }}>
              The system uses a microservices architecture with WebSocket servers for real-time
              communication, message queues for reliable message delivery, and distributed storage
              for persistence. The architecture is designed to scale horizontally and handle high
              message throughput.
            </p>
          </>
        )}

        {section(
          '4. Data Model',
          <>
            <DiagramContainer>
              <Mermaid chart={dataModelDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Entity relationship diagram showing the data model for users, conversations, messages, and message statuses.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The data model is designed for efficient querying and scaling, with separate
              collections for users, conversations, messages, and message statuses. The schema
              supports all required features while maintaining data consistency.
            </p>
          </>
        )}

        {section(
          '5. Message Flow',
          <>
            <DiagramContainer>
              <Mermaid chart={messageFlowDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Sequence diagram illustrating the message flow through the system components.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The message flow ensures reliable delivery and status updates through WebSocket
              connections, message queues, and distributed services. The system handles message
              persistence, caching, and real-time updates efficiently.
            </p>
          </>
        )}

        {section(
          '6. Scaling Considerations',
          <List>
            <ListItem>
              <strong>WebSocket Layer:</strong>
              <List>
                <ListItem>Horizontal scaling with multiple WebSocket servers</ListItem>
                <ListItem>Load balancing with sticky sessions</ListItem>
                <ListItem>Connection pooling and resource management</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Message Queue:</strong>
              <List>
                <ListItem>Partitioning for high throughput</ListItem>
                <ListItem>Message batching for efficiency</ListItem>
                <ListItem>Dead letter queues for failed messages</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Database:</strong>
              <List>
                <ListItem>Sharding for horizontal scaling</ListItem>
                <ListItem>Read replicas for high availability</ListItem>
                <ListItem>Caching layer for frequent queries</ListItem>
              </List>
            </ListItem>
          </List>
        )}

        {section(
          '7. Security Considerations',
          <List>
            <ListItem>End-to-end encryption for messages</ListItem>
            <ListItem>Authentication and authorization</ListItem>
            <ListItem>Rate limiting and DDoS protection</ListItem>
            <ListItem>Input validation and sanitization</ListItem>
            <ListItem>Secure WebSocket connections (WSS)</ListItem>
            <ListItem>Data encryption at rest</ListItem>
            <ListItem>Regular security audits</ListItem>
          </List>
        )}

        {section(
          '8. Monitoring and Reliability',
          <List>
            <ListItem>Real-time metrics for system health</ListItem>
            <ListItem>Alerting for critical issues</ListItem>
            <ListItem>Logging and tracing for debugging</ListItem>
            <ListItem>Performance monitoring</ListItem>
            <ListItem>Error tracking and reporting</ListItem>
            <ListItem>Automated failover</ListItem>
            <ListItem>Backup and recovery procedures</ListItem>
          </List>
        )}
      </ContentWrapper>
    </Article>
  );

  return (
    <SystemDesignLayout
      mainPanel={mainContent}
      breadcrumbs={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>System Design</span>
          <span>/</span>
          <span>Chat System</span>
        </div>
      }
    />
  );
};

export default ChatSystemAnswer; 