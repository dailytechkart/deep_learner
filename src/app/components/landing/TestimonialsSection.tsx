import React from 'react';
import Image from 'next/image';
import {
  TestimonialsSection as StyledTestimonialsSection,
  SectionHeader,
  SectionTitle,
  TestimonialGrid,
  TestimonialCard,
  TestimonialContent,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialInfo,
  TestimonialName,
  TestimonialRole,
  TestimonialCompany,
  TestimonialStats,
  TestimonialStat,
  StatValue,
  StatLabel,
  TestimonialTags,
  TestimonialTag,
} from '../StyledComponents';

const testimonialsData = [
  {
    content: "The curriculum is well-structured and up-to-date. I learned more in 3 months here than I did in a year of self-study. The hands-on projects and mentorship were invaluable.",
    avatar: "/avatars/user1.svg",
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    stats: [
      { value: "6x", label: "Salary Increase" },
      { value: "3", label: "Months to Job" }
    ],
    tags: ["React", "TypeScript", "System Design"]
  },
  {
    content: "The interview preparation was exceptional. The mock interviews and personalized feedback helped me land my dream job at a top tech company. The community support is amazing!",
    avatar: "/avatars/user2.svg",
    name: "Mike Chen",
    role: "Frontend Engineer",
    company: "InnovateAI",
    stats: [
      { value: "4.5", label: "GPA" },
      { value: "2", label: "Job Offers" }
    ],
    tags: ["JavaScript", "Performance", "Architecture"]
  },
  {
    content: "The advanced topics and real-world projects gave me the confidence to tackle complex challenges. The mentorship program helped me grow both technically and professionally.",
    avatar: "/avatars/user3.svg",
    name: "Emily Rodriguez",
    role: "Lead Frontend Developer",
    company: "FutureTech",
    stats: [
      { value: "5", label: "Projects" },
      { value: "100%", label: "Success Rate" }
    ],
    tags: ["Next.js", "GraphQL", "Leadership"]
  }
];

const TestimonialCardComponent: React.FC<{
  content: string;
  avatar: string;
  name: string;
  role: string;
  company: string;
  stats: Array<{ value: string; label: string }>;
  tags: string[];
}> = React.memo(({ content, avatar, name, role, company, stats, tags }) => (
  <TestimonialCard role="listitem">
    <TestimonialContent>{content}</TestimonialContent>
    <TestimonialAuthor>
      <TestimonialAvatar
        src={avatar}
        alt={name}
        width={60}
        height={60}
      />
      <TestimonialInfo>
        <TestimonialName>{name}</TestimonialName>
        <TestimonialRole>{role}</TestimonialRole>
        <TestimonialCompany>{company}</TestimonialCompany>
      </TestimonialInfo>
    </TestimonialAuthor>
    <TestimonialStats>
      {stats.map((stat, statIndex) => (
        <TestimonialStat key={statIndex}>
          <StatValue>{stat.value}</StatValue>
          <StatLabel>{stat.label}</StatLabel>
        </TestimonialStat>
      ))}
    </TestimonialStats>
    <TestimonialTags>
      {tags.map((tag, tagIndex) => (
        <TestimonialTag key={tagIndex}>{tag}</TestimonialTag>
      ))}
    </TestimonialTags>
  </TestimonialCard>
));

TestimonialCardComponent.displayName = 'TestimonialCardComponent';

const TestimonialsSection: React.FC = () => {
  return (
    <StyledTestimonialsSection id="testimonials" aria-labelledby="testimonials-title">
      <SectionHeader>
        <SectionTitle id="testimonials-title">Success Stories</SectionTitle>
      </SectionHeader>
      <TestimonialGrid>
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCardComponent
            key={index}
            content={testimonial.content}
            avatar={testimonial.avatar}
            name={testimonial.name}
            role={testimonial.role}
            company={testimonial.company}
            stats={testimonial.stats}
            tags={testimonial.tags}
          />
        ))}
      </TestimonialGrid>
    </StyledTestimonialsSection>
  );
};

export default React.memo(TestimonialsSection); 