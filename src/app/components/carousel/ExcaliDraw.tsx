'use client';

import React, { useState, useCallback, Suspense, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { ThemeSwitcher } from './ThemeSwitcher';
import '@excalidraw/excalidraw/index.css';

// Lazy load Excalidraw with SSR disabled
const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  {
    ssr: false,
    loading: () => (
      <LoadingFallback>Loading Excalidraw...</LoadingFallback>
    ),
  }
);

// Styled Components
const ExcaliDrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.colors.background};
`;

const ExcaliDrawHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const ExcaliDrawTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 18px;
    height: 18px;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ExcaliDrawContent = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
  background: ${(props) => props.theme.colors.background};
`;

const LoadingFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #1e1e1e;
  color: #fff;
`;

interface ExcaliDrawProps {
  title?: string;
  initialData?: any;
  onChange?: (elements: any, appState: any) => void;
}

export const ExcaliDrawComponent: React.FC<ExcaliDrawProps> = ({
  title = 'Excalidraw',
  initialData,
  onChange,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark');
  }, []);

  const handleChange = useCallback(
    (elements: any, appState: any) => {
      onChange?.(elements, appState);
    },
    [onChange]
  );

  return (
    <ExcaliDrawContainer>
      <ExcaliDrawHeader>
        <ExcaliDrawTitle>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
          {title}
        </ExcaliDrawTitle>
        <ThemeSwitcher currentTheme={theme} onThemeChange={handleThemeChange} />
      </ExcaliDrawHeader>

      <ExcaliDrawContent>
        <Suspense fallback={<LoadingFallback>Loading Excalidraw...</LoadingFallback>}>
          {isMounted &&<Excalidraw
            theme={theme}
            initialData={initialData}
            onChange={handleChange}
            langCode="en"
            UIOptions={{
              canvasActions: {
                loadScene: true,
                saveToActiveFile: true,
                saveAsImage: true,
              },
            }}
            gridModeEnabled={false}
            zenModeEnabled={false}
            viewModeEnabled={false}
          />} 
        </Suspense>
      </ExcaliDrawContent>
    </ExcaliDrawContainer>
  );
};
