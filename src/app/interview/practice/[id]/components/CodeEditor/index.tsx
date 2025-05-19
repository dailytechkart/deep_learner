'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Editor from '@monaco-editor/react';

const EditorContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const EditorHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LanguageSelector = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
`;

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  border: none;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }

  &:disabled {
    background: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const EditorWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ResultContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
  max-height: 200px;
  overflow-y: auto;
`;

const TestCaseResult = styled.div<{ $passed: boolean }>`
  padding: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.$passed ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
  color: ${props => props.$passed ? '#00ff00' : '#ff0000'};
  font-family: 'Fira Code', monospace;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ResultTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};
`;

interface TestResult {
  passed: boolean;
  input: any[];
  expected: any;
  actual: any;
  error?: string;
}

// Mock data - In a real app, this would come from an API or database
const problems: Record<string, { 
  typescript: string; 
  javascript: string;
  testCases: {
    input: any[];
    output: any;
  }[];
}> = {
  'two-sum': {
    typescript: `function twoSum(nums: number[], target: number): number[] {
    // Write your code here
    // Example solution:
    // const map = new Map<number, number>();
    // for (let i = 0; i < nums.length; i++) {
    //     const complement = target - nums[i];
    //     if (map.has(complement)) {
    //         return [map.get(complement)!, i];
    //     }
    //     map.set(nums[i], i);
    // }
    // return [];
}`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
    // Example solution:
    // const map = new Map();
    // for (let i = 0; i < nums.length; i++) {
    //     const complement = target - nums[i];
    //     if (map.has(complement)) {
    //         return [map.get(complement), i];
    //     }
    //     map.set(nums[i], i);
    // }
    // return [];
}`,
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        output: [0, 1]
      },
      {
        input: [[3, 2, 4], 6],
        output: [1, 2]
      },
      {
        input: [[3, 3], 6],
        output: [0, 1]
      }
    ]
  }
  // Add more problems here
};

const languages = [
  { id: 'typescript', name: 'TypeScript' },
  { id: 'javascript', name: 'JavaScript' }
];

export const CodeEditor: React.FC<{ problemId: string }> = ({ problemId }) => {
  const [language, setLanguage] = useState('typescript');
  const [code, setCode] = useState(problems[problemId]?.typescript || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(problems[problemId]?.[newLanguage as 'typescript' | 'javascript'] || '');
    setTestResults([]);
  };

  const runTestCases = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      const results: TestResult[] = [];
      const problem = problems[problemId];
      
      // Create a function from the user's code
      let userFunction;
      try {
        // For TypeScript, we need to remove the type annotations
        const cleanCode = language === 'typescript' 
          ? code.replace(/: number\[\]/g, '')
               .replace(/: number/g, '')
          : code;
        
        // Create a new function with the same name
        const functionBody = cleanCode.trim();
        if (!functionBody.startsWith('function')) {
          throw new Error('Code must start with a function declaration');
        }

        // Create a new function in the global scope
        const functionName = functionBody.match(/function\s+(\w+)/)?.[1];
        if (!functionName) {
          throw new Error('Could not find function name');
        }

        // Create a new function in the global scope
        const functionString = `(${functionBody})`;
        userFunction = eval(functionString);
      } catch (error) {
        throw new Error('Invalid function syntax: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }

      // Run each test case
      for (const testCase of problem.testCases) {
        try {
          const result = userFunction(...testCase.input);
          
          // For two-sum, we need to sort the arrays to compare them
          const sortedResult = Array.isArray(result) ? [...result].sort() : result;
          const sortedExpected = Array.isArray(testCase.output) ? [...testCase.output].sort() : testCase.output;
          
          const passed = JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
          
          results.push({
            passed,
            input: testCase.input,
            expected: testCase.output,
            actual: result
          });
        } catch (error) {
          results.push({
            passed: false,
            input: testCase.input,
            expected: testCase.output,
            actual: null,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      setTestResults(results);
    } catch (error) {
      console.error('Error running test cases:', error);
      setTestResults([{
        passed: false,
        input: [],
        expected: null,
        actual: null,
        error: error instanceof Error ? error.message : 'Failed to run test cases'
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // First run the test cases
      await runTestCases();
      
      // Check if all test cases passed
      const allPassed = testResults.every(result => result.passed);
      
      if (allPassed) {
        // In a real app, this would send the code to a backend for evaluation
        console.log('Submitting code:', code);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Solution submitted successfully!');
      } else {
        alert('Please fix the failing test cases before submitting.');
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      alert('Error submitting solution. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EditorContainer>
      <EditorHeader>
        <LanguageSelector
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          {languages.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </LanguageSelector>
        <ButtonGroup>
          <ActionButton 
            onClick={runTestCases} 
            disabled={isSubmitting || isRunning}
          >
            {isRunning ? 'Running...' : 'Run'}
          </ActionButton>
          <ActionButton 
            onClick={handleSubmit} 
            disabled={isSubmitting || isRunning}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </ActionButton>
        </ButtonGroup>
      </EditorHeader>
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
            wordWrap: 'on'
          }}
        />
      </EditorWrapper>
      {testResults.length > 0 && (
        <ResultContainer>
          <ResultTitle>Test Results</ResultTitle>
          {testResults.map((result, index) => (
            <TestCaseResult key={index} $passed={result.passed}>
              {result.passed ? '✓' : '✗'} Test Case {index + 1}
              <br />
              Input: {JSON.stringify(result.input)}
              <br />
              Expected: {JSON.stringify(result.expected)}
              <br />
              {!result.passed && (
                <>
                  Actual: {JSON.stringify(result.actual)}
                  <br />
                  {result.error && `Error: ${result.error}`}
                </>
              )}
            </TestCaseResult>
          ))}
        </ResultContainer>
      )}
    </EditorContainer>
  );
}; 