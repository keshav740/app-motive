import HomePageClient from './HomePageClient';

export const metadata = {
  title: 'Get More Customers with a Better Website & Smarter Advertising — AppMotive',
  description:
    'We build websites and run Facebook, Instagram, and Google ads for small businesses to help them get more customers and grow.',
  alternates: {
    canonical: 'https://www.appmotivetechnologies.com',
  },
  openGraph: {
    title: 'Get More Customers with a Better Website & Smarter Advertising — AppMotive',
    description:
      'We build websites and run Facebook, Instagram, and Google ads for small businesses.',
    url: 'https://www.appmotivetechnologies.com',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/hero-home.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Website & Digital Advertising',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get More Customers with a Better Website & Smarter Advertising — AppMotive',
    description:
      'We build websites and run Facebook, Instagram, and Google ads for small businesses.',
    images: ['/hero-home.webp'],
  },
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does AppMotive Technologies offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We specialize in end-to-end digital product design, web application development, native & cross-platform mobile apps (React Native, iOS, Android), AI & workflow automation, and scalable cloud infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a typical project take from start to launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timelines depend on scope. A typical MVP web or mobile application takes 4 to 8 weeks, while complex enterprise platforms take 10 to 16 weeks. We work in 2-week agile sprints with regular client demos.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your pricing structure and engagement model?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer transparent milestone-based fixed pricing for well-defined scopes, as well as dedicated engineering team retainer models for ongoing product development and iteration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you handle IP ownership and confidentiality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You retain 100% full intellectual property (IP) ownership of all source code, design assets, and credentials upon milestone completion. We sign standard NDAs before any project discussions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide post-launch support and maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide ongoing post-launch maintenance, 24/7 server monitoring, performance tuning, and continuous feature updates to ensure your digital product stays fast and secure.',
      },
    },
  ],
};

const jsonLdServiceAgency = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'AppMotive Technologies',
  url: 'https://www.appmotivetechnologies.com',
  logo: 'https://www.appmotivetechnologies.com/web-logo.png',
  image: 'https://www.appmotivetechnologies.com/hero-home.webp',
  description:
    'Full-service digital product engineering agency building web apps, mobile solutions, AI workflows, and cloud architecture.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
  },
  priceRange: '$$$',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServiceAgency) }}
      />
      <HomePageClient />
    </>
  );
}
