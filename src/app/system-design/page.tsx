'use client';

import React from 'react';
import styled from 'styled-components';
import { FaDatabase, FaCloud, FaNetworkWired, FaLock, FaUsers, FaMobile, FaCogs, FaCheckCircle, FaWindows } from 'react-icons/fa';
import { SiNetflix, SiUber, SiAmazon, SiGoogle } from 'react-icons/si';
import { BsTwitterX } from 'react-icons/bs';
import { PageContainer, MainContent, Title, Description } from '../components/StyledComponents';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { lightTheme, darkTheme } from '../theme';
import { useTheme } from '../context/ThemeContext';

const HeroSection = styled.div`
  background: ${props => props.theme.colors.gradient1};
  padding: ${props => props.theme.spacing.xxl};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 70%);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const FeatureCard = styled.a`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    border-color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const IconContainer = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.md};
  background: ${props => props.color}15;
  color: ${props => props.color};
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const LearningPathSection = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.xxl};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
  border: 1px solid ${props => props.theme.colors.border};
`;

const PathStep = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: relative;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  &::after {
    content: '';
    position: absolute;
    left: 20px;
    top: 60px;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.colors.border};
    z-index: 0;
  }

  &:last-child::after {
    display: none;
  }
`;

const StepItem = styled.a`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.xl};
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid transparent;

  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
    border-color: ${props => props.theme.colors.border};
  }
`;

const StepNumber = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.color}15;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: ${props => props.theme.spacing.md};
  flex-shrink: 0;
  box-shadow: 0 2px 8px ${props => props.color}30;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StepDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const StepList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.5rem;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const PracticeSection = styled.div`
  background: ${props => props.theme.colors.gradient2};
  padding: ${props => props.theme.spacing.xxl};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  color: white;
  margin-bottom: ${props => props.theme.spacing.xxl};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at bottom left, rgba(255,255,255,0.1) 0%, transparent 70%);
  }
`;

const PracticeButton = styled.a`
  display: inline-block;
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  font-weight: bold;
  margin-top: ${props => props.theme.spacing.lg};
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  }
`;

const Badge = styled.span<{ type: 'success' | 'warning' | 'error' | 'info' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.theme.colors.status[props.type]}15;
  color: ${props => props.theme.colors.status[props.type]};
  margin-right: 0.5rem;
`;

const CompanyIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const TagWithIcon = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.5rem;
`;

export default function SystemDesignPage() {
  const { isDarkMode } = useTheme();
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <PageContainer>
      <SEO 
        title="System Design"
        description="Master system design concepts, patterns, and best practices for building scalable and reliable systems."
        keywords={[
          'system design',
          'architecture',
          'scalability',
          'patterns',
          'microservices',
          'cloud computing'
        ]}
      />
      <MainContent>
        <HeroSection>
          <Title>System Design</Title>
          <Description>
            Master the art of designing scalable, reliable, and efficient systems.
            Learn essential concepts, patterns, and best practices.
          </Description>
          <TagGroup>
            <Badge type="success">Beginner Friendly</Badge>
            <Badge type="info">Industry Standard</Badge>
            <Badge type="warning">Advanced Topics</Badge>
          </TagGroup>
        </HeroSection>

        <FeatureGrid>
          <FeatureCard href="/system-design/architecture">
            <IconContainer color={currentTheme.colors.systemDesign.architecture}>
              <FaDatabase />
            </IconContainer>
            <h3>Architecture</h3>
            <p>Learn about different architectural styles and their applications</p>
            <TagGroup>
              <Badge type="info">Fundamental</Badge>
            </TagGroup>
          </FeatureCard>

          <FeatureCard href="/system-design/patterns">
            <IconContainer color={currentTheme.colors.systemDesign.patterns}>
              <FaNetworkWired />
            </IconContainer>
            <h3>Design Patterns</h3>
            <p>Explore common patterns for building robust systems</p>
            <TagGroup>
              <Badge type="warning">Intermediate</Badge>
            </TagGroup>
          </FeatureCard>

          <FeatureCard href="/system-design/case-studies">
            <IconContainer color={currentTheme.colors.systemDesign.scalability}>
              <FaCloud />
            </IconContainer>
            <h3>Case Studies</h3>
            <p>Analyze real-world system design examples</p>
            <TagGroup>
              <Badge type="success">Real World</Badge>
            </TagGroup>
          </FeatureCard>

          <FeatureCard href="/system-design/problems">
            <IconContainer color={currentTheme.colors.systemDesign.security}>
              <FaLock />
            </IconContainer>
            <h3>Practice Problems</h3>
            <p>Test your knowledge with hands-on challenges</p>
            <TagGroup>
              <Badge type="error">Challenging</Badge>
            </TagGroup>
          </FeatureCard>
        </FeatureGrid>

        <LearningPathSection>
          <Title>Learning Path</Title>
          <Description>
            Follow our structured learning path to master system design concepts
          </Description>

          <StepItem href="/system-design/basics">
            <StepNumber color={currentTheme.colors.systemDesign.architecture}>1</StepNumber>
            <div>
              <h3>System Design Basics</h3>
              <p>Understand fundamental concepts and principles</p>
              <TagGroup>
                <Badge type="success">Beginner</Badge>
                <Badge type="info">Essential</Badge>
              </TagGroup>
              <ul>
                <li>Scalability</li>
                <li>Reliability</li>
                <li>Performance</li>
              </ul>
            </div>
          </StepItem>

          <StepItem href="/system-design/architecture">
            <StepNumber color={currentTheme.colors.systemDesign.patterns}>2</StepNumber>
            <div>
              <h3>Architecture Patterns</h3>
              <p>Learn about different architectural styles</p>
              <TagGroup>
                <Badge type="warning">Intermediate</Badge>
                <Badge type="info">Patterns</Badge>
              </TagGroup>
              <ul>
                <li>Monolithic</li>
                <li>Microservices</li>
                <li>Event-Driven</li>
              </ul>
            </div>
          </StepItem>

          <StepItem href="/system-design/case-studies">
            <StepNumber color={currentTheme.colors.systemDesign.scalability}>3</StepNumber>
            <div>
              <h3>Case Studies</h3>
              <p>Analyze real-world system designs</p>
              <TagGroup>
                <Badge type="error">Advanced</Badge>
                <Badge type="success">Real World</Badge>
              </TagGroup>
              <ul>
                <li>
                  <TagWithIcon>
                    <CompanyIcon><SiNetflix /></CompanyIcon>
                    Netflix
                  </TagWithIcon>
                </li>
                <li>
                  <TagWithIcon>
                    <CompanyIcon><SiUber /></CompanyIcon>
                    Uber
                  </TagWithIcon>
                </li>
                <li>
                  <TagWithIcon>
                    <CompanyIcon><BsTwitterX /></CompanyIcon>
                    Twitter
                  </TagWithIcon>
                </li>
                <li>
                  <TagWithIcon>
                    <CompanyIcon><SiAmazon /></CompanyIcon>
                    Amazon
                  </TagWithIcon>
                </li>
                <li>
                  <TagWithIcon>
                    <CompanyIcon><SiGoogle /></CompanyIcon>
                    Google
                  </TagWithIcon>
                </li>
                <li>
                  <TagWithIcon>
                    <CompanyIcon><FaWindows /></CompanyIcon>
                    Microsoft
                  </TagWithIcon>
                </li>
              </ul>
            </div>
          </StepItem>
        </LearningPathSection>

        <PracticeSection>
          <Title>Ready to Practice?</Title>
          <Description>
            Test your system design skills with our collection of practice problems
          </Description>
          <TagGroup>
            <Badge type="error">Challenging</Badge>
            <Badge type="warning">Interview Prep</Badge>
            <Badge type="success">Hands-on</Badge>
          </TagGroup>
          <PracticeButton href="/system-design/problems">
            Start Practicing
          </PracticeButton>
        </PracticeSection>
      </MainContent>
    </PageContainer>
  );
} 