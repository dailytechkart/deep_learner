import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.sidebar};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const HeaderContent = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
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
  gap: 1rem;
  margin-left: auto;
`;

export const ActionButton = styled.button`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '600' : '400'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${props => props.theme.colors.primary}15;
  }

  &:active {
    transform: translateY(0);
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

export const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  min-width: 300px;
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
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding-top: 64px;
`;

export const Sidebar = styled.div`
  width: 320px;
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  overflow-y: auto;
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  color: ${props => props.theme.colors.text};
  font-weight: 500;
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
  margin-bottom: 3rem;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px ${props => props.theme.colors.border};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
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
  background: ${props => props.theme.colors.background};
  overflow-y: auto;
  height: calc(100vh - 64px);
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
  gap: 1rem;
  width: 100%;
`;

export const SocialButton = styled.button<{ provider: 'google' | 'github' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  img {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${props => props.theme.colors.background}dd;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px ${props => props.theme.colors.border}40;
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1.5rem 0;
  color: ${props => props.theme.colors.text}60;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.border};
  }
`;

export const DividerText = styled.span`
  padding: 0 1rem;
  font-size: 0.9rem;
`; 