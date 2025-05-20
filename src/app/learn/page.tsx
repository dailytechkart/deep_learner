'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TopicList } from '../components/TopicList';
import { learningTopics } from '../../data/learningTopics';
import { MainLayout } from '@/components/MainLayout';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaFilter, FaChevronDown, FaStar, FaClock, FaUsers, FaBook, FaJs, FaReact, FaCss3Alt, FaGitAlt, FaShieldAlt, FaSearch as FaSearchIcon, FaRocket, FaChartLine, FaCode, FaSpinner, FaLock } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss, SiJest, SiCypress, SiWebpack, SiVite, SiDocker, SiKubernetes, SiJenkins, SiGithubactions, SiJunit5, SiTestinglibrary, SiCucumber, SiSelenium, SiPostman, SiNewrelic, SiDatadog, SiGrafana, SiPrometheus, SiSentry, SiGoogleanalytics, SiHotjar, SiContentful, SiWordpress, SiShopify, SiMagento, SiWoo, SiBigcommerce } from 'react-icons/si';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const MainContent = styled.main`
  max-width: 1400px;
  width: 100%;
  padding: 2rem;
  display: flex;
  gap: 2rem;
`;

const FilterSidebar = styled.aside`
  width: 320px;
  flex-shrink: 0;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  height: fit-content;
  position: sticky;
  top: 2rem;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const FilterIcon = styled(FaFilter)`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const FilterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.sm};
  }
`;

const FilterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ClearAllButton = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  background: transparent;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

const FilterCheckboxWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-right: ${props => props.theme.spacing.sm};
`;

const FilterCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + span {
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }

  &:checked + span:after {
    opacity: 1;
  }

  &:focus + span {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const CustomCheckbox = styled.span`
  position: relative;
  height: 18px;
  width: 18px;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  transition: all 0.2s ease;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  ${FilterCheckbox}:checked + & {
    &:after {
      display: block;
      opacity: 1;
    }
  }
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.active ? '#FFFFFF' : props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  width: 100%;

  &:hover {
    transform: translateX(4px);
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.backgroundAlt};
  }

  &:active {
    transform: translateX(2px);
  }
`;

const FilterButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  flex: 1;
`;

const FilterCount = styled.span`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.2s ease;
  min-width: 24px;
  text-align: center;

  ${FilterButton}:hover & {
    background: ${props => props.theme.colors.background};
  }
`;

const FilterSearch = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;
`;

const FilterSearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  padding-left: 2.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
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

const FilterSearchIcon = styled(FaSearch)`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const CoursesSection = styled.div`
  flex: 1;
`;

const HeaderSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  transition: all ${props => props.theme.transitions.default};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 800px;
  transition: all ${props => props.theme.transitions.default};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text};
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  background: transparent;

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled(FaSearch)`
  color: ${props => props.theme.colors.textSecondary};
  margin-right: ${props => props.theme.spacing.sm};
`;

const StatsBar = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const StatIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const CoursesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const CourseRow = styled.div<{ isLocked?: boolean }>`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;
  cursor: ${props => props.isLocked ? 'default' : 'pointer'};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: ${props => props.isLocked ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.isLocked ? props.theme.shadows.sm : props.theme.shadows.md};
  }
`;

const CourseImage = styled.div<{ category: string; isLocked?: boolean }>`
  width: 200px;
  height: 120px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => {
    switch (props.category) {
      case 'JavaScript':
        return 'linear-gradient(135deg, #F7DF1E 0%, #F0DB4F 100%)';
      case 'CSS':
        return 'linear-gradient(135deg, #264DE4 0%, #2965f1 100%)';
      case 'React':
        return 'linear-gradient(135deg, #61DAFB 0%, #282c34 100%)';
      case 'CI/CD':
        return 'linear-gradient(135deg, #F05032 0%, #f14e32 100%)';
      case 'Testing':
        return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
      case 'System Design':
        return 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)';
      case 'Security':
        return 'linear-gradient(135deg, #FFC107 0%, #FFA000 100%)';
      case 'SEO':
        return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)';
      case 'Performance':
        return 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)';
      default:
        return 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)';
    }
  }};
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: ${props => props.isLocked ? 'grayscale(0.5)' : 'none'};
  transition: all 0.3s ease;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background};
  border-radius: 16px;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.2s ease;

  svg {
    width: 40px;
    height: 40px;
    color: ${props => props.theme.colors.primary};
  }
`;

const CourseContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
`;

const CourseTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const CourseDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CourseMeta = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: auto;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const MetaIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.difficulty) {
      case 'Beginner':
        return '#4CAF50';
      case 'Intermediate':
        return '#FFC107';
      case 'Advanced':
        return '#F44336';
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: ${props => props.theme.colors.text};
  white-space: nowrap;
  height: fit-content;
`;

const CategoryBadge = styled.span`
  padding: 4px 8px;
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 2px;
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.sm};

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.theme.colors.primary};
    transition: width 0.2s ease;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.role) {
      case 'SDE1':
        return '#4CAF50';
      case 'SDE2':
        return '#2196F3';
      case 'SDE3':
        return '#9C27B0';
      case 'Frontend Specialist':
        return '#FF9800';
      case 'Frontend Architect':
        return '#F44336';
      case 'UI/UX Developer':
        return '#00BCD4';
      case 'Frontend Performance Engineer':
        return '#795548';
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: white;
  white-space: nowrap;
  height: fit-content;
`;

interface SectionTitleProps {
  isOpen: boolean;
}

interface FilterGroupProps {
  isOpen: boolean;
}

const SectionTitle = styled.h4<SectionTitleProps>`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.isOpen ? props.theme.spacing.md : 0};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
  }

  svg {
    transition: transform 0.3s ease;
    transform: rotate(${props => props.isOpen ? '180deg' : '0deg'});
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterGroup = styled.div<FilterGroupProps>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  padding: ${props => props.isOpen ? props.theme.spacing.sm : 0};
  opacity: ${props => props.isOpen ? 1 : 0};
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.primary};

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const NoResultsIllustration = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textSecondary};
  opacity: 0.5;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const NoResultsTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const NoResultsText = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 400px;
`;

const NoResultsAction = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const FilterNoResults = styled.div`
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-style: italic;
`;

const LockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.lg};
  z-index: 1;
  transition: all 0.3s ease;
`;

const LockContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  max-width: 300px;
`;

const LockIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);

    &::after {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::after {
    content: 'This course is currently under development';
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    transition: all 0.3s ease;
    pointer-events: none;
    z-index: 2;
  }

  svg {
    font-size: 24px;
    color: ${props => props.theme.colors.primary};
  }
`;

const LockTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: white;
  margin: 0;
`;

const LockedBadge = styled.span`
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: rgba(0, 0, 0, 0.6);
  color: ${props => props.theme.colors.primary};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${props => props.theme.colors.primary};

  svg {
    font-size: 12px;
  }
`;

const NotifyButton = styled.button`
  padding: 8px 16px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Footer = styled.footer`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding: 4rem 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
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
`;

const FooterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

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
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.25rem;
  transition: all 0.2s ease;

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

  svg {
    color: #e25555;
  }
`;

const LearnPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSearchQuery, setFilterSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(true);
  const [isRoleOpen, setIsRoleOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notifyStates, setNotifyStates] = useState<{ [key: string]: boolean }>({});

  // Get unique categories, difficulties, and roles
  const categories = ['all', ...new Set(learningTopics.map(topic => topic.category))];
  const difficulties = ['all', ...new Set(learningTopics.map(topic => topic.difficulty))];
  const roles = ['all', ...new Set(learningTopics.map(topic => topic.role))];

  // Filter options based on filter search query
  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(filterSearchQuery.toLowerCase())
  );
  const filteredDifficulties = difficulties.filter(difficulty => 
    difficulty.toLowerCase().includes(filterSearchQuery.toLowerCase())
  );
  const filteredRoles = roles.filter(role => 
    role.toLowerCase().includes(filterSearchQuery.toLowerCase())
  );

  const handleFilterChange = (
    value: string,
    currentSelection: string[],
    setSelection: React.Dispatch<React.SetStateAction<string[]>>,
    type: 'category' | 'difficulty' | 'role'
  ) => {
    if (value === 'all') {
      setSelection([]);
      return;
    }

    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection, value];

    setSelection(newSelection);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedRoles([]);
    setSearchQuery('');
    setFilterSearchQuery('');
  };

  // Filter topics based on selected filters and search query
  const filteredTopics = learningTopics.filter(topic => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(topic.category);
    const difficultyMatch = selectedDifficulties.length === 0 || selectedDifficulties.includes(topic.difficulty);
    const roleMatch = selectedRoles.length === 0 || selectedRoles.includes(topic.role);
    const searchMatch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       topic.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       topic.role.toLowerCase().includes(searchQuery.toLowerCase());
                       topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && difficultyMatch && roleMatch && searchMatch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'JavaScript':
        return <SiJavascript />;
      case 'CSS':
        return <FaCss3Alt />;
      case 'React':
        return <FaReact />;
      case 'CI/CD':
        return <FaGitAlt />;
      case 'Testing':
        return <SiJest />;
      case 'System Design':
        return <FaRocket />;
      case 'Security':
        return <FaShieldAlt />;
      case 'SEO':
        return <FaSearchIcon />;
      case 'Performance':
        return <FaChartLine />;
      default:
        return <FaCode />;
    }
  };

  // Simulate loading state when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategories, selectedDifficulties, selectedRoles, searchQuery, filterSearchQuery]);

  const handleNotifyClick = (courseId: string) => {
    setNotifyStates(prev => ({
      ...prev,
      [courseId]: true
    }));
    // Here you would typically make an API call to subscribe the user
    setTimeout(() => {
      setNotifyStates(prev => ({
        ...prev,
        [courseId]: false
      }));
    }, 2000);
  };

  const renderNoResults = () => (
    <NoResultsContainer>
      <NoResultsIllustration>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </NoResultsIllustration>
      <NoResultsTitle>No Courses Found</NoResultsTitle>
      <NoResultsText>
        We couldn't find any courses matching your current filters. Try adjusting your search criteria or clear all filters to see all available courses.
      </NoResultsText>
      <NoResultsAction onClick={clearAllFilters}>
        Clear All Filters
      </NoResultsAction>
    </NoResultsContainer>
  );

  const renderFilterNoResults = () => (
    <FilterNoResults>
      No matching options found
    </FilterNoResults>
  );

  const isCourseLocked = (index: number) => {
    return index >= 2; // First 2 courses are unlocked, rest are locked
  };

  return (
    <MainLayout>
      <PageContainer>
        <MainContent>
          <FilterSidebar>
            <FilterHeader>
              <FilterIcon />
              <FilterTitle>Filters</FilterTitle>
            </FilterHeader>

            <FilterActions>
              <span>Selected: {selectedCategories.length + selectedDifficulties.length + selectedRoles.length}</span>
              <ClearAllButton onClick={clearAllFilters}>
                Clear All
              </ClearAllButton>
            </FilterActions>

            <FilterSearch>
              <FilterSearchIcon />
              <FilterSearchInput
                placeholder="Search filters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </FilterSearch>

            <FilterSection>
              <SectionTitle isOpen={isCategoryOpen} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                Categories
                <FaChevronDown />
              </SectionTitle>
              <FilterGroup isOpen={isCategoryOpen}>
                {isLoading ? (
                  <LoadingSpinner>
                    <FaSpinner />
                  </LoadingSpinner>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map(category => (
                    <FilterButton
                      key={category}
                      active={selectedCategories.includes(category)}
                      onClick={() => handleFilterChange(category, selectedCategories, setSelectedCategories, 'category')}
                    >
                      <FilterButtonContent>
                        <FilterCheckboxWrapper>
                          <FilterCheckbox
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => {}}
                          />
                          <CustomCheckbox />
                        </FilterCheckboxWrapper>
                        {category === 'all' ? 'All Categories' : category}
                      </FilterButtonContent>
                      <FilterCount>
                        {category === 'all' 
                          ? learningTopics.length 
                          : learningTopics.filter(t => t.category === category).length}
                      </FilterCount>
                    </FilterButton>
                  ))
                ) : (
                  renderFilterNoResults()
                )}
              </FilterGroup>
            </FilterSection>

            <FilterSection>
              <SectionTitle isOpen={isDifficultyOpen} onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}>
                Difficulty
                <FaChevronDown />
              </SectionTitle>
              <FilterGroup isOpen={isDifficultyOpen}>
                {isLoading ? (
                  <LoadingSpinner>
                    <FaSpinner />
                  </LoadingSpinner>
                ) : filteredDifficulties.length > 0 ? (
                  filteredDifficulties.map(difficulty => (
                    <FilterButton
                      key={difficulty}
                      active={selectedDifficulties.includes(difficulty)}
                      onClick={() => handleFilterChange(difficulty, selectedDifficulties, setSelectedDifficulties, 'difficulty')}
                    >
                      <FilterButtonContent>
                        <FilterCheckboxWrapper>
                          <FilterCheckbox
                            type="checkbox"
                            checked={selectedDifficulties.includes(difficulty)}
                            onChange={() => {}}
                          />
                          <CustomCheckbox />
                        </FilterCheckboxWrapper>
                        {difficulty === 'all' ? 'All Levels' : difficulty}
                      </FilterButtonContent>
                      <FilterCount>
                        {difficulty === 'all'
                          ? learningTopics.length
                          : learningTopics.filter(t => t.difficulty === difficulty).length}
                      </FilterCount>
                    </FilterButton>
                  ))
                ) : (
                  renderFilterNoResults()
                )}
              </FilterGroup>
            </FilterSection>

            <FilterSection>
              <SectionTitle isOpen={isRoleOpen} onClick={() => setIsRoleOpen(!isRoleOpen)}>
                Role
                <FaChevronDown />
              </SectionTitle>
              <FilterGroup isOpen={isRoleOpen}>
                {isLoading ? (
                  <LoadingSpinner>
                    <FaSpinner />
                  </LoadingSpinner>
                ) : filteredRoles.length > 0 ? (
                  filteredRoles.map(role => (
                    <FilterButton
                      key={role}
                      active={selectedRoles.includes(role)}
                      onClick={() => handleFilterChange(role, selectedRoles, setSelectedRoles, 'role')}
                    >
                      <FilterButtonContent>
                        <FilterCheckboxWrapper>
                          <FilterCheckbox
                            type="checkbox"
                            checked={selectedRoles.includes(role)}
                            onChange={() => {}}
                          />
                          <CustomCheckbox />
                        </FilterCheckboxWrapper>
                        {role === 'all' ? 'All Roles' : role}
                      </FilterButtonContent>
                      <FilterCount>
                        {role === 'all'
                          ? learningTopics.length
                          : learningTopics.filter(t => t.role === role).length}
                      </FilterCount>
                    </FilterButton>
                  ))
                ) : (
                  renderFilterNoResults()
                )}
              </FilterGroup>
            </FilterSection>
          </FilterSidebar>

          <CoursesSection>
            <HeaderSection>
              <Title>Learn Frontend Development</Title>
              <Description>
                Master modern frontend technologies with our comprehensive learning paths.
                Start with the basics and progress to advanced concepts at your own pace.
              </Description>

              <SearchBar>
                <SearchIcon />
                <SearchInput
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchBar>

              <StatsBar>
                <StatItem>
                  <StatIcon><FaStar /></StatIcon>
                  <span>4.8 Average Rating</span>
                </StatItem>
                <StatItem>
                  <StatIcon><FaClock /></StatIcon>
                  <span>50+ Hours of Content</span>
                </StatItem>
                <StatItem>
                  <StatIcon><FaUsers /></StatIcon>
                  <span>10k+ Active Learners</span>
                </StatItem>
              </StatsBar>
            </HeaderSection>

            {isLoading ? (
              <LoadingSpinner>
                <FaSpinner />
              </LoadingSpinner>
            ) : filteredTopics.length > 0 ? (
              <CoursesGrid>
                {filteredTopics.map((topic, index) => {
                  const isLocked = isCourseLocked(index);
                  return (
                    <CourseRow key={topic.id} isLocked={isLocked}>
                      <CourseImage category={topic.category} isLocked={isLocked}>
                        <IconWrapper>
                          {getCategoryIcon(topic.category)}
                        </IconWrapper>
                      </CourseImage>
                      <CourseContent>
                        <CourseHeader>
                          <CourseTitle>{topic.title}</CourseTitle>
                          <BadgeContainer>
                            <DifficultyBadge difficulty={topic.difficulty}>
                              {topic.difficulty}
                            </DifficultyBadge>
                            <RoleBadge role={topic.role}>
                              {topic.role}
                            </RoleBadge>
                            {isLocked && (
                              <LockedBadge>
                                <FaLock />
                                Coming Soon
                              </LockedBadge>
                            )}
                          </BadgeContainer>
                        </CourseHeader>
                        <CourseDescription>{topic.description}</CourseDescription>
                        <CourseMeta>
                          <MetaItem>
                            <MetaIcon><FaClock /></MetaIcon>
                            <span>{topic.estimatedTime}</span>
                          </MetaItem>
                          <MetaItem>
                            <MetaIcon><FaBook /></MetaIcon>
                            <span>{topic.totalLessons} Lessons</span>
                          </MetaItem>
                          <CategoryBadge>{topic.category}</CategoryBadge>
                        </CourseMeta>
                        <ProgressBar progress={topic.progress} />
                      </CourseContent>
                      {isLocked && (
                        <LockOverlay>
                          <LockContent>
                            <LockIcon>
                              <FaLock />
                            </LockIcon>
                            <LockTitle>Coming Soon</LockTitle>
                          </LockContent>
                        </LockOverlay>
                      )}
                    </CourseRow>
                  );
                })}
              </CoursesGrid>
            ) : (
              renderNoResults()
            )}
          </CoursesSection>
        </MainContent>
      </PageContainer>
    </MainLayout>
  );
};

export default LearnPage; 