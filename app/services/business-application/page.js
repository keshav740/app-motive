import BusinessAppClient from './BusinessAppClient';

export const metadata = {
  title: 'Business Application & Enterprise Software Development | AppMotive',
  description:
    'Tailor-made enterprise software tools, internal admin dashboards, CRM/ERP systems, and role-based business management applications built by AppMotive.',
  keywords: [
    'Business Application Development Agency',
    'Enterprise Software Engineering',
    'Custom CRM & ERP Developers',
    'Internal Admin Dashboards',
    'Legacy System Modernization',
    'Role-Based Access Control Software',
    'AppMotive Technologies Enterprise Solutions',
  ],
  alternates: {
    canonical: 'https://appmotivetechnologies.com/services/business-application',
  },
  openGraph: {
    title: 'Business Application & Enterprise Software Development | AppMotive',
    description:
      'Engineered for security, scalability, and operational efficiency. Build custom internal tools, admin portals, and CRM/ERP systems.',
    url: 'https://appmotivetechnologies.com/services/business-application',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/project-1.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Business Application Development',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Application & Enterprise Software Development | AppMotive',
    description:
      'Engineered for security, scalability, and operational efficiency. Build custom internal tools, admin portals, and CRM/ERP systems.',
    images: ['/project-1.webp'],
  },
};

const jsonLdBusinessService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Business Application Development Services',
  serviceType: 'Enterprise Software & Internal Application Engineering',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://appmotivetechnologies.com',
  },
  areaServed: 'Worldwide',
  description:
    'Custom internal business portals, CRM/ERP solutions, real-time analytics dashboards, and role-based access security.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Business Application Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Admin Portals & Internal Dashboards',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Enterprise Resource Planning (ERP) Solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Customer Relationship Management (CRM) Systems',
        },
      },
    ],
  },
};

export default function BusinessApplicationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBusinessService) }}
      />
      <BusinessAppClient />
    </>
  );
}
