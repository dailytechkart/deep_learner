'use client';

import React, { ReactNode } from 'react';
import Mermaid from '@/components/Mermaid';
import styled from 'styled-components';
import { FaRocket, FaClock, FaUsers, FaLock, FaLink, FaTachometerAlt, FaComments, FaBell, FaSearch, FaCreditCard, FaFile, FaShoppingCart, FaCar, FaBriefcase, FaVideo } from 'react-icons/fa';
import { MainLayout } from '@/components/MainLayout';

const hldDiagram = `flowchart TD
  Client[Client App]
  API[API Gateway]
  Cache[(Cache)]
  DB[(Database)]
  Search[Search Service]
  Indexer[Indexer Service]

  Client --> API
  API --> Cache
  API --> Search
  Search --> Cache
  Search --> DB
  Indexer --> DB
  Indexer --> Search
`;

const dataModelDiagram = `erDiagram
  SearchTerm {
    string id
    string term
    int frequency
    array suggestions
    datetime lastUpdated
  }
  Suggestion {
    string id
    string text
    string type
    int relevance
    datetime lastUsed
  }
  User {
    string id
    string username
    array searchHistory
  }
  SearchTerm ||--o{ Suggestion : has
  User ||--o{ SearchTerm : searches
`;

const searchFlowDiagram = `sequenceDiagram
  participant Client
  participant API
  participant Cache
  participant Search
  participant DB

  Client->>API: Type "hel"
  API->>Cache: Check Cache
  Cache-->>API: Return Suggestions
  API-->>Client: Show Suggestions

  Client->>API: Type "hell"
  API->>Cache: Check Cache
  Cache-->>API: Cache Miss
  API->>Search: Search Suggestions
  Search->>DB: Query Database
  DB-->>Search: Return Results
  Search-->>API: Process Results
  API->>Cache: Update Cache
  API-->>Client: Show Suggestions
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

const TypeaheadAnswer = () => {
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
      const sections = ['overview', 'requirements', 'architecture', 'data-model', 'search-flow', 'scaling', 'performance', 'monitoring'];
      
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
            onClick={() => scrollToSection('search-flow')}
            className={activeSection === 'search-flow' ? 'active' : ''}
          >
            Search Flow
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
          <Badge variant="info">Search</Badge>
          <Badge variant="info">Caching</Badge>
          <Badge variant="info">Trie</Badge>
          <Badge variant="info">Performance</Badge>
          <Badge variant="info">Real-time</Badge>
        </BadgeGroup>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Asked By</RightPanelSectionTitle>
        </SectionHeader>
        <InfoContent>
          <CompanyBadge>
            <CompanyName>Google</CompanyName>
            <CompanyCount>20 times</CompanyCount>
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
            <CompanyName>LinkedIn</CompanyName>
            <CompanyCount>8 times</CompanyCount>
          </CompanyBadge>
        </InfoContent>
      </InfoCard>
    </RightPanel>
  );

  const mainContent = (
    <ContentSection>
      <section id="overview">
        <SectionTitle>Typeahead/Autocomplete System</SectionTitle>
        <SectionContent>
          <p>
            Design a scalable typeahead/autocomplete system that provides real-time suggestions
            as users type, similar to Google's search suggestions. The system should handle
            millions of queries, provide instant responses, and maintain high accuracy.
          </p>
        </SectionContent>
      </section>

      <section id="requirements">
        {section(
          '1. Clarifying Questions',
          <List>
            <ListItem>What is the expected number of queries per second?</ListItem>
            <ListItem>What is the size of the suggestion database?</ListItem>
            <ListItem>What is the maximum latency allowed?</ListItem>
            <ListItem>What types of suggestions need to be supported?</ListItem>
            <ListItem>What is the update frequency of suggestions?</ListItem>
            <ListItem>What are the accuracy requirements?</ListItem>
            <ListItem>What are the caching requirements?</ListItem>
            <ListItem>What are the personalization requirements?</ListItem>
          </List>
        )}
      </section>

      <section id="architecture">
        {section(
          '2. Requirements',
          <>
            <Blockquote>
              Understanding the requirements is crucial for designing a system that provides
              instant and accurate suggestions while maintaining scalability.
            </Blockquote>
            <strong>Functional Requirements:</strong>
            <List>
              <ListItem>Real-time suggestion generation</ListItem>
              <ListItem>Support for multiple suggestion types</ListItem>
              <ListItem>Personalized suggestions</ListItem>
              <ListItem>Search history tracking</ListItem>
              <ListItem>Popular search tracking</ListItem>
              <ListItem>Error handling and recovery</ListItem>
              <ListItem>Offline support</ListItem>
              <ListItem>Multi-language support</ListItem>
            </List>
            <strong style={{ display: 'block', marginTop: '1.5rem' }}>Non-Functional Requirements:</strong>
            <List>
              <ListItem>Low latency (&lt;50ms for suggestions)</ListItem>
              <ListItem>High availability (99.99%)</ListItem>
              <ListItem>Scalable to handle millions of queries</ListItem>
              <ListItem>Memory efficient</ListItem>
              <ListItem>Accurate suggestions</ListItem>
              <ListItem>Real-time updates</ListItem>
            </List>
          </>
        )}
      </section>

      <section id="data-model">
        {section(
          '3. High-Level Architecture',
          <>
            <p>
              The system uses a distributed architecture with efficient caching and
              real-time processing. The architecture is designed to handle high query
              volumes while maintaining low latency.
            </p>
            <DiagramContainer>
              <Mermaid chart={hldDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              System architecture showing client app, API gateway, cache, search service,
              and indexer components.
            </DiagramCaption>
          </>
        )}
      </section>

      <section id="search-flow">
        {section(
          '4. Data Model',
          <>
            <DiagramContainer>
              <Mermaid chart={dataModelDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Entity relationship diagram showing the data model for search terms,
              suggestions, and users.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The data model is designed for efficient querying and caching, with separate
              collections for search terms, suggestions, and user data. The schema supports
              all required features while maintaining data consistency.
            </p>
          </>
        )}
      </section>

      <section id="scaling">
        {section(
          '5. Search Flow',
          <>
            <DiagramContainer>
              <Mermaid chart={searchFlowDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Sequence diagram illustrating the search suggestion flow.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The search flow ensures efficient suggestion generation and delivery through
              caching, real-time processing, and personalization. The system handles
              query processing, caching, and updates efficiently.
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
                <ListItem>Debouncing and throttling</ListItem>
                <ListItem>Local caching</ListItem>
                <ListItem>Progressive loading</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Server-side:</strong>
              <List>
                <ListItem>Horizontal scaling of API servers</ListItem>
                <ListItem>Distributed caching</ListItem>
                <ListItem>Database sharding</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Search Service:</strong>
              <List>
                <ListItem>Trie data structure</ListItem>
                <ListItem>In-memory indexing</ListItem>
                <ListItem>Parallel processing</ListItem>
              </List>
            </ListItem>
          </List>
        )}
      </section>

      <section id="monitoring">
        {section(
          '7. Performance Optimization',
          <List>
            <ListItem>Trie data structure implementation</ListItem>
            <ListItem>Caching strategies</ListItem>
            <ListItem>Query optimization</ListItem>
            <ListItem>Memory management</ListItem>
            <ListItem>Network optimization</ListItem>
            <ListItem>Load balancing</ListItem>
            <ListItem>Database optimization</ListItem>
          </List>
        )}
      </section>

      <section>
        {section(
          '8. Monitoring and Reliability',
          <List>
            <ListItem>Latency monitoring</ListItem>
            <ListItem>Accuracy metrics</ListItem>
            <ListItem>Cache performance</ListItem>
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

export default TypeaheadAnswer; 