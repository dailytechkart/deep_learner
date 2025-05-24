import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const HeaderSectionContainer = styled.header`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  transition: all ${props => props.theme.transitions.default};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize['2xl']};
  }
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 800px;
  transition: all ${props => props.theme.transitions.default};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.base};
    margin-bottom: 1.5rem;
  }
`;

const SearchBar = styled.form`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};

  @media (max-width: 768px) {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: ${props => props.theme.typography.fontSize.base};
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

interface HeaderSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ searchQuery, onSearchChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <HeaderSectionContainer>
      <Title>Learn Frontend Development</Title>
      <Description>
        Master modern frontend technologies with our comprehensive learning paths. Start with the
        basics and progress to advanced concepts at your own pace.
      </Description>
      <SearchBar onSubmit={handleSubmit} role="search">
        <SearchIcon aria-hidden="true" />
        <SearchInput
          type="search"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Search courses"
        />
      </SearchBar>
    </HeaderSectionContainer>
  );
};
