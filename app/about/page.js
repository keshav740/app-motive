import AboutClient from './AboutClient';

export const metadata = {
  title: 'About AppMotive Technologies — Digital Product Engineering Team',
  description:
    'Learn about AppMotive Technologies, our mission, product philosophy, core engineering values, and multidisciplinary digital design & development team.',
  alternates: {
    canonical: 'https://appmotivetechnologies.com/about',
  },
  openGraph: {
    title: 'About AppMotive Technologies — Digital Product Engineering Team',
    description:
      'Eliminating friction between ideas and execution. Discover our mission, core values, and 4-step engineering process.',
    url: 'https://appmotivetechnologies.com/about',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/about-us.webp',
        width: 1200,
        height: 630,
        alt: 'About AppMotive Technologies Team & Culture',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AppMotive Technologies — Digital Product Engineering Team',
    description:
      'Eliminating friction between ideas and execution. Discover our mission, core values, and 4-step engineering process.',
    images: ['/about-us.webp'],
  },
};

const jsonLdAbout = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About AppMotive Technologies',
  url: 'https://appmotivetechnologies.com/about',
  description:
    'AppMotive Technologies is a digital product engineering agency dedicated to crafting sleek, high-impact web apps, mobile products, and AI workflows.',
  mainEntity: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://appmotivetechnologies.com',
    logo: 'https://appmotivetechnologies.com/web-logo.webp',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />
      <AboutClient />
    </>
  );
}
