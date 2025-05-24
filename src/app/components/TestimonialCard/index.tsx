import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import {
  TestimonialCard as StyledTestimonialCard,
  TestimonialContent,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialRole,
} from '../StyledComponents';

interface TestimonialCardProps {
  testimonial: {
    id: string;
    content: string;
    author: {
      name: string;
      role: string;
      company: string;
      avatar?: string;
    };
    rating: number;
  };
}

const StarRating = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Star = styled.span<{ $active: boolean }>`
  color: ${props => (props.$active ? props.theme.colors.primary : props.theme.colors.border)};
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const AvatarPlaceholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text};
`;

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} $active={index < rating}>
        ★
      </Star>
    ));
  };

  return (
    <StyledTestimonialCard>
      <StarRating>{renderStars(testimonial.rating)}</StarRating>
      <TestimonialContent>&ldquo;{testimonial.content}&rdquo;</TestimonialContent>
      <TestimonialAuthor>
        {testimonial.author.avatar ? (
          <TestimonialAvatar
            src={testimonial.author.avatar}
            alt={testimonial.author.name}
            width={48}
            height={48}
            priority
          />
        ) : (
          <AvatarPlaceholder>{testimonial.author.name.charAt(0)}</AvatarPlaceholder>
        )}
        <div>
          <strong>{testimonial.author.name}</strong>
          <TestimonialRole>
            {testimonial.author.role} at {testimonial.author.company}
          </TestimonialRole>
        </div>
      </TestimonialAuthor>
    </StyledTestimonialCard>
  );
};
