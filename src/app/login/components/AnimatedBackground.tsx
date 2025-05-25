import React from 'react';
import styled from 'styled-components';

const AnimatedBackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0.03;
  pointer-events: none;
`;

const CodeLine = styled.div<{ delay: number; duration: number }>`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: ${props => props.theme.colors.primary};
  opacity: 0.5;
  animation: slideRight ${props => props.duration}s linear ${props => props.delay}s infinite;

  @keyframes slideRight {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const CodeBlock = styled.div<{ top: number; left: number; delay: number }>`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  width: 100px;
  height: 60px;
  border: 1px solid ${props => props.theme.colors.primary};
  opacity: 0.1;
  animation: fadeInOut 4s ease-in-out ${props => props.delay}s infinite;

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.2;
    }
  }

  &::before {
    content: '{';
    position: absolute;
    top: 5px;
    left: 5px;
    color: ${props => props.theme.colors.primary};
    font-family: monospace;
    font-size: 12px;
  }

  &::after {
    content: '}';
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: ${props => props.theme.colors.primary};
    font-family: monospace;
    font-size: 12px;
  }
`;

const FloatingElement = styled.div<{ top: number; left: number; delay: number; size: number }>`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 1px solid ${props => props.theme.colors.primary};
  opacity: 0.1;
  animation: float 6s ease-in-out ${props => props.delay}s infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
`;

const AnimatedBackground: React.FC = () => {
  const generateCodeLines = () => {
    const lines = [];
    for (let i = 0; i < 10; i++) {
      lines.push(
        <CodeLine
          key={`line-${i}`}
          delay={i * 0.5}
          duration={3 + Math.random() * 2}
          style={{ top: `${Math.random() * 100}%` }}
        />
      );
    }
    return lines;
  };

  const generateCodeBlocks = () => {
    const blocks = [];
    for (let i = 0; i < 5; i++) {
      blocks.push(
        <CodeBlock
          key={`block-${i}`}
          top={Math.random() * 80 + 10}
          left={Math.random() * 80 + 10}
          delay={i * 0.8}
        />
      );
    }
    return blocks;
  };

  const generateFloatingElements = () => {
    const elements = [];
    for (let i = 0; i < 8; i++) {
      elements.push(
        <FloatingElement
          key={`float-${i}`}
          top={Math.random() * 80 + 10}
          left={Math.random() * 80 + 10}
          delay={i * 0.6}
          size={20 + Math.random() * 30}
        />
      );
    }
    return elements;
  };

  return (
    <AnimatedBackgroundContainer>
      {generateCodeLines()}
      {generateCodeBlocks()}
      {generateFloatingElements()}
    </AnimatedBackgroundContainer>
  );
};

export default AnimatedBackground;
