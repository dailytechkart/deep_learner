import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const CardFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding-top: 1rem;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const DifficultyBadge = styled.span<{ color: string }>`
  background-color: ${({ color }) => color}20;
  color: ${({ color }) => color};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const TimeEstimate = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export const CompanyContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CompanyLogo = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const KeyConceptsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const KeyConcept = styled.span`
  background-color: ${({ theme }) => theme.colors.primary}10;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const PremiumBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.accent3}20;
  color: ${({ theme }) => theme.colors.accent3};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const NewBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.accent2}20;
  color: ${({ theme }) => theme.colors.accent2};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const FeaturedBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.accent1}20;
  color: ${({ theme }) => theme.colors.accent1};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
