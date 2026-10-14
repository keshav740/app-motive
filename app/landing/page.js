import LandingClient from './LandingClient';

export const metadata = {
  title: 'Full-Service Digital Product Engineering & Growth — All Services | AppMotive',
  description:
    'Turn your ideas into production-ready digital products. Custom Website Development, Mobile Apps, AI & Automation, Digital Commerce, and Cloud Services engineered for maximum ROI.',
  keywords: [
    'Digital Product Engineering Agency',
    'Custom Web Development',
    'Mobile Application Development',
    'AI & Automation Solutions',
    'Full Service Digital Agency',
    'Enterprise Cloud Services',
    'AppMotive Technologies Services',
  ],
  alternates: {
    canonical: 'https://www.appmotivetechnologies.com/landing',
  },
  openGraph: {
    title: 'Full-Service Digital Product Engineering & Growth | AppMotive Technologies',
    description:
      'We design, engineer, and scale high-performance websites, mobile apps, AI automation, and cloud platforms for ambitious companies.',
    url: 'https://www.appmotivetechnologies.com/landing',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/hero-home.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Digital Product Engineering & Growth',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full-Service Digital Product Engineering & Growth | AppMotive Technologies',
    description:
      'We design, engineer, and scale high-performance websites, mobile apps, AI automation, and cloud platforms.',
    images: ['/hero-home.webp'],
  },
};

const jsonLdCommonService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Full-Service Digital Product Engineering & Growth Solutions',
  serviceType: 'End-to-End Digital Engineering, AI, Web & Mobile Development',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://www.appmotivetechnologies.com',
    logo: 'https://www.appmotivetechnologies.com/web-logo.png',
  },
  areaServed: 'Worldwide',
  description:
    'AppMotive Technologies delivers end-to-end digital product design, web applications (Next.js), native & hybrid mobile apps, AI workflows, and scalable cloud systems.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AppMotive Core Engineering Capabilities',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development (Next.js & React)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Application Engineering (iOS & Android)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta & Google Ads Performance Marketing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Operational Automation Solutions' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Commerce & Storefronts' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Enterprise Business Applications' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elastic Cloud Architecture & DevOps SRE' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web3 & Blockchain Development' } },
    ],
  },
};

const jsonLdCommonFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does AppMotive Technologies provide on this platform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We provide full-spectrum digital engineering including Next.js web applications, mobile apps (React Native/iOS/Android), AI automation workflows, performance ad marketing (Meta & Google), digital commerce platforms, and cloud infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can our team get started on a project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Following our initial discovery session and proposal approval, we deploy your dedicated engineering sprint team within 3 to 5 business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who owns the intellectual property and code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You retain 100% intellectual property ownership of all source code, design assets, and cloud credentials upon milestone completion.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does AppMotive guarantee high page speed and Core Web Vitals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We engineer with Next.js Server Components, modern WebP asset compression, zero layout-shift styling, and global CDN caching to achieve sub-second load times and 95+ PageSpeed scores.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* High-priority LCP Preload for Above-the-fold Hero Visual */}
      <link
        rel="preload"
        as="image"
        href="/hero-home.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCommonService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCommonFaq) }}
      />
      <LandingClient />
    </>
  );
}
