import MobileDevClient from './MobileDevClient';

export const metadata = {
  title: 'Mobile Application Development Services — iOS & Android Native Apps | AppMotive',
  description:
    'Build high-performance native iOS, Android, and cross-platform React Native apps with AppMotive Technologies. 60fps fluid UI, offline support, and App Store publishing.',
  keywords: [
    'Mobile Application Development Services',
    'iOS App Development Agency',
    'Android App Developers',
    'React Native Mobile App Development',
    'Flutter App Engineering',
    'Mobile Product Design',
    'AppMotive Technologies Mobile Apps',
  ],
  alternates: {
    canonical: 'https://www.appmotivetechnologies.com/services/mobile-app-development',
  },
  openGraph: {
    title: 'Mobile Application Development Services — iOS & Android Native Apps | AppMotive',
    description:
      'Engineered for 60fps performance, intuitive user experience, and seamless offline functionality. Build cross-platform iOS and Android apps with AppMotive.',
    url: 'https://www.appmotivetechnologies.com/services/mobile-app-development',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/project-2.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Mobile Application Development',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile Application Development Services — iOS & Android Native Apps | AppMotive',
    description:
      'Engineered for 60fps performance, intuitive user experience, and seamless offline functionality. Build cross-platform iOS and Android apps with AppMotive.',
    images: ['/project-2.webp'],
  },
};

const jsonLdMobileDevService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mobile Application Development Services',
  serviceType: 'Mobile Application Engineering',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://www.appmotivetechnologies.com',
  },
  areaServed: 'Worldwide',
  description:
    'Native iOS, Android, and cross-platform React Native/Flutter mobile app engineering tailored for performance, offline sync, and intuitive touch UX.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mobile Engineering Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cross-Platform React Native & Flutter Apps',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Native iOS (Swift) & Android (Kotlin) Engineering',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile UI/UX & Gesture Animations',
        },
      },
    ],
  },
};

const jsonLdMobileDevFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you build native or cross-platform mobile applications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We excel in both! We recommend React Native or Flutter for cross-platform efficiency with single codebases, and Swift/Kotlin when deep native hardware access or maximum hardware performance is required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle Apple App Store and Google Play Store submission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We manage the complete App Store & Google Play Store submission process, including metadata guidelines, screenshot generation, policy compliance, and app review approval.',
      },
    },
  ],
};

export default function MobileAppDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMobileDevService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdMobileDevFaq) }}
      />
      <MobileDevClient />
    </>
  );
}
