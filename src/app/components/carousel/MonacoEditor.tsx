import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import { ThemeSwitcher } from './ThemeSwitcher';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.colors.background};
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
`;

const EditorTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 16px;
    height: 16px;
    color: ${props => props.theme.colors.primary};
  }
`;

const EditorContent = styled.div`
  flex: 1;
  overflow: hidden;
`;

interface MonacoEditorProps {
  defaultValue?: string;
  language?: string;
  theme?: string;
  onChange?: (value: string | undefined) => void;
  title?: string;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  defaultValue = '',
  language = 'typescript',
  theme: initialTheme = 'vs-dark',
  onChange,
  title = 'Code Editor',
}) => {
  const [theme, setTheme] = useState(initialTheme);

  const handleEditorWillMount = (monaco: any) => {
    // Define custom themes
    monaco.editor.defineTheme('vs-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
      },
    });

    monaco.editor.defineTheme('light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#000000',
        'editor.lineHighlightBackground': '#f5f5f5',
        'editor.selectionBackground': '#add6ff',
        'editor.inactiveSelectionBackground': '#e5ebf1',
      },
    });
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <EditorTitle>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          {title}
        </EditorTitle>
        <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      </EditorHeader>
      <EditorContent>
        <Editor
          height="100%"
          defaultLanguage={language}
          defaultValue={defaultValue}
          theme={theme}
          onChange={onChange}
          beforeMount={handleEditorWillMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            contextmenu: true,
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 16, bottom: 16 },
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            parameterHints: { enabled: true },
            hover: { enabled: true },
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
              highlightActiveIndentation: true,
            },
          }}
        />
      </EditorContent>
    </EditorContainer>
  );
};
