import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.appmotivetechnologies.com'),
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
  authors: [{ name: 'AppMotive Technologies', url: 'https://www.appmotivetechnologies.com' }],
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
    url: 'https://www.appmotivetechnologies.com',
    siteName: 'AppMotive Technologies',
    title: 'AppMotive Technologies — Digital Product Engineering Agency',
    description:
      'Engineered for speed, clarity and conversion. We build custom web apps, mobile products, AI workflows, and digital commerce.',
    images: [
      {
        url: '/hero-home.webp',
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
    images: ['/hero-home.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'Q1ESQbbvSS6U7M8a1wogX3weTgBuUXN6OC74cKgWM6c',
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AppMotive Technologies',
  url: 'https://www.appmotivetechnologies.com',
  logo: 'https://www.appmotivetechnologies.com/web-logo.png',
  description:
    'AppMotive Technologies is a digital product engineering agency specializing in Web Development, Mobile Apps, AI & Automation, and Cloud Infrastructure.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@appmotivetechnologies.com',
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
  url: 'https://www.appmotivetechnologies.com',
  publisher: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    logo: 'https://www.appmotivetechnologies.com/web-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="icon" href="/icon-192x192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="Q1ESQbbvSS6U7M8a1wogX3weTgBuUXN6OC74cKgWM6c" />
        <meta name="msapplication-TileImage" content="/icon-192x192.png" />
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
