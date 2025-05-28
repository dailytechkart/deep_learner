import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { earlyAccessService } from '@/app/services/earlyAccessService';
import Analytics, { AnalyticsEvent } from '../utils/analytics';

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'learnMore' | 'form';
}

const DrawerContent = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
  background: ${props => props.theme.colors.cardBackground};
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  padding: 2rem;

  @media (max-width: 768px) {
    width: 100%;
  }

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
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const FeatureCategory = styled.div`
  margin: 2rem 0;
`;

const CategoryTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 1.3rem;
    background: ${props => props.theme.colors.primary};
    border-radius: 2px;
  }
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.5;
  padding: 1rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const FeatureCount = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  min-width: 65px;
`;

const FeatureDescription = styled.div`
  flex: 1;
`;

const CTAButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  margin-top: 2rem;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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
  font-size: 0.95rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  font-size: 0.95rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 0.95rem;
  padding: 0.6rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    margin: 0;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 4px;
    appearance: none;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    background: ${props => props.theme.colors.background};

    &:checked {
      background: ${props => props.theme.colors.primary};
      border-color: ${props => props.theme.colors.primary};
    }

    &:checked::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
    }
  }
`;

const SuccessMessage = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;

  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }
`;

const ErrorMessage = styled.div`
  background: ${props => props.theme.colors.error};
  color: white;
  padding: 0.8rem;
  border-radius: 6px;
  margin: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.4;
`;

interface InterestFormData {
  email: string;
  phone: string;
  occupation: string;
  company: string;
  interests: string[];
  experience: string;
  goals: string;
}

export const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onClose, mode }) => {
  const [formData, setFormData] = useState<InterestFormData>({
    email: '',
    phone: '',
    occupation: '',
    company: '',
    interests: [],
    experience: '',
    goals: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentMode, setCurrentMode] = useState<'learnMore' | 'form'>(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  useEffect(() => {
    if (isOpen) {
      if (currentMode === 'learnMore') {
        Analytics.track(AnalyticsEvent.OVERLAY_LEARN_MORE_CLICK);
      } else {
        Analytics.track(AnalyticsEvent.OVERLAY_EARLY_ACCESS_CLICK);
      }
    }
  }, [isOpen, currentMode]);

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await earlyAccessService.registerUser({
        ...formData,
      });

      if (response.success) {
        Analytics.track(AnalyticsEvent.OVERLAY_FORM_SUBMIT, {
          occupation: formData.occupation,
          company: formData.company,
          experience: formData.experience,
          interests: formData.interests,
          hasGoals: !!formData.goals,
        });
        setSubmitStatus('success');
        setFormData({
          email: '',
          phone: '',
          occupation: '',
          company: '',
          interests: [],
          experience: '',
          goals: '',
        });
      } else {
        if (response.error === 'EMAIL_EXISTS') {
          Analytics.track(AnalyticsEvent.ERROR, { error: 'EMAIL_EXISTS' });
          setSubmitStatus('error');
          setFormData(prev => ({ ...prev, email: '' }));
        } else if (response.error === 'PHONE_EXISTS') {
          Analytics.track(AnalyticsEvent.ERROR, { error: 'PHONE_EXISTS' });
          setSubmitStatus('error');
          setFormData(prev => ({ ...prev, phone: '' }));
        } else {
          Analytics.track(AnalyticsEvent.ERROR, { error: 'UNKNOWN_ERROR' });
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Analytics.track(AnalyticsEvent.ERROR, { error: 'SUBMISSION_ERROR' });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrawerClose = () => {
    Analytics.track(AnalyticsEvent.OVERLAY_CLOSE);
    onClose();
  };

  const handleGetEarlyAccess = () => {
    Analytics.track(AnalyticsEvent.OVERLAY_EARLY_ACCESS_CLICK);
    setCurrentMode('form');
  };

  const renderLearnMore = () => (
    <>
      <Title>Premium Content Access</Title>
      <Description>
        Get access to our comprehensive learning platform with extensive resources and support
      </Description>

      <FeatureCategory>
        <CategoryTitle>DSA & Problem Solving</CategoryTitle>
        <FeatureList>
          <FeatureItem>
            <FeatureCount>150+</FeatureCount>
            <FeatureDescription>
              DSA Problems with detailed solutions and explanations
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureCount>50+</FeatureCount>
            <FeatureDescription>
              Machine Coding Problems with real-world scenarios
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureCount>100+</FeatureCount>
            <FeatureDescription>
              System Design Problems covering various architectures
            </FeatureDescription>
          </FeatureItem>
        </FeatureList>
      </FeatureCategory>

      <FeatureCategory>
        <CategoryTitle>Interview Preparation</CategoryTitle>
        <FeatureList>
          <FeatureItem>
            <FeatureCount>500+</FeatureCount>
            <FeatureDescription>Curated Interview Questions from top companies</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureCount>200+</FeatureCount>
            <FeatureDescription>
              Company-specific Questions with detailed solutions
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureCount>50+</FeatureCount>
            <FeatureDescription>Mock Interviews with industry experts</FeatureDescription>
          </FeatureItem>
        </FeatureList>
      </FeatureCategory>

      <FeatureCategory>
        <CategoryTitle>Learning Resources</CategoryTitle>
        <FeatureList>
          <FeatureItem>
            <FeatureCount>100+</FeatureCount>
            <FeatureDescription>
              High-quality Video Tutorials covering all topics
            </FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureCount>30+</FeatureCount>
            <FeatureDescription>Live Workshops with hands-on practice</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureCount>24/7</FeatureCount>
            <FeatureDescription>Active Community Support and Discussion</FeatureDescription>
          </FeatureItem>
        </FeatureList>
      </FeatureCategory>

      <FeatureCategory>
        <CategoryTitle>Additional Benefits</CategoryTitle>
        <FeatureList>
          <FeatureItem>
            <FeatureCount>✓</FeatureCount>
            <FeatureDescription>Personalized Resume Review & Feedback</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureCount>✓</FeatureCount>
            <FeatureDescription>One-on-one Career Guidance Sessions</FeatureDescription>
          </FeatureItem>
          <FeatureItem>
            <FeatureCount>✓</FeatureCount>
            <FeatureDescription>Direct Job Referrals to Partner Companies</FeatureDescription>
          </FeatureItem>
        </FeatureList>
      </FeatureCategory>

      <CTAButton onClick={handleGetEarlyAccess}>Get Early Access</CTAButton>
    </>
  );

  const renderForm = () => (
    <>
      <Title>Get Early Access</Title>
      <Description>Fill out this form to get free premium access when we launch!</Description>

      {submitStatus === 'success' ? (
        <SuccessMessage>
          <p>Thank you for your interest! 🎉</p>
          <p>
            We will inform you once we are live. As an early access user, you will receive{' '}
            <strong>full premium access completely free</strong> - no payment required!
          </p>
          <p>Keep an eye on your email for updates.</p>
        </SuccessMessage>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              disabled={isSubmitting}
              placeholder="Enter your email address"
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              required
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              disabled={isSubmitting}
              placeholder="Enter your phone number"
            />
          </FormGroup>

          <FormGroup>
            <Label>Occupation</Label>
            <Input
              type="text"
              required
              value={formData.occupation}
              onChange={e => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
              disabled={isSubmitting}
              placeholder="Enter your current role"
            />
          </FormGroup>

          <FormGroup>
            <Label>Current Company</Label>
            <Input
              type="text"
              required
              value={formData.company}
              onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
              disabled={isSubmitting}
              placeholder="Enter your current company"
            />
          </FormGroup>

          <FormGroup>
            <Label>Years of Experience</Label>
            <Select
              value={formData.experience}
              onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              required
              disabled={isSubmitting}
            >
              <option value="">Select experience</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Interested In</Label>
            <CheckboxGroup>
              {[
                { id: 'learning', label: 'Learning' },
                { id: 'system-design', label: 'System Design' },
                { id: 'dsa', label: 'DSA' },
                { id: 'interview', label: 'Interview Preparation' },
              ].map(({ id, label }) => (
                <CheckboxLabel key={id}>
                  <input
                    type="checkbox"
                    id={id}
                    checked={formData.interests.includes(label)}
                    onChange={() => handleInterestChange(label)}
                    disabled={isSubmitting}
                  />
                  {label}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          </FormGroup>

          <FormGroup>
            <Label>Your Goals (Optional)</Label>
            <Input
              type="text"
              placeholder="What do you want to achieve?"
              value={formData.goals}
              onChange={e => setFormData(prev => ({ ...prev, goals: e.target.value }))}
              disabled={isSubmitting}
            />
          </FormGroup>

          {submitStatus === 'error' && (
            <ErrorMessage>
              {formData.email === '' && formData.phone === ''
                ? 'There was an error submitting your form. Please try again.'
                : formData.email === ''
                  ? 'This email is already requested for early access. Please use a different email address.'
                  : 'This phone number is already registered. Please use a different phone number.'}
            </ErrorMessage>
          )}

          <CTAButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Get Early Access'}
          </CTAButton>
        </Form>
      )}
    </>
  );

  return (
    <DrawerContent $isOpen={isOpen}>
      <CloseButton onClick={handleDrawerClose}>×</CloseButton>
      <ContentWrapper>
        {currentMode === 'learnMore' ? renderLearnMore() : renderForm()}
      </ContentWrapper>
    </DrawerContent>
  );
};

export default RightDrawer;
