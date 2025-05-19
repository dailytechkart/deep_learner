import React from 'react';
import Link from 'next/link';
import { ProgressBar } from '../TailwindComponents';

interface TopicCardProps {
  topic: {
    id: string;
    title: string;
    description: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
  };
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <Link href={`/topics/${topic.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{topic.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[topic.difficulty]}`}>
            {topic.difficulty}
          </span>
        </div>

        <div className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Progress</span>
              <span className="text-sm font-medium text-gray-700">{topic.progress}%</span>
            </div>
            <ProgressBar progress={topic.progress} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{topic.completedLessons}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{topic.totalLessons}</p>
              <p className="text-sm text-gray-500">Total Lessons</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{topic.estimatedTime}</p>
              <p className="text-sm text-gray-500">Est. Time</p>
            </div>
          </div>

          {/* Category */}
          <div>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {topic.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}; 