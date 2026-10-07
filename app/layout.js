import './globals.css';

export const metadata = {
  metadataBase: new URL('https://appmotive.com'),
  title: {
    default: 'AppMotive Technologies — Digital Product Engineering Agency',
    template: '%s | AppMotive Technologies',
  },
  description:
    'AppMotive Technologies is a modern digital product engineering agency specializing in high-performance Web Development, Mobile Applications, AI Automation, Digital Commerce, and Cloud Services.',
  keywords: [
    'Web Development Agency',
    'Mobile App Development',
    'AI & Automation Solutions',
    'Next.js Development',
    'React Native Mobile Apps',
    'Digital Product Design',
    'Cloud Architecture & DevOps',
    'AppMotive Technologies',
  ],
  authors: [{ name: 'AppMotive Technologies', url: 'https://appmotive.com' }],
  creator: 'AppMotive Technologies',
  publisher: 'AppMotive Technologies',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://appmotive.com',
    siteName: 'AppMotive Technologies',
    title: 'AppMotive Technologies — Digital Product Engineering Agency',
    description:
      'Engineered for speed, clarity and conversion. We build custom web apps, mobile products, AI workflows, and digital commerce.',
    images: [
      {
        url: '/hero-home.png',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Digital Product Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppMotive Technologies — Digital Product Engineering Agency',
    description:
      'We build high-performance web apps, mobile products, AI workflows, and digital commerce for ambitious companies.',
    images: ['/hero-home.png'],
  },
  icons: {
    icon: [
      { url: '/web-logo.png', type: 'image/png' },
      { url: '/web-logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/web-logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-logo.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/web-logo.png',
    apple: [
      { url: '/web-logo.png' },
      { url: '/web-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/web-logo.png',
      },
    ],
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AppMotive Technologies',
  url: 'https://appmotive.com',
  logo: 'https://appmotive.com/web-logo.png',
  description:
    'AppMotive Technologies is a digital product engineering agency specializing in Web Development, Mobile Apps, AI & Automation, and Cloud Infrastructure.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@appmotive.com',
    contactType: 'customer service',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://twitter.com',
    'https://linkedin.com',
    'https://github.com',
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AppMotive Technologies',
  url: 'https://appmotive.com',
  publisher: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    logo: 'https://appmotive.com/web-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/web-logo.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/web-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/web-logo.png" sizes="180x180" />
        <link rel="apple-touch-icon-precomposed" href="/web-logo.png" />
        <meta name="msapplication-TileImage" content="/web-logo.png" />
        <meta name="msapplication-TileColor" content="#07101d" />
        <meta name="theme-color" content="#ffffff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
