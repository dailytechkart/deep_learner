import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from './StyledComponentsRegistry';
import { AuthProvider } from './context/AuthContext';
import ThemeWrapper from './components/ThemeWrapper';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JavaScript Learning Platform",
  description: "Learn JavaScript with interactive examples and practice problems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <StyledComponentsRegistry>
          <ThemeWrapper>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
