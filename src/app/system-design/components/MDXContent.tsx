'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import styled from 'styled-components';

const MDXContainer = styled.div`
  h1 {
    font-size: ${props => props.theme.typography.fontSize.xl};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
    margin: ${props => props.theme.spacing.xl} 0 ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.text};
  }

  h2 {
    font-size: ${props => props.theme.typography.fontSize.lg};
    font-weight: ${props => props.theme.typography.fontWeight.semibold};
    margin: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }

  h3 {
    font-size: ${props => props.theme.typography.fontSize.md};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    margin: ${props => props.theme.spacing.md} 0 ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: 1.6;
    color: ${props => props.theme.colors.text};
  }

  ul, ol {
    margin: ${props => props.theme.spacing.md} 0;
    padding-left: ${props => props.theme.spacing.xl};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.sm};
    line-height: 1.6;
    color: ${props => props.theme.colors.text};
  }

  pre {
    background: ${props => props.theme.colors.backgroundAlt};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.md} 0;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: ${props => props.theme.typography.fontSize.sm};
    background: ${props => props.theme.colors.backgroundAlt};
    padding: 2px 4px;
    border-radius: ${props => props.theme.borderRadius.sm};
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.md} 0;
    color: ${props => props.theme.colors.textSecondary};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${props => props.theme.spacing.md} 0;
  }

  th, td {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border: 1px solid ${props => props.theme.colors.border};
    text-align: left;
  }

  th {
    background: ${props => props.theme.colors.backgroundAlt};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
  }

  tr:nth-child(even) {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.md};
    margin: ${props => props.theme.spacing.md} 0;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.secondary};
      text-decoration: underline;
    }
  }
`;

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXContainer>
      <MDXRemote source={source} />
    </MDXContainer>
  );
} 