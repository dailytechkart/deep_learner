import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from './components/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontendly - Master Modern Frontend Development',
  description: 'Learn frontend development with hands-on projects, real-world examples, and expert guidance. Master HTML, CSS, JavaScript, React, and more.',
  keywords: 'frontend development, web development, HTML, CSS, JavaScript, React, Next.js, TypeScript, web design, UI/UX',
  authors: [{ name: 'Frontendly Team' }],
  creator: 'Frontendly',
  publisher: 'Frontendly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frontendly.com',
    title: 'Frontendly - Master Modern Frontend Development',
    description: 'Learn frontend development with hands-on projects, real-world examples, and expert guidance. Master HTML, CSS, JavaScript, React, and more.',
    siteName: 'Frontendly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontendly - Master Modern Frontend Development',
    description: 'Learn frontend development with hands-on projects, real-world examples, and expert guidance. Master HTML, CSS, JavaScript, React, and more.',
    creator: '@frontendly',
    site: '@frontendly',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
