import type { MDXComponents } from 'mdx/types';
import styled from 'styled-components';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: styled.h1`
      font-size: ${props => props.theme.typography.fontSize.xl};
      font-weight: ${props => props.theme.typography.fontWeight.bold};
      color: ${props => props.theme.colors.text};
      margin: ${props => props.theme.spacing.xl} 0 ${props => props.theme.spacing.lg};
    `,
    h2: styled.h2`
      font-size: ${props => props.theme.typography.fontSize.lg};
      font-weight: ${props => props.theme.typography.fontWeight.semibold};
      color: ${props => props.theme.colors.text};
      margin: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.md};
    `,
    h3: styled.h3`
      font-size: ${props => props.theme.typography.fontSize.md};
      font-weight: ${props => props.theme.typography.fontWeight.semibold};
      color: ${props => props.theme.colors.text};
      margin: ${props => props.theme.spacing.md} 0 ${props => props.theme.spacing.sm};
    `,
    p: styled.p`
      font-size: ${props => props.theme.typography.fontSize.md};
      line-height: 1.6;
      color: ${props => props.theme.colors.text};
      margin-bottom: ${props => props.theme.spacing.md};
    `,
    ul: styled.ul`
      list-style: disc;
      margin: ${props => props.theme.spacing.md} 0;
      padding-left: ${props => props.theme.spacing.xl};
    `,
    ol: styled.ol`
      list-style: decimal;
      margin: ${props => props.theme.spacing.md} 0;
      padding-left: ${props => props.theme.spacing.xl};
    `,
    li: styled.li`
      margin-bottom: ${props => props.theme.spacing.sm};
      line-height: 1.6;
    `,
    pre: styled.pre`
      background: ${props => props.theme.colors.backgroundAlt};
      padding: ${props => props.theme.spacing.md};
      border-radius: ${props => props.theme.borderRadius.md};
      overflow-x: auto;
      margin: ${props => props.theme.spacing.md} 0;
    `,
    code: styled.code`
      font-family: 'Fira Code', monospace;
      font-size: ${props => props.theme.typography.fontSize.sm};
      background: ${props => props.theme.colors.backgroundAlt};
      padding: 2px 4px;
      border-radius: ${props => props.theme.borderRadius.sm};
    `,
    blockquote: styled.blockquote`
      border-left: 4px solid ${props => props.theme.colors.primary};
      margin: ${props => props.theme.spacing.md} 0;
      padding: ${props => props.theme.spacing.md};
      background: ${props => props.theme.colors.backgroundAlt};
      border-radius: ${props => props.theme.borderRadius.md};
    `,
    a: styled.a`
      color: ${props => props.theme.colors.primary};
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: ${props => props.theme.colors.primaryDark};
        text-decoration: underline;
      }
    `,
    img: styled.img`
      max-width: 100%;
      height: auto;
      border-radius: ${props => props.theme.borderRadius.md};
      margin: ${props => props.theme.spacing.md} 0;
    `,
    table: styled.table`
      width: 100%;
      border-collapse: collapse;
      margin: ${props => props.theme.spacing.md} 0;
    `,
    th: styled.th`
      background: ${props => props.theme.colors.backgroundAlt};
      padding: ${props => props.theme.spacing.sm};
      text-align: left;
      font-weight: ${props => props.theme.typography.fontWeight.semibold};
      border: 1px solid ${props => props.theme.colors.border};
    `,
    td: styled.td`
      padding: ${props => props.theme.spacing.sm};
      border: 1px solid ${props => props.theme.colors.border};
    `,
    hr: styled.hr`
      border: none;
      border-top: 1px solid ${props => props.theme.colors.border};
      margin: ${props => props.theme.spacing.xl} 0;
    `,
    ...components,
  };
}
