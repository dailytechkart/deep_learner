'use client';

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FaCheckCircle, FaCircle, FaDotCircle, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Position,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Handle,
  NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import mermaid from 'mermaid';

const NODE_COLOR = '#fffbe6';
const NODE_BORDER = '#f7c948';
const NODE_TEXT = '#222';
const CONNECTOR_COLOR = '#bfcfff';

const RoleTag = styled.span`
  background: #e3e8ff;
  color: #3a3a7c;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 0.78em;
  font-weight: 500;
  margin-right: 4px;
  margin-bottom: 2px;
  display: inline-block;
  border: none;
  letter-spacing: 0.01em;
`;

type RoadmapNode = {
  id: string;
  label: string;
  description: string;
  roles: string[];
  status?: 'check' | 'alt' | 'order';
  children?: RoadmapNode[];
};

const roles = ['SDE1', 'SDE2', 'SDE3', 'Senior'];

const roadmapData: RoadmapNode[] = [
  {
    id: 'html',
    label: 'HTML & Accessibility',
    description: 'Learn HTML5, semantic tags, accessibility basics, ARIA.',
    roles: ['SDE1'],
    children: [
      {
        id: 'forms',
        label: 'Forms & Validation',
        description: 'Form elements, validation, accessibility.',
        roles: ['SDE1'],
        children: [
          {
            id: 'form-events',
            label: 'Form Events',
            description: 'onChange, onSubmit, event handling.',
            roles: ['SDE1'],
          },
          {
            id: 'custom-validation',
            label: 'Custom Validation',
            description: 'Custom rules, error messages, UX.',
            roles: ['SDE2'],
          },
        ],
      },
      {
        id: 'seo',
        label: 'SEO Basics',
        description: 'Meta tags, Open Graph, best practices.',
        roles: ['SDE2'],
      },
    ],
  },
  {
    id: 'css',
    label: 'CSS & Responsive Design',
    description: 'CSS basics, Flexbox, Grid, media queries, preprocessors.',
    roles: ['SDE1'],
    children: [
      {
        id: 'frameworks',
        label: 'CSS Frameworks',
        description: 'Bootstrap, Tailwind, Material UI.',
        roles: ['SDE1', 'SDE2'],
        children: [
          {
            id: 'tailwind-plugins',
            label: 'Tailwind Plugins',
            description: 'Typography, forms, custom plugins.',
            roles: ['SDE2'],
          }
        ]
      },
      {
        id: 'architecture',
        label: 'CSS Architecture',
        description: 'BEM, OOCSS, CSS-in-JS.',
        roles: ['SDE2'],
      },
    ],
  },
  {
    id: 'js',
    label: 'JavaScript (ES6+)',
    description: 'Syntax, DOM, fetch, async/await, modules.',
    roles: ['SDE1'],
    children: [
      {
        id: 'patterns',
        label: 'JS Patterns',
        description: 'Closures, currying, prototypes, OOP, functional.',
        roles: ['SDE2'],
        children: [
          {
            id: 'oop',
            label: 'OOP in JS',
            description: 'Classes, inheritance, encapsulation.',
            roles: ['SDE2'],
          },
          {
            id: 'functional',
            label: 'Functional Programming',
            description: 'Pure functions, immutability, map/filter/reduce.',
            roles: ['SDE2', 'SDE3'],
          },
        ]
      },
      {
        id: 'ts',
        label: 'TypeScript',
        description: 'Types, interfaces, generics, utility types.',
        roles: ['SDE2', 'SDE3'],
      },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frontend Frameworks',
    description: 'React, Vue, Angular, Svelte.',
    roles: ['SDE2'],
    children: [
      {
        id: 'state',
        label: 'State Management',
        description: 'Redux, Context, MobX, Zustand.',
        roles: ['SDE2', 'SDE3'],
      },
      {
        id: 'routing',
        label: 'Routing',
        description: 'React Router, Next.js routing.',
        roles: ['SDE2'],
      },
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    description: 'Unit, integration, E2E, Jest, React Testing Library, Cypress.',
    roles: ['SDE2', 'SDE3'],
  },
  {
    id: 'performance',
    label: 'Performance',
    description: 'Lighthouse, code splitting, lazy loading, bundle analysis.',
    roles: ['SDE3', 'Senior'],
  },
  {
    id: 'devops',
    label: 'CI/CD & DevOps',
    description: 'Git, GitHub Actions, Docker, Vercel, Netlify.',
    roles: ['SDE3', 'Senior'],
  },
  {
    id: 'system-design',
    label: 'System Design',
    description: 'Scalability, caching, SSR, micro-frontends.',
    roles: ['SDE3', 'Senior'],
  },
  {
    id: 'soft-skills',
    label: 'Soft Skills & Interview Prep',
    description: 'Communication, teamwork, DSA, system design interviews.',
    roles: ['SDE1', 'SDE2', 'SDE3', 'Senior'],
  },
];

const RoadmapContainer = styled.div`
  max-width: 100vw;
  overflow-x: auto;
  padding: 40px 0 80px 0;
  background: #fafafa;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  padding: 0 32px 32px 32px;
  background: white;
  border-bottom: 1px solid #eee;
  margin-bottom: 32px;
`;

const PageTitle = styled.h1`
  font-size: 2.4em;
  font-weight: 800;
  margin: 0 0 12px 0;
  color: #1a1a1a;
  letter-spacing: -0.02em;
`;

const PageDescription = styled.p`
  color: #666;
  font-size: 1.1em;
  margin: 0;
  line-height: 1.6;
  max-width: 800px;
`;

const RoleFilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  padding: 0 32px;
  position: sticky;
  top: 0;
  background: #fafafa;
  z-index: 10;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
`;

const RoleChip = styled.button<{ active: boolean }>`
  padding: 8px 18px;
  border-radius: 999px;
  border: 2px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'white'};
  color: ${({ active, theme }) => active ? '#fff' : theme.colors.text};
  font-size: 0.95em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ active, theme }) => active ? theme.colors.primary : 'rgba(108, 99, 255, 0.08)'};
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const TreeRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 80px;
  position: relative;
  padding: 0 32px;
  min-height: 600px;
`;

const TreeColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  gap: 40px;
  position: relative;
  padding: 20px 0;
`;

const NodeBubble = styled.div<{ highlighted: boolean; expanded: boolean; level: number; isStep: boolean }>`
  background: ${({ isStep }) => isStep ? '#f0f7ff' : NODE_COLOR};
  border: 2.5px solid ${({ isStep }) => isStep ? '#4a90e2' : NODE_BORDER};
  border-radius: 32px;
  padding: 20px 28px 18px 28px;
  box-shadow: 0 4px 16px ${({ isStep }) => isStep ? 'rgba(74,144,226,0.08)' : 'rgba(247,201,72,0.08)'};
  transition: all 0.2s ease;
  cursor: pointer;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 260px;
  max-width: 100%;
  opacity: ${({ highlighted }) => highlighted ? 1 : 0.5};
  transform: ${({ level }) => level > 0 ? `translateX(${level * 20}px)` : 'none'};
  &:hover {
    box-shadow: 0 8px 32px ${({ isStep }) => isStep ? 'rgba(74,144,226,0.15)' : 'rgba(247,201,72,0.15)'};
    border-color: ${({ isStep }) => isStep ? '#4a90e2' : '#f7b500'};
    background: ${({ isStep }) => isStep ? '#e6f0ff' : '#fff9d6'};
    transform: ${({ level }) => level > 0 ? `translateX(${level * 20}px) translateY(-2px) scale(1.012)` : 'translateY(-2px) scale(1.012)'};
  }
`;

const LevelIndicator = styled.div<{ level: number }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: ${CONNECTOR_COLOR};
  opacity: 0.5;
  transform: translateX(${({ level }) => level * 20}px);
`;

const NodeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const NodeTitle = styled.h3`
  font-size: 1.12em;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: ${NODE_TEXT};
  letter-spacing: -0.01em;
  line-height: 1.4;
`;

const NodeDesc = styled.p`
  color: #555;
  font-size: 0.95em;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

const NodeRoleTags = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 6px;
  flex-wrap: wrap;
`;

const StatusIcon = styled.span`
  margin-right: 12px;
  font-size: 1.2em;
  color: #7c6f00;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #f7b500;
  font-size: 1.1em;
  margin-left: 8px;
  cursor: pointer;
  padding: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  border-radius: 4px;
  &:hover {
    color: #f7b500cc;
    background: rgba(247, 181, 0, 0.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Chevron = styled.span<{ expanded: boolean }>`
  display: inline-block;
  transition: transform 0.22s cubic-bezier(.4,2,.6,1);
  font-size: 1.1em;
  margin-right: 2px;
  ${({ expanded }) => expanded && css`
    transform: rotate(90deg);
  `}
`;

const ConnectorSVG = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 0;
`;

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #eee;
  padding: 16px 32px;
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.4em;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #666;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95em;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(108, 99, 255, 0.08);
  }
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(108, 99, 255, 0.08);
  }
`;

const RoleSection = styled.div`
  margin-bottom: 60px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const RoleHeader = styled.div`
  margin-bottom: 32px;
`;

const RoleTitle = styled.h2`
  font-size: 1.8em;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RoleDescription = styled.p`
  color: #666;
  font-size: 1.1em;
  margin: 0;
  line-height: 1.6;
  max-width: 800px;
`;

const StepNumber = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9em;
  flex-shrink: 0;
`;

// Add new styled components for flowchart/tree structure
const FlowRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 56px;
  position: relative;
  width: 100%;
  overflow-x: auto;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const FlowNode = styled.div<{ active: boolean; isChild?: boolean }>`
  background: ${({ active, isChild }) =>
    isChild ? '#f0f4ff' : active ? '#fffbe6' : '#f7f7fa'};
  border: 2px solid
    ${({ active, isChild }) =>
      isChild ? '#bfcfff' : active ? '#f7c948' : '#e3e8ff'};
  border-radius: 20px;
  box-shadow: ${({ active, isChild }) =>
    isChild
      ? '0 2px 8px rgba(108,99,255,0.08)'
      : active
      ? '0 4px 16px rgba(247,201,72,0.10)'
      : '0 2px 8px rgba(108,99,255,0.04)'};
  padding: 18px 18px 14px 18px;
  min-width: 200px;
  max-width: 260px;
  min-height: 120px;
  position: relative;
  transition: all 0.22s cubic-bezier(.4,2,.6,1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 200px;
  height: 100%;
  overflow: visible;
  outline: none;
  &:hover, &:focus {
    border-color: #4a90e2;
    background: ${({ isChild }) => (isChild ? '#e6f0ff' : '#fff9d6')};
    box-shadow: 0 8px 32px rgba(74,144,226,0.13);
  }
`;

const ChildNodesContainer = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 32px;
  width: 100%;
  position: relative;
  justify-content: flex-start;
  flex-wrap: wrap;
  animation: fadeIn 0.4s cubic-bezier(.4,2,.6,1);
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-16px); }
    to { opacity: 1; transform: none; }
  }
`;

const CurvedConnectorSVG = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  pointer-events: none;
  z-index: 0;
`;

const StickyRoleNav = styled.div`
  position: sticky;
  top: 80px;
  z-index: 20;
  background: #fafafa;
  padding: 12px 0 12px 32px;
  display: flex;
  gap: 18px;
  border-left: 4px solid #e3e8ff;
  margin-bottom: 24px;
  overflow-x: auto;
`;

const RoleNavBtn = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => (active ? theme.colors.primary : 'white')};
  color: ${({ active }) => (active ? '#fff' : '#3a3a7c')};
  border: 2px solid ${({ active, theme }) => (active ? theme.colors.primary : '#e3e8ff')};
  border-radius: 999px;
  padding: 8px 20px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  &:hover, &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ active, theme }) => (active ? theme.colors.primary : 'rgba(108, 99, 255, 0.08)')};
    color: ${({ active, theme }) => (active ? '#fff' : theme.colors.primary)};
  }
`;

const StepNumberCircle = styled.div<{ active: boolean }>`
  background: ${({ active, theme }) => (active ? theme.colors.primary : '#e3e8ff')};
  color: ${({ active }) => (active ? '#fff' : '#3a3a7c')};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1em;
  margin-bottom: 10px;
  margin-right: 12px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(108,99,255,0.06);
`;

const StepTitle = styled.h3`
  font-size: 1.13em;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: #1a1a1a;
  letter-spacing: -0.01em;
  line-height: 1.4;
`;

const StepExpandBtn = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  font-size: 1.2em;
  margin-left: 4px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #e6f0ff;
    outline: none;
  }
`;

const StepDesc = styled.p`
  color: #555;
  font-size: 0.97em;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

const StartLearningBtn = styled.button`
  background: #f7c948;
  color: #222;
  border: none;
  border-radius: 999px;
  padding: 10px 28px;
  font-size: 1.1em;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #ffe066;
    outline: none;
  }
`;

const CompleteCheck = styled.button<{ completed: boolean }>`
  background: none;
  border: none;
  color: ${({ completed }) => (completed ? '#4caf50' : '#bbb')};
  font-size: 1.5em;
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.2s;
  &:hover, &:focus {
    color: #4caf50;
    outline: none;
  }
`;

const RoleOverview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

function getTreeLevels(nodes: RoadmapNode[], expandedNodes: Record<string, boolean>, level = 0, levels: RoadmapNode[][] = []): RoadmapNode[][] {
  if (!levels[level]) levels[level] = [];
  nodes.forEach(node => {
    levels[level].push(node);
    if (node.children && expandedNodes[node.id] !== false) {
      getTreeLevels(node.children, expandedNodes, level + 1, levels);
    }
  });
  return levels;
}

function getStatusIcon(status: RoadmapNode['status']) {
  if (status === 'alt') return <FaDotCircle style={{ color: '#4caf50' }} />;
  if (status === 'order') return <FaCircle style={{ color: '#aaa' }} />;
  return <FaCheckCircle style={{ color: '#f7b500' }} />;
}

function useNodePositions(treeLevels: RoadmapNode[][]) {
  const nodeRefs = useRef<{ [id: string]: HTMLDivElement | null }>({});
  const [positions, setPositions] = useState<{ [id: string]: { x: number; y: number; width: number; height: number } }>({});
  const isMounted = useRef(true);
  const rafRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    isMounted.current = true;

    const updatePositions = () => {
      if (!isMounted.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newPositions: typeof positions = {};
      let hasChanges = false;

      Object.entries(nodeRefs.current).forEach(([id, el]) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const newPos = {
            x: rect.left - containerRect.left,
            y: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height,
          };

          const currentPos = positions[id];
          if (!currentPos || 
              currentPos.x !== newPos.x || 
              currentPos.y !== newPos.y || 
              currentPos.width !== newPos.width || 
              currentPos.height !== newPos.height) {
            newPositions[id] = newPos;
            hasChanges = true;
          } else {
            newPositions[id] = currentPos;
          }
        }
      });

      if (hasChanges && isMounted.current) {
        setPositions(newPositions);
      }
    };

    // Initial update
    updatePositions();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updatePositions);
    });

    // Observe container and all nodes
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    Object.values(nodeRefs.current).forEach(el => {
      if (el) resizeObserver.observe(el);
    });

    return () => {
      isMounted.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [treeLevels, positions]);

  return { nodeRefs, positions, containerRef };
}

const roleDescriptions = {
  SDE1: "Start your frontend journey with these fundamental skills. Focus on mastering the basics before moving to more advanced topics.",
  SDE2: "Build upon your foundation with intermediate concepts. Learn to create more complex applications and improve your development workflow.",
  SDE3: "Advance your expertise with advanced topics. Focus on performance, architecture, and leading technical decisions.",
  Senior: "Master the full spectrum of frontend development. Lead technical initiatives and mentor others in their growth."
};

const roleSteps = {
  SDE1: [
    {
      id: 'html-basics',
      label: 'HTML Fundamentals',
      description: 'Master the basics of HTML5, semantic tags, and document structure.',
      children: [
        {
          id: 'html-structure',
          label: 'Document Structure',
          description: 'DOCTYPE, head, body, and basic HTML elements.',
        },
        {
          id: 'html-semantic',
          label: 'Semantic HTML',
          description: 'header, nav, main, section, article, footer, and accessibility.',
        }
      ]
    },
    {
      id: 'css-basics',
      label: 'CSS Fundamentals',
      description: 'Learn CSS selectors, properties, and basic styling techniques.',
      children: [
        {
          id: 'css-selectors',
          label: 'Selectors & Properties',
          description: 'Class, ID, attribute selectors, and common CSS properties.',
        },
        {
          id: 'css-box-model',
          label: 'Box Model',
          description: 'Margin, padding, border, and box-sizing.',
        }
      ]
    },
    {
      id: 'css-layout',
      label: 'CSS Layout',
      description: 'Master Flexbox and Grid for modern layouts.',
      children: [
        {
          id: 'flexbox',
          label: 'Flexbox',
          description: 'Flex container, items, and common layout patterns.',
        },
        {
          id: 'grid',
          label: 'CSS Grid',
          description: 'Grid container, items, and complex layouts.',
        }
      ]
    },
    {
      id: 'responsive-design',
      label: 'Responsive Design',
      description: 'Learn to create responsive and mobile-friendly websites.',
      children: [
        {
          id: 'media-queries',
          label: 'Media Queries',
          description: 'Breakpoints, viewport, and responsive units.',
        },
        {
          id: 'mobile-first',
          label: 'Mobile-First Design',
          description: 'Mobile-first approach and responsive images.',
        }
      ]
    },
    {
      id: 'js-basics',
      label: 'JavaScript Basics',
      description: 'Master JavaScript fundamentals and core concepts.',
      children: [
        {
          id: 'js-syntax',
          label: 'Syntax & Types',
          description: 'Variables, data types, and operators.',
        },
        {
          id: 'js-functions',
          label: 'Functions & Scope',
          description: 'Function declarations, expressions, and scope.',
        }
      ]
    },
    {
      id: 'js-dom',
      label: 'DOM Manipulation',
      description: 'Learn to interact with the DOM and handle events.',
      children: [
        {
          id: 'dom-selectors',
          label: 'DOM Selectors',
          description: 'querySelector, getElementById, and DOM traversal.',
        },
        {
          id: 'dom-events',
          label: 'Event Handling',
          description: 'Event listeners, event delegation, and common events.',
        }
      ]
    },
    {
      id: 'js-es6',
      label: 'ES6+ Features',
      description: 'Master modern JavaScript features and syntax.',
      children: [
        {
          id: 'es6-syntax',
          label: 'Modern Syntax',
          description: 'Arrow functions, destructuring, and template literals.',
        },
        {
          id: 'es6-modules',
          label: 'Modules & Classes',
          description: 'ES6 modules, classes, and inheritance.',
        }
      ]
    },
    {
      id: 'js-async',
      label: 'Asynchronous JavaScript',
      description: 'Learn to handle asynchronous operations.',
      children: [
        {
          id: 'promises',
          label: 'Promises',
          description: 'Promise creation, chaining, and error handling.',
        },
        {
          id: 'async-await',
          label: 'Async/Await',
          description: 'Async functions, await operator, and error handling.',
        }
      ]
    },
    {
      id: 'js-apis',
      label: 'Web APIs',
      description: 'Learn to work with browser APIs and fetch data.',
      children: [
        {
          id: 'fetch-api',
          label: 'Fetch API',
          description: 'Making HTTP requests and handling responses.',
        },
        {
          id: 'local-storage',
          label: 'Storage APIs',
          description: 'localStorage, sessionStorage, and cookies.',
        }
      ]
    },
    {
      id: 'js-debugging',
      label: 'Debugging & Tools',
      description: 'Master debugging techniques and developer tools.',
      children: [
        {
          id: 'dev-tools',
          label: 'Developer Tools',
          description: 'Chrome DevTools, console, and debugging.',
        },
        {
          id: 'error-handling',
          label: 'Error Handling',
          description: 'Try-catch, error types, and debugging strategies.',
        }
      ]
    }
  ],
  SDE2: [
    {
      id: 'react-basics',
      label: 'React Fundamentals',
      description: 'Master React core concepts and component-based architecture.',
      children: [
        {
          id: 'react-components',
          label: 'Components & Props',
          description: 'Functional components, props, and component composition.',
        },
        {
          id: 'react-jsx',
          label: 'JSX & Rendering',
          description: 'JSX syntax, conditional rendering, and lists.',
        }
      ]
    },
    {
      id: 'react-hooks',
      label: 'React Hooks',
      description: 'Learn to use React hooks for state and side effects.',
      children: [
        {
          id: 'use-state',
          label: 'useState & useEffect',
          description: 'State management and side effects.',
        },
        {
          id: 'custom-hooks',
          label: 'Custom Hooks',
          description: 'Creating and using custom hooks.',
        }
      ]
    },
    {
      id: 'react-routing',
      label: 'React Routing',
      description: 'Implement client-side routing in React applications.',
      children: [
        {
          id: 'react-router',
          label: 'React Router',
          description: 'Route configuration and navigation.',
        },
        {
          id: 'route-params',
          label: 'Route Parameters',
          description: 'Dynamic routes and URL parameters.',
        }
      ]
    },
    {
      id: 'state-management',
      label: 'State Management',
      description: 'Learn different state management solutions.',
      children: [
        {
          id: 'context-api',
          label: 'Context API',
          description: 'Creating and using React Context.',
        },
        {
          id: 'redux-basics',
          label: 'Redux Basics',
          description: 'Actions, reducers, and store setup.',
        }
      ]
    },
    {
      id: 'form-handling',
      label: 'Form Handling',
      description: 'Master form handling and validation in React.',
      children: [
        {
          id: 'controlled-forms',
          label: 'Controlled Forms',
          description: 'Form state management and validation.',
        },
        {
          id: 'form-libraries',
          label: 'Form Libraries',
          description: 'Formik, React Hook Form, and validation.',
        }
      ]
    },
    {
      id: 'testing',
      label: 'Testing React',
      description: 'Learn to test React components and applications.',
      children: [
        {
          id: 'jest-basics',
          label: 'Jest Basics',
          description: 'Unit testing with Jest.',
        },
        {
          id: 'react-testing',
          label: 'React Testing Library',
          description: 'Component testing and best practices.',
        }
      ]
    },
    {
      id: 'performance',
      label: 'Performance Optimization',
      description: 'Learn to optimize React application performance.',
      children: [
        {
          id: 'react-memo',
          label: 'React.memo & useMemo',
          description: 'Memoization and performance optimization.',
        },
        {
          id: 'code-splitting',
          label: 'Code Splitting',
          description: 'Dynamic imports and lazy loading.',
        }
      ]
    },
    {
      id: 'styling',
      label: 'Styling Solutions',
      description: 'Explore different styling approaches in React.',
      children: [
        {
          id: 'css-modules',
          label: 'CSS Modules',
          description: 'Scoped CSS and module patterns.',
        },
        {
          id: 'styled-components',
          label: 'Styled Components',
          description: 'CSS-in-JS and component styling.',
        }
      ]
    },
    {
      id: 'authentication',
      label: 'Authentication',
      description: 'Implement authentication in React applications.',
      children: [
        {
          id: 'auth-flow',
          label: 'Auth Flow',
          description: 'JWT, OAuth, and authentication patterns.',
        },
        {
          id: 'protected-routes',
          label: 'Protected Routes',
          description: 'Route protection and auth guards.',
        }
      ]
    },
    {
      id: 'deployment',
      label: 'Deployment & CI/CD',
      description: 'Learn to deploy React applications.',
      children: [
        {
          id: 'build-process',
          label: 'Build Process',
          description: 'Webpack, Babel, and build optimization.',
        },
        {
          id: 'deployment-platforms',
          label: 'Deployment Platforms',
          description: 'Vercel, Netlify, and AWS deployment.',
        }
      ]
    }
  ],
  SDE3: [
    {
      id: 'advanced-architecture',
      label: 'Advanced Architecture',
      description: 'Design scalable and maintainable React applications.',
      children: [
        {
          id: 'folder-structure',
          label: 'Project Structure',
          description: 'Organizing large-scale React applications.',
        },
        {
          id: 'design-patterns',
          label: 'Design Patterns',
          description: 'Common patterns and best practices.',
        }
      ]
    },
    {
      id: 'state-architecture',
      label: 'State Architecture',
      description: 'Design complex state management solutions.',
      children: [
        {
          id: 'redux-advanced',
          label: 'Advanced Redux',
          description: 'Redux Toolkit, middleware, and selectors.',
        },
        {
          id: 'state-patterns',
          label: 'State Patterns',
          description: 'State machines and complex state patterns.',
        }
      ]
    },
    {
      id: 'performance-advanced',
      label: 'Advanced Performance',
      description: 'Optimize React applications for maximum performance.',
      children: [
        {
          id: 'profiling',
          label: 'Performance Profiling',
          description: 'React Profiler and performance metrics.',
        },
        {
          id: 'optimization',
          label: 'Advanced Optimization',
          description: 'Virtualization, windowing, and rendering optimization.',
        }
      ]
    },
    {
      id: 'testing-advanced',
      label: 'Advanced Testing',
      description: 'Implement comprehensive testing strategies.',
      children: [
        {
          id: 'integration-tests',
          label: 'Integration Testing',
          description: 'Testing component interactions.',
        },
        {
          id: 'e2e-testing',
          label: 'E2E Testing',
          description: 'Cypress and Playwright for E2E testing.',
        }
      ]
    },
    {
      id: 'security',
      label: 'Security',
      description: 'Implement security best practices in React applications.',
      children: [
        {
          id: 'security-basics',
          label: 'Security Basics',
          description: 'XSS, CSRF, and security headers.',
        },
        {
          id: 'auth-security',
          label: 'Auth Security',
          description: 'Secure authentication and authorization.',
        }
      ]
    },
    {
      id: 'micro-frontends',
      label: 'Micro-frontends',
      description: 'Design and implement micro-frontend architectures.',
      children: [
        {
          id: 'mf-basics',
          label: 'Micro-frontend Basics',
          description: 'Module Federation and micro-frontend patterns.',
        },
        {
          id: 'mf-advanced',
          label: 'Advanced Patterns',
          description: 'State management and communication between micro-frontends.',
        }
      ]
    },
    {
      id: 'ssr',
      label: 'Server-Side Rendering',
      description: 'Implement SSR for better performance and SEO.',
      children: [
        {
          id: 'next-js',
          label: 'Next.js',
          description: 'Next.js features and SSR implementation.',
        },
        {
          id: 'ssr-patterns',
          label: 'SSR Patterns',
          description: 'Data fetching and hydration patterns.',
        }
      ]
    },
    {
      id: 'monitoring',
      label: 'Monitoring & Analytics',
      description: 'Implement monitoring and analytics in React applications.',
      children: [
        {
          id: 'error-tracking',
          label: 'Error Tracking',
          description: 'Sentry and error monitoring.',
        },
        {
          id: 'analytics',
          label: 'Analytics',
          description: 'User tracking and performance monitoring.',
        }
      ]
    },
    {
      id: 'accessibility',
      label: 'Advanced Accessibility',
      description: 'Implement comprehensive accessibility features.',
      children: [
        {
          id: 'a11y-patterns',
          label: 'Accessibility Patterns',
          description: 'ARIA patterns and keyboard navigation.',
        },
        {
          id: 'a11y-testing',
          label: 'Accessibility Testing',
          description: 'Automated and manual accessibility testing.',
        }
      ]
    },
    {
      id: 'internationalization',
      label: 'Internationalization',
      description: 'Implement multi-language support in React applications.',
      children: [
        {
          id: 'i18n-basics',
          label: 'i18n Basics',
          description: 'Translation management and language switching.',
        },
        {
          id: 'i18n-advanced',
          label: 'Advanced i18n',
          description: 'Formatting, pluralization, and RTL support.',
        }
      ]
    }
  ],
  Senior: [
    {
      id: 'technical-leadership',
      label: 'Technical Leadership',
      description: 'Lead technical initiatives and mentor team members.',
      children: [
        {
          id: 'architecture-decisions',
          label: 'Architecture Decisions',
          description: 'Making and documenting technical decisions.',
        },
        {
          id: 'code-reviews',
          label: 'Code Reviews',
          description: 'Effective code review practices and feedback.',
        }
      ]
    },
    {
      id: 'team-management',
      label: 'Team Management',
      description: 'Manage and grow frontend development teams.',
      children: [
        {
          id: 'team-structure',
          label: 'Team Structure',
          description: 'Organizing and scaling frontend teams.',
        },
        {
          id: 'mentoring',
          label: 'Mentoring',
          description: 'Technical mentoring and career development.',
        }
      ]
    },
    {
      id: 'process-improvement',
      label: 'Process Improvement',
      description: 'Improve development processes and workflows.',
      children: [
        {
          id: 'agile-practices',
          label: 'Agile Practices',
          description: 'Implementing and improving agile methodologies.',
        },
        {
          id: 'ci-cd',
          label: 'CI/CD',
          description: 'Setting up and maintaining CI/CD pipelines.',
        }
      ]
    },
    {
      id: 'quality-assurance',
      label: 'Quality Assurance',
      description: 'Establish and maintain quality standards.',
      children: [
        {
          id: 'quality-processes',
          label: 'Quality Processes',
          description: 'Code quality, testing, and review processes.',
        },
        {
          id: 'metrics',
          label: 'Quality Metrics',
          description: 'Measuring and improving code quality.',
        }
      ]
    },
    {
      id: 'innovation',
      label: 'Innovation & Research',
      description: 'Drive innovation and stay ahead of the curve.',
      children: [
        {
          id: 'emerging-tech',
          label: 'Emerging Technologies',
          description: 'Research and evaluate new technologies.',
        },
        {
          id: 'poc',
          label: 'Proof of Concepts',
          description: 'Creating and evaluating technical POCs.',
        }
      ]
    },
    {
      id: 'cross-functional',
      label: 'Cross-functional Collaboration',
      description: 'Work effectively with other teams and stakeholders.',
      children: [
        {
          id: 'stakeholder',
          label: 'Stakeholder Management',
          description: 'Working with product and business teams.',
        },
        {
          id: 'communication',
          label: 'Technical Communication',
          description: 'Effective communication with non-technical stakeholders.',
        }
      ]
    },
    {
      id: 'security-leadership',
      label: 'Security Leadership',
      description: 'Lead security initiatives and best practices.',
      children: [
        {
          id: 'security-strategy',
          label: 'Security Strategy',
          description: 'Developing and implementing security strategies.',
        },
        {
          id: 'security-audits',
          label: 'Security Audits',
          description: 'Conducting and managing security audits.',
        }
      ]
    },
    {
      id: 'performance-leadership',
      label: 'Performance Leadership',
      description: 'Lead performance optimization initiatives.',
      children: [
        {
          id: 'performance-strategy',
          label: 'Performance Strategy',
          description: 'Developing performance optimization strategies.',
        },
        {
          id: 'monitoring',
          label: 'Performance Monitoring',
          description: 'Setting up and maintaining performance monitoring.',
        }
      ]
    },
    {
      id: 'documentation',
      label: 'Documentation & Knowledge Sharing',
      description: 'Establish documentation and knowledge sharing practices.',
      children: [
        {
          id: 'technical-docs',
          label: 'Technical Documentation',
          description: 'Creating and maintaining technical documentation.',
        },
        {
          id: 'knowledge-base',
          label: 'Knowledge Base',
          description: 'Building and maintaining team knowledge bases.',
        }
      ]
    },
    {
      id: 'community',
      label: 'Community & Industry Leadership',
      description: 'Contribute to the frontend development community.',
      children: [
        {
          id: 'open-source',
          label: 'Open Source',
          description: 'Contributing to and maintaining open source projects.',
        },
        {
          id: 'speaking',
          label: 'Speaking & Writing',
          description: 'Sharing knowledge through talks and articles.',
        }
      ]
    }
  ]
};

// Helper: Convert roadmap data to Mermaid mindmap string
function roadmapToMermaidMindmap(steps: any[], completedSteps: Record<string, boolean>, level = 0): string {
  return steps.map(step => {
    const isComplete = completedSteps[step.id];
    const emoji = isComplete ? '✅' : (level === 0 ? '🟡' : '🔹');
    const label = `${emoji} ${step.label.replace(/\n/g, ' ')}`;
    const children = step.children ? roadmapToMermaidMindmap(step.children, completedSteps, level + 1) : '';
    return `${'  '.repeat(level + 1)}${label}${children ? `\n${children}` : ''}`;
  }).join('\n');
}

const RoadmapPage = () => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [activeRole, setActiveRole] = useState<string>(roles[0]);
  const diagramRef = useRef<HTMLDivElement>(null);

  const role = selectedRoles[0] || roles[0];
  const steps = roleSteps[role as keyof typeof roleSteps];
  const mindmapStr = `mindmap\n  root((Frontend Roadmap))\n${roadmapToMermaidMindmap(steps, completedSteps)}`;

  useEffect(() => {
    if (diagramRef.current) {
      diagramRef.current.innerHTML = `<div class='mermaid'>${mindmapStr}</div>`;
      mermaid.init(undefined, diagramRef.current);
    }
  }, [mindmapStr]);

  // Handler for mark as complete (checkboxes below diagram)
  const handleComplete = (stepId: string) => {
    setCompletedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  // Render checkboxes for completion
  function renderCheckboxes(steps: any[]) {
    return steps.map(step => (
      <div key={step.id} style={{ marginBottom: 4, marginLeft: 8 }}>
        <label style={{ cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={!!completedSteps[step.id]}
            onChange={() => handleComplete(step.id)}
            style={{ marginRight: 6 }}
          />
          {step.label}
        </label>
        {step.children && renderCheckboxes(step.children)}
      </div>
    ));
  }

  return (
    <>
      <Header>
        <Logo href="/">Frontendly</Logo>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/roadmap" className="active">Roadmap</NavLink>
          <NavLink href="/system-design">System Design</NavLink>
        </Nav>
      </Header>
      <RoadmapContainer>
        <PageHeader>
          <PageTitle>Frontend Developer Roadmap</PageTitle>
          <PageDescription>
            Follow these step-by-step learning paths based on your role level. Each path is designed to help you progress systematically in your frontend development journey.
          </PageDescription>
        </PageHeader>
        <RoleFilterBar>
          {roles.map(role => (
            <RoleChip
              key={role}
              active={selectedRoles.includes(role)}
              onClick={() => setSelectedRoles([role])}
            >
              {role}
            </RoleChip>
          ))}
        </RoleFilterBar>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: 0 }}>
            <div ref={diagramRef} style={{ width: '100%', minHeight: 400, background: '#fafbff', borderRadius: 16, boxShadow: '0 2px 12px rgba(108,99,255,0.04)', padding: 16, overflow: 'auto' }} />
            <div style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
              <b>Legend:</b> <span style={{ marginLeft: 8 }}>🟡 Main Step</span> <span style={{ marginLeft: 16 }}>🔹 Sub Step</span> <span style={{ marginLeft: 16 }}>✅ Completed</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 220, maxWidth: 320, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(108,99,255,0.06)', padding: 16 }}>
            <h3 style={{ fontSize: '1.1em', fontWeight: 700, marginBottom: 12 }}>Mark Steps as Complete</h3>
            {renderCheckboxes(steps)}
          </div>
        </div>
      </RoadmapContainer>
    </>
  );
};

export default RoadmapPage; 