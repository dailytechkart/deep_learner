import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TestimonialWrapper = styled.div`
  position: relative;
  min-height: 160px;
  margin-bottom: 0.75rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${props => props.theme.borderRadius.lg};
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const TestimonialSlide = styled.div<{ isActive: boolean }>`
  opacity: ${props => (props.isActive ? 1 : 0)};
  transform: translateX(${props => (props.isActive ? '0' : '100%')});
  transition: all 0.5s ease;
  position: absolute;
  width: calc(100% - 3rem);
  left: 1.5rem;
  top: 1.5rem;
`;

const TestimonialQuote = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
  opacity: 0.9;
  position: relative;
  padding-left: 1.25rem;
  color: #ffffff;

  &::before {
    content: '"';
    position: absolute;
    left: 0;
    top: -0.5rem;
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    opacity: 0.5;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  p:first-child {
    font-weight: 600;
    margin-bottom: 0.125rem;
    font-size: 0.9rem;
    color: #ffffff;
  }

  p:last-child {
    opacity: 0.7;
    font-size: 0.8rem;
    color: #cccccc;
  }
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
`;

const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
`;

const CarouselDot = styled.button<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props =>
    props.isActive ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.2)'};
  border: 2px solid ${props => (props.isActive ? props.theme.colors.primary : 'transparent')};
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: scale(1.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: ${props => (props.isActive ? props.theme.colors.primary + '20' : 'transparent')};
    z-index: -1;
  }
`;

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentTestimonial) return;
    setIsTransitioning(true);
    setCurrentTestimonial(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <TestimonialWrapper>
      {testimonials.map((testimonial, index) => (
        <TestimonialSlide key={index} isActive={index === currentTestimonial}>
          <TestimonialQuote>{testimonial.quote}</TestimonialQuote>
          <TestimonialAuthor>
            <AuthorAvatar>{testimonial.avatar}</AuthorAvatar>
            <div>
              <p>{testimonial.author}</p>
              <p>
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
          </TestimonialAuthor>
        </TestimonialSlide>
      ))}
      <CarouselDots>
        {testimonials.map((_, index) => (
          <CarouselDot
            key={index}
            isActive={index === currentTestimonial}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </CarouselDots>
    </TestimonialWrapper>
  );
};

export default TestimonialSection;
