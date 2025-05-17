'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import {
  LandingContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  CTAButton,
  FeaturesSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  Navbar,
  NavLogo,
  NavActions,
  ThemeToggle,
  AuthButtons,
  LoginButton,
  SignupButton,
  BackgroundPattern
} from './components/StyledComponents';

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <LandingContainer>
        <Navbar>
          <NavLogo>Deep Learner</NavLogo>
          <NavActions>
            <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? '☀️' : '🌙'}
            </ThemeToggle>
            <AuthButtons>
              <LoginButton href="/login">Login</LoginButton>
              <SignupButton href="/signup">Sign Up</SignupButton>
            </AuthButtons>
          </NavActions>
        </Navbar>

        <HeroSection>
          <BackgroundPattern />
          <HeroTitle>Master AI & Machine Learning</HeroTitle>
          <HeroSubtitle>Your Journey to Becoming an AI Expert Starts Here</HeroSubtitle>
          <HeroDescription>
            Deep Learner is your comprehensive platform for mastering machine learning,
            deep learning, and natural language processing. Start your journey today
            and become an AI expert!
          </HeroDescription>
          <CTAButton href="/signup">Start Learning Now</CTAButton>
        </HeroSection>

        <FeaturesSection>
          <FeatureCard>
            <FeatureIcon>📚</FeatureIcon>
            <FeatureTitle>Comprehensive Curriculum</FeatureTitle>
            <FeatureDescription>
              From basics to advanced topics, our curriculum covers everything you need
              to become proficient in AI and machine learning.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>💻</FeatureIcon>
            <FeatureTitle>Interactive Learning</FeatureTitle>
            <FeatureDescription>
              Practice with real-world examples, interactive code blocks, and hands-on
              projects to reinforce your learning.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>Track Your Progress</FeatureTitle>
            <FeatureDescription>
              Monitor your learning journey with detailed progress tracking, quizzes,
              and achievement badges.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🤝</FeatureIcon>
            <FeatureTitle>Community Support</FeatureTitle>
            <FeatureDescription>
              Join a community of learners, share your progress, and get help when
              you need it.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesSection>
      </LandingContainer>
    </ThemeProvider>
  );
};

export default Home;
