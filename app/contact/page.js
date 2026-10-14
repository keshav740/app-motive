import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact AppMotive Technologies — Start Your Digital Project',
  description:
    'Have an idea for a web app, mobile product, or AI automation? Contact AppMotive Technologies today for a tailored proposal within 24 hours.',
  alternates: {
    canonical: 'https://www.appmotivetechnologies.com/contact',
  },
  openGraph: {
    title: 'Contact AppMotive Technologies — Start Your Digital Project',
    description:
      'Reach out to our senior digital product engineering team. We guarantee a response within 24 business hours.',
    url: 'https://www.appmotivetechnologies.com/contact',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/contact-us.webp',
        width: 1200,
        height: 630,
        alt: 'Contact AppMotive Technologies Team',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AppMotive Technologies — Start Your Digital Project',
    description:
      'Reach out to our senior digital product engineering team. We guarantee a response within 24 business hours.',
    images: ['/contact-us.webp'],
  },
};

const jsonLdContact = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact AppMotive Technologies',
  url: 'https://www.appmotivetechnologies.com/contact',
  description:
    'Contact form and communication channels for project inquiries with AppMotive Technologies engineering team.',
  mainEntity: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    email: 'info@appmotivetechnologies.com',
    telephone: '+91-9837033948',
    url: 'https://www.appmotivetechnologies.com',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
      />
      <ContactClient />
    </>
  );
}
