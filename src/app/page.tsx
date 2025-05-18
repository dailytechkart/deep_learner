'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
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
  background: #F8FAFC;
  overflow: hidden;
  position: relative;
`;

const CompaniesTitle = styled.h3`
  text-align: center;
  color: #1E293B;
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
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E293B;
  
  .logo-icon {
    font-size: 1.75rem;
  }
`;

const LandingNavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const LandingNavLink = styled.a`
  color: #1E293B;
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
    background-color: var(--primary-color);
    transition: width 0.2s ease;
  }
  
  &:hover {
    color: var(--primary-color);
    
    &:after {
      width: 100%;
    }
  }
`;

const LandingActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const HeroSection = styled.section`
  padding: 8rem 2rem 4rem;
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 600px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1E293B;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #475569;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: #64748B;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: var(--primary-color);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 1px 1px, #E2E8F0 1px, transparent 0);
  background-size: 40px 40px;
  opacity: 0.5;
  pointer-events: none;
`;

export default function Home() {
  return (
    <LandingContainer>
      <LandingHeader>
        <Logo>
          <span className="logo-icon">🎓</span>
          FrontendPro Academy
        </Logo>
        <LandingNavLinks>
          <LandingNavLink href="/learn">Learn</LandingNavLink>
          <LandingNavLink href="/practice">Practice</LandingNavLink>
          <LandingNavLink href="/resources">Resources</LandingNavLink>
          <LandingNavLink href="/pricing">Pricing</LandingNavLink>
        </LandingNavLinks>
        <LandingActions>
          <Link href="/login" passHref>
            <LandingNavLink>Sign In</LandingNavLink>
          </Link>
          <Link href="/signup" passHref>
            <CTAButton style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>Get Started</CTAButton>
          </Link>
        </LandingActions>
      </LandingHeader>

      <HeroSection>
        <BackgroundPattern />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 1rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: '1 1 350px', minWidth: 0 }}>
            <HeroContent>
              <HeroTitle>
                Master Frontend Development
                <br />
                <span style={{ color: 'var(--primary-color)' }}>The Right Way</span>
              </HeroTitle>
              <HeroSubtitle>
                Learn modern frontend technologies with hands-on projects and real-world challenges
              </HeroSubtitle>
              <HeroDescription>
                Join thousands of developers learning HTML, CSS, JavaScript, React, and TypeScript through interactive lessons, practical exercises, and expert guidance.
              </HeroDescription>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'flex-start', flexWrap: 'wrap', marginTop: '2.5rem' }}>
                <Link href="/signup" passHref>
                  <CTAButton>Get Started Free</CTAButton>
                </Link>
                <Link href="/learn" passHref>
                  <CTAButton style={{ background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}>
                    Explore Courses
                  </CTAButton>
                </Link>
              </div>
            </HeroContent>
          </div>
          <div style={{ flex: '1 1 350px', minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '480px', width: '100%' }}>
            {/* Professional Frontend SVG Illustration */}
            <svg width="100%" height="320" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '420px', height: 'auto' }} aria-hidden="true">
              {/* Main Browser Window */}
              <rect x="30" y="40" width="360" height="200" rx="18" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2"/>
              <rect x="50" y="65" width="320" height="150" rx="10" fill="#fff" stroke="#CBD5E1" strokeWidth="1.5"/>
              
              {/* Browser Header */}
              <rect x="50" y="65" width="320" height="18" rx="4" fill="#F3F4F6"/>
              <circle cx="66" cy="74" r="4" fill="#F87171"/>
              <circle cx="80" cy="74" r="4" fill="#FBBF24"/>
              <circle cx="94" cy="74" r="4" fill="#34D399"/>
              
              {/* Code Editor */}
              <rect x="70" y="90" width="280" height="110" rx="6" fill="#1E293B"/>
              
              {/* Code Syntax Highlighting */}
              <text x="80" y="110" fill="#F59E0B" fontFamily="monospace" fontSize="12">import</text>
              <text x="130" y="110" fill="#E2E8F0" fontFamily="monospace" fontSize="12">React</text>
              <text x="180" y="110" fill="#F59E0B" fontFamily="monospace" fontSize="12">from</text>
              <text x="220" y="110" fill="#F59E42" fontFamily="monospace" fontSize="12">'react'</text>
              
              <text x="80" y="130" fill="#E2E8F0" fontFamily="monospace" fontSize="12">const</text>
              <text x="120" y="130" fill="#D97706" fontFamily="monospace" fontSize="12">App</text>
              <text x="150" y="130" fill="#E2E8F0" fontFamily="monospace" fontSize="12">= () =&gt; {'{'} </text>
              
              <text x="100" y="150" fill="#E2E8F0" fontFamily="monospace" fontSize="12">return (</text>
              <text x="120" y="170" fill="#F59E42" fontFamily="monospace" fontSize="12">&lt;div&gt;</text>
              <text x="140" y="190" fill="#E2E8F0" fontFamily="monospace" fontSize="12">Hello World</text>
              <text x="120" y="210" fill="#F59E42" fontFamily="monospace" fontSize="12">&lt;/div&gt;</text>
              
              {/* UI Components */}
              <rect x="90" y="240" width="60" height="24" rx="6" fill="#F59E0B" opacity="0.15"/>
              <rect x="160" y="240" width="40" height="24" rx="6" fill="#D97706" opacity="0.15"/>
              <rect x="210" y="240" width="80" height="24" rx="6" fill="#B45309" opacity="0.15"/>
              
              {/* React Logo */}
              <circle cx="320" cy="240" r="20" fill="#F59E0B" opacity="0.2"/>
              <path d="M320 220 L330 250 L310 250 Z" fill="#D97706" opacity="0.3"/>
              <circle cx="320" cy="240" r="8" fill="#B45309" opacity="0.4"/>
              
              {/* Code Brackets */}
              <path d="M120 260 l-12 12 12 12" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M300 260 l12 12 -12 12" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              
              {/* Decorative Elements */}
              <ellipse cx="370" cy="60" rx="12" ry="6" fill="#F59E0B" opacity="0.12"/>
              <ellipse cx="60" cy="270" rx="10" ry="5" fill="#D97706" opacity="0.12"/>
              <ellipse cx="390" cy="240" rx="8" ry="4" fill="#B45309" opacity="0.12"/>
              
              {/* Floating Elements */}
              <rect x="350" y="100" width="20" height="20" rx="4" fill="#F59E0B" opacity="0.1" transform="rotate(15)"/>
              <rect x="40" y="120" width="15" height="15" rx="3" fill="#D97706" opacity="0.1" transform="rotate(-10)"/>
              <rect x="380" y="140" width="25" height="25" rx="5" fill="#B45309" opacity="0.1" transform="rotate(20)"/>
              
              {/* Connection Lines */}
              <path d="M320 240 L350 100" stroke="#F59E0B" strokeWidth="1" opacity="0.1" strokeDasharray="4 4"/>
              <path d="M320 240 L40 120" stroke="#D97706" strokeWidth="1" opacity="0.1" strokeDasharray="4 4"/>
              <path d="M320 240 L380 140" stroke="#B45309" strokeWidth="1" opacity="0.1" strokeDasharray="4 4"/>
            </svg>
          </div>
        </div>
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

      <FeaturesSection>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '4rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 2rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: '1 1 350px', minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '480px', width: '100%' }}>
            {/* Technical Stack Illustration */}
            <svg width="100%" height="400" viewBox="0 0 420 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '420px', height: 'auto' }} aria-hidden="true">
              {/* Main Container */}
              <rect x="40" y="40" width="340" height="320" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>
              
              {/* HTML Section */}
              <g transform="translate(60, 60)">
                <rect width="80" height="100" rx="8" fill="#F59E0B" opacity="0.1"/>
                <text x="10" y="25" fill="#D97706" fontFamily="monospace" fontSize="14" fontWeight="bold">HTML</text>
                <text x="10" y="45" fill="#B45309" fontFamily="monospace" fontSize="10">&lt;div&gt;</text>
                <text x="10" y="65" fill="#B45309" fontFamily="monospace" fontSize="10">&lt;header&gt;</text>
                <text x="10" y="85" fill="#B45309" fontFamily="monospace" fontSize="10">&lt;nav&gt;</text>
              </g>

              {/* CSS Section */}
              <g transform="translate(160, 60)">
                <rect width="80" height="100" rx="8" fill="#F59E0B" opacity="0.1"/>
                <text x="10" y="25" fill="#D97706" fontFamily="monospace" fontSize="14" fontWeight="bold">CSS</text>
                <text x="10" y="45" fill="#B45309" fontFamily="monospace" fontSize="10">.container {}</text>
                <text x="10" y="65" fill="#B45309" fontFamily="monospace" fontSize="10">@media () {}</text>
                <text x="10" y="85" fill="#B45309" fontFamily="monospace" fontSize="10">flexbox</text>
              </g>

              {/* JavaScript Section */}
              <g transform="translate(260, 60)">
                <rect width="80" height="100" rx="8" fill="#F59E0B" opacity="0.1"/>
                <text x="10" y="25" fill="#D97706" fontFamily="monospace" fontSize="14" fontWeight="bold">JS</text>
                <text x="10" y="45" fill="#B45309" fontFamily="monospace" fontSize="10">const x = () =&gt;</text>
                <text x="10" y="65" fill="#B45309" fontFamily="monospace" fontSize="10">async/await</text>
                <text x="10" y="85" fill="#B45309" fontFamily="monospace" fontSize="10">ES6+</text>
              </g>

              {/* React Section */}
              <g transform="translate(60, 180)">
                <rect width="80" height="100" rx="8" fill="#F59E0B" opacity="0.1"/>
                <text x="10" y="25" fill="#D97706" fontFamily="monospace" fontSize="14" fontWeight="bold">React</text>
                <text x="10" y="45" fill="#B45309" fontFamily="monospace" fontSize="10">useState()</text>
                <text x="10" y="65" fill="#B45309" fontFamily="monospace" fontSize="10">useEffect()</text>
                <text x="10" y="85" fill="#B45309" fontFamily="monospace" fontSize="10">Components</text>
              </g>

              {/* System Design Section */}
              <g transform="translate(160, 180)">
                <rect width="200" height="100" rx="8" fill="#F59E0B" opacity="0.1"/>
                <text x="10" y="25" fill="#D97706" fontFamily="monospace" fontSize="14" fontWeight="bold">System Design</text>
                <text x="10" y="45" fill="#B45309" fontFamily="monospace" fontSize="10">Architecture</text>
                <text x="10" y="65" fill="#B45309" fontFamily="monospace" fontSize="10">Performance</text>
                <text x="10" y="85" fill="#B45309" fontFamily="monospace" fontSize="10">Scalability</text>
              </g>

              {/* Connection Lines */}
              <path d="M100 160 L100 180" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4"/>
              <path d="M200 160 L200 180" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4"/>
              <path d="M300 160 L300 180" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4"/>
              <path d="M140 280 L140 300" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4"/>
              <path d="M260 280 L260 300" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4"/>

              {/* Decorative Elements */}
              <circle cx="50" cy="320" r="8" fill="#F59E0B" opacity="0.1"/>
              <circle cx="370" cy="320" r="12" fill="#D97706" opacity="0.1"/>
              <circle cx="210" cy="320" r="10" fill="#B45309" opacity="0.1"/>

              {/* Floating Elements */}
              <rect x="350" y="40" width="20" height="20" rx="4" fill="#F59E0B" opacity="0.1" transform="rotate(15)"/>
              <rect x="40" y="140" width="15" height="15" rx="3" fill="#D97706" opacity="0.1" transform="rotate(-10)"/>
              <rect x="380" y="200" width="25" height="25" rx="5" fill="#B45309" opacity="0.1" transform="rotate(20)"/>

              {/* Code Brackets */}
              <path d="M40 200 l-8 8 8 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M380 200 l8 8 -8 8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: '1 1 350px', minWidth: 0 }}>
            <SectionHeader>
              <SectionTitle>Why Choose FrontendPro Academy?</SectionTitle>
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
          </div>
        </div>
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
            Join thousands of successful developers who transformed their careers with FrontendPro Academy
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
            Join thousands of developers who have transformed their careers with FrontendPro Academy.
          </HeroDescription>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" passHref>
              <CTAButton style={{ background: 'white', color: '#F59E0B' }}>Get Started Free</CTAButton>
            </Link>
            <Link href="/learn" passHref>
              <CTAButton style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>
                Explore Courses
              </CTAButton>
            </Link>
          </div>
        </SectionContent>
      </Section>
    </LandingContainer>
  );
}
