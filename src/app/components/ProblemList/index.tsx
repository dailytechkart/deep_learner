import React from 'react';
import { ProblemCard } from '../ProblemCard';
import { Container, Section, SectionHeader, SectionTitle } from '../TailwindComponents';

interface Problem {
  name: string;
  slug: string;
  company_asked: string[];
  time_limit: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  roles: string[];
  tags: string[];
}

interface ProblemListProps {
  problems: Problem[];
  title?: string;
}

export const ProblemList: React.FC<ProblemListProps> = ({ problems, title = 'System Design Problems' }) => {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <ProblemCard key={problem.slug} problem={problem} />
          ))}
        </div>
      </Container>
    </Section>
  );
}; 