'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
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
      style={{ willChange: 'transform', transformStyle: 'preserve-3d', maxWidth: '100%' }}
    >
      <img
        src={src}
        alt={alt}
        className={className}
        width={620}
        height={520}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        style={{ aspectRatio: '620 / 520', width: '100%', height: 'auto', display: 'block', maxWidth: '100%' }}
      />
    </div>
  );
}

const allServices = [
  {
    id: '01',
    slug: 'web-development',
    title: 'Website Development',
    tag: 'NEXT.JS & REACT',
    badge: 'Fast & Modern',
    desc: 'Custom, high-speed websites and web applications engineered to convert visitors into paying clients with sub-second page loads.',
    points: [
      'Bespoke Next.js 15 architecture designed around your brand',
      '95+ Google PageSpeed score and sub-second mobile loading speed',
      'Clean on-page SEO foundation to rank on Google search',
      'Easy-to-use CMS integration for effortless content updates'
    ],
    tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    color: '#4285F4'
  },
  {
    id: '02',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    tag: 'IOS & ANDROID',
    badge: 'Cross-Platform',
    desc: 'Intuitive iOS and Android apps built with smooth animations, offline data caching, and seamless app store releases.',
    points: [
      'Native-feel React Native and Flutter cross-platform architecture',
      'Push notification automation, user auth, and real-time database sync',
      'Clean gesture navigation and battery-optimized performance',
      'End-to-end publishing on Google Play Store and Apple App Store'
    ],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    color: '#34A853'
  },
  {
    id: '03',
    slug: 'social-media-marketing',
    title: 'Meta & Google Ads Growth',
    tag: 'PAID PERFORMANCE',
    badge: 'Lead Generation',
    desc: 'Targeted ad campaigns on Facebook, Instagram, and Google engineered to convert clicks into phone calls and qualified inquiries.',
    points: [
      'High-converting ad visuals, carousel graphics, and persuasive copy',
      'Precise demographic and local audience targeting',
      'Continuous weekly bid optimization and transparent ROAS reporting',
      'Conversion Rate Optimization (CRO) on dedicated landing pages'
    ],
    tech: ['Meta Ads Manager', 'Google Ads', 'GA4 Analytics', 'Conversion API'],
    color: '#EA4335'
  },
  {
    id: '04',
    slug: 'ai-automation',
    title: 'AI & Workflow Automation',
    tag: 'AI SOLUTIONS',
    badge: 'Automation',
    desc: 'Reduce repetitive manual work with custom AI assistants, automated inquiry routing, and smart software integrations.',
    points: [
      'Custom AI customer support chatbots trained on your company data',
      'Automated lead qualification and instant WhatsApp/CRM sync',
      'Intelligent document and inquiry triage workflows',
      'Direct API integrations with OpenAI, Make, Zapier, and custom backends'
    ],
    tech: ['OpenAI API', 'Python', 'LangChain', 'FastAPI', 'Automation'],
    color: '#FBBC05'
  },
  {
    id: '05',
    slug: 'digital-commerce',
    title: 'Digital Commerce & Storefronts',
    tag: 'E-COMMERCE',
    badge: 'Online Stores',
    desc: 'Fast online storefronts and custom e-commerce funnels built with frictionless checkout to maximize average order value.',
    points: [
      'Headless Shopify Plus and custom Next.js storefront setups',
      'Frictionless mobile checkout with Stripe, Razorpay, and Apple Pay',
      'Multi-currency support and localized customer experiences',
      'Automated inventory synchronization and order management'
    ],
    tech: ['Shopify Plus', 'Next.js', 'Stripe', 'Tailwind', 'GraphQL'],
    color: '#4285F4'
  },
  {
    id: '06',
    slug: 'business-application',
    title: 'Custom Business Applications',
    tag: 'INTERNAL TOOLS',
    badge: 'Portals & CRMs',
    desc: 'Custom internal dashboards, client portals, and CRM/ERP systems tailored precisely to your company’s unique operations.',
    points: [
      'Custom management portals and executive performance dashboards',
      'Role-based user permissions (RBAC) and audit logging',
      'Automated PDF invoice generation, export, and billing triggers',
      'Secure database architecture with REST and GraphQL APIs'
    ],
    tech: ['PostgreSQL', 'React', 'Node.js', 'Docker', 'REST APIs'],
    color: '#34A853'
  },
  {
    id: '07',
    slug: 'cloud-services',
    title: 'Cloud Architecture & Hosting',
    tag: 'AWS & GCP',
    badge: 'Reliable Cloud',
    desc: 'Secure cloud hosting on AWS and Google Cloud with automated backups, DDoS protection, and 99.9% uptime reliability.',
    points: [
      'AWS & Google Cloud infrastructure setup and zero-downtime migration',
      'Automated disaster recovery backups and SSL security configuration',
      'Database clustering, Redis caching, and global edge delivery',
      '24/7 uptime monitoring and automated alert triggers'
    ],
    tech: ['AWS', 'Google Cloud', 'Cloudflare', 'PostgreSQL', 'Redis'],
    color: '#FBBC05'
  },
  {
    id: '08',
    slug: 'agile-devops',
    title: 'Agile DevOps & Maintenance',
    tag: 'CI/CD & DEVOPS',
    badge: 'Deploy & Care',
    desc: 'Automated deployment pipelines and ongoing technical maintenance so your software stays fast, secure, and always online.',
    points: [
      'Automated GitHub Actions testing and one-click staging deployments',
      'Docker container setups for reproducible production environments',
      'Monthly security patches, dependency updates, and bug fixes',
      'Direct developer support whenever you need adjustments'
    ],
    tech: ['Docker', 'GitHub Actions', 'Linux', 'Terraform', 'CI/CD'],
    color: '#EA4335'
  },
  {
    id: '09',
    slug: 'blockchain-development',
    title: 'Web3 & Blockchain Development',
    tag: 'SMART CONTRACTS',
    badge: 'Web3 & Crypto',
    desc: 'Security-audited smart contracts, decentralized apps, and Web3 wallet connections built on proven blockchain standards.',
    points: [
      'Smart contract development in Solidity with thorough test coverage',
      'Web3 wallet integrations (MetaMask, WalletConnect, Coinbase)',
      'Secure crypto payment gateway implementation',
      'Gas-optimized and security-reviewed contract architecture'
    ],
    tech: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat', 'Polygon'],
    color: '#4285F4'
  }
];

const landingFaqs = [
  {
    q: 'How does working with AppMotive differ from hiring a typical agency?',
    a: 'Traditional agencies put junior account managers between you and the developers, resulting in miscommunication and slow turnarounds. At AppMotive, you communicate directly with the senior developers and designers building your software via WhatsApp, phone, or Google Meet.'
  },
  {
    q: 'How do you guarantee fast website loading speeds on mobile?',
    a: 'We build with Next.js 15 Server Components, modern WebP image compression, zero layout shifts, minimal JavaScript, and edge caching. We benchmark every project to ensure 90+ PageSpeed scores on mobile phones.'
  },
  {
    q: 'How fast can our team kick off a project?',
    a: 'After our initial discovery call and scope agreement, we typically start design and development within 3 to 5 business days.'
  },
  {
    q: 'What is your pricing and payment structure?',
    a: 'We work on transparent, fixed milestone-based quotes. You know the exact cost and deliverables upfront with zero surprise invoices.'
  },
  {
    q: 'Who owns the intellectual property (IP) and source code?',
    a: 'You have 100% full ownership of all source code, design assets, domain access, and ad accounts upon completion. We sign standard non-disclosure agreements (NDAs) before starting.'
  }
];

function ServiceDetailCard({ svc, onSelectQuote }) {
  return (
    <div className="service-detail-card">
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${svc.color}40, transparent 70%)`,
          pointerEvents: 'none'
        }}
      />

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
          <span style={{ color: svc.color, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.8px' }}>
            SERVICE #{svc.id} · {svc.tag}
          </span>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '99px', fontSize: '0.72rem', color: '#34A853' }}>
            ✓ PRODUCTION READY
          </span>
        </div>

        <h3 style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)', margin: '0 0 8px', color: '#fff', fontWeight: 700, lineHeight: 1.25 }}>
          {svc.title}
        </h3>
        <p className="justify-text" style={{ color: '#9aa0a6', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '14px' }}>
          {svc.desc}
        </p>

        <div style={{ marginBottom: '14px' }}>
          <strong style={{ display: 'block', fontSize: '0.78rem', color: '#fff', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            What’s Included:
          </strong>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {svc.points.map((pt, i) => (
              <li key={i} className="justify-text" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#e8eaed', fontSize: '0.85rem', lineHeight: 1.45 }}>
                <span style={{ color: '#34A853', fontWeight: 800, flexShrink: 0 }}>✓</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <strong style={{ display: 'block', fontSize: '0.78rem', color: '#fff', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Technologies:
          </strong>
          <div className="tech-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {svc.tech.map((t, i) => (
              <span key={i} className="dark-tech-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="card-actions" style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <button
          onClick={() => onSelectQuote(svc.title)}
          style={{ background: '#4285F4', color: '#fff', padding: '9px 16px', borderRadius: '10px', border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Request {svc.title} Quote ↗
        </button>
        <Link href={`/services/${svc.slug}`} style={{ color: '#9aa0a6', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>
          Full Service Page ↗
        </Link>
      </div>
    </div>
  );
}

export default function LandingClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: '$5,000 - $10,000',
    message: '',
    hp_website: '',
  });
  const [formLoadedAt] = useState(Date.now());

  const handleSelectQuote = (serviceTitle) => {
    setFormData((prev) => ({ ...prev, service: serviceTitle }));
    const el = document.getElementById('get-proposal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceClick = (idx) => {
    setActiveTab((prev) => (prev === idx ? -1 : idx));
  };

  const currentService = allServices[activeTab >= 0 ? activeTab : 0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Please fill in your name, email address, and contact number.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _formLoadedAt: formLoadedAt,
          serviceCategory: 'All-in-One Common Landing Page'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit proposal request. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or email info@appmotivetechnologies.com directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      {/* Focused Landing Header — Zero navigation distraction, pure high-conversion focus */}
      <header className="landing-nav-header">
        <div className="landing-nav-wrap">
          <Link className="brand" href="/" aria-label="AppMotive Technologies Homepage">
            <img src="/web-logo.webp" alt="AppMotive Technologies Logo" className="brand-logo" />
            <div className="brand-text">
              <span className="brand-name">App<em>Motive</em><span>®</span></span>
              <span className="brand-sub">TECHNOLOGIES</span>
            </div>
          </Link>

          <a href="#get-proposal" className="landing-nav-cta">
            Get Proposal <span>↗</span>
          </a>
        </div>
      </header>

      {/* Hero Section — Human, balanced typography, justified text, reduced mobile padding */}
      <section className="section-pad services-hero-layout landing-hero-layout" style={{ paddingTop: '130px', paddingBottom: '45px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
        <div className="services-hero-copy" style={{ width: '100%', maxWidth: '620px' }}>
          <div className="landing-eyebrow">
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34A853', display: 'inline-block' }} />
            APPMOTIVE TECHNOLOGIES · DIGITAL PRODUCT &amp; GROWTH STUDIO
          </div>

          <h1 className="landing-hero-h1" style={{ fontSize: 'clamp(1.45rem, 2.4vw, 2.15rem)', lineHeight: 1.2, letterSpacing: '-0.5px', color: '#07101d', fontWeight: 800, margin: '0 0 16px' }}>
            Custom Websites, Mobile Apps &amp; Paid Ads <em style={{ color: '#4285F4', fontStyle: 'normal' }}>Built for Real Growth.</em>
          </h1>

          <p className="landing-hero-sub justify-text">
            Clean code, modern design, and measurable results. From high-converting Next.js websites and iOS/Android applications to targeted Meta &amp; Google ad campaigns — we turn your business goals into reliable digital products.
          </p>

          <div className="hero-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a className="primary" href="#get-proposal" style={{ padding: '12px 24px', borderRadius: '12px', background: '#4285F4', color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Get a Free Proposal <span>↗</span>
            </a>
            <a className="secondary" href="#services-matrix" style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid #dadce0', color: '#07101d', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Explore All Services <span>↓</span>
            </a>
          </div>

          <div className="landing-trust-bar">
            <span>⚡ 1–3 Week Delivery</span>
            <span className="separator">·</span>
            <span>🔒 100% Code &amp; Asset Ownership</span>
            <span className="separator">·</span>
            <span>💬 Direct WhatsApp &amp; Call Support</span>
            <span className="separator">·</span>
            <span>★ Fixed Quotes, No Surprises</span>
          </div>
        </div>

        <div className="service-hero-visual" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          <TiltImage
            src="/hero-home.webp"
            alt="AppMotive Technologies Digital Product Engineering Platform"
            className="service-hero-img"
          />
        </div>
      </section>

      {/* Infinite Brand Marquee */}
      <div className="marquee" style={{ transform: 'rotate(-1deg)', margin: '10px 0 25px' }}>
        <div>
          WEBSITE DEVELOPMENT <b>✦</b> MOBILE APPS <b>✦</b> META ADS <b>✦</b> GOOGLE ADS <b>✦</b> AI AUTOMATION <b>✦</b> E-COMMERCE <b>✦</b> CLOUD HOSTING <b>✦</b> AGILE SPRINT DELIVERY <b>✦</b>
        </div>
      </div>

      {/* Trust & Performance Metrics Bar */}
      <section style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '28px 5vw', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', textAlign: 'center' }}>
          <div>
            <strong className="landing-metric-val" style={{ color: '#4285F4' }}>50+</strong>
            <span className="landing-metric-lbl">Delivered Projects</span>
          </div>
          <div>
            <strong className="landing-metric-val" style={{ color: '#34A853' }}>100%</strong>
            <span className="landing-metric-lbl">Source Code Ownership</span>
          </div>
          <div>
            <strong className="landing-metric-val" style={{ color: '#FBBC05' }}>95+</strong>
            <span className="landing-metric-lbl">Google PageSpeed Score</span>
          </div>
          <div>
            <strong className="landing-metric-val" style={{ color: '#EA4335' }}>&lt; 24h</strong>
            <span className="landing-metric-lbl">Proposal Turnaround</span>
          </div>
        </div>
      </section>

      {/* Interactive 9-Service Capabilities Matrix — Responsive with Inline Mobile Accordion & Compact Padding */}
      <section id="services-matrix" className="landing-section light-section">
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="kicker" style={{ color: '#4285F4', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px' }}>
              01 / WHAT WE DO
            </span>
            <h2 className="landing-sec-h2">
              Nine Core Services, <span>One Dedicated Team.</span>
            </h2>
            <p className="landing-sec-sub justify-text">
              Tap any service below to view deliverables, technologies, and what is included in our scope.
            </p>
          </div>

          {/* Matrix Container */}
          <div className="common-landing-matrix" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '20px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: 'clamp(12px, 2.5vw, 24px)', boxShadow: '0 12px 40px rgba(0,0,0,0.03)', boxSizing: 'border-box', width: '100%' }}>
            
            {/* Left Nav List / Mobile Accordion Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: 'none', overflowY: 'visible', width: '100%' }}>
              {allServices.map((svc, idx) => {
                const isOpen = activeTab === idx;
                return (
                  <div key={svc.id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <button
                      onClick={() => handleServiceClick(idx)}
                      className="matrix-btn"
                      style={{
                        borderColor: isOpen ? '#4285F4' : '#eef2f6',
                        background: isOpen ? 'rgba(66, 133, 244, 0.08)' : '#f8fafc',
                        color: isOpen ? '#4285F4' : '#07101d',
                        fontWeight: isOpen ? 700 : 500,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: '0.8rem', opacity: 0.6, flexShrink: 0 }}>{svc.id}</span>
                        <span className="matrix-btn-title">{svc.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span
                          className="matrix-btn-badge"
                          style={{
                            background: isOpen ? '#4285F4' : '#e2e8f0',
                            color: isOpen ? '#fff' : '#5f6368'
                          }}
                        >
                          {svc.badge}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: isOpen ? '#4285F4' : '#9aa0a6', flexShrink: 0 }}>
                          {isOpen ? '▲' : '▾'}
                        </span>
                      </div>
                    </button>

                    {/* Inline Accordion on Mobile (opens right underneath the clicked item!) */}
                    {isOpen && (
                      <div className="matrix-mobile-inline">
                        <ServiceDetailCard svc={svc} onSelectQuote={handleSelectQuote} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Active Preview Box (Desktop Only) */}
            <div className="matrix-desktop-preview">
              <ServiceDetailCard svc={currentService} onSelectQuote={handleSelectQuote} />
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Working Methodology */}
      <section className="landing-section" style={{ background: '#07101d', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ color: '#4285F4', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px' }}>
              02 / HOW WE WORK
            </span>
            <h2 className="landing-sec-h2" style={{ color: '#fff' }}>
              From First Concept to <span>Live Launch.</span>
            </h2>
            <p className="landing-sec-sub justify-text" style={{ color: '#9aa0a6' }}>
              A clear, collaborative process with zero guesswork and no unexpected surprises.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
            {[
              ['01', 'Discovery Call', 'We unpack your business goals, target audience, technical requirements, and target timeline.'],
              ['02', 'Design & Mockups', 'We create custom UI mockups in Figma so you see and approve exactly how everything looks before development.'],
              ['03', 'Agile Engineering', 'We build with clean, fast code, test across devices, and ensure sub-second loading speeds on mobile.'],
              ['04', 'Launch & Handover', 'We deploy to your live domain, configure analytics, and transfer 100% full ownership to you.']
            ].map(([num, stepTitle, stepDesc]) => (
              <div key={num} className="process-card">
                <span style={{ display: 'inline-block', fontSize: '1.3rem', fontWeight: 800, color: '#4285F4', marginBottom: '8px' }}>
                  {num}
                </span>
                <h3 style={{ fontSize: '1.05rem', margin: '0 0 6px', color: '#fff', fontWeight: 700 }}>{stepTitle}</h3>
                <p className="justify-text" style={{ color: '#9aa0a6', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{stepDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="get-proposal" className="landing-section" style={{ background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '30px', alignItems: 'center' }}>
          <div>
            <span className="kicker" style={{ color: '#4285F4', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px' }}>
              03 / GET A QUOTE
            </span>
            <h2 className="landing-sec-h2" style={{ margin: '8px 0 12px' }}>
              Tell Us About <span>Your Project.</span>
            </h2>
            <p className="landing-sec-sub justify-text" style={{ margin: '0 0 18px', textAlign: 'left' }}>
              Fill out the quick form below. Our team will review your requirements and provide an itemized proposal and timeline within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <div className="justify-text" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#07101d', fontWeight: 600, fontSize: '0.86rem' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(52, 168, 83, 0.12)', color: '#34A853', display: 'grid', placeItems: 'center', fontSize: '11px', flexShrink: 0 }}>✓</span>
                Free project consultation &amp; feasibility review
              </div>
              <div className="justify-text" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#07101d', fontWeight: 600, fontSize: '0.86rem' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(52, 168, 83, 0.12)', color: '#34A853', display: 'grid', placeItems: 'center', fontSize: '11px', flexShrink: 0 }}>✓</span>
                Fixed milestone-based pricing with no hidden costs
              </div>
              <div className="justify-text" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#07101d', fontWeight: 600, fontSize: '0.86rem' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(52, 168, 83, 0.12)', color: '#34A853', display: 'grid', placeItems: 'center', fontSize: '11px', flexShrink: 0 }}>✓</span>
                100% IP &amp; code ownership under standard NDA
              </div>

              <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="mailto:info@appmotivetechnologies.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#07101d', fontSize: '0.86rem', textDecoration: 'none', fontWeight: 600 }}>
                  <span style={{ color: '#4285F4' }}>✉</span> info@appmotivetechnologies.com
                </a>
                <a href="tel:+919837033948" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#07101d', fontSize: '0.86rem', textDecoration: 'none', fontWeight: 600 }}>
                  <span style={{ color: '#34A853' }}>📞</span> +91 9837033948 (Call / WhatsApp)
                </a>
              </div>
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(52, 168, 83, 0.15)', color: '#34A853', display: 'grid', placeItems: 'center', fontSize: '22px', margin: '0 auto 10px' }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#07101d', margin: '0 0 6px', fontWeight: 700 }}>Inquiry Received!</h3>
                <p className="justify-text" style={{ color: '#5f6368', fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '16px' }}>
                  Thank you, <strong>{formData.name}</strong>! We will review your project details and reach out at <strong>{formData.email}</strong> within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', service: 'Website Development', budget: '$5,000 - $10,000', message: '' });
                  }}
                  style={{ background: '#4285F4', color: '#fff', border: 'none', padding: '11px 20px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px', width: '100%' }}>
                {errorMsg && (
                  <div style={{ padding: '8px 11px', background: 'rgba(234, 67, 53, 0.1)', border: '1px solid #EA4335', borderRadius: '8px', color: '#EA4335', fontSize: '0.8rem' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* Honeypot field (invisible to humans, trapped by spam bots) */}
                <div style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                  <label htmlFor="landing_hp_website">Do not fill this field</label>
                  <input
                    id="landing_hp_website"
                    type="text"
                    name="hp_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.hp_website || ''}
                    onChange={(e) => setFormData({ ...formData, hp_website: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#07101d', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #dadce0', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#07101d', marginBottom: '4px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #dadce0', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#07101d', marginBottom: '4px' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9837033948"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #dadce0', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#07101d', marginBottom: '4px' }}>
                      Primary Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #dadce0', fontSize: '0.86rem', background: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    >
                      {allServices.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                      <option value="Multi-Service Growth Bundle">Multi-Service / Custom Package</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#07101d', marginBottom: '4px' }}>
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #dadce0', fontSize: '0.86rem', background: '#fff', outline: 'none', boxSizing: 'border-box' }}
                    >
                      <option value="Under $5,000">Under $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000+">$25,000+</option>
                      <option value="Needs Consultation">Needs Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#07101d', marginBottom: '4px' }}>
                    Project Goals (Optional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us what you're building, target timeline, or features needed..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #dadce0', fontSize: '0.88rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#4285F4',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: '3px',
                    boxShadow: '0 4px 14px rgba(66, 133, 244, 0.35)',
                    transition: 'all 0.2s ease',
                    width: '100%'
                  }}
                >
                  {loading ? 'Submitting Request...' : 'Get Your Custom Proposal ↗'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* WHY APPMOTIVE BENTO GRID */}
      <section className="landing-section" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="kicker" style={{ color: '#4285F4', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px' }}>
              04 / WHY APPMOTIVE
            </span>
            <h2 className="landing-sec-h2">
              A Transparent, <span>Direct Working Relationship.</span>
            </h2>
            <p className="landing-sec-sub justify-text">
              What you can count on when partnering with our development and marketing team.
            </p>
          </div>

          {/* Bento Grid Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px', marginBottom: '40px' }}>
            <div className="bento-card">
              <div>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>💬</span>
                <span style={{ color: '#4285F4', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.5px' }}>DIRECT ACCESS</span>
                <h3 style={{ fontSize: '1.12rem', color: '#07101d', margin: '6px 0 6px', fontWeight: 700 }}>Direct Developer Communication</h3>
                <p className="justify-text" style={{ color: '#5f6368', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                  No middlemen or account managers playing telephone. You communicate directly with the developers and designers building your software via WhatsApp or call.
                </p>
              </div>
              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', color: '#34A853', fontSize: '0.8rem', fontWeight: 700 }}>
                ✓ Fast responses &amp; clear updates
              </div>
            </div>

            <div className="bento-card">
              <div>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>⚡</span>
                <span style={{ color: '#34A853', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.5px' }}>PERFORMANCE FIRST</span>
                <h3 style={{ fontSize: '1.12rem', color: '#07101d', margin: '6px 0 6px', fontWeight: 700 }}>Built for Mobile Speed</h3>
                <p className="justify-text" style={{ color: '#5f6368', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                  We engineer every website on Next.js 15 for sub-second mobile loading. Faster websites convert more visitors and rank higher on Google search results.
                </p>
              </div>
              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', color: '#34A853', fontSize: '0.8rem', fontWeight: 700 }}>
                ✓ 90+ PageSpeed benchmark
              </div>
            </div>

            <div className="bento-card">
              <div>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>🔒</span>
                <span style={{ color: '#FBBC05', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.5px' }}>ZERO LOCK-IN</span>
                <h3 style={{ fontSize: '1.12rem', color: '#07101d', margin: '6px 0 6px', fontWeight: 700 }}>100% You Own Everything</h3>
                <p className="justify-text" style={{ color: '#5f6368', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                  You retain 100% ownership of your source code, design assets, domain, and ad accounts. Complete freedom with zero proprietary vendor lock-in.
                </p>
              </div>
              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', color: '#34A853', fontSize: '0.8rem', fontWeight: 700 }}>
                ✓ Full IP code handover
              </div>
            </div>

            <div className="bento-card">
              <div>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '10px' }}>🎯</span>
                <span style={{ color: '#EA4335', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.5px' }}>TRANSPARENCY</span>
                <h3 style={{ fontSize: '1.12rem', color: '#07101d', margin: '6px 0 6px', fontWeight: 700 }}>Fixed Milestone Pricing</h3>
                <p className="justify-text" style={{ color: '#5f6368', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                  Detailed project scopes and fixed quotes. You always know exactly what is being delivered, the target launch date, and the fixed cost upfront.
                </p>
              </div>
              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', color: '#34A853', fontSize: '0.8rem', fontWeight: 700 }}>
                ✓ No surprise invoices
              </div>
            </div>
          </div>

          {/* Selected Work / Real Deliverables */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{ color: '#4285F4', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '1px' }}>05 / RECENT WORK</span>
            <h3 className="landing-sec-h2" style={{ margin: '6px 0 8px' }}>Delivered for Real Business Impact</h3>
            <p className="landing-sec-sub justify-text">A look at recent digital products and campaigns we have launched.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              {
                title: 'High-Converting E-Commerce Store',
                metric: '+180% Mobile Sales',
                desc: 'Fast headless storefront engineered with instant checkout, multi-currency localization, and sub-second catalog search.',
                tags: ['Next.js', 'Shopify Plus', 'Stripe'],
                img: '/project-2.webp'
              },
              {
                title: 'Modern Healthcare & Clinic Portal',
                metric: '98 PageSpeed & 3x Bookings',
                desc: 'Responsive web platform with automated appointment booking, WhatsApp chat integration, and local SEO ranking.',
                tags: ['Next.js', 'Tailwind', 'Local SEO'],
                img: '/project-1.webp'
              },
              {
                title: 'Local Business Lead Gen Funnel',
                metric: '45+ Monthly Qualified Leads',
                desc: 'High-converting landing page paired with laser-targeted Meta and Google Search ad campaigns.',
                tags: ['Meta Ads', 'Google Ads', 'Landing Page'],
                img: '/project-3.webp'
              }
            ].map((cs, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '160px', overflow: 'hidden', background: '#07101d' }}>
                  <img
                    src={cs.img}
                    alt={cs.title}
                    width={400}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="case-study-content" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ display: 'inline-block', background: 'rgba(52, 168, 83, 0.12)', color: '#34A853', padding: '2px 8px', borderRadius: '99px', fontSize: '0.74rem', fontWeight: 700, marginBottom: '8px' }}>
                      {cs.metric}
                    </span>
                    <h4 style={{ fontSize: '1.04rem', color: '#07101d', margin: '0 0 6px', fontWeight: 700 }}>{cs.title}</h4>
                    <p className="justify-text" style={{ color: '#5f6368', fontSize: '0.84rem', lineHeight: 1.5, margin: '0 0 10px' }}>{cs.desc}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {cs.tags.map((t, ti) => (
                      <span key={ti} style={{ background: '#e2e8f0', color: '#07101d', padding: '2px 7px', borderRadius: '5px', fontSize: '0.72rem', fontWeight: 500 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="landing-section faq-section" style={{ background: '#f8fafc' }}>
        <div className="faq-layout">
          <div className="faq-intro">
            <span className="kicker">06 / FREQUENTLY ASKED</span>
            <h2 id="faq-heading" className="landing-sec-h2">Frequently asked <span>questions.</span></h2>
            <p className="landing-sec-sub justify-text" style={{ textAlign: 'left', margin: 0 }}>Everything you need to know about working with our team, pricing, and IP rights.</p>
          </div>

          <div className="faq-list">
            {landingFaqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === idx ? 'is-open' : ''}`}>
                <button
                  className="faq-button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <div className="faq-question-wrap">
                    <span className="faq-num">0{idx + 1}</span>
                    <span className="faq-question">{faq.q}</span>
                  </div>
                  <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="faq-answer">
                    <p className="justify-text">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section className="cta landing-section" aria-label="Call to Action" style={{ textAlign: 'center', background: '#07101d', color: '#fff' }}>
        <div className="cta-grid" />
        <span className="kicker" style={{ color: '#4285F4', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px' }}>
          READY TO START YOUR PROJECT?
        </span>
        <h2 className="landing-sec-h2" style={{ margin: '10px 0 18px', color: '#fff' }}>
          Let’s Build Something <span>Great Together.</span>
        </h2>
        <a className="primary light-btn" href="#get-proposal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: '#fff', color: '#07101d', textDecoration: 'none', fontWeight: 700, fontSize: '0.92rem' }}>
          Get Your Free Project Proposal <span>↗</span>
        </a>
      </section>

      {/* Minimal Landing Footer — Clean, full-width single-row flex layout with full text and space-between */}
      <footer className="landing-footer">
        <div className="landing-footer-wrap">
          <div className="landing-footer-brand">
            <img
              src="/web-logo.webp"
              alt="AppMotive Technologies"
              style={{ height: '22px', width: 'auto', opacity: 0.9, flexShrink: 0 }}
            />
            <span className="landing-footer-brand-text">
              AppMotive Technologies · High-Performance Engineering &amp; Growth Studio
            </span>
          </div>

          <div className="landing-footer-copy">
            © {new Date().getFullYear()} AppMotive Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
