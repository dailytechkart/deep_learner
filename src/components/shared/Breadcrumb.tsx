import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md} 0;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};

  &:not(:last-child) {
    margin-right: ${props => props.theme.spacing.sm};
  }
`;

const BreadcrumbLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &[aria-current='page'] {
    color: ${props => props.theme.colors.text};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    pointer-events: none;
  }
`;

const Separator = styled(FaChevronRight)`
  font-size: 0.75rem;
  margin: 0 ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
`;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [], showHome = true }) => {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if no items provided
  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs(pathname, showHome);

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL}${item.href}`,
        name: item.label,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BreadcrumbContainer aria-label="Breadcrumb">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={item.href}>
              <BreadcrumbLink
                href={item.href}
                aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </BreadcrumbLink>
              {index < breadcrumbItems.length - 1 && <Separator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </BreadcrumbContainer>
    </>
  );
};

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string, showHome: boolean): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  if (showHome) {
    breadcrumbs.push({
      label: 'Home',
      href: '/',
    });
  }

  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    breadcrumbs.push({
      label: formatBreadcrumbLabel(path),
      href: currentPath,
    });
  });

  return breadcrumbs;
}

// Helper function to format breadcrumb labels
function formatBreadcrumbLabel(path: string): string {
  return path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
