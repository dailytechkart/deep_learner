import styled from 'styled-components';
import Image from 'next/image';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  position: relative;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.theme.colors.sidebar};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  height: 64px;
  display: flex;
  align-items: center;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.xl};
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  flex: 1;
`;

export const QuickActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ActionButton = styled.button<{ primary?: boolean }>`
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.primary ? props.theme.colors.primary : props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.primaryDark : props.theme.colors.backgroundAlt};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CategoryList = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex: 1;
  padding: 0 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#FFFFFF' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  width: 100%;
  justify-content: space-between;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${props => props.theme.colors.primary}15;
  }

  &:active {
    transform: translateY(0);
  }

  .category-count {
    background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : props.theme.colors.backgroundAlt};
    padding: 2px 8px;
    border-radius: 12px;
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.active ? '#FFFFFF' : props.theme.colors.textSecondary};
  }
`;

export const CategoryIcon = styled.span`
  font-size: 1.1rem;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  &::before {
    content: '🎓';
    font-size: 1.8rem;
  }
`;

export const SearchContainer = styled.div<{ isFocused?: boolean }>`
  position: relative;
  width: 300px;
  transition: all 0.2s ease;

  @media (max-width: 1024px) {
    width: 200px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  ${props => props.isFocused && `
    width: 400px;
    @media (max-width: 1024px) {
      width: 300px;
    }
  `}
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::placeholder {
    color: ${props => props.theme.colors.secondary};
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text};
  opacity: 0.5;
  font-size: 1.1rem;
`;

export const ThemeToggle = styled.button`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PageContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 64px);
  margin-top: 64px;
  background: ${props => props.theme.colors.background};
  position: relative;
`;

export const Sidebar = styled.div`
  width: 320px;
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.xl};
  overflow-y: auto;
  height: calc(100vh - 64px);
  position: fixed;
  top: 64px;
  left: 0;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: 1024px) {
    width: 280px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const SidebarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#FFFFFF' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '📚';
    font-size: 1.4rem;
  }
`;

export const TopicCount = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text}80;
  background: ${props => props.theme.colors.background};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
`;

export const TopicTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  line-height: 1.2;
  font-weight: 700;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserName = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TopicMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text}80;
  font-size: 0.9rem;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TopicContent = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.75rem;
  }

  code {
    background: ${props => props.theme.colors.codeBackground};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
    color: ${props => props.theme.colors.codeText};
    border: 1px solid ${props => props.theme.colors.border};
  }

  pre {
    margin: 1.5rem 0;
    border-radius: 8px;
    overflow: hidden;
    background: ${props => props.theme.colors.codeBackground};
    border: 1px solid ${props => props.theme.colors.border};
    padding: 1rem;
    
    code {
      background: transparent;
      border: none;
      padding: 0;
      font-size: 0.95em;
      line-height: 1.6;
    }
  }
`;

export const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;

  &::before {
    content: '📝';
    font-size: 1.8rem;
  }
`;

export const SectionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ProblemStatement = styled.div`
  background: ${props => props.theme.colors.problemBackground};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  position: relative;

  &::before {
    content: '💡';
    position: absolute;
    top: -0.75rem;
    left: 1rem;
    background: ${props => props.theme.colors.background};
    padding: 0 0.5rem;
    font-size: 1.2rem;
  }
`;

export const QuizContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const QuizHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const QuizQuestion = styled.h3`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '❓';
    font-size: 1.5rem;
  }
`;

export const QuizProgress = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text}80;
`;

export const QuizOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${props => props.theme.spacing.xl};
  margin-left: 320px;
  background: ${props => props.theme.colors.background};
  min-height: calc(100vh - 64px);

  @media (max-width: 1024px) {
    margin-left: 280px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: ${props => props.theme.spacing.lg};
  }
`;

export const LandingContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const NavLogo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '🎓';
    font-size: 2rem;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LoginButton = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const SignupButton = styled.a`
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.colors.primary}40;
  }
`;

export const HeroSection = styled.section`
  padding: 8rem 2rem 4rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.colors.background};
`;

export const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, ${props => props.theme.colors.primary}10 0%, transparent 50%);
  z-index: 0;
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text}80;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text}80;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const CTAButton = styled.a`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px ${props => props.theme.colors.primary}40;
  }
`;

export const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

export const FeatureCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px ${props => props.theme.colors.border};
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

export const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text}80;
  line-height: 1.6;
  font-size: 1.1rem;
`;

export const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
`;

export const AuthCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 16px;
  box-shadow: 0 4px 24px ${props => props.theme.colors.border}40;
`;

export const AuthTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text}60;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.theme.colors.primary}40;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${props => props.theme.colors.border};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const AuthLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.colors.text}80;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const ErrorMessage = styled.div`
  padding: 0.75rem;
  background: ${props => props.theme.colors.error}15;
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: 8px;
  color: ${props => props.theme.colors.error};
  font-size: 0.9rem;
  text-align: center;
`;

export const SocialButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${props => props.theme.spacing.lg} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }
`;

export const DividerText = styled.span`
  padding: 0 ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

export const UserMenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.theme.colors.text};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.primary};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 220px;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MenuItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    font-size: 1.1rem;
  }

  &:hover {
    background: ${props => props.theme.colors.background}dd;
  }

  &[data-icon="profile"]::before {
    content: '👤';
  }

  &[data-icon="settings"]::before {
    content: '⚙️';
  }

  &[data-icon="logout"]::before {
    content: '🚪';
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.border};
  margin: 0.5rem 0;
`;

export const ProfileContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

export const ProfileCard = styled.div`
  background: ${props => props.theme.colors.sidebar};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.primary};
  color: white;
  text-align: center;
`;

export const ProfileAvatar = styled(Image)`
  border-radius: 50%;
  border: 4px solid white;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const ProfileName = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

export const ProfileEmail = styled.p`
  font-size: 1rem;
  opacity: 0.9;
`;

export const ProfileSection = styled.section`
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionContent = styled.div`
  color: ${props => props.theme.colors.secondary};
  line-height: 1.6;

  p {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

export const ProfileLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '👤';
    font-size: 1.1rem;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background};
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DashboardLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '📊';
    font-size: 1.1rem;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background};
  }
`;

export const WelcomeCard = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 6px;
  background: ${props => props.theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
  margin: ${props => props.theme.spacing.sm} 0;

  div {
    width: ${props => props.progress}%;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
`;

export const TopicCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

export const TopicCard = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const TopicCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.backgroundAlt};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  span {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const TopicCardContent = styled.div`
  padding: ${props => props.theme.spacing.lg};

  h3 {
    margin: 0 0 ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSizes.lg};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.sm};
    line-height: 1.5;
  }
`;

export const TopicCardFooter = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopicCardStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  flex: 1;

  span {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

export const TopicCardAction = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
`;

export const SidebarSection = styled.div`
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

export const SidebarSectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

export const SidebarStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

export const SidebarStatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};

  span {
    font-size: 1.2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;

    strong {
      color: ${props => props.theme.colors.text};
      font-size: ${props => props.theme.fontSizes.sm};
    }

    span {
      color: ${props => props.theme.colors.textSecondary};
      font-size: ${props => props.theme.fontSizes.xs};
    }
  }
`;

export const SidebarDivider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing.xs} 0;
`;

export const SidebarSearch = styled.div`
  position: relative;
  width: 100%;
`;

export const SidebarSearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}15;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const SidebarSearchIcon = styled.span`
  position: absolute;
  right: ${props => props.theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};
`;

export const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: auto;
`;

export const SidebarFooterText = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};

  span {
    font-size: 1.2rem;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  margin-left: ${props => props.theme.spacing.xl};

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${props => props.theme.colors.error};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`;

export const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.sm};
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  padding: ${props => props.theme.spacing.lg};
`;

export const HeroImage = styled.img`
  flex: 1;
  max-width: 500px;
  height: auto;
  object-fit: contain;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

export const RoadmapSection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

export const RoadmapTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  position: relative;
  padding-left: ${props => props.theme.spacing.xl};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.colors.border};
  }
`;

export const RoadmapItem = styled.div`
  position: relative;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};

  &::before {
    content: '';
    position: absolute;
    left: -${props => props.theme.spacing.xl};
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.background};
  }
`;

export const RoadmapContent = styled.div`
  h3 {
    margin: 0 0 ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.text};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const RoadmapTitle = styled.h3`
  font-size: ${props => props.theme.typography.h3};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.sm};
`;

export const RoadmapDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
`;

export const InterviewSection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

export const InterviewCard = styled(TopicCard)`
  background: ${props => props.theme.colors.backgroundAlt};
`;

export const InterviewHeader = styled(TopicCardHeader)`
  background: ${props => props.theme.colors.primary}10;
`;

export const InterviewContent = styled(TopicCardContent)`
  h3 {
    margin: 0 0 ${props => props.theme.spacing.sm};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const InterviewFooter = styled(TopicCardFooter)`
  border-top: 1px solid ${props => props.theme.colors.borderLight};
`;

export const InterviewStats = styled(TopicCardStats)`
  color: ${props => props.theme.colors.textSecondary};
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.sidebar};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 999;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export const MobileNavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }

  .nav-icon {
    font-size: 1.2rem;
  }
`;

export const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NavDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 280px;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 0.5rem;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const NavDropdownContent = styled.div`
  padding: 1rem;
`;

export const NavDropdownItem = styled.div`
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

export const NavDropdownTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const NavDropdownDescription = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  margin: 0.25rem 0 0;
`;

export const LandingHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  height: 64px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(8px);
  background-color: ${props => props.theme.colors.background}dd;
`;

export const LandingNavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: 3rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LandingNavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const LandingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  background: ${props => props.theme.colors.backgroundAlt};
  margin-top: -2rem;
  position: relative;
  z-index: 1;
  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: ${props => props.theme.colors.background};
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export const TestimonialsSection = styled.section`
  padding: 4rem 2rem;
  background: ${props => props.theme.colors.background};
`;

export const TestimonialCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const TestimonialContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin: 0;
  flex: 1;
`;

export const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const TestimonialRole = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

export const TestimonialAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`; 