import WhyUsClient from './WhyUsClient';

export const metadata = {
  title: 'Why Choose AppMotive Technologies — Engineering Excellence & Product Strategy',
  description:
    'Discover why ambitious startups and enterprises choose AppMotive Technologies for digital product design, senior engineering access, and rapid delivery.',
  alternates: {
    canonical: 'https://appmotive.com/why-us',
  },
  openGraph: {
    title: 'Why Choose AppMotive Technologies — Engineering Excellence & Strategy',
    description:
      'Product thinking meets senior engineering execution. Discover our 4 pillars, rapid production workflows, and proven track record.',
    url: 'https://appmotive.com/why-us',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/why-us.png',
        width: 1200,
        height: 630,
        alt: 'Why Choose AppMotive Technologies Engineering Agency',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Choose AppMotive Technologies — Engineering Excellence & Strategy',
    description:
      'Product thinking meets senior engineering execution. Discover our 4 pillars, rapid production workflows, and proven track record.',
    images: ['/why-us.png'],
  },
};

export default function Page() {
  return <WhyUsClient />;
}
