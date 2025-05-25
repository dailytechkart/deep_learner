import styled from 'styled-components';
import { FaCheck, FaClock } from 'react-icons/fa';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`;

export const RoadmapSection = styled.section`
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 1rem 0;
`;

export const RoadmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const RoadmapCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 1rem 0;
`;

export const CardContent = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 0.5rem 0;
    color: ${props => props.theme.colors.textSecondary};
    transition: all 0.2s ease;
  }
`;

export const ProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: ${props => props.theme.colors.border};
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
`;

export const SectionProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

export const SectionStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

export const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;
