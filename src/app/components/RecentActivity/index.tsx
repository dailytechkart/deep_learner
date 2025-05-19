import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../TailwindComponents';

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

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

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
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <span className="text-lg">{getStatusIcon(activity.status)}</span>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(activity.status)}`}>
                {activity.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 