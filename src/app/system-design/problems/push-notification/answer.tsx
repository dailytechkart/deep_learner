'use client';

import React, { ReactNode } from 'react';
import Mermaid from '@/components/Mermaid';
import styled from 'styled-components';
import { FaRocket, FaClock, FaUsers, FaLock, FaLink, FaTachometerAlt, FaComments, FaBell, FaSearch, FaCreditCard, FaFile, FaShoppingCart, FaCar, FaBriefcase, FaVideo } from 'react-icons/fa';
import { MainLayout } from '@/components/MainLayout';

const hldDiagram = `flowchart TD
  Client[Client App]
  API[API Gateway]
  Queue[Message Queue]
  Worker[Worker Service]
  Push[Push Service]
  DB[(Database)]
  Cache[(Cache)]

  Client --> API
  API --> Queue
  Queue --> Worker
  Worker --> Push
  Worker --> DB
  Worker --> Cache
  Push --> Client
`;

const dataModelDiagram = `erDiagram
  Notification {
    string id
    string type
    string title
    string body
    string data
    string status
    datetime createdAt
    string userId
  }
  Device {
    string id
    string token
    string platform
    string userId
    datetime lastActive
  }
  User {
    string id
    string username
    array preferences
    boolean notificationsEnabled
  }
  Notification ||--o{ Device : sent_to
  User ||--o{ Notification : receives
  User ||--o{ Device : owns
`;

const notificationFlowDiagram = `sequenceDiagram
  participant Client
  participant API
  participant Queue
  participant Worker
  participant Push
  participant Device

  Client->>API: Send Notification
  API->>Queue: Queue Notification
  API-->>Client: Notification Queued

  Queue->>Worker: Process Notification
  Worker->>Push: Send to Device
  Push->>Device: Deliver Notification
  Device-->>Push: Acknowledge
  Push-->>Worker: Update Status
  Worker->>Queue: Mark Complete
`;

const PageContainer = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MainContent = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  height: calc(100vh - 4rem);
  margin-top: 4rem;
`;

const LeftPanel = styled.div`
  width: 280px;
  position: fixed;
  left: 1rem;
  top: 5rem;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  padding: 0.75rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

const RightPanel = styled.div`
  width: 280px;
  position: fixed;
  right: 1rem;
  top: 5rem;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  padding: 0.75rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  margin: 0 300px;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const SectionContent = styled.div`
  margin-bottom: 2rem;
  color: #333;
  line-height: 1.6;
`;

const InfoCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  margin-bottom: 0.75rem;
`;

const RightPanelSectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

const InfoContent = styled.div`
  color: #666;
`;

const TableOfContentsLink = styled.a`
  display: block;
  padding: 0.5rem 0;
  color: #666;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: #0070f3;
    transform: translateX(4px);
  }

  &.active {
    color: #0070f3;
    font-weight: 500;
  }
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Badge = styled.span<{ variant: 'info' | 'success' | 'warning' | 'error' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch (props.variant) {
      case 'info': return '#e3f2fd';
      case 'success': return '#e8f5e9';
      case 'warning': return '#fff3e0';
      case 'error': return '#ffebee';
      default: return '#e3f2fd';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'info': return '#1976d2';
      case 'success': return '#2e7d32';
      case 'warning': return '#f57c00';
      case 'error': return '#d32f2f';
      default: return '#1976d2';
    }
  }};
`;

const CompanyBadge = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }
`;

const CompanyName = styled.span`
  font-weight: 500;
  color: #1a1a1a;
`;

const CompanyCount = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.2rem 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  color: #333;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #0070f3;
  }
`;

const Blockquote = styled.blockquote`
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-left: 4px solid #0070f3;
  font-style: italic;
  color: #666;
`;

const DiagramContainer = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  overflow-x: auto;
`;

const DiagramCaption = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0 2.2rem 0;
`;

const section = (title: string, children: ReactNode) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <SectionContent>{children}</SectionContent>
  </div>
);

const PushNotificationAnswer = () => {
  const [activeSection, setActiveSection] = React.useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'requirements', 'architecture', 'data-model', 'notification-flow', 'scaling', 'performance', 'monitoring'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rightPanel = (
    <RightPanel>
      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Table of Contents</RightPanelSectionTitle>
        </SectionHeader>
        <InfoContent>
          <TableOfContentsLink 
            onClick={() => scrollToSection('overview')}
            className={activeSection === 'overview' ? 'active' : ''}
          >
            Overview
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('requirements')}
            className={activeSection === 'requirements' ? 'active' : ''}
          >
            Requirements
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('architecture')}
            className={activeSection === 'architecture' ? 'active' : ''}
          >
            High-Level Design
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('data-model')}
            className={activeSection === 'data-model' ? 'active' : ''}
          >
            Data Model
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('notification-flow')}
            className={activeSection === 'notification-flow' ? 'active' : ''}
          >
            Notification Flow
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('scaling')}
            className={activeSection === 'scaling' ? 'active' : ''}
          >
            Scaling Considerations
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('performance')}
            className={activeSection === 'performance' ? 'active' : ''}
          >
            Performance Optimization
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('monitoring')}
            className={activeSection === 'monitoring' ? 'active' : ''}
          >
            Monitoring
          </TableOfContentsLink>
        </InfoContent>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Problem Stats</RightPanelSectionTitle>
        </SectionHeader>
        <BadgeGroup>
          <Badge variant="warning">Medium</Badge>
          <Badge variant="info">45 min</Badge>
          <Badge variant="success">Intermediate</Badge>
        </BadgeGroup>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Key Concepts</RightPanelSectionTitle>
        </SectionHeader>
        <BadgeGroup>
          <Badge variant="info">Real-time</Badge>
          <Badge variant="info">Queue</Badge>
          <Badge variant="info">WebSocket</Badge>
          <Badge variant="info">Firebase</Badge>
          <Badge variant="info">APNS</Badge>
        </BadgeGroup>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Asked By</RightPanelSectionTitle>
        </SectionHeader>
        <InfoContent>
          <CompanyBadge>
            <CompanyName>Google</CompanyName>
            <CompanyCount>18 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Amazon</CompanyName>
            <CompanyCount>15 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Microsoft</CompanyName>
            <CompanyCount>12 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Meta</CompanyName>
            <CompanyCount>10 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Twitter</CompanyName>
            <CompanyCount>8 times</CompanyCount>
          </CompanyBadge>
        </InfoContent>
      </InfoCard>
    </RightPanel>
  );

  const mainContent = (
    <ContentSection>
      <section id="overview">
        <SectionTitle>Push Notification System</SectionTitle>
        <SectionContent>
          <p>
            Design a scalable push notification system that can deliver real-time
            notifications to millions of users across different platforms (web, mobile).
            The system should be reliable, efficient, and support various notification
            types and delivery priorities.
          </p>
        </SectionContent>
      </section>

      <section id="requirements">
        {section(
          '1. Clarifying Questions',
          <List>
            <ListItem>What platforms need to be supported?</ListItem>
            <ListItem>What is the expected notification volume?</ListItem>
            <ListItem>What types of notifications need to be supported?</ListItem>
            <ListItem>What are the delivery time requirements?</ListItem>
            <ListItem>What are the reliability requirements?</ListItem>
            <ListItem>What are the user preferences?</ListItem>
            <ListItem>What are the rate limiting requirements?</ListItem>
            <ListItem>What are the analytics requirements?</ListItem>
          </List>
        )}
      </section>

      <section id="architecture">
        {section(
          '2. Requirements',
          <>
            <Blockquote>
              Understanding the requirements is crucial for designing a system that can
              deliver notifications reliably and efficiently across different platforms.
            </Blockquote>
            <strong>Functional Requirements:</strong>
            <List>
              <ListItem>Multi-platform support</ListItem>
              <ListItem>Real-time delivery</ListItem>
              <ListItem>Notification queuing</ListItem>
              <ListItem>Delivery status tracking</ListItem>
              <ListItem>User preferences</ListItem>
              <ListItem>Notification grouping</ListItem>
              <ListItem>Rich media support</ListItem>
              <ListItem>Action buttons</ListItem>
            </List>
            <strong style={{ display: 'block', marginTop: '1.5rem' }}>Non-Functional Requirements:</strong>
            <List>
              <ListItem>High availability (99.99%)</ListItem>
              <ListItem>Low latency (&lt;1s)</ListItem>
              <ListItem>Scalable to millions of users</ListItem>
              <ListItem>Reliable delivery</ListItem>
              <ListItem>Cost-effective</ListItem>
              <ListItem>Battery efficient</ListItem>
            </List>
          </>
        )}
      </section>

      <section id="data-model">
        {section(
          '3. High-Level Architecture',
          <>
            <p>
              The system uses a distributed architecture with dedicated services for
              handling notifications, device management, and delivery. The architecture
              is designed to handle high notification volumes while maintaining reliability.
            </p>
            <DiagramContainer>
              <Mermaid chart={hldDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              System architecture showing client app, API gateway, message queue,
              worker service, push service, and database components.
            </DiagramCaption>
          </>
        )}
      </section>

      <section id="notification-flow">
        {section(
          '4. Data Model',
          <>
            <DiagramContainer>
              <Mermaid chart={dataModelDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Entity relationship diagram showing the data model for notifications,
              devices, and users.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The data model is designed for efficient notification management and
              delivery tracking, with separate collections for notifications, devices,
              and user data. The schema supports all required features while maintaining
              data consistency.
            </p>
          </>
        )}
      </section>

      <section id="scaling">
        {section(
          '5. Notification Flow',
          <>
            <DiagramContainer>
              <Mermaid chart={notificationFlowDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Sequence diagram illustrating the notification delivery flow.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The notification flow ensures efficient delivery through queuing,
              parallel processing, and status tracking. The system handles notification
              processing, delivery, and acknowledgment efficiently.
            </p>
          </>
        )}
      </section>

      <section id="performance">
        {section(
          '6. Scaling Considerations',
          <List>
            <ListItem>
              <strong>Client-side:</strong>
              <List>
                <ListItem>Connection management</ListItem>
                <ListItem>Battery optimization</ListItem>
                <ListItem>Offline support</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Server-side:</strong>
              <List>
                <ListItem>Horizontal scaling of services</ListItem>
                <ListItem>Message queuing</ListItem>
                <ListItem>Load balancing</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Delivery:</strong>
              <List>
                <ListItem>Platform-specific services</ListItem>
                <ListItem>Retry mechanisms</ListItem>
                <ListItem>Rate limiting</ListItem>
              </List>
            </ListItem>
          </List>
        )}
      </section>

      <section id="monitoring">
        {section(
          '7. Performance Optimization',
          <List>
            <ListItem>Connection pooling</ListItem>
            <ListItem>Message batching</ListItem>
            <ListItem>Delivery optimization</ListItem>
            <ListItem>Cache management</ListItem>
            <ListItem>Queue optimization</ListItem>
            <ListItem>Network optimization</ListItem>
            <ListItem>Battery optimization</ListItem>
          </List>
        )}
      </section>

      <section>
        {section(
          '8. Monitoring and Reliability',
          <List>
            <ListItem>Delivery success rate</ListItem>
            <ListItem>Latency monitoring</ListItem>
            <ListItem>Error tracking</ListItem>
            <ListItem>Queue monitoring</ListItem>
            <ListItem>Resource usage</ListItem>
            <ListItem>User engagement</ListItem>
            <ListItem>Automated testing</ListItem>
          </List>
        )}
      </section>
    </ContentSection>
  );

  return (
    <MainLayout>
      <PageContainer>
        <MainContent>
          {mainContent}
          {rightPanel}
        </MainContent>
      </PageContainer>
    </MainLayout>
  );
};

export default PushNotificationAnswer; 