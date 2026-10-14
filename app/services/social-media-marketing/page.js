import MarketingClient from './MarketingClient';

export const metadata = {
  title: 'Social Media Marketing & Growth Services — Digital Brand Strategy | AppMotive',
  description:
    'Scale your audience and revenue with data-driven social media marketing, paid Meta & Google ad campaigns, conversion optimization, and brand storytelling by AppMotive.',
  keywords: [
    'Social Media Marketing Agency',
    'Digital Performance Marketing',
    'Meta Ads & Google Ads Management',
    'Conversion Rate Optimization',
    'Brand Growth Strategy',
    'Social Media Content Creation',
    'AppMotive Technologies Growth Services',
  ],
  alternates: {
    canonical: 'https://appmotivetechnologies.com/services/social-media-marketing',
  },
  openGraph: {
    title: 'Social Media Marketing & Growth Services — Digital Brand Strategy | AppMotive',
    description:
      'Data-backed growth campaigns engineered to lower CAC and maximize ROAS across Meta, Google, LinkedIn, and TikTok.',
    url: 'https://appmotivetechnologies.com/services/social-media-marketing',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/project-3.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Social Media Marketing',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Marketing & Growth Services — Digital Brand Strategy | AppMotive',
    description:
      'Data-backed growth campaigns engineered to lower CAC and maximize ROAS across Meta, Google, LinkedIn, and TikTok.',
    images: ['/project-3.webp'],
  },
};

const jsonLdMarketingService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Social Media Marketing Services',
  serviceType: 'Digital Performance Marketing & Social Growth',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://appmotivetechnologies.com',
  },
  areaServed: 'Worldwide',
  description:
    'Performance paid advertising, targeted social content strategy, audience expansion, and full-funnel CRO analytics.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Marketing & Growth Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Meta Ads & Google Performance Max Campaigns',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Content Production & Social Brand Strategy',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Conversion Funnel Optimization',
        },
      },
    ],
  },
};

export default function SocialMediaMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMarketingService) }}
      />
      <MarketingClient />
    </>
  );
}
