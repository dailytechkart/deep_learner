import React from 'react';
import Link from 'next/link';
import { Badge } from '../Badge';

interface ProblemCardProps {
  problem: {
    name: string;
    slug: string;
    company_asked: string[];
    time_limit: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    roles: string[];
    tags: string[];
  };
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <Link href={`/system-design/problems/${problem.slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{problem.name}</h3>
          <Badge className={difficultyColors[problem.difficulty]}>{problem.difficulty}</Badge>
        </div>

        <div className="space-y-4">
          {/* Companies */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Companies Asked</h4>
            <div className="flex flex-wrap gap-2">
              {problem.company_asked.map((company, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Time Limit */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Time Limit</h4>
            <div className="flex items-center space-x-2">
              <span className="text-lg">⏱️</span>
              <span className="text-gray-700">{problem.time_limit} minutes</span>
            </div>
          </div>

          {/* Roles */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Roles</h4>
            <div className="flex flex-wrap gap-2">
              {problem.roles.map((role, index) => (
                <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
