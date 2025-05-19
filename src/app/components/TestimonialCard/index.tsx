import React from 'react';
import { Card, CardContent } from '../TailwindComponents';

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

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          {/* Rating */}
          <div className="flex mb-4">
            {renderStars(testimonial.rating)}
          </div>

          {/* Content */}
          <p className="text-gray-600 mb-6 flex-grow">
            "{testimonial.content}"
          </p>

          {/* Author */}
          <div className="flex items-center">
            {testimonial.author.avatar ? (
              <img
                src={testimonial.author.avatar}
                alt={testimonial.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold mr-4">
                {testimonial.author.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.author.name}</h4>
              <p className="text-sm text-gray-500">
                {testimonial.author.role} at {testimonial.author.company}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 