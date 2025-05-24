import React from 'react';
import styled from 'styled-components';

export interface StatsHeroStat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface StatsHeroProps {
  title: string;
  description: string;
  stats: StatsHeroStat[];
}

const Container = styled.section`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 3rem 2rem 2.5rem 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${props => props.theme.colors.background};
  box-shadow: none;
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 2.5rem;
`;

const Title = styled.h2`
  font-size: 2.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.1;
`;

const Description = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 900px;
  margin: 0 0 0.5rem 0;
  line-height: 1.6;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  background: none;
`;

const StatIcon = styled.span`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 1.15rem;
`;

const StatLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-left: 0.25rem;
`;

export const StatsHero: React.FC<StatsHeroProps> = ({ title, description, stats }) => (
  <Container>
    <Header>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Header>
    <StatsRow>
      {stats.map((stat, idx) => (
        <Stat key={idx}>
          <StatIcon>{stat.icon}</StatIcon>
          <StatValue>{stat.value}</StatValue>
          <StatLabel>{stat.label}</StatLabel>
        </Stat>
      ))}
    </StatsRow>
  </Container>
);
