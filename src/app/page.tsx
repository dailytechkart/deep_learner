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
  TestimonialAvatar
} from './components/StyledComponents';

// Add new styled components for the companies section
const CompaniesSection = styled.div`
  padding: 3rem 0;
  background: ${props => props.theme.colors.backgroundAlt};
  overflow: hidden;
  position: relative;
`;

const CompaniesTitle = styled.h3`
  text-align: center;
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const CompaniesCarousel = styled.div`
  display: flex;
  gap: 4rem;
  animation: scroll 40s linear infinite;
  width: max-content;

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
  background: linear-gradient(135deg, ${props => props.theme.colors.backgroundAlt} 0%, ${props => props.theme.colors.background} 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle at 50% 50%, ${props => props.theme.colors.primary}15 0%, transparent 50%);
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.8; }
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
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  font-weight: 500;
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
  height: 500px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
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
  background-image: radial-gradient(circle at 1px 1px, ${props => props.theme.colors.border} 1px, transparent 0);
  background-size: 40px 40px;
  opacity: 0.5;
  pointer-events: none;
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

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
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

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 1rem;
`;

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <LandingContainer>
      <Header />

      <HeroSection>
        <HeroContent>
          <div>
            <HeroTitle>Master Deep Learning with Interactive Learning</HeroTitle>
            <HeroSubtitle>Your journey to becoming a deep learning expert starts here</HeroSubtitle>
            <HeroDescription>
              Join thousands of learners worldwide in mastering deep learning concepts through
              interactive tutorials, real-world projects, and expert mentorship.
            </HeroDescription>
            <CTAButton href="/signup">
              Start Learning Now
              <span>→</span>
            </CTAButton>
          </div>
          <HeroImage>
            <img src="/hero-illustration.svg" alt="Deep Learning Illustration" />
          </HeroImage>
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

      <CompaniesSection>
        <CompaniesTitle>Trusted by developers at leading companies</CompaniesTitle>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <CompaniesCarousel>
            {/* First set of logos */}
            <CompanyLogo>
              <img src="/companies/google.svg" alt="Google" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/meta.svg" alt="Meta" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/amazon.svg" alt="Amazon" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/microsoft.svg" alt="Microsoft" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/apple.svg" alt="Apple" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/netflix.svg" alt="Netflix" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/spotify.svg" alt="Spotify" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/airbnb.svg" alt="Airbnb" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/flipkart.svg" alt="Flipkart" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/meesho.svg" alt="Meesho" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/myntra.svg" alt="Myntra" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/razorpay.svg" alt="Razorpay" />
            </CompanyLogo>
            {/* Duplicate set for seamless loop */}
            <CompanyLogo>
              <img src="/companies/google.svg" alt="Google" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/meta.svg" alt="Meta" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/amazon.svg" alt="Amazon" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/microsoft.svg" alt="Microsoft" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/apple.svg" alt="Apple" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/netflix.svg" alt="Netflix" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/spotify.svg" alt="Spotify" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/airbnb.svg" alt="Airbnb" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/flipkart.svg" alt="Flipkart" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/meesho.svg" alt="Meesho" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/myntra.svg" alt="Myntra" />
            </CompanyLogo>
            <CompanyLogo>
              <img src="/companies/razorpay.svg" alt="Razorpay" />
            </CompanyLogo>
          </CompaniesCarousel>
        </div>
      </CompaniesSection>

      <FeaturesSection id="features">
        <SectionHeader>
          <SectionTitle>Why Choose DeepLearner?</SectionTitle>
          <SectionContent>
            Discover the features that make us the preferred choice for deep learning education
          </SectionContent>
        </SectionHeader>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>Interactive Learning</FeatureTitle>
            <FeatureDescription>
              Learn by doing with our hands-on approach to deep learning concepts
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>Project-Based Learning</FeatureTitle>
            <FeatureDescription>
              Build real-world projects that showcase your skills and enhance your portfolio
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Expert Community</FeatureTitle>
            <FeatureDescription>
              Connect with fellow learners and industry experts for guidance and support
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <Section style={{ background: '#F8FAFC', padding: '4rem 2rem' }}>
        <SectionHeader>
          <SectionTitle>Learning Paths</SectionTitle>
          <HeroDescription style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
            Follow our structured learning paths to master frontend development step by step
          </HeroDescription>
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
          <HeroDescription style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
            Join thousands of successful developers who transformed their careers with Frontendly
          </HeroDescription>
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

      <Section style={{ textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(to right, #F59E0B, #D97706)' }}>
        <SectionHeader>
          <SectionTitle style={{ color: 'white' }}>Ready to Start Your Journey?</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <HeroDescription style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'white' }}>
            Join thousands of developers who have transformed their careers with Frontendly.
          </HeroDescription>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" passHref>
              <CTAButton href="/signup" style={{ background: 'white', color: '#F59E0B' }}>Get Started Free</CTAButton>
            </Link>
            <Link href="/learn" passHref>
              <CTAButton href="/learn" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>
                Explore Courses
              </CTAButton>
            </Link>
          </div>
        </SectionContent>
      </Section>
    </LandingContainer>
  );
}
