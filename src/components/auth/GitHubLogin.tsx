import styled from 'styled-components';
import { Github } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvent } from '@/utils/analytics';

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
  const { trackEvent } = useAnalytics();

  const handleGitHubLogin = async () => {
    try {
      trackEvent(AnalyticsEvent.USER_LOGIN, {
        action: 'login',
        provider: 'github',
        location: 'login_page',
        timestamp: new Date().toISOString(),
      });

      await signInWithGithub();
    } catch (error) {
      trackEvent(AnalyticsEvent.ERROR, {
        action: 'auth_error',
        provider: 'github',
        location: 'login_page',
        errorType: 'provider_error',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      });
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
