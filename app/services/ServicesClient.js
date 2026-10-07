'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function TiltImage({ src, alt, className }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 16;
    const rotateY = ((x - centerX) / centerX) * 16;

    el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    el.style.transition = 'transform 0.08s ease-out';
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)';
  };

  return (
    <div
      ref={ref}
      className="tilt-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      <img src={src} alt={alt} className={className} />
    </div>
  );
}

const servicesData = [
  {
    id: '01',
    slug: 'web-development',
    title: 'Website Development',
    category: 'WEB DEVELOPMENT',
    desc: 'Engineered for extreme performance, SEO, accessibility, and high conversion rates. We build custom web applications, digital platforms, and headless CMS solutions.',
    features: [
      'Next.js & React High-Performance Architecture',
      'Ultra-fast Server-Side Rendering (SSR)',
      'Custom Design Systems & Micro-Animations',
      'Headless CMS & API Integration',
      'Core Web Vitals & Technical SEO Optimization'
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Node.js']
  },
  {
    id: '02',
    slug: 'mobile-app-development',
    title: 'Mobile Application Development',
    category: 'MOBILE ENGINEERING',
    desc: 'Native and cross-platform mobile apps crafted for iOS and Android. Designed around real user behaviors with smooth 60fps animations and offline capability.',
    features: [
      'Cross-Platform iOS & Android Development',
      'Fluid Touch Gesture Engineering',
      'Push Notifications & Real-Time Sync',
      'App Store & Play Store Publishing',
      'Secure Local Storage & Encryption'
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    id: '03',
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    category: 'GROWTH & MARKETING',
    desc: 'Data-driven digital marketing, brand strategy, performance ad campaigns, and social media management engineered to scale your audience and ROI.',
    features: [
      'Targeted Audience Growth Strategy',
      'Performance Paid Ad Campaigns (Meta & Google)',
      'Content Strategy & High-Impact Visuals',
      'Conversion Rate Optimization (CRO)',
      'Analytics & Monthly Campaign Reporting'
    ],
    tech: ['Meta Ads', 'Google Ads', 'SEO Tools', 'Figma', 'Analytics']
  },
  {
    id: '04',
    slug: 'blockchain-development',
    title: 'Blockchain Development',
    category: 'WEB3 & BLOCKCHAIN',
    desc: 'Secure decentralized applications, smart contract engineering, Web3 ecosystem integrations, and custom blockchain architecture.',
    features: [
      'Smart Contract Audit & Engineering',
      'Decentralized Applications (dApps)',
      'Tokenomics & NFT Platform Ecosystems',
      'Crypto Wallet & Web3 API Integration',
      'Layer-2 Scalability & Security Infrastructure'
    ],
    tech: ['Solidity', 'Ethereum', 'Web3.js', 'Rust', 'Hardhat']
  },
  {
    id: '05',
    slug: 'ai-automation',
    title: 'AI & Automation',
    category: 'AI & LEVERAGE',
    desc: 'Turn complex repetitive business operational tasks into instant automated workflows powered by state-of-the-art AI models and intelligent agents.',
    features: [
      'Custom LLM & Agent Integrations',
      'Automated Data Processing Pipelines',
      'Internal Knowledge Base & Vector Search (RAG)',
      'Smart Customer Support Agents',
      'Predictive Analytics & Operations Automation'
    ],
    tech: ['OpenAI API', 'Python', 'LangChain', 'Pinecone', 'FastAPI']
  },
  {
    id: '06',
    slug: 'business-application',
    title: 'Business Application',
    category: 'ENTERPRISE SOFTWARE',
    desc: 'Tailor-made enterprise software tools, custom internal management dashboards, CRM/ERP solutions, and automated business workflows.',
    features: [
      'Custom Internal Tools & Admin Dashboards',
      'Enterprise Resource Planning (ERP)',
      'Customer Relationship Management (CRM)',
      'Role-Based Access Control & Granular Security',
      'Real-Time Analytics & Data Reporting'
    ],
    tech: ['PostgreSQL', 'React', 'Node.js', 'GraphQL', 'Docker']
  },
  {
    id: '07',
    slug: 'digital-commerce',
    title: 'Digital Commerce',
    category: 'E-COMMERCE SOLUTIONS',
    desc: 'Scalable online storefronts, headless e-commerce architectures, custom checkout flows, and payment gateway integrations built to scale revenues.',
    features: [
      'Headless E-Commerce Storefronts',
      'High-Converting Checkout Funnels',
      'Multi-Currency & Global Payment Gateways',
      'Inventory & Order Management Automation',
      'Real-Time Product Catalog & Filtering'
    ],
    tech: ['Shopify Plus', 'Next.js', 'Stripe', 'Commerce Layer', 'Tailwind']
  },
  {
    id: '08',
    slug: 'agile-devops',
    title: 'Agile & DevOps',
    category: 'DEVOPS & INFRASTRUCTURE',
    desc: 'Continuous Integration & Delivery pipelines, automated testing, cloud deployment infrastructure, and Agile engineering consulting.',
    features: [
      'CI/CD Pipeline Automation',
      'Infrastructure as Code (IaC)',
      'Zero-Downtime Deployment Workflows',
      'Microservices Architecture Setup',
      'Agile Sprint Coaching & Delivery'
    ],
    tech: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'Jenkins']
  },
  {
    id: '09',
    slug: 'cloud-services',
    title: 'Cloud Services',
    category: 'CLOUD ARCHITECTURE',
    desc: 'Cloud architecture design, cloud migration, serverless infrastructure, database auto-scaling, and 24/7 cloud monitoring.',
    features: [
      'AWS & GCP Cloud Migrations',
      'Serverless APIs & Microservices',
      'Auto-scaling & Load Balancing',
      'Disaster Recovery & High Availability',
      'Cloud Security Audit & Compliance'
    ],
    tech: ['AWS', 'Google Cloud', 'Azure', 'Serverless', 'Cloudflare']
  }
];

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function ServicesClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max ? (window.scrollY / max) * 100 : 0);
    };
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const currentService = servicesData[activeTab >= 0 ? activeTab : 0];

  return (
    <main>
      <div className="scroll-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className="cursor-glow" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />

      <Navbar />

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Services Hero">
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> OUR CAPABILITIES</div></Reveal>
          <Reveal><h1>Digital Services <em>Tailored to Move You.</em></h1></Reveal>
          <Reveal><p>From initial strategy and user interface design to production engineering and AI automation, we cover the full product spectrum.</p></Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/service-hero.png" alt="AppMotive Technologies 9 Core Engineering Capabilities" className="service-hero-img" />
        </div>
      </section>

      <section className="section section-pad light-section" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
          AppMotive Services List
        </h2>
        <Reveal>
          <div className="service-layout">
            <div className="service-index desktop-only-index">
              {servicesData.map((service, index) => (
                <button
                  key={service.id}
                  className={activeTab === index ? 'active' : ''}
                  onClick={() => setActiveTab(index)}
                  onMouseEnter={() => setActiveTab(index)}
                >
                  <span>{service.id}</span>
                  <strong>{service.title}</strong>
                  <b>↗</b>
                </button>
              ))}
            </div>

            <div className="service-stage desktop-only-stage">
              <div className={`stage-orb orb-${(activeTab >= 0 ? activeTab : 0) + 1}`} />
              <span className="stage-number">{currentService.id}</span>
              <span className="stage-tag">{currentService.category}</span>

              <h3>{currentService.title}</h3>
              <p>{currentService.desc}</p>

              <div className="tab-section" style={{ marginTop: '24px' }}>
                <ul className="feature-list">
                  {currentService.features.map((feat, i) => (
                    <li key={i}><span className="check">✓</span> {feat}</li>
                  ))}
                </ul>
              </div>

              <div className="tab-section" style={{ marginTop: '20px' }}>
                <div className="tech-pills">
                  {currentService.tech.map((t, i) => (
                    <span className="tech-pill" key={i}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="stage-bottom">
                <span>APP / MOTIVE</span>
                <Link href={`/services/${currentService.slug}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>
                  EXPLORE CAPABILITY ↗
                </Link>
              </div>
            </div>

            <div className="service-accordion mobile-only-accordion">
              {servicesData.map((service, index) => (
                <div className="accordion-item" key={service.id}>
                  <button
                    className={`accordion-header ${activeTab === index ? 'active' : ''}`}
                    onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                  >
                    <span>{service.id}</span>
                    <strong>{service.title}</strong>
                    <b>{activeTab === index ? '↓' : '↗'}</b>
                  </button>

                  {activeTab === index && (
                    <div className="service-stage accordion-stage">
                      <div className={`stage-orb orb-${index + 1}`} />
                      <span className="stage-number">{service.id}</span>
                      <span className="stage-tag">{service.category}</span>

                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>

                      <div className="tab-section" style={{ marginTop: '20px' }}>
                        <ul className="feature-list">
                          {service.features.map((feat, i) => (
                            <li key={i}><span className="check">✓</span> {feat}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="tab-section" style={{ marginTop: '16px' }}>
                        <div className="tech-pills">
                          {service.tech.map((t, i) => (
                            <span className="tech-pill" key={i}>{t}</span>
                          ))}
                        </div>
                      </div>

                      <div className="stage-bottom">
                        <span>APP / MOTIVE</span>
                        <Link href={`/services/${service.slug}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>
                          EXPLORE CAPABILITY ↗
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="cta section-pad" aria-label="Call to Action">
        <div className="cta-grid" />
        <span className="kicker">READY TO BUILD?</span>
        <h2>Need a custom solution?<br /><span>Let’s engineer it together.</span></h2>
        <Link className="primary light-btn" href="/contact">
          Start a conversation <span>↗</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
