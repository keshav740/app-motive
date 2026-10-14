import DigitalCommerceClient from './DigitalCommerceClient';

export const metadata = {
  title: 'Digital Commerce & Headless E-Commerce Services | AppMotive',
  description:
    'Scale online sales with high-converting digital storefronts, headless Shopify Plus architecture, Stripe integrations, and custom checkout funnels by AppMotive.',
  keywords: [
    'Digital Commerce Agency',
    'Headless E-Commerce Development',
    'Shopify Plus Custom Developers',
    'Stripe & Payment Gateway Integration',
    'Custom Checkout Funnel Optimization',
    'High Conversion E-Commerce Apps',
    'AppMotive Technologies Digital Commerce',
  ],
  alternates: {
    canonical: 'https://appmotivetechnologies.com/services/digital-commerce',
  },
  openGraph: {
    title: 'Digital Commerce & Headless E-Commerce Services | AppMotive',
    description:
      'Engineered for maximum conversion rates, sub-second load times, and global payment processing.',
    url: 'https://appmotivetechnologies.com/services/digital-commerce',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/project-2.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Digital Commerce Services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Commerce & Headless E-Commerce Services | AppMotive',
    description:
      'Engineered for maximum conversion rates, sub-second load times, and global payment processing.',
    images: ['/project-2.webp'],
  },
};

const jsonLdCommerceService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Digital Commerce Services',
  serviceType: 'E-Commerce Engineering & Storefront Optimization',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://appmotivetechnologies.com',
  },
  areaServed: 'Worldwide',
  description:
    'Headless e-commerce storefronts, custom checkout funnels, multi-currency payment gateway integrations, and order automation.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Commerce Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Headless Next.js Shopify & Commerce Layer Storefronts',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Stripe & Multi-Currency Payment Gateway Integration',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Conversion Funnel & Cart Optimization',
        },
      },
    ],
  },
};

export default function DigitalCommercePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCommerceService) }}
      />
      <DigitalCommerceClient />
    </>
  );
}
