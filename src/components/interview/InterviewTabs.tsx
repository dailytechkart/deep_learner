import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { FaCode, FaLaptopCode } from 'react-icons/fa';

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: 1rem;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props =>
    props.isActive
      ? props.theme.typography.fontWeight.bold
      : props.theme.typography.fontWeight.normal};
  color: ${props =>
    props.isActive ? props.theme.colors.primary : props.theme.colors.textSecondary};
  background: ${props => (props.isActive ? props.theme.colors.primary + '10' : 'transparent')};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary + '10'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => (props.isActive ? props.theme.colors.primary : 'transparent')};
    transition: all 0.2s ease;
  }
`;

type ProblemType = 'dsa' | 'machine-coding';

interface InterviewTabsProps {
  problemType: ProblemType;
  onProblemTypeChange: (type: ProblemType) => void;
  dsaCount: number;
  machineCodingCount: number;
}

const InterviewTabs: React.FC<InterviewTabsProps> = memo(
  ({ problemType, onProblemTypeChange, dsaCount, machineCodingCount }) => {
    const handleDsaClick = useCallback(() => onProblemTypeChange('dsa'), [onProblemTypeChange]);
    const handleMachineCodingClick = useCallback(
      () => onProblemTypeChange('machine-coding'),
      [onProblemTypeChange]
    );

    return (
      <TabContainer>
        <Tab isActive={problemType === 'dsa'} onClick={handleDsaClick}>
          <FaCode />
          DSA Problems ({dsaCount})
        </Tab>
        <Tab isActive={problemType === 'machine-coding'} onClick={handleMachineCodingClick}>
          <FaLaptopCode />
          Machine Coding Problems ({machineCodingCount})
        </Tab>
      </TabContainer>
    );
  }
);

InterviewTabs.displayName = 'InterviewTabs';

export { InterviewTabs };
