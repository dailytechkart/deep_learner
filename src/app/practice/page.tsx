'use client';

import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Sandpack } from '@codesandbox/sandpack-react';
import { PageContainer } from '../components/StyledComponents';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import MainLayout from '@/components/MainLayout';

export const dynamic = 'force-dynamic';

const PracticeContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  margin-top: 64px;
`;

const ProblemSection = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.xl};
  overflow-y: auto;
  border-right: 1px solid ${props => props.theme.colors.border};
`;

const ProblemHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ProblemTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`;

const ProblemMeta = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MetaBadge = styled.div<{ type: 'difficulty' | 'time' | 'category' }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.type) {
      case 'difficulty':
        return props.theme.colors.primary;
      case 'time':
        return props.theme.colors.secondary;
      case 'category':
        return props.theme.colors.primaryDark;
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: white;
`;

const ProblemDescription = styled.div`
  font-size: ${props => props.theme.typography.fontSize.md};
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: ${props => props.theme.spacing.xl} 0 ${props => props.theme.spacing.md};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const RequirementsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const RequirementItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.md};
  line-height: 1.5;

  &:before {
    content: '•';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const HintSection = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.lg};
  margin: ${props => props.theme.spacing.lg} 0;
`;

const HintTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ResizeHandle = styled.div`
  width: 4px;
  background: ${props => props.theme.colors.border};
  cursor: col-resize;
  transition: background 0.2s ease;
  position: relative;

  &:hover,
  &:active {
    background: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 30px;
    background: ${props => props.theme.colors.primary};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after,
  &:active::after {
    opacity: 1;
  }
`;

interface EditorSectionProps {
  editorHeight: number;
}

const EditorSection = styled.div<EditorSectionProps>`
  flex: 0.7;
  padding: 0;
  background: ${props => props.theme.colors.backgroundAlt};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  > div {
    height: 100% !important;
    width: 100% !important;
  }

  .sp-wrapper {
    height: 100% !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
  }

  .sp-layout {
    height: 100% !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: column !important;
  }

  .sp-editor {
    height: ${props => props.editorHeight}% !important;
    min-height: 100px !important;
    transition: height 0.1s ease;
  }

  .sp-preview-container {
    height: ${props => 100 - props.editorHeight}% !important;
    min-height: 100px !important;
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    transition: height 0.1s ease;
  }

  .sp-preview-iframe {
    flex: 1 !important;
    width: 100% !important;
    height: 100% !important;
  }

  .sp-stack {
    height: 100% !important;
    width: 100% !important;
  }

  .sp-tabs {
    flex-shrink: 0 !important;
  }

  .sp-content {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
  }
`;

const initialCode = {
  '/App.js': `import React from 'react';

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      {/* Your code here */}
    </div>
  );
}

export default App;`,
  '/styles.css': `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}

.todo-list {
  max-width: 500px;
  margin: 0 auto;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item.completed {
  text-decoration: line-through;
  color: #888;
}`,
};

export default function PracticePage() {
  const [editorHeight, setEditorHeight] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const container = document.querySelector('.sp-layout') as HTMLElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newHeight = ((e.clientY - containerRect.top) / containerRect.height) * 100;

      // Limit the height between 20% and 80%
      const clampedHeight = Math.min(Math.max(newHeight, 20), 80);
      setEditorHeight(clampedHeight);
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Add and remove event listeners
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Practice', href: '/practice' },
        ]}
      />
      <PageContainer style={{ padding: 0, height: '100vh', overflow: 'hidden' }}>
        <PracticeContainer>
          <ProblemSection>
            <ProblemHeader>
              <ProblemTitle>Todo List Application</ProblemTitle>
              <ProblemMeta>
                <MetaBadge type="difficulty">Medium</MetaBadge>
                <MetaBadge type="time">45 minutes</MetaBadge>
                <MetaBadge type="category">React</MetaBadge>
              </ProblemMeta>
            </ProblemHeader>

            <ProblemDescription>
              Create a simple Todo List application that allows users to manage their tasks
              efficiently. The application should be responsive, user-friendly, and implement all
              the core features of a modern todo list.
            </ProblemDescription>

            <SectionTitle>Let&apos;s practice system design problems</SectionTitle>
            <RequirementsList>
              <RequirementItem>
                Implement a form to add new todos with a text input and submit button
              </RequirementItem>
              <RequirementItem>
                Display a list of todos with their completion status
              </RequirementItem>
              <RequirementItem>
                Allow users to toggle todo completion status by clicking on the todo
              </RequirementItem>
              <RequirementItem>Add a delete button to remove todos</RequirementItem>
              <RequirementItem>
                Implement filtering functionality (All, Active, Completed)
              </RequirementItem>
            </RequirementsList>

            <SectionTitle>Let&apos;s solve real-world system design challenges</SectionTitle>
            <RequirementsList>
              <RequirementItem>
                Add local storage persistence to save todos between sessions
              </RequirementItem>
              <RequirementItem>Implement due dates for todos with date picker</RequirementItem>
              <RequirementItem>Add categories or tags for better organization</RequirementItem>
            </RequirementsList>

            <HintSection>
              <HintTitle>💡 Hint</HintTitle>
              <ProblemDescription>
                Consider using React&apos;s useState and useEffect hooks for state management. For
                styling, you can use CSS modules or styled-components. Don&apos;t forget to handle
                edge cases like empty todos and duplicate entries.
              </ProblemDescription>
            </HintSection>
          </ProblemSection>
          <EditorSection editorHeight={editorHeight}>
            <Sandpack
              template="react"
              files={initialCode}
              options={{
                showNavigator: true,
                showTabs: true,
                showLineNumbers: true,
                showInlineErrors: true,
                closableTabs: true,
                wrapContent: true,
                showConsole: true,
                showConsoleButton: true,
                showRefreshButton: true,
                autorun: true,
                recompileMode: 'immediate',
                recompileDelay: 300,
              }}
              theme="dark"
              customSetup={{
                entry: '/index.js',
              }}
            />
            <ResizeHandle onMouseDown={handleMouseDown} />
          </EditorSection>
        </PracticeContainer>
      </PageContainer>
    </MainLayout>
  );
}
