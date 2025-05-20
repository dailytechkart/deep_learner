import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  width: 100%;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 0.5rem;
`;

const ProgressLabel = styled.span`
  color: ${props => props.theme.colors.text.DEFAULT};
`;

const ProgressValue = styled.span`
  color: ${props => props.theme.colors.text.secondary};
`;

const ProgressTrack = styled.div`
  height: 0.5rem;
  background-color: ${props => props.theme.colors.background.alt};
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 9999px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({ progress, label, className }: ProgressBarProps) {
  return (
    <ProgressContainer className={className}>
      <ProgressHeader>
        {label && <ProgressLabel>{label}</ProgressLabel>}
        <ProgressValue>{Math.round(progress)}%</ProgressValue>
      </ProgressHeader>
      <ProgressTrack>
        <ProgressFill progress={progress} />
      </ProgressTrack>
    </ProgressContainer>
  );
}
