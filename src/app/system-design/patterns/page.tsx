'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { db } from '@/app/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

interface SystemDesignPattern {
  id: string;
  name: string;
  description: string;
  category: string;
  complexity: string;
  use_cases: string[];
  examples: string[];
  created_at: string;
  updated_at: string;
}

interface Pattern {
  id: string;
  name: string;
  description: string;
  useCases: string[];
  examples: string[];
}

async function getPatterns(): Promise<SystemDesignPattern[]> {
  try {
    const patternsSnapshot = await getDocs(collection(db, 'system_design_patterns'));
    return patternsSnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as SystemDesignPattern
    );
  } catch (error) {
    console.error('Error fetching patterns:', error);
    return [];
  }
}

const SystemDesignPatternsPage = () => {
  const [data, setData] = useState<Pattern[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patterns = await getPatterns();
        setData(
          patterns.map(pattern => ({
            id: pattern.id,
            name: pattern.name,
            description: pattern.description,
            useCases: pattern.use_cases,
            examples: pattern.examples,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No patterns found</div>;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">System Design Patterns</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((pattern: Pattern) => (
            <div key={pattern.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{pattern.name}</h2>
              <p className="text-gray-600 mb-4">{pattern.description}</p>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Use Cases:</span>
                  <ul className="list-disc list-inside ml-2">
                    {pattern.useCases.map((useCase: string, index: number) => (
                      <li key={index}>{useCase}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-medium">Examples:</span>
                  <ul className="list-disc list-inside ml-2">
                    {pattern.examples.map((example: string, index: number) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default SystemDesignPatternsPage;
