import React from 'react';
import styled from 'styled-components';

interface WhatToCoverListProps {
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
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.h4.fontSize};
  font-weight: ${props => props.theme.typography.h4.fontWeight};
  color: ${props => props.theme.colors.text};
  margin: 0;
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

export const WhatToCoverList: React.FC<WhatToCoverListProps> = ({ points }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Points to Cover</CardTitle>
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
                  <div className="bg-gray-50 rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Examples:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {point.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </PointContent>
            </PointItem>
          ))}
        </PointsList>
      </CardContent>
    </Card>
  );
};
