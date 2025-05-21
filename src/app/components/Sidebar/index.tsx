import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

interface SidebarProps {
  categories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

const SidebarContainer = styled.aside`
  width: 16rem;
  background-color: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  height: 100vh;
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const Navigation = styled.nav`
  margin-top: 1.5rem;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CategoryButton = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => (props.$isActive ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.$isActive ? '#FFFFFF' : props.theme.colors.text)};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props =>
      props.$isActive ? props.theme.colors.primary : props.theme.colors.backgroundAlt};
  }
`;

const CategoryCount = styled.span<{ $isActive: boolean }>`
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  background-color: ${props =>
    props.$isActive ? 'rgba(255, 255, 255, 0.2)' : props.theme.colors.backgroundAlt};
  color: ${props => (props.$isActive ? '#FFFFFF' : props.theme.colors.textSecondary)};
`;

export const Sidebar = ({ categories }: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <SidebarContainer>
      <SidebarContent>
        <LogoContainer>
          <Logo href="/">
            <span>Frontendly</span>
          </Logo>
        </LogoContainer>

        <Navigation>
          <CategoryList>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                href={`/category/${category.id}`}
                $isActive={isActive(`/category/${category.id}`)}
              >
                <span>{category.name}</span>
                <CategoryCount $isActive={isActive(`/category/${category.id}`)}>
                  {category.count}
                </CategoryCount>
              </CategoryButton>
            ))}
          </CategoryList>
        </Navigation>
      </SidebarContent>
    </SidebarContainer>
  );
};
