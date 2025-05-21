import React from 'react';
import styled from 'styled-components';

interface Activity {
  id: string;
  type: 'problem' | 'topic' | 'achievement';
  title: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'failed';
}

interface RecentActivityProps {
  activities: Activity[];
}

const Card = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.h3.fontSize};
  font-weight: ${props => props.theme.typography.h3.fontWeight};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const CardContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.backgroundHover};
  }
`;

const ActivityIcon = styled.span`
  font-size: 1.25rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  font-size: ${props => props.theme.typography.body2.fontSize};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs};
`;

const ActivityTimestamp = styled.p`
  font-size: ${props => props.theme.typography.caption.fontSize};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
`;

const ActivityStatus = styled.span<{ status: Activity['status'] }>`
  font-size: ${props => props.theme.typography.body2.fontSize};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => {
    switch (props.status) {
      case 'completed':
        return props.theme.colors.status.success;
      case 'in_progress':
        return props.theme.colors.status.warning;
      case 'failed':
        return props.theme.colors.status.error;
      default:
        return props.theme.colors.textSecondary;
    }
  }};
`;

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in_progress':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '•';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityList>
          {activities.map(activity => (
            <ActivityItem key={activity.id}>
              <ActivityIcon>{getStatusIcon(activity.status)}</ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTimestamp>{activity.timestamp}</ActivityTimestamp>
              </ActivityContent>
              <ActivityStatus status={activity.status}>
                {activity.status.replace('_', ' ')}
              </ActivityStatus>
            </ActivityItem>
          ))}
        </ActivityList>
      </CardContent>
    </Card>
  );
};
