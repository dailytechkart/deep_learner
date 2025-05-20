'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FaChevronRight, FaHome } from 'react-icons/fa';

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
  padding: 1rem 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text.secondary};

  &:last-child {
    color: ${props => props.theme.colors.text.primary};
    font-weight: 500;
  }
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.text.secondary};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Separator = styled(FaChevronRight)`
  margin: 0 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const HomeIcon = styled(FaHome)`
  font-size: 1rem;
  margin-right: 0.25rem;
`;

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <BreadcrumbsContainer>
      <BreadcrumbItem>
        <StyledLink href="/">
          <HomeIcon />
          Home
        </StyledLink>
      </BreadcrumbItem>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Separator />
          <BreadcrumbItem>
            {item.href ? <StyledLink href={item.href}>{item.label}</StyledLink> : item.label}
          </BreadcrumbItem>
        </React.Fragment>
      ))}
    </BreadcrumbsContainer>
  );
}
