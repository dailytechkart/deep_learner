'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Header from './components/Header';
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
import { PageLayout } from './components/PageLayout';
import { MainLayout } from '@/components/MainLayout';
import Image from 'next/image';
import { FaBook, FaCode, FaReact, FaJs, FaCss3Alt, FaHtml5, FaNodeJs } from 'react-icons/fa';
import Head from 'next/head';

// Add new styled components for the companies section
const CompaniesSection = styled.div`
  padding: 3rem 0;
  background: ${props => props.theme.colors.backgroundAlt};
  overflow: hidden;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2rem 0;
  }
`;

const CompaniesTitle = styled.h3`
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: 500;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
`;

const CompaniesCarousel = styled.div`
  display: flex;
  gap: 4rem;
  animation: scroll 40s linear infinite;
  width: max-content;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 2rem;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const CompanyLogo = styled.div`
  min-width: 160px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-width: 120px;
    height: 30px;
  }

  &:hover {
    transform: scale(1.1);
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const LandingHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.background}dd;
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px ${props => props.theme.colors.border};
  height: 64px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};

  .logo-icon {
    font-size: 1.75rem;
  }
`;

const LandingNavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const LandingNavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.2s ease;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};

    &:after {
      width: 100%;
    }
  }
`;

const LandingActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.backgroundAlt} 0%,
    ${props => props.theme.colors.background} 100%
  );
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 6rem 1rem 3rem;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(
      circle at 50% 50%,
      ${props => props.theme.colors.primary}15 0%,
      transparent 50%
    );
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 1.5rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 2.5rem;
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    min-height: 300px;
    order: -1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    min-height: 250px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.secondary} 100%
  );
  color: white;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px ${props => props.theme.colors.primary}40;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px ${props => props.theme.colors.primary}60;
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
    circle at 1px 1px,
    ${props => props.theme.colors.border} 1px,
    transparent 0
  );
  background-size: 40px 40px;
  opacity: 0.5;
  pointer-events: none;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    background-size: 20px 20px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  box-shadow: 0 4px 6px ${props => props.theme.colors.border};
  z-index: 1000;
  transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const MobileNavLink = styled.a`
  display: block;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    padding: 0.875rem;
  }
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: 0.75rem;
    padding: 0.875rem;
  }
`;

const StyledSection = styled(Section)`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 4rem 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3rem 1rem;
  }
`;

const GradientSection = styled(Section)`
  text-align: center;
  padding: 4rem 2rem;
  background: ${props => props.theme.colors.gradient1};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3rem 1rem;
  }
`;

const StyledCTAButton = styled(CTAButton)`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  min-width: 200px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    min-width: unset;
  }
`;

const ActionButton = styled.a<{ primary?: boolean; fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  background: ${props => (props.primary ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.primary ? '#fff' : props.theme.colors.text)};
  border: 1px solid
    ${props => (props.primary ? props.theme.colors.primary : props.theme.colors.border)};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};

  &:hover {
    background: ${props =>
      props.primary ? props.theme.colors.primaryDark : props.theme.colors.backgroundAlt};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }
`;

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Deep Learner - Master Frontend Development with Interactive Projects</title>
        <meta
          name="description"
          content="Learn frontend development through hands-on projects, real-world applications, and expert guidance. Master HTML, CSS, JavaScript, React, and modern web development tools."
        />
        <meta
          name="keywords"
          content="frontend development, web development, HTML, CSS, JavaScript, React, TypeScript, web design, responsive design, UI/UX, frontend frameworks"
        />
        <meta property="og:title" content="Deep Learner - Master Frontend Development" />
        <meta
          property="og:description"
          content="Learn frontend development through hands-on projects and expert guidance. Start your journey to becoming a frontend expert today."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Deep Learner - Master Frontend Development" />
        <meta
          name="twitter:description"
          content="Learn frontend development through hands-on projects and expert guidance. Start your journey to becoming a frontend expert today."
        />
      </Head>

      <MainLayout>
        <HeroSection>
          <HeroContent>
            <div>
              <HeroTitle>Master Frontend Development with Interactive Projects</HeroTitle>
              <HeroSubtitle>
                Learn modern frontend development through hands-on projects, real-world
                applications, and expert guidance. Master HTML, CSS, JavaScript, React, and more to
                build responsive, accessible, and performant web applications.
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
            <HeroImage>
              <Image
                src="/hero-image.png"
                alt="Frontend Development Platform"
                layout="fill"
                objectFit="contain"
                priority
              />
            </HeroImage>
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
                <TestimonialAvatar
                  src="/avatars/user2.jpg"
                  alt="Mike Chen"
                  width="48"
                  height="48"
                />
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
    </>
  );
}
