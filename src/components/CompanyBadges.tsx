import Image from 'next/image';
import styled from 'styled-components';

interface Company {
  name: string;
  logo: string;
  alt?: string;
}

interface CompanyBadgesProps {
  companies: Company[];
  className?: string;
}

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;
`;

const CompanyName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

export const CompanyBadges = ({ companies, className }: CompanyBadgesProps) => {
  return (
    <BadgesContainer className={className}>
      {companies.map(company => (
        <Badge key={company.name}>
          <LogoContainer>
            <Image
              src={company.logo}
              alt={company.alt || `${company.name} logo`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </LogoContainer>
          <CompanyName>{company.name}</CompanyName>
        </Badge>
      ))}
    </BadgesContainer>
  );
};
