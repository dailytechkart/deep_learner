import React from 'react';
import Link from 'next/link';
import { Problem } from '../data/problems';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  TagContainer,
  Tag,
  DifficultyBadge,
  TimeEstimate,
  CompanyContainer,
  CompanyLogo,
  KeyConceptsContainer,
  KeyConcept,
  PremiumBadge,
  NewBadge,
  FeaturedBadge,
} from '../styles/CardStyles';

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#2ECC71';
      case 'Medium':
        return '#F1C40F';
      case 'Hard':
        return '#E74C3C';
      default:
        return '#666666';
    }
  };

  return (
    <Link href={problem.link} passHref>
      <Card>
        <CardHeader>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <div>
              <CardTitle>{problem.title}</CardTitle>
              <CardDescription>{problem.description}</CardDescription>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {problem.isPremium && <PremiumBadge>Premium</PremiumBadge>}
              {problem.isNew && <NewBadge>New</NewBadge>}
              {problem.isFeatured && <FeaturedBadge>Featured</FeaturedBadge>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <KeyConceptsContainer>
            {problem.keyConcepts.slice(0, 3).map((concept, index) => (
              <KeyConcept key={index}>{concept}</KeyConcept>
            ))}
            {problem.keyConcepts.length > 3 && (
              <KeyConcept>+{problem.keyConcepts.length - 3} more</KeyConcept>
            )}
          </KeyConceptsContainer>
          <TagContainer>
            {problem.tags.slice(0, 4).map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
            {problem.tags.length > 4 && <Tag>+{problem.tags.length - 4} more</Tag>}
          </TagContainer>
        </CardContent>
        <CardFooter>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <DifficultyBadge color={getDifficultyColor(problem.difficulty)}>
                {problem.difficulty}
              </DifficultyBadge>
              <TimeEstimate>{problem.timeEstimate}</TimeEstimate>
            </div>
            <CompanyContainer>
              {problem.companies.slice(0, 3).map((company, index) => (
                <CompanyLogo key={index} title={company}>
                  {company.charAt(0)}
                </CompanyLogo>
              ))}
              {problem.companies.length > 3 && (
                <CompanyLogo title={`+${problem.companies.length - 3} more companies`}>
                  +{problem.companies.length - 3}
                </CompanyLogo>
              )}
            </CompanyContainer>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
