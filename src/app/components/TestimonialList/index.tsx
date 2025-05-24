import React from 'react';
import { TestimonialCard } from '../TestimonialCard';
import { TestimonialsSection, SectionHeader, SectionTitle } from '../StyledComponents';
import styled from 'styled-components';

interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating: number;
}

interface TestimonialListProps {
  testimonials: Testimonial[];
  title?: string;
}

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${props => props.theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TestimonialList: React.FC<TestimonialListProps> = ({
  testimonials,
  title = 'What Our Users Say',
}) => {
  return (
    <TestimonialsSection>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      <TestimonialsGrid>
        {testimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </TestimonialsGrid>
    </TestimonialsSection>
  );
};
