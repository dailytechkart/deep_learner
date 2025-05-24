import styled from 'styled-components';
import { Github } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

const GitHubButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  background-color: #24292f;
  color: white;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(36, 41, 47, 0.9);
  }
`;

export const GitHubLogin = () => {
  const { signInWithGithub } = useAuth();

  const handleGitHubLogin = async () => {
    try {
      await signInWithGithub();
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
    }
  };

  return (
    <GitHubButton onClick={handleGitHubLogin}>
      <Github size={20} />
      Continue with GitHub
    </GitHubButton>
  );
};
