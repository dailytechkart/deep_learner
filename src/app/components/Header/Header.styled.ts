import styled from 'styled-components';
import Link from 'next/link';
import Logo from '../Logo';
import { UserMenu } from '../UserMenu';
import { UserMenuProps } from './Header.types';

export const HeaderContainer = styled.header<{ promoStripVisible: boolean }>`
  position: fixed;
  /* top: ${({ promoStripVisible }) => (promoStripVisible ? '44px' : '0px')}; */
  left: 0;
  right: 0;
  height: 72px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  z-index: 15;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all ${({ theme }) => theme.transitions.default};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  flex: 1;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
`;

export const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.95rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.2s ease;
  }

  &:hover::after,
  &[aria-current='page']::after {
    width: 100%;
  }
`;

export const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PromoStrip = styled.div<{ isVisible: boolean }>`
  width: 100vw;
  height: ${props => (props.isVisible ? '24px' : '0')};
  background: linear-gradient(90deg, #ffe082 0%, #ffd54f 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height 0.3s ease;
  overflow: hidden;

  @media (max-width: 480px) {
    height: ${props => (props.isVisible ? '20px' : '0')};
  }
`;

export const PromoStripContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  padding: 0 2rem;
`;

export const PromoStripText = styled.span`
  width: 100%;
  text-align: center;
  font-size: 0.92rem;
  font-weight: 700;
  color: #7c4a00;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow:
    0 1px 2px #fff8,
    0 0px 1px #ffd54f99;
  padding: 0 1rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0 0.5rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #7c4a00;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(124, 74, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #7c4a00;
    outline-offset: 2px;
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SignInButton = styled(NavLink)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: white;
    transform: translateY(-1px);
  }

  &::after {
    display: none;
  }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: 1;
  transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
  transition: transform ${({ theme }) => theme.transitions.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  max-height: calc(100vh - 56px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.default};
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

export const StyledLogo = styled(Logo)``;

export const SearchInput = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  width: 200px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const PricingDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 400px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 1.5rem;
  margin-top: 0.5rem;
  z-index: 1000;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transform-origin: top left;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    width: calc(100vw - 2rem);
    left: -1rem;
  }
`;

export const PricingDropdownHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const PricingDropdownTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const PricingDropdownPrice = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const CurrentPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const OriginalPrice = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: line-through;
`;

export const DiscountBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const PricingFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const PricingFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`;

export const PricingCTA = styled.a`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

export const PricingNote = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 1rem;
`;

export const MemberButton = styled.button`
  background: ${({ theme }) => theme.colors.accent3};
  color: #7c4a00;
  padding: 0.5rem 1.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.accent7};
    transform: translateY(-1px);
  }
`;
