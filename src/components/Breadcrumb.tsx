import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styled from 'styled-components';

interface BreadcrumbProps {
  className?: string;
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => (props.$isActive ? props.theme.colors.text : props.theme.colors.textSecondary)};
  font-weight: ${props => (props.$isActive ? '500' : '400')};
  text-decoration: none;

  &:hover {
    color: ${props =>
      props.$isActive ? props.theme.colors.text : props.theme.colors.textSecondary};
  }
`;

const Separator = styled(ChevronRight)`
  width: 1rem;
  height: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0.5rem;
`;

export const Breadcrumb = ({ className }: BreadcrumbProps) => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = (pathname ?? '').split('/').filter(Boolean);
    const breadcrumbs = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      return { href, label };
    });

    return [{ href: '/', label: 'Home' }, ...breadcrumbs];
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Nav className={className} aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem key={breadcrumb.href}>
          {index > 0 && <Separator />}
          <StyledLink href={breadcrumb.href} $isActive={index === breadcrumbs.length - 1}>
            {breadcrumb.label}
          </StyledLink>
        </BreadcrumbItem>
      ))}
    </Nav>
  );
};
