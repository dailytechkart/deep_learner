import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Script from 'next/script';
import StyledComponentsRegistry from '@/lib/registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Frontendly - Master Modern Frontend Development',
  description:
    'Learn frontend development with hands-on projects, real-world examples, and expert guidance. Master HTML, CSS, JavaScript, React, and more.',
  keywords:
    'frontend development, web development, HTML, CSS, JavaScript, React, Next.js, TypeScript, web design, UI/UX, frontend courses, web development tutorials',
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
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://frontendly.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://frontendly.com',
    title: 'Frontendly - Master Modern Frontend Development',
    description:
      'Learn frontend development with hands-on projects, real-world examples, and expert guidance. Master HTML, CSS, JavaScript, React, and more.',
    siteName: 'Frontendly',
    images: [
      {
        url: 'https://frontendly.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Frontendly - Modern Frontend Development Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontendly - Master Modern Frontend Development',
    description:
      'Learn frontend development with hands-on projects, real-world examples, and expert guidance. Master HTML, CSS, JavaScript, React, and more.',
    creator: '@frontendly',
    site: '@frontendly',
    images: ['https://frontendly.com/twitter-image.jpg'],
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
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AuthProvider>
          <SearchProvider>
            <StyledComponentsRegistry>
              <Providers>
                <main id="main-content" role="main">
                  {children}
                </main>
              </Providers>
            </StyledComponentsRegistry>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
