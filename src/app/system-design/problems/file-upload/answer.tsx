'use client';

import React, { ReactNode } from 'react';
import Mermaid from '@/components/Mermaid';
import styled from 'styled-components';
import { FaRocket, FaClock, FaUsers, FaLock, FaLink, FaTachometerAlt, FaComments, FaBell, FaSearch, FaCreditCard, FaFile, FaShoppingCart, FaCar, FaBriefcase, FaVideo } from 'react-icons/fa';
import { MainLayout } from '@/components/MainLayout';

const hldDiagram = `flowchart TD
  Client[Client App]
  API[API Gateway]
  Storage[Storage Service]
  DB[(Database)]
  Queue[Message Queue]
  Worker[Worker Service]
  CDN[CDN]

  Client --> API
  API --> Storage
  API --> DB
  API --> Queue
  Queue --> Worker
  Worker --> Storage
  Worker --> CDN
  Storage --> CDN
`;

const dataModelDiagram = `erDiagram
  File {
    string id
    string name
    string type
    int size
    string status
    string url
    datetime uploadedAt
    string userId
  }
  Upload {
    string id
    string fileId
    string userId
    string status
    int progress
    datetime startedAt
    datetime completedAt
  }
  User {
    string id
    string username
    int storageUsed
    int storageLimit
  }
  File ||--o{ Upload : has
  User ||--o{ File : owns
`;

const uploadFlowDiagram = `sequenceDiagram
  participant Client
  participant API
  participant Storage
  participant Queue
  participant Worker
  participant CDN

  Client->>API: Upload File
  API->>Storage: Store File
  API->>Queue: Queue Processing
  API-->>Client: Upload Complete

  Queue->>Worker: Process File
  Worker->>Storage: Read File
  Worker->>CDN: Upload to CDN
  Worker->>Storage: Update Status
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

const FileUploadAnswer = () => {
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
      const sections = ['overview', 'requirements', 'architecture', 'data-model', 'upload-flow', 'scaling', 'performance', 'monitoring'];
      
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
            onClick={() => scrollToSection('upload-flow')}
            className={activeSection === 'upload-flow' ? 'active' : ''}
          >
            Upload Flow
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
          <Badge variant="info">Storage</Badge>
          <Badge variant="info">CDN</Badge>
          <Badge variant="info">Queue</Badge>
          <Badge variant="info">Chunking</Badge>
          <Badge variant="info">Resumable</Badge>
        </BadgeGroup>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Asked By</RightPanelSectionTitle>
        </SectionHeader>
        <InfoContent>
          <CompanyBadge>
            <CompanyName>Google</CompanyName>
            <CompanyCount>15 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Amazon</CompanyName>
            <CompanyCount>12 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Microsoft</CompanyName>
            <CompanyCount>10 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Dropbox</CompanyName>
            <CompanyCount>8 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Box</CompanyName>
            <CompanyCount>6 times</CompanyCount>
          </CompanyBadge>
        </InfoContent>
      </InfoCard>
    </RightPanel>
  );

  const mainContent = (
    <ContentSection>
      <section id="overview">
        <SectionTitle>File Upload System</SectionTitle>
        <SectionContent>
          <p>
            Design a scalable file upload system that can handle large files, support
            resumable uploads, and provide real-time progress tracking. The system should
            be reliable, secure, and efficient in handling concurrent uploads.
          </p>
        </SectionContent>
      </section>

      <section id="requirements">
        {section(
          '1. Clarifying Questions',
          <List>
            <ListItem>What is the maximum file size to support?</ListItem>
            <ListItem>What types of files need to be supported?</ListItem>
            <ListItem>What is the expected number of concurrent uploads?</ListItem>
            <ListItem>What are the storage requirements?</ListItem>
            <ListItem>What are the security requirements?</ListItem>
            <ListItem>What are the availability requirements?</ListItem>
            <ListItem>What are the backup requirements?</ListItem>
            <ListItem>What are the cost constraints?</ListItem>
          </List>
        )}
      </section>

      <section id="architecture">
        {section(
          '2. Requirements',
          <>
            <Blockquote>
              Understanding the requirements is crucial for designing a system that can
              handle large files efficiently while maintaining reliability and security.
            </Blockquote>
            <strong>Functional Requirements:</strong>
            <List>
              <ListItem>Support for large file uploads</ListItem>
              <ListItem>Resumable uploads</ListItem>
              <ListItem>Progress tracking</ListItem>
              <ListItem>File validation</ListItem>
              <ListItem>Virus scanning</ListItem>
              <ListItem>File type restrictions</ListItem>
              <ListItem>Storage quota management</ListItem>
              <ListItem>File sharing capabilities</ListItem>
            </List>
            <strong style={{ display: 'block', marginTop: '1.5rem' }}>Non-Functional Requirements:</strong>
            <List>
              <ListItem>High availability (99.99%)</ListItem>
              <ListItem>Scalable to handle concurrent uploads</ListItem>
              <ListItem>Secure file storage</ListItem>
              <ListItem>Fast upload speeds</ListItem>
              <ListItem>Cost-effective storage</ListItem>
              <ListItem>Data durability</ListItem>
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
              handling uploads, storage, and processing. The architecture is designed
              to handle large files efficiently while maintaining reliability.
            </p>
            <DiagramContainer>
              <Mermaid chart={hldDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              System architecture showing client app, API gateway, storage service,
              message queue, worker service, and CDN components.
            </DiagramCaption>
          </>
        )}
      </section>

      <section id="upload-flow">
        {section(
          '4. Data Model',
          <>
            <DiagramContainer>
              <Mermaid chart={dataModelDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Entity relationship diagram showing the data model for files,
              uploads, and users.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The data model is designed for efficient file management and tracking,
              with separate collections for files, uploads, and user data. The schema
              supports all required features while maintaining data consistency.
            </p>
          </>
        )}
      </section>

      <section id="scaling">
        {section(
          '5. Upload Flow',
          <>
            <DiagramContainer>
              <Mermaid chart={uploadFlowDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Sequence diagram illustrating the file upload flow.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The upload flow ensures efficient file handling through chunked uploads,
              parallel processing, and CDN distribution. The system handles file
              storage, processing, and delivery efficiently.
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
                <ListItem>Chunked uploads</ListItem>
                <ListItem>Parallel uploads</ListItem>
                <ListItem>Resume capability</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Server-side:</strong>
              <List>
                <ListItem>Horizontal scaling of API servers</ListItem>
                <ListItem>Distributed storage</ListItem>
                <ListItem>Load balancing</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Storage:</strong>
              <List>
                <ListItem>CDN integration</ListItem>
                <ListItem>Storage tiering</ListItem>
                <ListItem>Data replication</ListItem>
              </List>
            </ListItem>
          </List>
        )}
      </section>

      <section id="monitoring">
        {section(
          '7. Performance Optimization',
          <List>
            <ListItem>Chunked upload implementation</ListItem>
            <ListItem>Parallel processing</ListItem>
            <ListItem>CDN optimization</ListItem>
            <ListItem>Storage optimization</ListItem>
            <ListItem>Network optimization</ListItem>
            <ListItem>Cache management</ListItem>
            <ListItem>Queue optimization</ListItem>
          </List>
        )}
      </section>

      <section>
        {section(
          '8. Monitoring and Reliability',
          <List>
            <ListItem>Upload success rate</ListItem>
            <ListItem>Storage usage</ListItem>
            <ListItem>Processing time</ListItem>
            <ListItem>Error tracking</ListItem>
            <ListItem>Resource usage</ListItem>
            <ListItem>User behavior analytics</ListItem>
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

export default FileUploadAnswer; 