import { generateMetadata } from '../metadata';

export const metadata = generateMetadata({
  title: 'Learn Frontend Development',
  description:
    'Start your journey to becoming a frontend developer with our comprehensive learning paths. Master HTML, CSS, JavaScript, and modern frameworks.',
  path: '/learn',
  image: 'https://www.frontendschool.in/learn-og-image.png',
});

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
