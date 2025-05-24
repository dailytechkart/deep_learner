'use client';

import React from 'react';
import Link from 'next/link';
import styled, { DefaultTheme } from 'styled-components';
import {
  LandingContainer,
  FeaturesSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  Section,
  SectionHeader,
  SectionTitle,
  SectionContent,
  FeatureGrid,
  RoadmapSection,
  RoadmapTimeline,
  RoadmapItem,
  RoadmapContent,
  RoadmapTitle,
  RoadmapDescription,
  StatsSection,
  StatCard,
  StatNumber,
  StatLabel,
  TestimonialsSection,
  TestimonialCard,
  TestimonialContent,
  TestimonialAuthor,
  TestimonialRole,
  TestimonialAvatar,
} from './components/StyledComponents';
import { MainLayout } from '@/components/MainLayout';
import Image from 'next/image';
import { FaBook, FaCode, FaReact, FaJs, FaCss3Alt, FaHtml5, FaNodeJs } from 'react-icons/fa';

const HeroSection = styled.section`
  padding: 4rem 0;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 0;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 2rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: 1rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    justify-content: center;
  }
`;

const ActionButton = styled.a<{ primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  background: ${props => (props.primary ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.primary ? 'white' : props.theme.colors.primary)};
  border: 2px solid ${props => (props.primary ? 'transparent' : props.theme.colors.primary)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 400px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    height: 300px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: contain;
`;

const GradientSection = styled.section`
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.secondary} 100%
  );
  padding: 4rem 0;
  text-align: center;
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const StyledCTAButton = styled(ActionButton)`
  background: white;
  color: ${props => props.theme.colors.primary};
  border: none;
  font-size: 1.1rem;
  padding: 1rem 2rem;

  &:hover {
    background: ${props => props.theme.colors.background};
  }
`;

const CTAButton = styled(ActionButton)`
  font-size: 1.1rem;
  padding: 1rem 2rem;
`;

const AvatarWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
`;

const StyledAvatarImage = styled(Image)`
  object-fit: cover;
`;

// Add new styled components for the companies section
const CompaniesSection = styled.div`
  padding: 3rem 0;
  background: ${props => props.theme.colors.backgroundAlt};
  overflow: hidden;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 2rem 0;
  }
`;

export default function Home() {
  return (
    <MainLayout>
      <HeroSection>
        <HeroContent>
          <div>
            <HeroTitle>Master Frontend Development with Interactive Projects</HeroTitle>
            <HeroSubtitle>
              Learn modern frontend development through hands-on projects, real-world applications,
              and expert guidance. Master HTML, CSS, JavaScript, React, and more to build
              responsive, accessible, and performant web applications.
            </HeroSubtitle>
            <HeroActions>
              <Link href="/signup" passHref>
                <ActionButton primary>Get Started Free</ActionButton>
              </Link>
              <Link href="#features" passHref>
                <ActionButton>Learn More</ActionButton>
              </Link>
            </HeroActions>
          </div>
          <ImageWrapper>
            <StyledImage
              src="/hero-image.svg"
              alt="Frontend Development Platform"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </ImageWrapper>
        </HeroContent>
      </HeroSection>

      <StatsSection aria-labelledby="stats-title">
        <SectionHeader>
          <SectionTitle id="stats-title">Our Impact</SectionTitle>
        </SectionHeader>
        <div role="list">
          <StatCard role="listitem">
            <StatNumber>10K+</StatNumber>
            <StatLabel>Active Learners</StatLabel>
          </StatCard>
          <StatCard role="listitem">
            <StatNumber>500+</StatNumber>
            <StatLabel>Interactive Projects</StatLabel>
          </StatCard>
          <StatCard role="listitem">
            <StatNumber>24/7</StatNumber>
            <StatLabel>Community Support</StatLabel>
          </StatCard>
        </div>
      </StatsSection>

      <FeaturesSection id="features" aria-labelledby="features-title">
        <SectionHeader>
          <SectionTitle id="features-title">Why Choose Us</SectionTitle>
        </SectionHeader>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <FaHtml5 />
            </FeatureIcon>
            <FeatureTitle>Modern Web Technologies</FeatureTitle>
            <FeatureDescription>
              Master HTML5, CSS3, JavaScript (ES6+), and modern frameworks like React, Vue, and
              Angular.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaReact />
            </FeatureIcon>
            <FeatureTitle>Frontend Frameworks</FeatureTitle>
            <FeatureDescription>
              Learn popular frameworks and libraries including React, Redux, Next.js, and
              TypeScript.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaCss3Alt />
            </FeatureIcon>
            <FeatureTitle>Responsive Design</FeatureTitle>
            <FeatureDescription>
              Create beautiful, responsive layouts using modern CSS techniques and best practices.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <FaJs />
            </FeatureIcon>
            <FeatureTitle>JavaScript Mastery</FeatureTitle>
            <FeatureDescription>
              Deep dive into JavaScript fundamentals, advanced concepts, and modern development
              patterns.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <RoadmapSection id="roadmap" aria-labelledby="roadmap-title">
        <SectionHeader>
          <SectionTitle id="roadmap-title">Your Learning Journey</SectionTitle>
        </SectionHeader>
        <RoadmapTimeline role="list">
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Foundation</RoadmapTitle>
              <RoadmapDescription>
                Master HTML5, CSS3, and JavaScript fundamentals with hands-on projects.
              </RoadmapDescription>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Advanced Frontend</RoadmapTitle>
              <RoadmapDescription>
                Learn React, TypeScript, and modern frontend development tools and practices.
              </RoadmapDescription>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Performance & Optimization</RoadmapTitle>
              <RoadmapDescription>
                Master frontend performance optimization, accessibility, and best practices.
              </RoadmapDescription>
            </RoadmapContent>
          </RoadmapItem>
        </RoadmapTimeline>
      </RoadmapSection>

      <TestimonialsSection id="testimonials" aria-labelledby="testimonials-title">
        <SectionHeader>
          <SectionTitle id="testimonials-title">Success Stories</SectionTitle>
        </SectionHeader>
        <div role="list">
          <TestimonialCard role="listitem">
            <TestimonialContent>
              &ldquo;The curriculum is well-structured and up-to-date. I learned more in 3 months
              here than I did in a year of self-study.&rdquo;
            </TestimonialContent>
            <TestimonialAuthor>
              <AvatarWrapper>
                <StyledAvatarImage
                  src="/avatars/user2.svg"
                  alt="Mike Chen"
                  width={48}
                  height={48}
                />
              </AvatarWrapper>
              <div>
                <strong>Mike Chen</strong>
                <TestimonialRole>AI Engineer at TechCorp</TestimonialRole>
              </div>
            </TestimonialAuthor>
          </TestimonialCard>
        </div>
      </TestimonialsSection>

      <GradientSection>
        <SectionHeader>
          <SectionTitle style={{ color: 'white' }}>Ready to Start Your Journey?</SectionTitle>
          <HeroDescription style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'white' }}>
            Join thousands of developers who have transformed their careers with DeepLearner.
          </HeroDescription>
        </SectionHeader>
        <SectionContent>
          <div
            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/signup" passHref>
              <StyledCTAButton href="/signup">Get Started Free</StyledCTAButton>
            </Link>
            <Link href="/learn" passHref>
              <CTAButton
                href="/learn"
                style={{ background: 'transparent', border: '2px solid white', color: 'white' }}
              >
                Explore Courses
              </CTAButton>
            </Link>
          </div>
        </SectionContent>
      </GradientSection>
    </MainLayout>
  );
}
