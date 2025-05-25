import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import HeroIllustration from './HeroIllustration';
import { MonacoEditor } from './carousel/MonacoEditor';
import { ExcaliDrawComponent } from './carousel/ExcaliDraw';

const LaptopContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.5rem;
  }
`;

const LaptopFrame = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 20px 20px 0 0;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 0 2px ${props => props.theme.colors.border},
    0 0 0 6px ${props => props.theme.colors.backgroundAlt};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    border-radius: 15px 15px 0 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    border-radius: 10px 10px 0 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 30px;
    background: ${props => props.theme.colors.backgroundAlt};
    border-radius: 0 0 20px 20px;
    z-index: 2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      width: 150px;
      height: 20px;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background: ${props => props.theme.colors.backgroundAlt};
    border-radius: 0 0 20px 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const LaptopScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.background};
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  padding-top: 30px; /* Space for notch */

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-top: 20px;
  }
`;

const ScreenContent = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
`;

const ScreenGlow = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
`;

const LaptopBase = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 0 0 20px 20px;
  margin-top: -20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 4px;
    background: ${props => props.theme.colors.border};
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${props => props.theme.colors.border};
    border-radius: 2px;
  }
`;

const Keyboard = styled.div`
  width: 100%;
  height: 20px;
  background: ${props => props.theme.colors.backgroundAlt};
  position: relative;
  margin-top: 5px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 2px;
    background: ${props => props.theme.colors.border};
    border-radius: 1px;
  }
`;

const Trackpad = styled.div`
  width: 60px;
  height: 40px;
  background: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  margin-top: 5px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 2px;
    background: ${props => props.theme.colors.border};
    border-radius: 1px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    width: 80%;
    height: 2px;
    background: ${props => props.theme.colors.border};
    border-radius: 1px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SlideHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SlideTitle = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-left: 1rem;
`;

const SlideBody = styled.div`
  flex: 1;
  overflow: hidden;
`;

const NavigationDots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    bottom: 0.5rem;
    gap: 0.375rem;
  }
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.border)};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 6px;
    height: 6px;
  }

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: scale(1.2);
  }
`;

const SplitLayout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const ProblemSection = styled.div`
  width: 40%;
  background: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  overflow-y: auto;
  padding: 0.75rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    max-height: 40%;
    padding: 0.5rem;
  }
`;

const EditorSection = styled.div`
  width: 60%;
  height: 100%;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    height: 60%;
  }
`;

const ProblemDescription = styled.div`
  padding: 0.5rem;
`;

const ProblemHeader = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ProblemTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.75rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const ProblemText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.8125rem;
  }
`;

const ProblemTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
`;

const ProblemTag = styled.span<{ $type?: 'difficulty' | 'category' | 'time' }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${props => {
    switch (props.$type) {
      case 'difficulty':
        return `
          background: ${props.theme.colors.primary}20;
          color: ${props.theme.colors.primary};
        `;
      case 'category':
        return `
          background: ${props.theme.colors.secondary}20;
          color: ${props.theme.colors.secondary};
        `;
      case 'time':
        return `
          background: ${props.theme.colors.textSecondary}20;
          color: ${props.theme.colors.textSecondary};
        `;
      default:
        return `
          background: ${props.theme.colors.backgroundAlt};
          color: ${props.theme.colors.textSecondary};
        `;
    }
  }}
`;

const ProblemStats = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
`;

const ProblemStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.75rem;

  svg {
    color: ${props => props.theme.colors.primary};
    width: 14px;
    height: 14px;
  }
`;

const ProblemOverview = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

const ProblemOverviewTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    color: ${props => props.theme.colors.primary};
    width: 14px;
    height: 14px;
  }
`;

const ProblemOverviewText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8125rem;
  line-height: 1.5;
  margin: 0;
`;

const ProblemSectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0.75rem 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    color: ${props => props.theme.colors.primary};
    width: 14px;
    height: 14px;
  }
`;

const ProblemRequirements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Requirement = styled.li`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8125rem;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '•';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const ExampleCode = styled.pre`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.8125rem;
  color: ${props => props.theme.colors.textSecondary};
  overflow-x: auto;
`;

const slides = [
  {
    id: 1,
    title: 'Array Rotation Problem',
    component: (
      <SplitLayout>
        <ProblemSection>
          <ProblemDescription>
            <ProblemHeader>
              <ProblemTitle>Array Rotation Problem</ProblemTitle>

              <ProblemTags>
                <ProblemTag $type="difficulty">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                  </svg>
                  Medium
                </ProblemTag>
                <ProblemTag $type="category">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6L12 14L4 6" />
                  </svg>
                  Arrays
                </ProblemTag>
                <ProblemTag $type="time">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  15 mins
                </ProblemTag>
              </ProblemTags>

              <ProblemStats>
                <ProblemStat>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                  </svg>
                  Success Rate: 65%
                </ProblemStat>
                <ProblemStat>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Avg. Time: 12 mins
                </ProblemStat>
              </ProblemStats>
            </ProblemHeader>

            <ProblemOverview>
              <ProblemOverviewTitle>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                </svg>
                Problem Overview
              </ProblemOverviewTitle>
              <ProblemOverviewText>
                Implement a function to rotate an array by k positions. The rotation should be done
                in-place and should handle both left and right rotations efficiently. This is a
                common interview question that tests your understanding of array manipulation and
                optimization.
              </ProblemOverviewText>
            </ProblemOverview>

            <ProblemSectionTitle>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Requirements
            </ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>Implement both left and right rotation</Requirement>
              <Requirement>Handle edge cases (empty array, k {'>'} array length)</Requirement>
              <Requirement>Optimize for time and space complexity</Requirement>
              <Requirement>Write clean, readable, and well-documented code</Requirement>
              <Requirement>Include test cases for different scenarios</Requirement>
            </ProblemRequirements>

            <ProblemSectionTitle>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Example Input/Output
            </ProblemSectionTitle>
            <ExampleCode>
              {`// Example 1: Right Rotation
Input: arr = [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]

// Example 2: Left Rotation
Input: arr = [1, 2, 3, 4, 5], k = 2
Output: [3, 4, 5, 1, 2]

// Example 3: Edge Case
Input: arr = [1, 2, 3], k = 4
Output: [3, 1, 2] (k is normalized to k % arr.length)`}
            </ExampleCode>

            <ProblemSectionTitle>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Expected Behavior
            </ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>Function should handle both positive and negative k values</Requirement>
              <Requirement>Optimize for O(n) time complexity and O(1) space complexity</Requirement>
              <Requirement>Handle edge cases gracefully without errors</Requirement>
              <Requirement>Include input validation and error handling</Requirement>
              <Requirement>Document time and space complexity</Requirement>
            </ProblemRequirements>

            <ProblemSectionTitle>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Solution Approach
            </ProblemSectionTitle>
            <ProblemText>
              Consider using the reverse technique for an efficient solution: 1. Reverse the entire
              array 2. Reverse the first k elements 3. Reverse the remaining elements
            </ProblemText>

            <ProblemTags>
              <ProblemTag>Arrays</ProblemTag>
              <ProblemTag>In-place Algorithm</ProblemTag>
              <ProblemTag>Two Pointers</ProblemTag>
              <ProblemTag>Time Complexity</ProblemTag>
              <ProblemTag>Space Complexity</ProblemTag>
            </ProblemTags>
          </ProblemDescription>
        </ProblemSection>
        <EditorSection>
          <MonacoEditor
            defaultValue={`/**
 * Rotate an array by k positions
 * @param arr - The array to rotate
 * @param k - Number of positions to rotate (positive for right rotation, negative for left rotation)
 * @returns The rotated array
 */
function rotateArray(arr: number[], k: number): number[] {
  // Your code here
}

// Test cases
const testCases = [
  {
    input: { arr: [1, 2, 3, 4, 5], k: 2 },
    expected: [4, 5, 1, 2, 3]
  },
  {
    input: { arr: [1, 2, 3, 4, 5], k: -2 },
    expected: [3, 4, 5, 1, 2]
  },
  {
    input: { arr: [1, 2, 3], k: 4 },
    expected: [3, 1, 2]
  }
];

// Run tests
testCases.forEach((testCase, index) => {
  const result = rotateArray(testCase.input.arr, testCase.input.k);
  console.log(\`Test \${index + 1}:\`, {
    input: testCase.input,
    expected: testCase.expected,
    result,
    passed: JSON.stringify(result) === JSON.stringify(testCase.expected)
  });
});`}
            language="typescript"
            theme="vs-dark"
          />
        </EditorSection>
      </SplitLayout>
    ),
  },
  {
    id: 2,
    title: 'Machine Coding Problem',
    component: (
      <SplitLayout>
        <ProblemSection>
          <ProblemDescription>
            <ProblemTitle>Custom Dropdown Component</ProblemTitle>
            <ProblemText>
              Build a reusable dropdown component that supports single and multi-select
              functionality, search, keyboard navigation, and custom styling. The component should
              be highly customizable and accessible.
            </ProblemText>
            <ProblemRequirements>
              <Requirement>Implement keyboard navigation (Arrow keys, Enter, Escape)</Requirement>
              <Requirement>Support both single and multi-select modes</Requirement>
              <Requirement>Add search functionality to filter options</Requirement>
              <Requirement>
                Make it fully accessible (ARIA attributes, keyboard support)
              </Requirement>
              <Requirement>Add custom styling with hover and focus states</Requirement>
            </ProblemRequirements>

            <ProblemSectionTitle>Component API</ProblemSectionTitle>
            <ExampleCode>
              {`interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface DropdownTheme {
  colors: {
    background: string;
    text: string;
    border: string;
    hover: string;
    selected: string;
    disabled: string;
    placeholder: string;
    searchBackground: string;
    searchText: string;
  };
  spacing: {
    padding: string;
    margin: string;
    borderRadius: string;
  };
  typography: {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  };
  transitions: {
    duration: string;
    timing: string;
  };
  shadows: {
    dropdown: string;
    focus: string;
  };
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiSelect?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  theme?: Partial<DropdownTheme>;
  customStyles?: {
    container?: React.CSSProperties;
    trigger?: React.CSSProperties;
    optionsList?: React.CSSProperties;
    option?: React.CSSProperties;
    search?: React.CSSProperties;
  };
}`}
            </ExampleCode>

            <ProblemSectionTitle>Theme Implementation</ProblemSectionTitle>
            <ExampleCode>
              {`// Default Theme
const defaultTheme: DropdownTheme = {
  colors: {
    background: '#ffffff',
    text: '#333333',
    border: '#e0e0e0',
    hover: '#f5f5f5',
    selected: '#e3f2fd',
    disabled: '#f5f5f5',
    placeholder: '#9e9e9e',
    searchBackground: '#f5f5f5',
    searchText: '#333333'
  },
  spacing: {
    padding: '8px 12px',
    margin: '4px',
    borderRadius: '4px'
  },
  typography: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.5'
  },
  transitions: {
    duration: '0.2s',
    timing: 'ease-in-out'
  },
  shadows: {
    dropdown: '0 2px 4px rgba(0,0,0,0.1)',
    focus: '0 0 0 2px rgba(33,150,243,0.3)'
  }
};

// Dark Theme
const darkTheme: DropdownTheme = {
  colors: {
    background: '#1e1e1e',
    text: '#ffffff',
    border: '#333333',
    hover: '#2d2d2d',
    selected: '#1a237e',
    disabled: '#2d2d2d',
    placeholder: '#757575',
    searchBackground: '#2d2d2d',
    searchText: '#ffffff'
  },
  // ... other properties same as default
};`}
            </ExampleCode>

            <ProblemSectionTitle>Theme Usage Example</ProblemSectionTitle>
            <ExampleCode>
              {`// Using custom theme
<CustomDropdown
  options={options}
  value={selectedValue}
  onChange={handleChange}
  theme={{
    colors: {
      background: '#ffffff',
      text: '#333333',
      // ... other color overrides
    }
  }}
/>

// Using dark theme
<CustomDropdown
  options={options}
  value={selectedValue}
  onChange={handleChange}
  theme={darkTheme}
/>

// Using custom styles
<CustomDropdown
  options={options}
  value={selectedValue}
  onChange={handleChange}
  customStyles={{
    container: {
      width: '300px',
      margin: '20px'
    },
    trigger: {
      border: '2px solid #2196f3'
    },
    optionsList: {
      maxHeight: '300px'
    }
  }}
/>`}
            </ExampleCode>

            <ProblemSectionTitle>Theme Requirements</ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>Support light and dark themes out of the box</Requirement>
              <Requirement>Allow theme customization through props</Requirement>
              <Requirement>Support custom styles for individual elements</Requirement>
              <Requirement>Maintain consistent spacing and typography</Requirement>
              <Requirement>Ensure proper color contrast ratios</Requirement>
              <Requirement>Support CSS-in-JS styling solutions</Requirement>
            </ProblemRequirements>

            <ProblemSectionTitle>Example Usage</ProblemSectionTitle>
            <ExampleCode>
              {`// Single Select
<CustomDropdown
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' }
  ]}
  value={selectedValue}
  onChange={handleChange}
  placeholder="Select an option"
/>

// Multi Select with Search
<CustomDropdown
  options={options}
  value={selectedValues}
  onChange={handleMultiChange}
  multiSelect
  searchable
  placeholder="Select multiple options"
/>`}
            </ExampleCode>

            <ProblemSectionTitle>Expected Behavior</ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>Dropdown should open on click or focus</Requirement>
              <Requirement>Search should filter options in real-time</Requirement>
              <Requirement>Selected options should be highlighted</Requirement>
              <Requirement>Keyboard navigation should work intuitively</Requirement>
              <Requirement>Component should be fully responsive</Requirement>
            </ProblemRequirements>

            <ProblemSectionTitle>Implementation Details</ProblemSectionTitle>
            <ProblemText>
              Key features to implement: 1. Dropdown trigger with selected value display 2. Options
              list with scrollable container 3. Search input for filtering (when searchable) 4.
              Keyboard navigation and focus management 5. Custom styling with theme support 6.
              Accessibility features (ARIA roles, keyboard support)
            </ProblemText>

            <ProblemSectionTitle>Accessibility Requirements</ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>Proper ARIA roles and attributes</Requirement>
              <Requirement>Keyboard navigation support</Requirement>
              <Requirement>Focus management and trapping</Requirement>
              <Requirement>Screen reader compatibility</Requirement>
              <Requirement>Color contrast compliance</Requirement>
            </ProblemRequirements>

            <ProblemSectionTitle>Styling Guidelines</ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>Consistent with design system</Requirement>
              <Requirement>Responsive on all screen sizes</Requirement>
              <Requirement>Customizable through props</Requirement>
              <Requirement>Support for dark/light themes</Requirement>
              <Requirement>Smooth transitions and animations</Requirement>
            </ProblemRequirements>
          </ProblemDescription>
        </ProblemSection>
        <EditorSection>
        <iframe
            src="https://codesandbox.io/embed/custom-dropdown-component-starter-8f4j8?fontsize=14&hidenavigation=1&theme=dark&view=editor&hidedevtools=1"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title="Custom Dropdown Component"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </EditorSection>
      </SplitLayout>
    ),
  },
  {
    id: 3,
    title: 'System Design Interview',
    component: (
      <SplitLayout>
        <ProblemSection>
          <ProblemDescription>
            <ProblemTitle>Design a Real-time Chat Application</ProblemTitle>
            <ProblemText>
              Design a scalable real-time chat application that supports one-on-one and group
              messaging, message persistence, and real-time notifications. Consider factors like
              scalability, reliability, and user experience.
            </ProblemText>

            <ProblemSectionTitle>Problem Overview</ProblemSectionTitle>
            <ProblemText>
              Design and implement a real-time chat application that can handle millions of users
              with features like one-on-one messaging, group chats, and real-time notifications. The
              system should be highly available, scalable, and secure.
            </ProblemText>

            <ProblemSectionTitle>Core Features</ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>Real-time messaging with WebSocket</Requirement>
              <Requirement>One-on-one and group conversations</Requirement>
              <Requirement>Message persistence and history</Requirement>
              <Requirement>User presence and typing indicators</Requirement>
              <Requirement>File and media sharing</Requirement>
            </ProblemRequirements>

            <ProblemSectionTitle>Technical Stack</ProblemSectionTitle>
            <ProblemText>
              Frontend: • React/Next.js - UI Framework • WebSocket Client - Real-time Communication
              • Redux - State Management • Material-UI - Component Library Backend: •
              Node.js/Express - API Server • Socket.io - WebSocket Server • Redis - Caching &
              Pub/Sub • MongoDB - User Data • PostgreSQL - Messages Infrastructure: • AWS/GCP -
              Cloud Platform • Kubernetes - Container Orchestration • Nginx - Load Balancer • CDN -
              Static Assets
            </ProblemText>

            <ProblemSectionTitle>API Design</ProblemSectionTitle>
            <ExampleCode>
              {`// Core APIs
POST /api/v1/messages
GET /api/v1/messages?conversationId={id}
GET /api/v1/conversations
POST /api/v1/conversations
GET /api/v1/users/{id}/status

// WebSocket Events
message:send    - Send a new message
message:received - Message received confirmation
typing:start    - User started typing
typing:end      - User stopped typing
presence:update - User status change`}
            </ExampleCode>

            <ProblemSectionTitle>Data Models</ProblemSectionTitle>
            <ExampleCode>
              {`// Core Entities
User {
  id: UUID
  email: string
  username: string
  status: "online" | "offline" | "away"
  lastSeen: timestamp
}

Conversation {
  id: UUID
  type: "direct" | "group"
  participants: User[]
  lastMessage: Message
  updatedAt: timestamp
}

Message {
  id: UUID
  conversationId: UUID
  senderId: UUID
  content: string
  type: "text" | "media" | "file"
  status: "sent" | "delivered" | "read"
  createdAt: timestamp
}`}
            </ExampleCode>

            <ProblemSectionTitle>System Requirements</ProblemSectionTitle>
            <ProblemText>
              Performance: • Message delivery latency {'<'} 100ms • API response time {'<'} 200ms •
              99.9% uptime • Support 1M+ concurrent users Security: • End-to-end encryption • JWT
              authentication • Rate limiting • Input validation • Regular security audits
              Scalability: • Horizontal scaling • Database sharding • Caching strategy • Load
              balancing • CDN integration
            </ProblemText>

            <ProblemSectionTitle>Implementation Guidelines</ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>Start with core messaging functionality</Requirement>
              <Requirement>Implement real-time features using WebSocket</Requirement>
              <Requirement>Add message persistence and history</Requirement>
              <Requirement>Implement user presence and typing indicators</Requirement>
              <Requirement>Add file sharing and media support</Requirement>
            </ProblemRequirements>

            <ProblemSectionTitle>Evaluation Criteria</ProblemSectionTitle>
            <ProblemRequirements>
              <Requirement>
                System Architecture
                <ul>
                  <li>Scalability and performance</li>
                  <li>Security implementation</li>
                  <li>Code organization</li>
                </ul>
              </Requirement>
              <Requirement>
                Technical Implementation
                <ul>
                  <li>API design</li>
                  <li>Database schema</li>
                  <li>Real-time features</li>
                </ul>
              </Requirement>
              <Requirement>
                Best Practices
                <ul>
                  <li>Error handling</li>
                  <li>Testing coverage</li>
                  <li>Documentation</li>
                </ul>
              </Requirement>
            </ProblemRequirements>
          </ProblemDescription>
        </ProblemSection>
        <EditorSection>
          <ExcaliDrawComponent
            title="System Design Diagram"
            initialData={{
              elements: [],
              appState: {
                viewBackgroundColor: '#1e1e1e',
                currentItemFontFamily: 1,
                theme: 'dark',
              },
            }}
          />
        </EditorSection>
      </SplitLayout>
    ),
  },
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <LaptopContainer>
      <LaptopFrame>
        <LaptopScreen>
          <AnimatePresence mode="wait">
            <ScreenContent
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <CarouselContainer>
                <SlideContent>
                  <SlideHeader>
                    <SlideTitle>{slides[currentSlide].title}</SlideTitle>
                  </SlideHeader>
                  <SlideBody>{slides[currentSlide].component}</SlideBody>
                </SlideContent>
              </CarouselContainer>
            </ScreenContent>
          </AnimatePresence>
          <ScreenGlow
            animate={{
              opacity: isHovered ? 0.5 : 0.2,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        </LaptopScreen>
      </LaptopFrame>
      <LaptopBase>
        <Keyboard />
        <Trackpad />
      </LaptopBase>
      <NavigationDots>
        {slides.map((_, index) => (
          <Dot
            key={index}
            $active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </NavigationDots>
    </LaptopContainer>
  );
};

export default HeroCarousel;
