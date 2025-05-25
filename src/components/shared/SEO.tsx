import React from 'react';
import Head from 'next/head';
import { InterviewSchemas } from '../interview/InterviewSchemas';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  includeSchemas?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  includeSchemas = false,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      {includeSchemas && <InterviewSchemas />}
    </>
  );
};
