import React from 'react';
import styled from 'styled-components';
import { FaCode, FaGraduationCap } from 'react-icons/fa';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}33, transparent);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};

    &::before {
      opacity: 1;
    }
  }
`;

const LogoIcon = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.primary}dd
  );
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  transform: rotate(-10deg);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${props => props.theme.colors.primary}33;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px;
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}99, transparent);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 14px;
    opacity: 0.2;
  }

  &:hover {
    transform: rotate(0deg) scale(1.05);
    box-shadow: 0 6px 16px ${props => props.theme.colors.primary}44;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SecondaryIcon = styled.div`
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 14px;
  height: 14px;
  background: ${props => props.theme.colors.background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 0.6rem;
  box-shadow: 0 2px 8px ${props => props.theme.colors.primary}33;
  border: 2px solid ${props => props.theme.colors.background};
  transition: all 0.3s ease;

  ${LogoContainer}:hover & {
    transform: scale(1.1);
  }
`;

const LogoText = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  position: relative;
  padding: 0.2rem 0;
`;

const MainText = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.text} 0%,
    ${props => props.theme.colors.primary} 50%,
    ${props => props.theme.colors.text} 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  position: relative;
  display: inline-block;
  text-shadow: 0 2px 4px ${props => props.theme.colors.primary}11;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary} 0%,
      ${props => props.theme.colors.primary}33 50%,
      transparent 100%
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  ${LogoContainer}:hover & {
    background-position: right center;
    transform: translateY(-1px);

    &::after {
      transform: scaleX(1);
    }
  }
`;

const SubText = styled.span`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  padding-left: 0.4rem;
  opacity: 0.9;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 70%;
    background: linear-gradient(
      to bottom,
      ${props => props.theme.colors.primary} 0%,
      ${props => props.theme.colors.primary}66 100%
    );
    opacity: 0.7;
    border-radius: 1px;
  }

  ${LogoContainer}:hover & {
    opacity: 1;
    transform: translateY(-1px);
    color: ${props => props.theme.colors.primary};
  }
`;

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <IconWrapper>
        <LogoIcon>
          <FaCode />
        </LogoIcon>
        <SecondaryIcon>
          <FaGraduationCap />
        </SecondaryIcon>
      </IconWrapper>
      <LogoText>
        <MainText>Frontend</MainText>
        <SubText>School</SubText>
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
