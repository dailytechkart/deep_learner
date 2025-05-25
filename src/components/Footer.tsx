import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = styled.footer`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 4rem 2rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    margin-top: 3rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;

const FooterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.base};
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(4px);
  }
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.6;
  margin: 0;
  max-width: 300px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.25rem;
  transition: all 0.2s ease;
  padding: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  max-width: 1400px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin: 0;
`;

const MadeWithLove = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};

  @media (max-width: 768px) {
    justify-content: center;
  }

  svg {
    color: #e25555;
  }
`;

export const AppFooter: React.FC = () => {
  return (
    <Footer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Frontend School</FooterTitle>
          <FooterText>
            Empowering developers with comprehensive frontend development courses. Master modern
            technologies and advance your career with our expert-led learning paths.
          </FooterText>
          <SocialLinks>
            <SocialLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </SocialLink>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </SocialLink>
            <SocialLink
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Learning Paths</FooterTitle>
          <FooterLink href="/learn/javascript" rel="noopener">
            JavaScript Fundamentals
          </FooterLink>
          <FooterLink href="/learn/react" rel="noopener">
            React Development
          </FooterLink>
          <FooterLink href="/learn/css" rel="noopener">
            Advanced CSS
          </FooterLink>
          <FooterLink href="/learn/testing" rel="noopener">
            Frontend Testing
          </FooterLink>
          <FooterLink href="/learn/performance" rel="noopener">
            Performance Optimization
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <FooterLink href="/blog" rel="noopener">
            Blog & Articles
          </FooterLink>
          <FooterLink href="/docs" rel="noopener">
            Documentation
          </FooterLink>
          <FooterLink href="/community" rel="noopener">
            Community
          </FooterLink>
          <FooterLink href="/faq" rel="noopener">
            FAQ
          </FooterLink>
          <FooterLink href="/support" rel="noopener">
            Support
          </FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterLink href="mailto:contact@frontendschool.in" rel="noopener">
            <FaEnvelope /> contact@frontendschool.in
          </FooterLink>
          <FooterText>
            Have questions? We&apos;re here to help you succeed in your learning journey.
          </FooterText>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>© {new Date().getFullYear()} Frontend School. All rights reserved.</Copyright>
        <MadeWithLove>
          Made with <FaHeart /> for developers
        </MadeWithLove>
      </FooterBottom>
    </Footer>
  );
};
