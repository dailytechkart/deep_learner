import React from 'react';
import { TestimonialCard } from '../TestimonialCard';
import { Container, Section, SectionHeader, SectionTitle } from '../TailwindComponents';

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

export const TestimonialList: React.FC<TestimonialListProps> = ({
  testimonials,
  title = 'What Our Users Say',
}) => {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
