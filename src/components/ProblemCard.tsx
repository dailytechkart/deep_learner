import { Problem } from '@/types/problem';
import Link from 'next/link';

interface ProblemCardProps {
  problem: Problem;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

export default function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link href={problem.url}>
      <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${difficultyColors[problem.difficulty]}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-gray-600 mb-3">{problem.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {problem.topic}
          </span>
          {problem.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {problem.companies.map(company => (
            <span
              key={company}
              className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
