import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Script from 'next/script';
import StyledComponentsRegistry from '@/lib/registry';
import { GoogleAnalyticsComponent } from '@/lib/analytics';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Deep Learner - Master Frontend Development with Interactive Projects',
  description:
    'Learn frontend development through hands-on projects, real-world applications, and expert guidance. Master HTML, CSS, JavaScript, React, and modern web development tools.',
  keywords:
    'frontend development, web development, HTML, CSS, JavaScript, React, TypeScript, web design, responsive design, UI/UX, frontend frameworks',
  openGraph: {
    title: 'Deep Learner - Master Frontend Development',
    description:
      'Learn frontend development through hands-on projects and expert guidance. Start your journey to becoming a frontend expert today.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Learner - Master Frontend Development',
    description:
      'Learn frontend development through hands-on projects and expert guidance. Start your journey to becoming a frontend expert today.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme) {
                  document.documentElement.setAttribute('data-theme', savedTheme);
                } else {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                }
              } catch (e) {
                console.error('Error setting initial theme:', e);
              }
            })();
          `}
        </Script>
        <GoogleAnalyticsComponent />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <StyledComponentsRegistry>
          <Providers>
            <AuthProvider>
              <SearchProvider>{children}</SearchProvider>
            </AuthProvider>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
