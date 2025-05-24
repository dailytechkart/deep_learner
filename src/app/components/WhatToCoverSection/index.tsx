import React from 'react';
import styled from 'styled-components';

interface WhatToCoverSectionProps {
  timeLimit: number;
  points: {
    title: string;
    description: string;
    examples: string[];
  }[];
}

const Card = styled.div`
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

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.h4.fontSize};
  font-weight: ${props => props.theme.typography.h4.fontWeight};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const TimeLimit = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
`;

const PointsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const PointItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
    transform: translateX(${props => props.theme.spacing.xs});
  }
`;

const PointNumber = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
`;

const PointContent = styled.div`
  flex: 1;
`;

const PointTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs};
`;

const PointDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

const ExamplesContainer = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const ExamplesTitle = styled.h5`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.sm};
`;

const ExamplesList = styled.ul`
  list-style: disc;
  padding-left: ${props => props.theme.spacing.lg};
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const ExampleItem = styled.li`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

export const WhatToCoverSection: React.FC<WhatToCoverSectionProps> = ({ timeLimit, points }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What We&apos;ll Cover</CardTitle>
        <TimeLimit>
          <span>⏱️</span>
          {timeLimit} minutes
        </TimeLimit>
      </CardHeader>
      <CardContent>
        <PointsList>
          {points.map((point, index) => (
            <PointItem key={index}>
              <PointNumber>{index + 1}</PointNumber>
              <PointContent>
                <PointTitle>{point.title}</PointTitle>
                <PointDescription>{point.description}</PointDescription>
                {point.examples.length > 0 && (
                  <ExamplesContainer>
                    <ExamplesTitle>Examples:</ExamplesTitle>
                    <ExamplesList>
                      {point.examples.map((example, idx) => (
                        <ExampleItem key={idx}>{example}</ExampleItem>
                      ))}
                    </ExamplesList>
                  </ExamplesContainer>
                )}
              </PointContent>
            </PointItem>
          ))}
        </PointsList>
      </CardContent>
    </Card>
  );
};
