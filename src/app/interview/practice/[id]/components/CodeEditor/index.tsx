'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';

const EditorContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EditorToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
`;

const LanguageSelector = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

interface ProblemTemplate {
  javascript: string;
  typescript: string;
}

interface Problems {
  [key: string]: ProblemTemplate;
}

const problems: Problems = {
  'two-sum': {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
}`,
    typescript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums: number[], target: number): number[] {
    // Write your code here
}`
  }
};

export default function CodeEditor({ problemId }: { problemId: string }) {
  const [language, setLanguage] = useState<'javascript' | 'typescript'>('javascript');
  const [code, setCode] = useState(problems[problemId]?.[language] || '');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as 'javascript' | 'typescript';
    setLanguage(newLanguage);
    setCode(problems[problemId]?.[newLanguage] || '');
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <EditorContainer>
      <EditorToolbar>
        <LanguageSelector value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
        </LanguageSelector>
      </EditorToolbar>
      <EditorWrapper>
        <Editor
          height="100%"
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            suggestOnTriggerCharacters: true,
            formatOnPaste: true,
            formatOnType: true,
            snippetSuggestions: 'inline'
          }}
        />
      </EditorWrapper>
    </EditorContainer>
  );
} 