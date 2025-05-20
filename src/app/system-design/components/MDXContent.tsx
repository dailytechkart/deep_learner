'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import styled from 'styled-components';

const MDXContainer = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  font-size: ${props => props.theme.typography.body1.fontSize};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme.colors.text};
    margin: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.md};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  }

  p {
    margin: ${props => props.theme.spacing.md} 0;
    color: ${props => props.theme.colors.text};
  }

  code {
    background: ${props => props.theme.colors.code.background};
    color: ${props => props.theme.colors.code.text};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-family: ${props => props.theme.fonts.code};
    font-size: 0.9em;
  }

  pre {
    background: ${props => props.theme.colors.code.background};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.md} 0;
    border: 1px solid ${props => props.theme.colors.border};
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.md} 0;
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.textSecondary};
  }

  ul,
  ol {
    margin: ${props => props.theme.spacing.md} 0;
    padding-left: ${props => props.theme.spacing.xl};
    color: ${props => props.theme.colors.text};
  }

  li {
    margin: ${props => props.theme.spacing.xs} 0;
  }

  hr {
    border: none;
    border-top: 1px solid ${props => props.theme.colors.border};
    margin: ${props => props.theme.spacing.md} 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${props => props.theme.spacing.md} 0;
  }

  th,
  td {
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
      color: ${props => props.theme.colors.primaryDark};
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
