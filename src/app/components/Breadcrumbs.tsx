import styled from 'styled-components';
import Link from 'next/link';

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const BreadcrumbList = styled.ol`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};

  &:not(:last-child)::after {
    content: '/';
    margin: 0 ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const BreadcrumbLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &[aria-current="page"] {
    color: ${props => props.theme.colors.text};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    pointer-events: none;
  }
`;

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={item.href}>
            <BreadcrumbLink
              href={item.href}
              aria-current={index === items.length - 1 ? 'page' : undefined}
            >
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
} 