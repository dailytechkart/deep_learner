import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { earlyAccessService } from '@/app/services/earlyAccessService';
import Analytics, { AnalyticsEvent } from '../utils/analytics';
import CountdownTimer from './CountdownTimer';
import RightDrawer from './RightDrawer';

interface OverlayScreenProps {
  isVisible: boolean;
  onClick?: () => void;
  zIndex?: number;
}

type ViewType = 'initial' | 'learnMore';

interface InterestFormData {
  email: string;
  phone: string;
  occupation: string;
  interests: string[];
  experience: string;
  goals: string;
}

const Overlay = styled.div<{ $isVisible: boolean; $zIndex?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${props => props.$zIndex || 1000};
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  visibility: ${props => (props.$isVisible ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

const Card = styled.div<{ $isVisible: boolean }>`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  cursor: default;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  visibility: ${props => (props.$isVisible ? 'visible' : 'hidden')};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundAlt};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  text-align: center;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const HighlightText = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const TimerWrapper = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.colors.border};
`;

const TimerTitle = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${props =>
    props.$variant === 'secondary' ? 'transparent' : props.theme.colors.primary};
  color: ${props => (props.$variant === 'secondary' ? props.theme.colors.primary : 'white')};
  border: ${props =>
    props.$variant === 'secondary' ? `2px solid ${props.theme.colors.primary}` : 'none'};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;

  &:hover {
    background: ${props =>
      props.$variant === 'secondary'
        ? props.theme.colors.backgroundAlt
        : props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  font-size: 1rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const PricingCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  text-align: left;
`;

const PricingTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const PricingFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.8rem 0;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.95rem;
`;

const FeatureCount = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  margin-right: 0.3rem;
`;

const FeatureCategory = styled.div`
  margin: 1.2rem 0;
`;

const CategoryTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.6;

  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const ErrorMessage = styled.div`
  background: ${props => props.theme.colors.error};
  color: white;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const OverlayScreen: React.FC<OverlayScreenProps> = ({ isVisible, onClick, zIndex }) => {
  const [currentView, setCurrentView] = useState<ViewType>('initial');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'learnMore' | 'form'>('learnMore');

  useEffect(() => {
    if (isVisible) {
      Analytics.track(AnalyticsEvent.OVERLAY_OPEN);
    }
  }, [isVisible]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleLearnMore = () => {
    Analytics.track(AnalyticsEvent.OVERLAY_LEARN_MORE_CLICK);
    setDrawerMode('learnMore');
    setIsDrawerOpen(true);
  };

  const handleGetAccess = () => {
    Analytics.track(AnalyticsEvent.OVERLAY_EARLY_ACCESS_CLICK);
    setDrawerMode('form');
    setIsDrawerOpen(true);
  };

  const handleOverlayClick = () => {
    if (onClick) {
      Analytics.track(AnalyticsEvent.OVERLAY_CLOSE);
      onClick();
    }
  };

  const renderInitialView = () => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    return (
      <>
        <Title>Coming Soon</Title>
        <Description>
          Show your interest and get <HighlightText>full premium content free</HighlightText>{' '}
          without any money! Be among the first to experience our comprehensive learning platform.
        </Description>

        <TimerWrapper>
          <TimerTitle>Launching in</TimerTitle>
          <CountdownTimer targetDate={targetDate} />
        </TimerWrapper>

        <ButtonGroup>
          <Button onClick={handleLearnMore}>Learn More</Button>
          <Button $variant="secondary" onClick={handleGetAccess}>
            I'm Interested
          </Button>
        </ButtonGroup>
      </>
    );
  };

  return (
    <Overlay $isVisible={isVisible} $zIndex={zIndex} onClick={handleOverlayClick}>
      <Card onClick={handleCardClick} $isVisible={!isDrawerOpen}>
        {currentView === 'initial' && renderInitialView()}
      </Card>
      <RightDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} mode={drawerMode} />
    </Overlay>
  );
};

export default OverlayScreen;
