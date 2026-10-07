import AgileDevOpsClient from './AgileDevOpsClient';

export const metadata = {
  title: 'Agile & DevOps Infrastructure Services | AppMotive Technologies',
  description:
    'Automate CI/CD pipelines, containerize microservices with Docker & Kubernetes, build Infrastructure as Code (IaC), and streamline software delivery with AppMotive.',
  keywords: [
    'Agile & DevOps Services Agency',
    'CI/CD Pipeline Automation',
    'Kubernetes & Docker Containerization',
    'Infrastructure as Code Terraform',
    'GitHub Actions Automation',
    'Zero Downtime Deployments',
    'AppMotive Technologies DevOps',
  ],
  alternates: {
    canonical: 'https://appmotive.com/services/agile-devops',
  },
  openGraph: {
    title: 'Agile & DevOps Infrastructure Services | AppMotive Technologies',
    description:
      'Engineered for rapid deployment cycles, zero downtime releases, and bulletproof infrastructure automation.',
    url: 'https://appmotive.com/services/agile-devops',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/project-3.jpg',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Agile & DevOps Services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agile & DevOps Infrastructure Services | AppMotive Technologies',
    description:
      'Engineered for rapid deployment cycles, zero downtime releases, and bulletproof infrastructure automation.',
    images: ['/project-3.jpg'],
  },
};

const jsonLdDevOpsService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agile & DevOps Infrastructure Services',
  serviceType: 'DevOps & Cloud Automation Engineering',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://appmotive.com',
  },
  areaServed: 'Worldwide',
  description:
    'CI/CD pipeline setup, Docker & Kubernetes container orchestration, Infrastructure as Code, and continuous delivery coaching.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'DevOps Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automated CI/CD Deployment Pipelines',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kubernetes & Docker Microservices Architecture',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Infrastructure as Code (IaC with Terraform)',
        },
      },
    ],
  },
};

export default function AgileDevOpsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDevOpsService) }}
      />
      <AgileDevOpsClient />
    </>
  );
}
