import React from 'react';
import styled from 'styled-components';
import { FaServer, FaCode, FaUsers } from 'react-icons/fa';
import Head from 'next/head';

interface SystemDesignHeroProps {
  title: string;
  description: string;
  stats: {
    icon: React.ReactNode;
    value: string;
    label: string;
  }[];
  pageUrl?: string;
}

const Container = styled.section`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1.5rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 750px;
  margin: 0;
  line-height: 1.4;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const StatIcon = styled.span`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.9375rem;
`;

const StatLabel = styled.span`
  color: ${props => props.theme.colors.text};
  font-size: 0.9375rem;
  margin-left: 0.25rem;
  opacity: 0.9;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};

    ${StatValue}, ${StatLabel} {
      color: white;
    }

    ${StatIcon} {
      color: white;
    }
  }
`;

export const SystemDesignHero: React.FC<SystemDesignHeroProps> = ({
  title,
  description,
  stats,
  pageUrl,
}) => {
  // Generate structured data for the page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: pageUrl,
    mainEntity: {
      '@type': 'Article',
      name: title,
      description: description,
    },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Container>
        <Header>
          <Title as="h1">{title}</Title>
          <Description>{description}</Description>
        </Header>
        <StatsRow>
          {stats.map((stat, idx) => (
            <Stat key={idx} aria-label={`${stat.value} ${stat.label}`}>
              <StatIcon aria-hidden="true">{stat.icon}</StatIcon>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </Stat>
          ))}
        </StatsRow>
      </Container>
    </>
  );
};
