import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import Script from 'next/script';
import StyledComponentsRegistry from '@/lib/registry';
import { GoogleAnalyticsComponent } from '@/lib/analytics';
import { getCookie } from './utils/cookies';
import { ThemeProvider } from './context/ThemeContext';
import { defaultMetadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export const metadata = defaultMetadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const promoStripVisible = getCookie('promoStripVisible') !== 'false';
  const savedTheme = getCookie('theme') || 'light';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <meta
          name="google-site-verification"
          content="Dolml-CXhdGnK-_V9nTQx7-3TIQiKIrjB0AjRXRyn84"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const savedTheme = localStorage.getItem('theme') || 
                  document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1];
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                document.cookie = 'theme=' + theme + '; path=/; max-age=' + (60 * 60 * 24 * 365);
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
          <ThemeProvider initialPromoStripVisible={promoStripVisible} initialTheme={savedTheme}>
            <Providers>
              <AuthProvider>
                <SearchProvider>{children}</SearchProvider>
              </AuthProvider>
            </Providers>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
