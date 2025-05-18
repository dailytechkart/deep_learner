import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  height: 3px;
  background: ${props => props.theme.colors.backgroundAlt};
  z-index: 1000;
`;

const ProgressBar = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: ${props => props.theme.colors.primary};
  transition: width 0.2s ease;
`;

interface ReadingProgressProps {
  targetRef: React.RefObject<HTMLElement>;
}

export default function ReadingProgress({ targetRef }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!targetRef.current) return;

      const element = targetRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const currentProgress = (element.scrollTop / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    const element = targetRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
  }, [targetRef]);

  return (
    <ProgressContainer>
      <ProgressBar $progress={progress} />
    </ProgressContainer>
  );
} 