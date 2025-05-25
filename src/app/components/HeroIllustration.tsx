import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const EditorContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 500px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const EditorButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background: ${props => props.color};
`;

const EditorTitle = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-left: 1rem;
`;

const EditorContent = styled.div`
  display: flex;
  height: calc(100% - 40px);
`;

const ProblemSection = styled.div`
  flex: 1;
  padding: 1.5rem;
  border-right: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
`;

const SolutionSection = styled.div`
  flex: 1;
  padding: 1.5rem;
  background: ${props => props.theme.colors.backgroundAlt};
`;

const CodeBlock = styled.pre`
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.text};
  margin: 0;
  white-space: pre-wrap;
`;

const Comment = styled.span`
  color: #6a9955;
`;

const Keyword = styled.span`
  color: #569cd6;
`;

const Function = styled.span`
  color: #dcdcaa;
`;

const Variable = styled.span`
  color: #9cdcfe;
`;

const HeroIllustration: React.FC = () => {
  return (
    <EditorContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <EditorHeader>
        <EditorButton color="#FF5F56" />
        <EditorButton color="#FFBD2E" />
        <EditorButton color="#27C93F" />
        <EditorTitle>Problem: Array Rotation</EditorTitle>
      </EditorHeader>
      <EditorContent>
        <ProblemSection>
          <CodeBlock>
            {'// Problem: Rotate array by k steps'}
            <br />
            {'// Input: nums = [1,2,3,4,5], k = 2'}
            <br />
            {'// Output: [4,5,1,2,3]'}
            <br />
            <br />
            <Keyword>function</Keyword> <Function>rotateArray</Function>(nums, k) {'{'}
            <br />
            {'  '}
            {'// TODO: Implement rotation'}
            <br />
            {'}'}
          </CodeBlock>
        </ProblemSection>
        <SolutionSection>
          <CodeBlock>
            <Keyword>function</Keyword> <Function>rotateArray</Function>(nums, k) {'{'}
            <br />
            {'  '}k = k % nums.length;
            <br />
            {'  '}
            <Keyword>const</Keyword> <Variable>reverse</Variable> = (start, end) ={'>'} {'{'}
            <br />
            {'    '}
            <Keyword>while</Keyword> (start {'>'} end) {'{'}
            <br />
            {'      '}[nums[start], nums[end]] = [nums[end], nums[start]];
            <br />
            {'      '}start++;
            <br />
            {'      '}end--;
            <br />
            {'    '}
            {'}'}
            <br />
            {'  '}
            {'}'};
            <br />
            <br />
            {'  '}reverse(0, nums.length - 1);
            <br />
            {'  '}reverse(0, k - 1);
            <br />
            {'  '}reverse(k, nums.length - 1);
            <br />
            {'  '}
            <Keyword>return</Keyword> nums;
            <br />
            {'}'}
          </CodeBlock>
        </SolutionSection>
      </EditorContent>
    </EditorContainer>
  );
};

export default HeroIllustration;
