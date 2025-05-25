import React, { useState } from 'react';
import styled from 'styled-components';
import CompactLogo from '../../components/CompactLogo';
import {
  AuthCard,
  AuthTitle,
  AuthSubtitle,
  ErrorMessage,
  Divider,
  ToggleText,
  ToggleButton,
} from './styles';
import AuthForm from './AuthForm';
import SocialButtons from './SocialButtons';

const RightSectionContainer = styled.div`
  flex: 0.4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    backdrop-filter: blur(10px);
    z-index: 0;
  }
`;

const RightLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

interface RightSectionProps {
  isLoading: boolean;
  error: string;
  onGoogleLogin: () => void;
  onGithubLogin: () => void;
  onEmailLogin: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}

const RightSection: React.FC<RightSectionProps> = ({
  isLoading,
  error,
  onGoogleLogin,
  onGithubLogin,
  onEmailLogin,
  onForgotPassword,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <RightSectionContainer>
      <AuthCard>
        <RightLogoWrapper>
          <CompactLogo />
        </RightLogoWrapper>
        <AuthTitle>{isSignUp ? 'Create Account' : 'Welcome back!'}</AuthTitle>
        <AuthSubtitle>
          {isSignUp
            ? 'Join our community of learners and start your journey today'
            : "It's nice to see you again. Ready to continue learning?"}
        </AuthSubtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <AuthForm
          isSignUp={isSignUp}
          isLoading={isLoading}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={onEmailLogin}
          onForgotPassword={onForgotPassword}
        />

        <Divider>or continue with</Divider>

        <SocialButtons
          isLoading={isLoading}
          isSignUp={isSignUp}
          onGoogleClick={onGoogleLogin}
          onGithubClick={onGithubLogin}
        />

        <ToggleText>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <ToggleButton onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Log in' : 'Sign up'}
          </ToggleButton>
        </ToggleText>
      </AuthCard>
    </RightSectionContainer>
  );
};

export default RightSection;
