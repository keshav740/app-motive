import AiAutomationClient from './AiAutomationClient';

export const metadata = {
  title: 'AI & Automation Services — Custom LLM Agents & Workflows | AppMotive',
  description:
    'Automate enterprise business workflows with custom LLM integrations, AI agents, RAG knowledge bases, and intelligent data pipelines built by AppMotive.',
  keywords: [
    'AI & Automation Services',
    'Custom LLM Integration Agency',
    'Enterprise AI Agent Development',
    'RAG Vector Search Systems',
    'Business Process Automation',
    'Python FastAPI AI Services',
    'AppMotive Technologies AI Solutions',
  ],
  alternates: {
    canonical: 'https://www.appmotivetechnologies.com/services/ai-automation',
  },
  openGraph: {
    title: 'AI & Automation Services — Custom LLM Agents & Workflows | AppMotive',
    description:
      'Turn repetitive manual tasks into autonomous AI pipelines powered by OpenAI, Claude, LangChain, and vector databases.',
    url: 'https://www.appmotivetechnologies.com/services/ai-automation',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/service-hero.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies AI & Automation Services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Automation Services — Custom LLM Agents & Workflows | AppMotive',
    description:
      'Turn repetitive manual tasks into autonomous AI pipelines powered by OpenAI, Claude, LangChain, and vector databases.',
    images: ['/service-hero.webp'],
  },
};

const jsonLdAiService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI & Automation Services',
  serviceType: 'Artificial Intelligence & Enterprise Automation',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://www.appmotivetechnologies.com',
  },
  areaServed: 'Worldwide',
  description:
    'Custom AI agent architecture, Retrieval-Augmented Generation (RAG) vector search, workflow automation, and predictive analytics.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI & Automation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom LLM & Autonomous Agent Integrations',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Enterprise RAG & Vector Knowledge Base Systems',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automated Data Extraction & Processing Pipelines',
        },
      },
    ],
  },
};

export default function AiAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAiService) }}
      />
      <AiAutomationClient />
    </>
  );
}
