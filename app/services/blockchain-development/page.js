import BlockchainClient from './BlockchainClient';

export const metadata = {
  title: 'Blockchain Development Services — Smart Contracts & Web3 dApps | AppMotive',
  description:
    'Secure decentralized applications, audited smart contracts, Web3 tokenomics, and custom blockchain architecture engineered by AppMotive Technologies.',
  keywords: [
    'Blockchain Development Agency',
    'Smart Contract Auditing & Engineering',
    'Web3 dApp Developers',
    'Solidity & Rust Blockchain Engineers',
    'Tokenomics & NFT Ecosystems',
    'Crypto Wallet Integrations',
    'AppMotive Technologies Web3',
  ],
  alternates: {
    canonical: 'https://appmotivetechnologies.com/services/blockchain-development',
  },
  openGraph: {
    title: 'Blockchain Development Services — Smart Contracts & Web3 dApps | AppMotive',
    description:
      'Engineered for security, gas optimization, and scale. Build audited smart contracts, dApps, and Layer-2 protocols.',
    url: 'https://appmotivetechnologies.com/services/blockchain-development',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/hero-home.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Blockchain Development Services',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blockchain Development Services — Smart Contracts & Web3 dApps | AppMotive',
    description:
      'Engineered for security, gas optimization, and scale. Build audited smart contracts, dApps, and Layer-2 protocols.',
    images: ['/hero-home.webp'],
  },
};

const jsonLdBlockchainService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Blockchain Development Services',
  serviceType: 'Web3 & Decentralized Engineering',
  provider: {
    '@type': 'Organization',
    name: 'AppMotive Technologies',
    url: 'https://appmotivetechnologies.com',
  },
  areaServed: 'Worldwide',
  description:
    'Smart contract audit & development, Web3 dApps, token ecosystems, crypto wallet integrations, and Layer-2 scaling.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Blockchain Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Solidity & Rust Smart Contract Development',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web3 Decentralized Applications (dApps)',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Smart Contract Security Audits',
        },
      },
    ],
  },
};

export default function BlockchainDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlockchainService) }}
      />
      <BlockchainClient />
    </>
  );
}
