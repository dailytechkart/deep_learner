import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../../components/Logo';
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex: 1;
    width: 100vw;
    height: 100vh;
    padding: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &::before {
      background: linear-gradient(
        135deg,
        ${props => props.theme.colors.background} 0%,
        ${props => props.theme.colors.backgroundHover || props.theme.colors.background} 100%
      );
      opacity: 0.8;
    }
  }
`;

const RightLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  .compact-logo {
    display: block;
  }

  .full-logo {
    display: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: 0;
    padding: 1rem 1.5rem;
    width: 100%;
    height: auto;
    min-height: unset;
    max-height: unset;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    .compact-logo {
      display: none;
    }

    .full-logo {
      display: block;
      width: auto;
      height: 40px;
      max-width: 160px;
      object-fit: contain;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.75rem 1rem;

    .full-logo {
      height: 32px;
      max-width: 140px;
    }
  }
`;

const StyledAuthCard = styled(AuthCard)`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: 100%;
    height: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    background: ${props => props.theme.colors.background};
    border: none;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &:hover {
      transform: none;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${props => props.theme.colors.background};
      opacity: 0.95;
      z-index: -1;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: 0 1.5rem;
  margin-top: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 1.5rem;
    margin-top: 0;
    width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 1rem;
  }
`;

const StyledAuthTitle = styled(AuthTitle)`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.35rem;
  }
`;

const StyledAuthSubtitle = styled(AuthSubtitle)`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 0.9rem;
    margin-bottom: 1.75rem;
    line-height: 1.4;
    padding: 0 0.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }
`;

const StyledDivider = styled(Divider)`
  width: 100%;
  max-width: 400px;
  margin: 1.5rem 0;
  font-size: 0.8rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const StyledToggleText = styled(ToggleText)`
  width: 100%;
  max-width: 400px;
  margin-top: 1.5rem;
  font-size: 0.8rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    padding: 0;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    padding: 0;
  }
`;

const SocialButtonsWrapper = styled.div`
  width: 100%;
  max-width: 400px;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    max-width: 100%;
    padding: 0;
  }
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
      <StyledAuthCard>
        <RightLogoWrapper>
          <div className="compact-logo">
            <CompactLogo />
          </div>
          <div className="full-logo">
            <Logo />
          </div>
        </RightLogoWrapper>
        <ContentWrapper>
          <StyledAuthTitle>{isSignUp ? 'Create Account' : 'Welcome back!'}</StyledAuthTitle>
          <StyledAuthSubtitle>
            {isSignUp
              ? 'Join our community of learners and start your journey today'
              : "It's nice to see you again. Ready to continue learning?"}
          </StyledAuthSubtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormWrapper>
            <AuthForm
              isSignUp={isSignUp}
              isLoading={isLoading}
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={onEmailLogin}
              onForgotPassword={onForgotPassword}
            />
          </FormWrapper>

          <StyledDivider>or continue with</StyledDivider>

          <SocialButtonsWrapper>
            <SocialButtons
              isLoading={isLoading}
              isSignUp={isSignUp}
              onGoogleClick={onGoogleLogin}
              onGithubClick={onGithubLogin}
            />
          </SocialButtonsWrapper>

          <StyledToggleText>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <ToggleButton onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Log in' : 'Sign up'}
            </ToggleButton>
          </StyledToggleText>
        </ContentWrapper>
      </StyledAuthCard>
    </RightSectionContainer>
  );
};

export default RightSection;
