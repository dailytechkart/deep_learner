import React from 'react';
import styled from 'styled-components';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SocialButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
`;

const SocialButton = styled.button<{ provider: 'google' | 'github' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.75rem;
    font-size: 0.9rem;
    gap: 0.5rem;

    svg {
      width: 18px;
      height: 18px;
    }

    span {
      display: none;
    }
  }
`;

interface SocialButtonsProps {
  isLoading: boolean;
  isSignUp: boolean;
  onGoogleClick: () => void;
  onGithubClick: () => void;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({
  isLoading,
  isSignUp,
  onGoogleClick,
  onGithubClick,
}) => {
  return (
    <SocialButtonGroup>
      <SocialButton provider="google" onClick={onGoogleClick} disabled={isLoading}>
        <FaGoogle />
        <span>{isSignUp ? 'Sign up with Google' : 'Continue with Google'}</span>
      </SocialButton>
      <SocialButton provider="github" onClick={onGithubClick} disabled={isLoading}>
        <FaGithub />
        <span>{isSignUp ? 'Sign up with GitHub' : 'Continue with GitHub'}</span>
      </SocialButton>
    </SocialButtonGroup>
  );
};

export default SocialButtons;
