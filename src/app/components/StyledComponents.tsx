'use client';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import React from 'react';
import { lightTheme, darkTheme } from '../theme';

const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
  '5xl': '5rem',
  '6xl': '6rem',
};

const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
};

export const typography = {
  h1: '2.5rem',
  h2: '2rem',
  h3: '1.75rem',
  h4: '1.5rem',
  h5: '1.25rem',
  h6: '1rem',
  body1: { fontSize: '1rem', fontWeight: 400 },
  body2: { fontSize: '0.875rem', fontWeight: 400 },
  caption: { fontSize: '0.75rem', fontWeight: 400 },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

const fonts = {
  body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  heading:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  code: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.theme.colors.background}dd;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  height: 64px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(8px);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.md};
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.md};
  }
`;

export const QuickActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const ActionButton = styled.a<{ primary?: boolean; fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => (props.primary ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.primary ? '#fff' : props.theme.colors.text)};
  border: 1px solid
    ${props => (props.primary ? props.theme.colors.primary : props.theme.colors.border)};
  width: ${props => (props.fullWidth ? '100%' : 'auto')};

  &:hover {
    background: ${props =>
      props.primary ? props.theme.colors.primaryDark : props.theme.colors.backgroundAlt};
  }

  .action-label {
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      display: none;
    }
  }
`;

export const CategoryList = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex: 1;
  padding: 0 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button<{ active: boolean }>`
  background: ${props => (props.active ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.active ? '#FFFFFF' : props.theme.colors.text)};
  border: 1px solid
    ${props => (props.active ? props.theme.colors.primary : props.theme.colors.border)};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => (props.active ? '600' : '400')};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  justify-content: space-between;

  &:hover {
    background: ${props =>
      props.active ? props.theme.colors.primaryDark : props.theme.colors.backgroundAlt};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${props => props.theme.colors.primary}15;
  }

  &:active {
    transform: translateY(0);
  }

  .category-count {
    background: ${props =>
      props.active ? 'rgba(255, 255, 255, 0.2)' : props.theme.colors.backgroundAlt};
    padding: 2px 8px;
    border-radius: 12px;
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => (props.active ? '#FFFFFF' : props.theme.colors.textSecondary)};
  }
`;

export const CategoryIcon = styled.span`
  font-size: 1.1rem;
`;

export const Logo = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &::before {
    content: '🚀';
    font-size: 1.2em;
  }

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
    transform: scale(1.02);
    transition: all 0.2s ease;
  }
`;

export const SearchContainer = styled.div<{ $isFocused: boolean }>`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => (props.$isFocused ? 'block' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: ${props => props.theme.spacing.md};
    background: ${props => props.theme.colors.background};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    z-index: 1001;
    max-width: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text};
  opacity: 0.5;
  font-size: 1.1rem;
`;

export const ThemeToggle = styled.button`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PageContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 64px);
  margin-top: 64px;
  background: ${props => props.theme.colors.background};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  width: 280px;
  height: 100vh;
  background: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  overflow-y: auto;
  transition: all 0.3s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 3px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const SidebarTitle = styled.h2`
  font-size: ${props => props.theme.typography.h3.fontSize};
  font-weight: ${props => props.theme.typography.h3.fontWeight};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const SidebarSearch = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const SidebarSearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  padding-right: 40px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const SidebarSearchIcon = styled.div`
  position: absolute;
  right: ${props => props.theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const SidebarProgress = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const SidebarProgressBar = styled.div<{ progress: number }>`
  height: 8px;
  background: ${props => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.sm};

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

export const SidebarProgressText = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.spacing.xs};
`;

export const SidebarProgressValue = styled.span`
  font-size: ${props => props.theme.typography.h4.fontSize};
  font-weight: ${props => props.theme.typography.h4.fontWeight};
  color: ${props => props.theme.colors.primary};
`;

export const SidebarProgressLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

export const SidebarStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};

  span:first-child {
    font-size: 1.2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;

    strong {
      font-size: ${props => props.theme.typography.fontSize.md};
      color: ${props => props.theme.colors.text};
    }

    span {
      font-size: ${props => props.theme.typography.fontSize.xs};
      color: ${props => props.theme.colors.textSecondary};
    }
  }
`;

export const SidebarStatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
`;

export const SidebarQuickActions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.sm};
`;

export const SidebarQuickActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    border-color: ${props => props.theme.colors.primary};
  }

  span {
    font-size: 1.2rem;
  }
`;

export const SidebarFilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

export const SidebarFilterLabel = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const SidebarCategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

export const SidebarCategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const SidebarCategoryCount = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  background: ${props => props.theme.colors.background};
  padding: 2px 8px;
  border-radius: ${props => props.theme.borderRadius.sm};
  border: 1px solid ${props => props.theme.colors.border};
`;

export const SidebarDivider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.xs} 0;
`;

export const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: auto;
`;

export const SidebarFooterText = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};

  span {
    font-size: 1.2rem;
  }
`;

export const SidebarSection = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

export const SidebarSectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  margin-left: ${props => props.theme.spacing.xl};

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${props => props.theme.colors.error};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`;

export const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.sm};
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  padding: ${props => props.theme.spacing.lg};
`;

export const HeroImage = styled.img`
  flex: 1;
  max-width: 500px;
  height: auto;
  object-fit: contain;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

export const RoadmapSection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

export const RoadmapTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  position: relative;
  padding-left: ${props => props.theme.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.colors.border};
  }
`;

export const RoadmapItem = styled.div`
  position: relative;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};

  &::before {
    content: '';
    position: absolute;
    left: -${props => props.theme.spacing.xl};
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.background};
  }
`;

export const RoadmapContent = styled.div`
  h3 {
    margin: 0 0 ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const RoadmapTitle = styled.h3`
  font-size: ${props => props.theme.typography.h3};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.sm};
`;

export const RoadmapDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
`;

export const TopicCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const TopicCardHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
`;

export const TopicCardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

export const TopicCardFooter = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopicCardStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

export const InterviewSection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

export const InterviewCard = styled(TopicCard)`
  background: ${props => props.theme.colors.backgroundAlt};
`;

export const InterviewHeader = styled(TopicCardHeader)`
  background: ${props => props.theme.colors.primary}10;
`;

export const InterviewContent = styled(TopicCardContent)`
  h3 {
    margin: 0 0 ${props => props.theme.spacing.sm};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const InterviewFooter = styled(TopicCardFooter)`
  border-top: 1px solid ${props => props.theme.colors.borderLight};
`;

export const InterviewStats = styled(TopicCardStats)`
  color: ${props => props.theme.colors.textSecondary};
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  z-index: 1001;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

export const MobileSidebar = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  z-index: 1000;
  transform: translateX(${props => (props.$isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

export const MobileSidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 1rem;
`;

export const MobileSidebarClose = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
`;

export const MobileSidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MobileSidebarLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }

  .nav-icon {
    font-size: 1.2rem;
  }
`;

export const MobileSidebarActions = styled.div`
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MobileSidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

export const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 280px;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 0.5rem;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const NavDropdownContent = styled.div`
  padding: 1rem;
`;

export const NavDropdownItem = styled.div`
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const NavDropdownTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const NavDropdownDescription = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0.25rem 0 0;
`;

export const LandingHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  height: 64px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(8px);
  background-color: ${props => props.theme.colors.background}dd;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: auto;
    min-height: 64px;
  }
`;

export const LandingNavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const LandingNavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const LandingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const StatsSection = styled.section`
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.typography.h1.fontSize};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.h2.fontSize};
  }
`;

export const Description = styled.p`
  font-size: ${props => props.theme.typography.body1.fontSize};
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.body1.lineHeight};
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.body2.fontSize};
  }
`;

export const Content = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: ${props => props.theme.typography.body1.lineHeight};
  font-size: ${props => props.theme.typography.body1.fontSize};

  p {
    margin-bottom: 1.5rem;
  }

  ul,
  ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.75rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.body2.fontSize};
  }
`;

export const StatCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: ${props => props.theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const StatNumber = styled.div`
  font-size: ${props => props.theme.typography.h1.fontSize};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.h2.fontSize};
  }
`;

export const StatLabel = styled.div`
  font-size: ${props => props.theme.typography.body1.fontSize};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export const TestimonialsSection = styled.section`
  padding: ${props => props.theme.spacing.xl} 0;
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.xl} 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.lg} 0;
    margin: ${props => props.theme.spacing.lg} 0;
  }
`;

export const TestimonialCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin: ${props => props.theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.lg};
    margin: ${props => props.theme.spacing.sm};
  }
`;

export const TestimonialContent = styled.p`
  font-size: ${props => props.theme.typography.body1.fontSize};
  color: ${props => props.theme.colors.text};
  line-height: ${props => props.theme.typography.body1.lineHeight};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-style: italic;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.body2.fontSize};
  }
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

export const TestimonialAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.primary};
`;

export const TestimonialRole = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.body1.fontSize};
  }

  span {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.typography.body2.fontSize};
  }
`;

export const LandingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

export const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing.xl} 0;
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
`;

export const CardHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.h4.fontSize};
  font-weight: ${props => props.theme.typography.h4.fontWeight};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const CardContent = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

export const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

export const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${props => props.theme.spacing.md};
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

export const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.typography.h4.fontSize};
  font-weight: ${props => props.theme.typography.h4.fontWeight};
  color: ${props => props.theme.colors.text};
`;

export const FeatureDescription = styled.p`
  font-size: ${props => props.theme.typography.body2.fontSize};
  color: ${props => props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.body2.lineHeight};
`;

export const Section = styled.section`
  padding: ${props => props.theme.spacing.xl} 0;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.h2.fontWeight};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const SectionActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

export const SectionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

export const UserMenuContainer = styled.div`
  position: relative;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.md};
  min-width: 200px;
  z-index: 1000;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &[data-icon]::before {
    content: attr(data-icon);
    font-size: 1.2rem;
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.xs} 0;
`;

export const SidebarActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid
    ${props => (props.active ? props.theme.colors.primary : props.theme.colors.border)};
  background: ${props => (props.active ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.active ? '#FFFFFF' : props.theme.colors.text)};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props =>
      props.active ? props.theme.colors.primary : props.theme.colors.backgroundAlt};
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 9999px;
  overflow: hidden;
  margin: ${props => props.theme.spacing.sm} 0;

  > div {
    width: ${props => props.progress}%;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    border-radius: 9999px;
    transition: width 0.3s ease;
  }
`;

export const TopicTitle = styled.h1`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.h2.fontWeight};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const TopicMeta = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

export const QuizContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
`;

export const QuizHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const QuizQuestion = styled.h3`
  font-size: ${props => props.theme.typography.h4.fontSize};
  font-weight: ${props => props.theme.typography.h4.fontWeight};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const QuizProgress = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

export const QuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${props => props.theme.spacing.xl};
  margin-left: 280px;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-left: 0;
    padding: ${props => props.theme.spacing.md};
  }
`;

export const WelcomeCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const TopicCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

export const TopicCardAction = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background};
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

export const AuthTitle = styled.h1`
  font-size: ${props => props.theme.typography.h2};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

export const ErrorMessage = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.error}15;
  color: ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

export const SocialButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

export const SocialButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.sm};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const StatTitle = styled.div`
  font-size: ${props => props.theme.typography.body2.fontSize};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const StatValue = styled.div`
  font-size: ${props => props.theme.typography.h3.fontSize};
  font-weight: ${props => props.theme.typography.h3.fontWeight};
  color: ${props => props.theme.colors.text};
`;

export const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

export const ProfileCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  position: relative;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const ProfileAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const ProfileName = styled.h1`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.h2.fontWeight};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const ProfileEmail = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

export const ProfileSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const UserName = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

export const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.body2.fontSize};
`;

export const FormInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.body1.fontSize};
  transition: all ${props => props.theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.theme.typography.body1.fontSize};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${props => props.theme.colors.border};
    cursor: not-allowed;
    transform: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
    font-weight: ${({ theme }) => theme.typography.body1.fontWeight};
    line-height: ${({ theme }) => theme.typography.body1.lineHeight};
  }
`;
interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
