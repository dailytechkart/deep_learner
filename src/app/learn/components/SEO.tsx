import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Learn Frontend Development | Deep Learner',
  description = 'Master modern frontend technologies with our comprehensive learning paths. Start with the basics and progress to advanced concepts at your own pace.',
  keywords = [
    'frontend development',
    'web development',
    'javascript',
    'react',
    'css',
    'learning path',
    'frontend courses',
    'web development courses',
    'programming courses',
  ],
  ogImage = '/images/learn-og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deeplearner.com';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${siteUrl}/learn`} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Deep Learner" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Deep Learner" />

      {/* Canonical URL */}
      <link rel="canonical" href={`${siteUrl}/learn`} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
};
