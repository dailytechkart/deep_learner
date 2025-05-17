'use client';

import React from 'react';
import Link from 'next/link';
import {
  LandingContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  CTAButton,
  FeaturesSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  Section,
  SectionHeader,
  SectionTitle,
  SectionContent,
  BackgroundPattern,
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
  LandingHeader,
  LandingNavLinks,
  LandingNavLink,
  LandingActions,
  Logo
} from './components/StyledComponents';

export default function Home() {
  return (
    <LandingContainer>
      <LandingHeader>
        <Logo>Deep Learner</Logo>
        <LandingNavLinks>
          <LandingNavLink href="/learn">Learn</LandingNavLink>
          <LandingNavLink href="/practice">Practice</LandingNavLink>
          <LandingNavLink href="/resources">Resources</LandingNavLink>
        </LandingNavLinks>
        <LandingActions>
          <Link href="/login" passHref>
            <LandingNavLink>Sign In</LandingNavLink>
          </Link>
          <Link href="/signup" passHref>
            <CTAButton style={{ padding: '0.5rem 1.5rem', fontSize: '0.95rem' }}>Get Started</CTAButton>
          </Link>
        </LandingActions>
      </LandingHeader>

      <HeroSection>
        <BackgroundPattern />
        <HeroContent>
          <HeroTitle>
            Master Frontend Development
            <br />
            <span style={{ color: 'var(--primary)' }}>The Right Way</span>
          </HeroTitle>
          <HeroSubtitle>
            Learn modern frontend technologies with hands-on projects and real-world challenges
          </HeroSubtitle>
          <HeroDescription>
            Join thousands of developers learning HTML, CSS, JavaScript, React, and TypeScript through interactive lessons, practical exercises, and expert guidance.
          </HeroDescription>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/signup" passHref>
              <CTAButton>Get Started Free</CTAButton>
            </Link>
            <Link href="/learn" passHref>
              <CTAButton style={{ background: 'transparent', border: '2px solid var(--primary)', color: 'var(--primary)' }}>
                Explore Courses
              </CTAButton>
            </Link>
          </div>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatCard>
          <StatNumber>10k+</StatNumber>
          <StatLabel>Active Learners</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>50+</StatNumber>
          <StatLabel>Interactive Courses</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>100+</StatNumber>
          <StatLabel>Real Projects</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Community Support</StatLabel>
        </StatCard>
      </StatsSection>

      <FeaturesSection>
        <SectionHeader>
          <SectionTitle>Why Choose Deep Learner?</SectionTitle>
        </SectionHeader>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>Learn by Building</FeatureTitle>
            <FeatureDescription>
              Master frontend development by building real projects. Our hands-on approach ensures you learn practical skills that employers value.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>💡</FeatureIcon>
            <FeatureTitle>Modern Curriculum</FeatureTitle>
            <FeatureDescription>
              Stay up-to-date with the latest frontend technologies and best practices. Our curriculum is regularly updated to reflect industry standards.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Community Driven</FeatureTitle>
            <FeatureDescription>
              Join a vibrant community of learners. Get help, share your progress, and collaborate on projects with fellow developers.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>Career Ready</FeatureTitle>
            <FeatureDescription>
              Prepare for your frontend career with interview preparation, portfolio building, and real-world project experience.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <Section>
        <SectionHeader>
          <SectionTitle>Learning Paths</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <RoadmapSection>
            <RoadmapTimeline>
              <RoadmapItem>
                <RoadmapContent>
                  <RoadmapTitle>HTML & CSS Fundamentals</RoadmapTitle>
                  <RoadmapDescription>
                    Master the building blocks of web development. Learn semantic HTML, modern CSS layouts, and responsive design.
                  </RoadmapDescription>
                </RoadmapContent>
              </RoadmapItem>
              <RoadmapItem>
                <RoadmapContent>
                  <RoadmapTitle>JavaScript Mastery</RoadmapTitle>
                  <RoadmapDescription>
                    Dive deep into modern JavaScript. Learn ES6+, async programming, and advanced concepts.
                  </RoadmapDescription>
                </RoadmapContent>
              </RoadmapItem>
              <RoadmapItem>
                <RoadmapContent>
                  <RoadmapTitle>React Development</RoadmapTitle>
                  <RoadmapDescription>
                    Build modern web applications with React. Learn hooks, state management, and best practices.
                  </RoadmapDescription>
                </RoadmapContent>
              </RoadmapItem>
              <RoadmapItem>
                <RoadmapContent>
                  <RoadmapTitle>TypeScript Integration</RoadmapTitle>
                  <RoadmapDescription>
                    Add type safety to your JavaScript code. Learn TypeScript fundamentals and integration with React.
                  </RoadmapDescription>
                </RoadmapContent>
              </RoadmapItem>
            </RoadmapTimeline>
          </RoadmapSection>
        </SectionContent>
      </Section>

      <TestimonialsSection>
        <SectionHeader>
          <SectionTitle>What Our Learners Say</SectionTitle>
        </SectionHeader>
        <FeatureGrid>
          <TestimonialCard>
            <TestimonialContent>
              "The hands-on projects and real-world challenges helped me land my first frontend developer job. The community support is incredible!"
            </TestimonialContent>
            <TestimonialAuthor>
              <TestimonialAvatar src="/avatars/user1.jpg" alt="Sarah Johnson" />
              <div>
                <strong>Sarah Johnson</strong>
                <TestimonialRole>Frontend Developer at TechCorp</TestimonialRole>
              </div>
            </TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialContent>
              "The curriculum is well-structured and up-to-date. I learned more in 3 months here than I did in a year of self-study."
            </TestimonialContent>
            <TestimonialAuthor>
              <TestimonialAvatar src="/avatars/user2.jpg" alt="Mike Chen" />
              <div>
                <strong>Mike Chen</strong>
                <TestimonialRole>React Developer at StartupX</TestimonialRole>
              </div>
            </TestimonialAuthor>
          </TestimonialCard>
        </FeatureGrid>
      </TestimonialsSection>

      <Section style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <SectionHeader>
          <SectionTitle>Ready to Start Your Journey?</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <HeroDescription style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join thousands of developers who have transformed their careers with Deep Learner.
          </HeroDescription>
          <Link href="/signup" passHref>
            <CTAButton>Get Started Free</CTAButton>
          </Link>
        </SectionContent>
      </Section>
    </LandingContainer>
  );
}
