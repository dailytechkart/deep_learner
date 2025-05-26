import { Metadata } from 'next';

const defaultTitle = 'Frontend School - Master Frontend Development with Interactive Projects';
const defaultDescription =
  'Learn frontend development through hands-on projects, real-world applications, and expert guidance. Master HTML, CSS, JavaScript, React, and modern web development tools.';
const defaultImage = 'https://www.frontendschool.in/og-image.png';
const siteUrl = 'https://www.frontendschool.in';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | Frontend School',
  },
  description: defaultDescription,
  keywords: [
    'frontend development',
    'web development',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'TypeScript',
    'web design',
    'responsive design',
    'UI/UX',
    'frontend frameworks',
  ],
  authors: [{ name: 'Frontend School' }],
  creator: 'Frontend School',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: 'Frontend School',
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: 'Frontend School',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultImage],
    creator: '@frontendschool',
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export function generateMetadata({
  title,
  description,
  image,
  path,
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
} = {}): Metadata {
  const metadata: Metadata = {
    ...defaultMetadata,
    title: title ? `${title} | Frontend School` : defaultTitle,
    description: description || defaultDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title || defaultTitle,
      description: description || defaultDescription,
      url: path ? `${siteUrl}${path}` : siteUrl,
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title || 'Frontend School',
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: [image || defaultImage],
    },
  };

  return metadata;
}
