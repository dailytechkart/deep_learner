'use client';

import styled from 'styled-components';
import Image from 'next/image';

export const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--background);
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: var(--background-alt);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const AuthTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 0.5rem;
  display: block;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 1rem;

  &:hover {
    background-color: var(--primary-dark);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const AuthFooter = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

export const AuthLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const SuccessMessage = styled.div`
  color: #22c55e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: var(--text-secondary);
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--border);
  }

  &::before {
    margin-right: 0.5rem;
  }

  &::after {
    margin-left: 0.5rem;
  }
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--background-hover);
  }
`;

export const SocialButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const LandingContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

export const FeaturesSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.background};
`;

export const FeatureCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;
`;

export const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

export const FeatureBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;
`;

export const FeatureBenefit = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  transition: all 0.2s ease;

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }

  &:hover {
    transform: translateX(5px);
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const FeatureCTA = styled.button`
  margin-top: auto;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

export const Section = styled.section`
  padding: 4rem 0;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

export const RoadmapSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.backgroundAlt};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.colors.primary} 50%,
      transparent 100%
    );
  }
`;

export const RoadmapTimeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 4px;
    background: linear-gradient(
      180deg,
      ${props => props.theme.colors.primary} 0%,
      ${props => props.theme.colors.secondary} 100%
    );
    transform: translateX(-50%);
    z-index: 1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-top: 3rem;
    gap: 4rem;
    &::before {
      left: 20px;
    }
  }
`;

export const RoadmapItem = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 2;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:nth-child(odd) {
    padding-right: 50%;
    justify-content: flex-end;
  }

  &:nth-child(even) {
    padding-left: 50%;
    justify-content: flex-start;
  }

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background: ${props => props.theme.colors.background};
    border: 4px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    transition: all 0.3s ease;
    box-shadow: 0 0 0 4px ${props => props.theme.colors.backgroundAlt};
  }

  &:hover::before {
    transform: translateY(-50%) scale(1.2);
    box-shadow: 0 0 0 8px ${props => props.theme.colors.backgroundAlt};
  }

  &:nth-child(odd)::before {
    right: -12px;
  }

  &:nth-child(even)::before {
    left: -12px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    &:nth-child(odd),
    &:nth-child(even) {
      padding-left: 60px;
      padding-right: 20px;
      justify-content: flex-start;
    }

    &:nth-child(odd)::before,
    &:nth-child(even)::before {
      left: 10px;
    }
  }
`;

export const RoadmapContent = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 2.5rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  width: 90%;
  max-width: 500px;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(10px);
  background: ${props => `linear-gradient(
    135deg,
    ${props.theme.colors.background} 0%,
    ${props.theme.colors.backgroundAlt} 100%
  )`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary} 0%,
      ${props => props.theme.colors.secondary} 100%
    );
    border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0
      0;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${props => props.theme.shadows.xl};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
  }
`;

export const RoadmapTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.25rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  ${RoadmapContent}:hover &::after {
    width: 100%;
  }
`;

export const RoadmapDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  position: relative;
  padding-left: 1.5rem;
  border-left: 2px solid ${props => props.theme.colors.border};
  margin-left: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 10px;
    height: 10px;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    opacity: 0.5;
  }
`;

export const RoadmapSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const RoadmapSkill = styled.span`
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

export const StatsSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.colors.primary} 50%,
      transparent 100%
    );
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

export const StatCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(10px);
  background: ${props => `linear-gradient(
    135deg,
    ${props.theme.colors.background} 0%,
    ${props.theme.colors.backgroundAlt} 100%
  )`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary} 0%,
      ${props => props.theme.colors.secondary} 100%
    );
    border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0
      0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

export const StatIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.colors.background};
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;

  ${StatCard}:hover & {
    transform: scale(1.1);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  line-height: 1;
`;

export const StatLabel = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const StatDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.6;
  margin-top: 1rem;
`;

export const StatTrend = styled.div<{ $positive?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => (props.$positive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)')};
  color: ${props => (props.$positive ? '#22c55e' : '#ef4444')};
  margin-top: 0.5rem;
`;

export const TestimonialsSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.backgroundAlt};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.colors.primary} 50%,
      transparent 100%
    );
  }
`;

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

export const TestimonialCard = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(10px);
  background: ${props => `linear-gradient(
    135deg,
    ${props.theme.colors.background} 0%,
    ${props.theme.colors.backgroundAlt} 100%
  )`};

  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 4rem;
    color: ${props => props.theme.colors.primary};
    opacity: 0.1;
    font-family: serif;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

export const TestimonialContent = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  font-style: italic;
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  position: relative;
`;

export const TestimonialAvatar = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${props => props.theme.colors.primary};
  padding: 2px;
  background: ${props => props.theme.colors.background};
  transition: transform 0.3s ease;

  ${TestimonialCard}:hover & {
    transform: scale(1.1);
  }
`;

export const TestimonialInfo = styled.div`
  flex: 1;
`;

export const TestimonialName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.25rem;
`;

export const TestimonialRole = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export const TestimonialCompany = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export const TestimonialStats = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const TestimonialStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const StatValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

export const TestimonialTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const TestimonialTag = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
`;

export const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const UserAvatar = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  min-width: 200px;
  z-index: 1000;
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.base};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.border};
  margin: 0.5rem 0;
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: ${props => props.theme.spacing.lg};
  transition: all 0.2s ease-in-out;
`;

export const CardHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.h4.fontSize};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const CardContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
`;

export const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

export const ProfileCard = styled(Card)`
  position: relative;
  padding: ${props => props.theme.spacing.xl};
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const ProfileAvatar = styled.div<{ $src?: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${props => (props.$src ? `url(${props.$src})` : 'none')};
  background-size: cover;
  background-position: center;
`;

export const ProfileName = styled.h1`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const ProfileEmail = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.base};
  margin-top: ${props => props.theme.spacing.xs};
`;

export const ProfileSection = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 4px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--background);
  padding: 2rem;
`;

export const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--background-alt);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
`;

export const Description = styled.p`
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
`;

export const Content = styled.div`
  color: var(--text);
  line-height: 1.6;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  code {
    background-color: var(--background);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }

  pre {
    background-color: var(--background);
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 1rem 0;
  }
`;

export const HeroSection = styled.section`
  padding: 8rem 0 6rem;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.colors.primary} 50%,
      transparent 100%
    );
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: 6rem 0 4rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 5rem 0 3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 4rem 0 2rem;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: 3rem;
    padding: 0 3rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 0 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 1rem;
    gap: 1.5rem;
  }
`;

export const HeroTextContent = styled.div`
  flex: 1;
  max-width: 600px;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 500px;
    padding: 0 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    padding: 0;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.2;
  letter-spacing: -0.02em;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.text} 0%,
    ${props => props.theme.colors.primary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 3.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 3rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.25rem;
    margin-bottom: 1rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 540px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.125rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

export const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: 0.875rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
    gap: 0.75rem;
  }
`;

export const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.primary ? props.theme.colors.primary : props.theme.colors.border};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.primary ? props.theme.colors.primary + '40' : 'rgba(0, 0, 0, 0.1)'};
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9375rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.75rem 1.25rem;
    font-size: 0.875rem;
    width: 100%;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 500px;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 500px;
    height: 400px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    height: 350px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    height: 300px;
  }
`;

export const StyledImage = styled(Image)`
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15));
  }
`;

export const PricingSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.colors.primary} 50%,
      transparent 100%
    );
  }
`;

export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

export const PricingCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 3rem 2rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border};
  backdrop-filter: blur(10px);
  background: ${props => `linear-gradient(
    135deg,
    ${props.theme.colors.background} 0%,
    ${props.theme.colors.backgroundAlt} 100%
  )`};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary} 0%,
      ${props => props.theme.colors.secondary} 100%
    );
    border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

export const PricingBadge = styled.div`
  position: absolute;
  top: -12px;
  right: 20px;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: ${props => props.theme.shadows.md};
`;

export const PricingTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

export const PricingPrice = styled.div`
  margin: 1.5rem 0;
`;

export const CurrentPrice = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  line-height: 1;
  margin-bottom: 0.5rem;
`;

export const OriginalPrice = styled.div`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: line-through;
  margin-bottom: 0.5rem;
`;

export const DiscountBadge = styled.div`
  display: inline-block;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

export const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  width: 100%;
  text-align: left;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const PricingFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  transition: all 0.2s ease;
  border: 1px solid ${props => props.theme.colors.border};

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    font-size: 1.1rem;
    min-width: 20px;
    text-align: center;
  }

  &:hover {
    transform: translateX(5px);
    background: ${props => props.theme.colors.backgroundAlt};
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

export const PricingCTA = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const PricingNote = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
`;
