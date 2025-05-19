import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../TailwindComponents';

interface WhatToCoverSectionProps {
  timeLimit: number;
  points: {
    title: string;
    description: string;
    examples: string[];
  }[];
}

export const WhatToCoverSection: React.FC<WhatToCoverSectionProps> = ({ timeLimit, points }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>What to Cover in Your Answer</CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Based on {timeLimit} minutes time limit
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {points.map((point, index) => (
            <div key={index} className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-600 mb-3">
                {point.description}
              </p>
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 