import Link from 'next/link';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  height: 4rem;
  display: flex;
  align-items: center;
  backdrop-filter: blur(8px);
  background-color: ${props => props.theme.colors.background}dd;
`;

const NavbarContent = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

export const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarContent>
        <Logo href="/">
          <span>Frontendly</span>
        </Logo>

        <NavLinks>
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/practice">Practice</NavLink>
          <NavLink href="/roadmap">Roadmap</NavLink>
          <NavLink href="/blog">Blog</NavLink>
        </NavLinks>

        <MobileMenuButton>
          <span>☰</span>
        </MobileMenuButton>
      </NavbarContent>
    </NavbarContainer>
  );
};
