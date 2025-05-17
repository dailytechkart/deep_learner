'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';

const CodeBlockContainer = styled.div`
  position: relative;
  margin: 15px 0;
`;

const CodeBlock = styled.pre`
  background-color: ${props => props.theme.colors.codeBackground} !important;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  border: 1px solid ${props => props.theme.colors.border};
  margin: 0;
`;

const CodeActions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const OutputContainer = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: ${props => props.theme.colors.codeBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
`;

interface InteractiveCodeBlockProps {
  code: string;
  language: string;
  isRunnable?: boolean;
}

export default function InteractiveCodeBlock({ code, language, isRunnable = false }: InteractiveCodeBlockProps) {
  const [output, setOutput] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRun = () => {
    try {
      // Create a safe evaluation environment
      const safeEval = new Function(`
        const console = {
          log: (...args) => output.push(args.join(' ')),
          error: (...args) => output.push('Error: ' + args.join(' '))
        };
        const output = [];
        try {
          ${code}
        } catch (error) {
          output.push('Error: ' + error.message);
        }
        return output.join('\\n');
      `);

      const result = safeEval();
      setOutput(result);
    } catch (error: any) {
      setOutput(`Error: ${error?.message || 'An error occurred'}`);
    }
  };

  return (
    <CodeBlockContainer>
      <CodeBlock>
        <code className={`language-${language}`}>{code}</code>
      </CodeBlock>
      <CodeActions>
        <ActionButton onClick={handleCopy}>
          {copySuccess ? 'Copied!' : 'Copy'}
        </ActionButton>
        {isRunnable && (
          <ActionButton onClick={handleRun}>
            Run
          </ActionButton>
        )}
      </CodeActions>
      {output && (
        <OutputContainer>
          <strong>Output:</strong>
          <pre>{output}</pre>
        </OutputContainer>
      )}
    </CodeBlockContainer>
  );
} 