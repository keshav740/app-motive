import ServicesClient from './ServicesClient';

export const metadata = {
  title: 'Digital Engineering Services — Web, Mobile, AI & Cloud Architecture',
  description:
    'Explore AppMotive Technologies digital capabilities: Website Development, Mobile App Engineering, AI Automation, E-Commerce, DevOps, and Cloud Services.',
  alternates: {
    canonical: 'https://appmotivetechnologies.com/services',
  },
  openGraph: {
    title: 'Digital Engineering Services — Web, Mobile, AI & Cloud | AppMotive',
    description:
      'Explore AppMotive Technologies digital capabilities: Web Development, Mobile Engineering, AI Automation, Digital Commerce, and Cloud Services.',
    url: 'https://appmotivetechnologies.com/services',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/service-hero.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Services & Capabilities',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Engineering Services — Web, Mobile, AI & Cloud | AppMotive',
    description:
      'Explore AppMotive Technologies digital capabilities: Web Development, Mobile Engineering, AI Automation, Digital Commerce, and Cloud Services.',
    images: ['/service-hero.webp'],
  },
};

const jsonLdServices = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AppMotive Technologies Services',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Website Development',
        description:
          'High-performance Next.js & React websites and digital platforms engineered for speed, SEO, and conversion.',
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Mobile Application Development',
        description:
          'Native & cross-platform iOS and Android mobile apps crafted for performance and smooth UX.',
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'AI & Automation Solutions',
        description:
          'Intelligent automated workflows and custom AI models turning repetitive tasks into enterprise leverage.',
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Digital Commerce',
        description:
          'Headless e-commerce storefronts, Shopify Plus customization, and global payment integration.',
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Cloud Services & DevOps',
        description:
          'Scalable AWS & GCP cloud architecture, serverless pipelines, and 24/7 infrastructure reliability.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }}
      />
      <ServicesClient />
    </>
  );
}
