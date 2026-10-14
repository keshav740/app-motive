import WebDevClient from './WebDevClient';

export const metadata = {
  title: 'Custom Web Development Services — High-Performance Next.js Websites & Web Apps',
  description:
    'Scale your business with custom web development by AppMotive Technologies. We engineer high-speed Next.js 15 websites, React 19 web applications, and headless CMS platforms.',
  keywords: [
    'Custom Web Development Services',
    'Next.js Web Development Agency',
    'React Web Application Developers',
    'High Performance Website Engineering',
    'Headless CMS Development',
    'Full Stack Web Agency',
    'AppMotive Technologies Web Development',
  ],
  alternates: {
    canonical: 'https://appmotivetechnologies.com/services/web-development',
  },
  openGraph: {
    title: 'Custom Web Development Services — High-Performance Next.js Web Apps | AppMotive',
    description:
      'Engineered for speed, SEO, and business conversion. Discover our Next.js web application architecture, Core Web Vitals optimization, and headless CMS solutions.',
    url: 'https://appmotivetechnologies.com/services/web-development',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/project-1.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Web Development Services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Web Development Services — High-Performance Next.js Web Apps | AppMotive',
    description:
      'Engineered for speed, SEO, and business conversion. Discover our Next.js web application architecture, Core Web Vitals optimization, and headless CMS solutions.',
    images: ['/project-1.webp'],
  },
};

const jsonLdWebDevService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Custom Web Development Services',
  serviceType: 'Web Application & Website Development',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://appmotivetechnologies.com',
  },
  areaServed: 'Worldwide',
  description:
    'High-performance websites and digital web platforms engineered using Next.js 15, React 19, TypeScript, and Tailwind CSS for maximum speed, SEO rankings, and conversion.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Next.js & React Web Apps',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Headless CMS & Enterprise Portals',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Core Web Vitals & 99+ PageSpeed Optimization',
        },
      },
    ],
  },
};

const jsonLdWebDevFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why choose Next.js & React for Web Development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js provides server-side rendering (SSR), automatic code splitting, ultra-fast image optimization, and superior SEO performance out of the box. It ensures your web application loads in milliseconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a custom web development project take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical high-performance corporate website or web application MVP takes between 4 to 8 weeks from initial discovery and Figma designs to production deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I own 100% of the code and intellectual property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upon project completion and final sign-off, you receive 100% full intellectual property (IP) ownership of all source code, design files, and deployment configurations.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebDevService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebDevFaq) }}
      />
      <WebDevClient />
    </>
  );
}
