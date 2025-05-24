'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Layout,
  Section,
  SectionHeader,
  SectionTitle,
  SectionContent,
  Grid,
} from '@/app/components/layout';
import Link from 'next/link';
import {
  PageContainer,
  MainContent,
  Title,
  Description,
  Content,
} from '../../components/StyledComponents';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import MainLayout from '@/components/MainLayout';
import { db } from '@/app/lib/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const Card = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  transition: all ${props => props.theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.h3.fontSize};
  font-weight: ${props => props.theme.typography.h3.fontWeight};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.body2.fontSize};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex: 1;
`;

const CardLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.secondary};
    gap: ${props => props.theme.spacing.md};
  }
`;

const Badge = styled.span`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.md};
  display: inline-block;
`;

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

export default async function SystemDesignPatternsPage() {
  const patterns = await getPatterns();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">System Design Patterns</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patterns.map(pattern => (
            <div key={pattern.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{pattern.name}</h2>
              <p className="text-gray-600 mb-4">{pattern.description}</p>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Category:</span> {pattern.category}
                </div>
                <div>
                  <span className="font-medium">Complexity:</span> {pattern.complexity}
                </div>
                <div>
                  <span className="font-medium">Use Cases:</span>
                  <ul className="list-disc list-inside ml-2">
                    {pattern.use_cases.map((useCase, index) => (
                      <li key={index}>{useCase}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-medium">Examples:</span>
                  <ul className="list-disc list-inside ml-2">
                    {pattern.examples.map((example, index) => (
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
}
