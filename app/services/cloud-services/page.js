import CloudServicesClient from './CloudServicesClient';

export const metadata = {
  title: 'Cloud Services & AWS/GCP Cloud Architecture | AppMotive Technologies',
  description:
    'Design high-availability cloud architecture, serverless microservices, auto-scaling databases, and cloud migrations with AppMotive Technologies.',
  keywords: [
    'Cloud Architecture Services Agency',
    'AWS Cloud Migration Solutions',
    'Google Cloud GCP Consulting',
    'Serverless Microservices Architecture',
    'Database Auto-scaling & Disaster Recovery',
    '24/7 Cloud Security & Compliance',
    'AppMotive Technologies Cloud Services',
  ],
  alternates: {
    canonical: 'https://www.appmotivetechnologies.com/services/cloud-services',
  },
  openGraph: {
    title: 'Cloud Services & AWS/GCP Cloud Architecture | AppMotive Technologies',
    description:
      'Engineered for 99.99% uptime, auto-scaling elasticity, and cloud security compliance across AWS, GCP, and Azure.',
    url: 'https://www.appmotivetechnologies.com/services/cloud-services',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/project-1.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Cloud Services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cloud Services & AWS/GCP Cloud Architecture | AppMotive Technologies',
    description:
      'Engineered for 99.99% uptime, auto-scaling elasticity, and cloud security compliance across AWS, GCP, and Azure.',
    images: ['/project-1.webp'],
  },
};

const jsonLdCloudService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Cloud Services & Infrastructure Engineering',
  serviceType: 'Cloud Architecture & Serverless Microservices',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://www.appmotivetechnologies.com',
  },
  areaServed: 'Worldwide',
  description:
    'AWS & GCP cloud migration, serverless API design, auto-scaling databases, disaster recovery, and cloud security audits.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cloud Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AWS & Google Cloud Platform Migration',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Serverless Lambda & Microservices Architecture',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'High Availability & Disaster Recovery',
        },
      },
    ],
  },
};

export default function CloudServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCloudService) }}
      />
      <CloudServicesClient />
    </>
  );
}
