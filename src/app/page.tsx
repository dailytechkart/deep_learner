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
  TestimonialGrid,
  TestimonialInfo,
  TestimonialName,
  TestimonialCompany,
  TestimonialStats,
  TestimonialStat,
  TestimonialTags,
  TestimonialTag,
  StatValue,
  StatsGrid,
  StatIcon,
  StatDescription,
  StatTrend,
  FeatureBenefits,
  FeatureBenefit,
  FeatureCTA,
  HeroSection,
  HeroContent,
  HeroTextContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  ActionButton,
  ImageWrapper,
  StyledImage,
  PricingSection,
  PricingGrid,
  PricingCard,
  PricingBadge,
  PricingTitle,
  PricingPrice,
  CurrentPrice,
  OriginalPrice,
  DiscountBadge,
  PricingFeatures,
  PricingFeature,
  PricingCTA,
  PricingNote,
  RoadmapSkills,
  RoadmapSkill,
} from './components/StyledComponents';
import { MainLayout } from '@/components/MainLayout';
import Image from 'next/image';
import {
  FaBook,
  FaCode,
  FaReact,
  FaJs,
  FaCss3Alt,
  FaHtml5,
  FaNodeJs,
  FaUsers,
  FaComments,
  FaGraduationCap,
  FaBriefcase,
  FaStar,
} from 'react-icons/fa';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvent } from '@/utils/analytics';
import { HOME_ANALYTICS } from '@/analytics/constants';
import HeroCarousel from './components/HeroCarousel';

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
  const { trackEvent } = useAnalytics();

  const handleGetStartedClick = () => {
    trackEvent(AnalyticsEvent.NAVIGATION, {
      action: HOME_ANALYTICS.EVENTS.GET_STARTED_CLICK,
      location: HOME_ANALYTICS.LOCATIONS.HERO_SECTION,
      timestamp: new Date().toISOString(),
    });
  };

  const handleLearnMoreClick = () => {
    trackEvent(AnalyticsEvent.NAVIGATION, {
      action: HOME_ANALYTICS.EVENTS.LEARN_MORE_CLICK,
      location: HOME_ANALYTICS.LOCATIONS.HERO_SECTION,
      timestamp: new Date().toISOString(),
    });
  };

  const handleFeatureClick = (featureName: 'html_css' | 'javascript' | 'react' | 'node') => {
    trackEvent(AnalyticsEvent.NAVIGATION, {
      action: HOME_ANALYTICS.EVENTS.FEATURE_CLICK,
      feature: featureName,
      location: HOME_ANALYTICS.LOCATIONS.FEATURES_SECTION,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <MainLayout fullWidth>
      <HeroSection>
        <HeroContent>
          <HeroTextContent>
            <HeroTitle>Master Frontend Development with Interactive Projects</HeroTitle>
            <HeroSubtitle>
              Learn modern frontend development through hands-on projects, real-world applications,
              and expert guidance. Master HTML, CSS, JavaScript, React, and more to build
              responsive, accessible, and performant web applications.
            </HeroSubtitle>
            <HeroActions>
              <Link href="/signup" passHref>
                <ActionButton primary onClick={handleGetStartedClick}>
                  Get Started Free
                </ActionButton>
              </Link>
              <Link href="#features" passHref>
                <ActionButton onClick={handleLearnMoreClick}>Learn More</ActionButton>
              </Link>
            </HeroActions>
          </HeroTextContent>
          <HeroCarousel />
        </HeroContent>
      </HeroSection>

      <StatsSection aria-labelledby="stats-title">
        <SectionHeader>
          <SectionTitle id="stats-title">Our Impact</SectionTitle>
        </SectionHeader>
        <StatsGrid>
          <StatCard role="listitem">
            <StatIcon>
              <FaUsers />
            </StatIcon>
            <StatNumber>10K+</StatNumber>
            <StatLabel>Active Learners</StatLabel>
            <StatDescription>
              Join our growing community of developers from around the world
            </StatDescription>
            <StatTrend $positive>+15% this month</StatTrend>
          </StatCard>

          <StatCard role="listitem">
            <StatIcon>
              <FaCode />
            </StatIcon>
            <StatNumber>500+</StatNumber>
            <StatLabel>Interactive Projects</StatLabel>
            <StatDescription>
              Real-world projects to build your portfolio and gain practical experience
            </StatDescription>
            <StatTrend $positive>+50 new projects</StatTrend>
          </StatCard>

          <StatCard role="listitem">
            <StatIcon>
              <FaComments />
            </StatIcon>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Community Support</StatLabel>
            <StatDescription>Get help from mentors and peers whenever you need it</StatDescription>
            <StatTrend $positive>98% response rate</StatTrend>
          </StatCard>

          <StatCard role="listitem">
            <StatIcon>
              <FaGraduationCap />
            </StatIcon>
            <StatNumber>85%</StatNumber>
            <StatLabel>Completion Rate</StatLabel>
            <StatDescription>
              Our structured learning path keeps you motivated and on track
            </StatDescription>
            <StatTrend $positive>+10% vs industry</StatTrend>
          </StatCard>

          <StatCard role="listitem">
            <StatIcon>
              <FaBriefcase />
            </StatIcon>
            <StatNumber>92%</StatNumber>
            <StatLabel>Job Placement</StatLabel>
            <StatDescription>
              Land your dream job with our career support and interview prep
            </StatDescription>
            <StatTrend $positive>+5% this quarter</StatTrend>
          </StatCard>

          <StatCard role="listitem">
            <StatIcon>
              <FaStar />
            </StatIcon>
            <StatNumber>4.9/5</StatNumber>
            <StatLabel>Student Satisfaction</StatLabel>
            <StatDescription>
              Join thousands of satisfied learners who transformed their careers
            </StatDescription>
            <StatTrend $positive>+0.2 this year</StatTrend>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection id="features" aria-labelledby="features-title">
        <SectionHeader>
          <SectionTitle id="features-title">Why Choose Us</SectionTitle>
        </SectionHeader>
        <FeatureGrid>
          <FeatureCard onClick={() => handleFeatureClick('html_css')}>
            <FeatureIcon>
              <FaHtml5 />
            </FeatureIcon>
            <FeatureTitle>HTML & CSS Mastery</FeatureTitle>
            <FeatureDescription>
              Build modern, responsive websites with the latest HTML5 and CSS3 techniques
            </FeatureDescription>
            <FeatureBenefits>
              <FeatureBenefit>Semantic HTML5 Structure</FeatureBenefit>
              <FeatureBenefit>Advanced CSS3 Features</FeatureBenefit>
              <FeatureBenefit>Responsive Design Patterns</FeatureBenefit>
              <FeatureBenefit>CSS Grid & Flexbox</FeatureBenefit>
            </FeatureBenefits>
            <FeatureCTA>Start Learning</FeatureCTA>
          </FeatureCard>

          <FeatureCard onClick={() => handleFeatureClick('javascript')}>
            <FeatureIcon>
              <FaJs />
            </FeatureIcon>
            <FeatureTitle>Modern JavaScript</FeatureTitle>
            <FeatureDescription>
              Master ES6+ features and advanced JavaScript concepts for modern web development
            </FeatureDescription>
            <FeatureBenefits>
              <FeatureBenefit>ES6+ Features</FeatureBenefit>
              <FeatureBenefit>Async Programming</FeatureBenefit>
              <FeatureBenefit>DOM Manipulation</FeatureBenefit>
              <FeatureBenefit>Performance Optimization</FeatureBenefit>
            </FeatureBenefits>
            <FeatureCTA>Start Learning</FeatureCTA>
          </FeatureCard>

          <FeatureCard onClick={() => handleFeatureClick('react')}>
            <FeatureIcon>
              <FaReact />
            </FeatureIcon>
            <FeatureTitle>React Development</FeatureTitle>
            <FeatureDescription>
              Build scalable applications with React, hooks, and modern state management
            </FeatureDescription>
            <FeatureBenefits>
              <FeatureBenefit>React Hooks & Context</FeatureBenefit>
              <FeatureBenefit>State Management</FeatureBenefit>
              <FeatureBenefit>Component Architecture</FeatureBenefit>
              <FeatureBenefit>Performance Patterns</FeatureBenefit>
            </FeatureBenefits>
            <FeatureCTA>Start Learning</FeatureCTA>
          </FeatureCard>

          <FeatureCard onClick={() => handleFeatureClick('node')}>
            <FeatureIcon>
              <FaNodeJs />
            </FeatureIcon>
            <FeatureTitle>Full-Stack Development</FeatureTitle>
            <FeatureDescription>
              Develop complete applications with Node.js, Express, and modern backend practices
            </FeatureDescription>
            <FeatureBenefits>
              <FeatureBenefit>RESTful APIs</FeatureBenefit>
              <FeatureBenefit>Database Integration</FeatureBenefit>
              <FeatureBenefit>Authentication & Security</FeatureBenefit>
              <FeatureBenefit>Deployment & DevOps</FeatureBenefit>
            </FeatureBenefits>
            <FeatureCTA>Start Learning</FeatureCTA>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <RoadmapSection id="roadmap" aria-labelledby="roadmap-title">
        <SectionHeader>
          <SectionTitle id="roadmap-title">Your Learning Journey</SectionTitle>
          <HeroDescription style={{ maxWidth: '800px', margin: '0 auto' }}>
            Follow our comprehensive roadmap designed to take you from beginner to professional
            developer
          </HeroDescription>
        </SectionHeader>
        <RoadmapTimeline role="list">
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Foundation</RoadmapTitle>
              <RoadmapDescription>
                Master HTML5 semantics, responsive layouts, CSS Grid/Flexbox, and JavaScript
                fundamentals. Build interactive websites with DOM manipulation, event handling, and
                form validation. Learn Git basics and modern development workflows.
              </RoadmapDescription>
              <RoadmapSkills>
                <RoadmapSkill>HTML5</RoadmapSkill>
                <RoadmapSkill>CSS3</RoadmapSkill>
                <RoadmapSkill>JavaScript</RoadmapSkill>
                <RoadmapSkill>Git</RoadmapSkill>
                <RoadmapSkill>Responsive Design</RoadmapSkill>
              </RoadmapSkills>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Advanced Frontend</RoadmapTitle>
              <RoadmapDescription>
                Deep dive into React hooks, custom hooks, context API, and state management
                (Redux/Context). Master TypeScript types, interfaces, and generics. Learn modern
                build tools (Webpack/Vite), testing (Jest/React Testing Library), and component
                architecture.
              </RoadmapDescription>
              <RoadmapSkills>
                <RoadmapSkill>React</RoadmapSkill>
                <RoadmapSkill>TypeScript</RoadmapSkill>
                <RoadmapSkill>Redux</RoadmapSkill>
                <RoadmapSkill>Testing</RoadmapSkill>
                <RoadmapSkill>Build Tools</RoadmapSkill>
              </RoadmapSkills>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Performance & Optimization</RoadmapTitle>
              <RoadmapDescription>
                Master code splitting, lazy loading, and bundle optimization. Learn performance
                monitoring, caching strategies, and Core Web Vitals. Implement accessibility (WCAG),
                SEO best practices, and progressive enhancement techniques.
              </RoadmapDescription>
              <RoadmapSkills>
                <RoadmapSkill>Performance</RoadmapSkill>
                <RoadmapSkill>Accessibility</RoadmapSkill>
                <RoadmapSkill>SEO</RoadmapSkill>
                <RoadmapSkill>Core Web Vitals</RoadmapSkill>
                <RoadmapSkill>Optimization</RoadmapSkill>
              </RoadmapSkills>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Frontend Interview Prep</RoadmapTitle>
              <RoadmapDescription>
                Master frontend-specific DSA problems, React internals, and browser fundamentals.
                Practice coding challenges, system design for frontend applications, and debugging
                techniques. Learn to explain technical concepts clearly and handle edge cases.
              </RoadmapDescription>
              <RoadmapSkills>
                <RoadmapSkill>DSA</RoadmapSkill>
                <RoadmapSkill>System Design</RoadmapSkill>
                <RoadmapSkill>Debugging</RoadmapSkill>
                <RoadmapSkill>Problem Solving</RoadmapSkill>
                <RoadmapSkill>Technical Communication</RoadmapSkill>
              </RoadmapSkills>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Behavioral & Leadership</RoadmapTitle>
              <RoadmapDescription>
                Develop communication skills for technical discussions and presentations. Learn
                conflict resolution, team management, and project leadership. Master behavioral
                interview techniques, STAR method, and leadership principles for tech teams.
              </RoadmapDescription>
              <RoadmapSkills>
                <RoadmapSkill>Leadership</RoadmapSkill>
                <RoadmapSkill>Communication</RoadmapSkill>
                <RoadmapSkill>Team Management</RoadmapSkill>
                <RoadmapSkill>Conflict Resolution</RoadmapSkill>
                <RoadmapSkill>Project Management</RoadmapSkill>
              </RoadmapSkills>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>System Design & Architecture</RoadmapTitle>
              <RoadmapDescription>
                Master micro-frontends, state management patterns, and API design. Learn to design
                scalable frontend architectures, handle data flow, and implement security best
                practices. Understand trade-offs in technical decisions and system constraints.
              </RoadmapDescription>
              <RoadmapSkills>
                <RoadmapSkill>Architecture</RoadmapSkill>
                <RoadmapSkill>Micro-frontends</RoadmapSkill>
                <RoadmapSkill>API Design</RoadmapSkill>
                <RoadmapSkill>Security</RoadmapSkill>
                <RoadmapSkill>Scalability</RoadmapSkill>
              </RoadmapSkills>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Mock Interviews & Feedback</RoadmapTitle>
              <RoadmapDescription>
                Practice with senior engineers from top tech companies. Receive detailed feedback on
                coding style, problem-solving approach, and communication. Learn to handle pressure,
                think on your feet, and present solutions effectively.
              </RoadmapDescription>
              <RoadmapSkills>
                <RoadmapSkill>Mock Interviews</RoadmapSkill>
                <RoadmapSkill>Code Review</RoadmapSkill>
                <RoadmapSkill>Feedback</RoadmapSkill>
                <RoadmapSkill>Problem Solving</RoadmapSkill>
                <RoadmapSkill>Communication</RoadmapSkill>
              </RoadmapSkills>
            </RoadmapContent>
          </RoadmapItem>
          <RoadmapItem role="listitem">
            <RoadmapContent>
              <RoadmapTitle>Career Growth & Negotiation</RoadmapTitle>
              <RoadmapDescription>
                Master salary negotiation techniques, career path planning, and professional
                branding. Learn to evaluate job offers, build a strong portfolio, and maintain
                work-life balance. Develop strategies for continuous learning and career
                advancement.
              </RoadmapDescription>
              <RoadmapSkills>
                <RoadmapSkill>Career Planning</RoadmapSkill>
                <RoadmapSkill>Negotiation</RoadmapSkill>
                <RoadmapSkill>Portfolio</RoadmapSkill>
                <RoadmapSkill>Professional Branding</RoadmapSkill>
                <RoadmapSkill>Work-Life Balance</RoadmapSkill>
              </RoadmapSkills>
            </RoadmapContent>
          </RoadmapItem>
        </RoadmapTimeline>
      </RoadmapSection>

      <TestimonialsSection id="testimonials" aria-labelledby="testimonials-title">
        <SectionHeader>
          <SectionTitle id="testimonials-title">Success Stories</SectionTitle>
        </SectionHeader>
        <TestimonialGrid>
          <TestimonialCard role="listitem">
            <TestimonialContent>
              "The curriculum is well-structured and up-to-date. I learned more in 3 months here
              than I did in a year of self-study. The hands-on projects and mentorship were
              invaluable."
            </TestimonialContent>
            <TestimonialAuthor>
              <TestimonialAvatar
                src="/avatars/user1.svg"
                alt="Sarah Johnson"
                width={60}
                height={60}
              />
              <TestimonialInfo>
                <TestimonialName>Sarah Johnson</TestimonialName>
                <TestimonialRole>Senior Frontend Developer</TestimonialRole>
                <TestimonialCompany>TechCorp Inc.</TestimonialCompany>
              </TestimonialInfo>
            </TestimonialAuthor>
            <TestimonialStats>
              <TestimonialStat>
                <StatValue>6x</StatValue>
                <StatLabel>Salary Increase</StatLabel>
              </TestimonialStat>
              <TestimonialStat>
                <StatValue>3</StatValue>
                <StatLabel>Months to Job</StatLabel>
              </TestimonialStat>
            </TestimonialStats>
            <TestimonialTags>
              <TestimonialTag>React</TestimonialTag>
              <TestimonialTag>TypeScript</TestimonialTag>
              <TestimonialTag>System Design</TestimonialTag>
            </TestimonialTags>
          </TestimonialCard>

          <TestimonialCard role="listitem">
            <TestimonialContent>
              "The interview preparation was exceptional. The mock interviews and personalized
              feedback helped me land my dream job at a top tech company. The community support is
              amazing!"
            </TestimonialContent>
            <TestimonialAuthor>
              <TestimonialAvatar src="/avatars/user2.svg" alt="Mike Chen" width={60} height={60} />
              <TestimonialInfo>
                <TestimonialName>Mike Chen</TestimonialName>
                <TestimonialRole>Frontend Engineer</TestimonialRole>
                <TestimonialCompany>InnovateAI</TestimonialCompany>
              </TestimonialInfo>
            </TestimonialAuthor>
            <TestimonialStats>
              <TestimonialStat>
                <StatValue>4.5</StatValue>
                <StatLabel>GPA</StatLabel>
              </TestimonialStat>
              <TestimonialStat>
                <StatValue>2</StatValue>
                <StatLabel>Job Offers</StatLabel>
              </TestimonialStat>
            </TestimonialStats>
            <TestimonialTags>
              <TestimonialTag>JavaScript</TestimonialTag>
              <TestimonialTag>Performance</TestimonialTag>
              <TestimonialTag>Architecture</TestimonialTag>
            </TestimonialTags>
          </TestimonialCard>

          <TestimonialCard role="listitem">
            <TestimonialContent>
              "The advanced topics and real-world projects gave me the confidence to tackle complex
              challenges. The mentorship program helped me grow both technically and
              professionally."
            </TestimonialContent>
            <TestimonialAuthor>
              <TestimonialAvatar
                src="/avatars/user3.svg"
                alt="Emily Rodriguez"
                width={60}
                height={60}
              />
              <TestimonialInfo>
                <TestimonialName>Emily Rodriguez</TestimonialName>
                <TestimonialRole>Lead Frontend Developer</TestimonialRole>
                <TestimonialCompany>FutureTech</TestimonialCompany>
              </TestimonialInfo>
            </TestimonialAuthor>
            <TestimonialStats>
              <TestimonialStat>
                <StatValue>5</StatValue>
                <StatLabel>Projects</StatLabel>
              </TestimonialStat>
              <TestimonialStat>
                <StatValue>100%</StatValue>
                <StatLabel>Success Rate</StatLabel>
              </TestimonialStat>
            </TestimonialStats>
            <TestimonialTags>
              <TestimonialTag>Next.js</TestimonialTag>
              <TestimonialTag>GraphQL</TestimonialTag>
              <TestimonialTag>Leadership</TestimonialTag>
            </TestimonialTags>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialsSection>

      <PricingSection id="pricing" aria-labelledby="pricing-title">
        <SectionHeader>
          <SectionTitle id="pricing-title">Get Full Access</SectionTitle>
        </SectionHeader>
        <PricingGrid>
          <PricingCard>
            <PricingBadge>Limited Time Offer</PricingBadge>
            <PricingTitle>Lifetime Access</PricingTitle>
            <PricingPrice>
              <CurrentPrice>₹499</CurrentPrice>
              <OriginalPrice>₹8,000</OriginalPrice>
              <DiscountBadge>94% OFF</DiscountBadge>
            </PricingPrice>
            <PricingFeatures>
              <PricingFeature>Access to all current courses</PricingFeature>
              <PricingFeature>Access to all future courses</PricingFeature>
              <PricingFeature>Lifetime community access</PricingFeature>
              <PricingFeature>Priority support</PricingFeature>
              <PricingFeature>Certificate of completion</PricingFeature>
              <PricingFeature>Project-based learning</PricingFeature>
              <PricingFeature>Interview preparation</PricingFeature>
              <PricingFeature>Career guidance</PricingFeature>
              <PricingFeature>100+ Machine Coding Problems</PricingFeature>
              <PricingFeature>150+ JavaScript Problems</PricingFeature>
              <PricingFeature>50+ System Design Problems</PricingFeature>
              <PricingFeature>500+ Practice Quizzes</PricingFeature>
              <PricingFeature>Real-world Project Scenarios</PricingFeature>
              <PricingFeature>Weekly Coding Challenges</PricingFeature>
              <PricingFeature>Mock Interview Sessions</PricingFeature>
              <PricingFeature>Code Review Sessions</PricingFeature>
              <PricingFeature>Resume Building Workshops</PricingFeature>
              <PricingFeature>Salary Negotiation Guide</PricingFeature>
            </PricingFeatures>
            <Link href="/signup" passHref>
              <PricingCTA onClick={handleGetStartedClick}>Get Lifetime Access</PricingCTA>
            </Link>
            <PricingNote>One-time payment. No hidden fees. 7-day money-back guarantee.</PricingNote>
          </PricingCard>
        </PricingGrid>
      </PricingSection>

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
