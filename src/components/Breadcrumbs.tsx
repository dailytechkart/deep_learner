'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const BreadcrumbsContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
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
  color: ${props => props.theme.colors.textSecondary};

  &:last-child {
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }

  &:not(:last-child)::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 0 ${props => props.theme.spacing.sm};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Separator = styled(FaChevronRight)`
  margin: 0 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const HomeIcon = styled(FaHome)`
  font-size: 1rem;
  margin-right: 0.25rem;
`;

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <BreadcrumbsContainer>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <HomeIcon />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              item.label
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbsContainer>
  );
};
