'use client';
import Link from 'next/link';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';

const Container = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background};
`;

const ContentWrapper = styled.div`
  max-width: 28rem;
  width: 100%;
  text-align: center;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h1`
  font-size: 9rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  line-height: 1;
`;

const Subtitle = styled.h2`
  margin-top: 1.5rem;
  font-size: 1.875rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
`;

const Description = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px white,
      0 0 0 4px ${props => props.theme.colors.primary};
  }
`;

export default function NotFound() {
  return (
    <MainLayout>
      <Container>
        <ContentWrapper>
          <div>
            <Title>404</Title>
            <Subtitle>Page Not Found</Subtitle>
            <Description>Sorry, we couldn't find the page you're looking for.</Description>
          </div>
          <StyledLink href="/">Go back home</StyledLink>
        </ContentWrapper>
      </Container>
    </MainLayout>
  );
}
