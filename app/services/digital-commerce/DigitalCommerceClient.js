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

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

const commerceCapabilities = [
  {
    num: '01',
    title: 'Headless Next.js Storefronts',
    desc: 'Ultra-fast headless online stores powered by Next.js 15, pairing sub-second page loads with seamless Shopify/Commerce Layer APIs.'
  },
  {
    num: '02',
    title: 'High-Converting Checkout Funnels',
    desc: 'Customized checkout experiences optimized for maximum conversion rates, frictionless Apple Pay/Google Pay one-tap buying, and upsells.'
  },
  {
    num: '03',
    title: 'Multi-Currency & Global Gateways',
    desc: 'Expand globally with localized pricing, automatic currency conversion, and global payment integrations (Stripe, Klarna, PayPal, Adyen).'
  },
  {
    num: '04',
    title: 'Inventory & Order Automation',
    desc: 'Automate inventory sync, ERP fulfillment integrations, live order tracking, and dynamic product recommendations.'
  }
];

const commerceTech = ['🛍️ Shopify Plus', '⚡ Next.js 15', '💳 Stripe', '🏬 Commerce Layer', '🔷 TypeScript', '🎨 Tailwind CSS', '📈 Klaviyo', '☁️ Vercel'];

const commerceFaqs = [
  {
    q: 'Why upgrade to a Headless E-Commerce storefront?',
    a: 'Headless decoupled architecture decouples your frontend Next.js presentation layer from the backend commerce engine, giving you sub-second page speed, complete UX design freedom, and 99+ Core Web Vitals.'
  },
  {
    q: 'Can you integrate our existing Shopify store?',
    a: 'Yes! We use the Shopify Storefront GraphQL API to build custom Next.js frontend interfaces while keeping your existing Shopify product catalog, inventory, and backend orders intact.'
  },
  {
    q: 'How do you handle multi-currency and international tax?',
    a: 'We integrate automated location-based currency conversion and tax calculating APIs (Stripe Tax, Avalara) for seamless cross-border shopping compliance.'
  },
  {
    q: 'What is the typical timeline for building a custom e-commerce store?',
    a: 'A custom high-converting e-commerce web application or headless store launch takes between 4 to 8 weeks.'
  }
];

const commerceProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Catalog Architecture & Funnel Strategy',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'Analyzing catalog taxonomy, cart upsell hooks, conversion bottlenecks, and payment gateway routing.',
    deliverable: 'E-Commerce Funnel & Tech Blueprint'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Figma UX Storefront Design',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Crafting responsive mobile-first product detail pages (PDP), collections, drawer carts, and checkout screens.',
    deliverable: 'Figma E-Commerce UX Suite'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'Headless Next.js Store Engineering',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Building instant product filter search, cart state management, payment gateway integration, and server rendering.',
    deliverable: 'High-Speed E-Commerce Frontend'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'Checkout Conversion & Speed Audit',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Rigorous 1-click checkout testing, Core Web Vitals optimization, and multi-currency payment validation.',
    deliverable: 'Checkout Conversion & Speed Pass'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Store Launch & Analytics Setup',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'End-to-end live checkout testing, inventory webhook verification, analytics event mapping, and store launch.',
    deliverable: 'Live Storefront & Sales Channel'
  }
];

const commerceTestimonialsData = [
  {
    id: 1,
    name: 'Tarun Varma',
    role: 'Co-Founder',
    company: 'Aura Lifestyle',
    location: 'Bengaluru, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #FBBC05, #4285F4)',
    initials: 'TV',
    rating: 5,
    highlight: '🛍️ +240% E-Commerce Sales',
    quote: 'AppMotive built our Headless Next.js + Shopify store. Our mobile page load speed dropped under 0.8 seconds and our checkout conversion rate surged by 240%!',
    project: 'Headless D2C E-Commerce Store'
  },
  {
    id: 2,
    name: 'Elena Rostova',
    role: 'Head of E-Commerce',
    company: 'Nordic Lux Design',
    location: 'Stockholm, Sweden',
    flag: '🇸🇪',
    avatarBg: 'linear-gradient(135deg, #34A853, #9C27B0)',
    initials: 'ER',
    rating: 5,
    highlight: '🌍 Global Multi-Currency Checkout',
    quote: 'Sub-second page transitions across European and US buyers. Multi-currency Stripe checkout and automated inventory sync worked flawlessly from day one.',
    project: 'Global Headless Storefront'
  }
];

export default function DigitalCommerceClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState(-1);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: 'Digital Commerce & E-Commerce' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit digital commerce form error:', err);
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="scroll-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className="cursor-glow" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />

      {/* Header */}
      <header className="landing-header">
        <Link className="brand" href="/" aria-label="AppMotive Technologies Homepage">
          <img src="/web-logo.png" alt="AppMotive Technologies Logo" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-name" style={{ color: '#07101d' }}>
              App<em style={{ color: '#FBBC05', fontStyle: 'normal' }}>Motive</em><span style={{ color: '#07101d', fontSize: '0.7em', marginLeft: '2px' }}>®</span>
            </span>
            <span className="brand-sub" style={{ color: '#5f6368', letterSpacing: '2.5px' }}>TECHNOLOGIES</span>
          </div>
        </Link>
        <a href="#lead-form" className="primary">
          Get Quote <span>↗</span>
        </a>
      </header>

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Digital Commerce Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> E-COMMERCE SOLUTIONS CAPABILITY</div></Reveal>
          <Reveal><h1>Digital Commerce Services <em>Built to Scale Revenue.</em></h1></Reveal>
          <Reveal><p>High-converting headless storefronts, sub-second product pages, global multi-currency checkout funnels, and order automation engineered by AppMotive.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get Store Proposal <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/project-2.jpg" alt="AppMotive High-Speed Digital Commerce Platforms" className="service-hero-img" />
        </div>
      </section>

      {/* About Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="commerce-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#FBBC05' }}>WHO WE ARE</span>
              <h2 id="commerce-about-heading">
                We build headless storefronts <span>that maximize sales conversions.</span>
              </h2>
              <p>
                AppMotive Technologies is an elite digital commerce studio. We bridge the gap between high-speed Next.js frontend design, Shopify APIs, and seamless multi-currency checkout funnels.
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#FBBC05' }}>🛍️</div>
                  <div className="about-feature-info">
                    <strong>Headless Next.js Speed</strong>
                    <span>Sub-second product load times out of the box</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>💳</div>
                  <div className="about-feature-info">
                    <strong>1-Tap Checkout</strong>
                    <span>Apple Pay, Google Pay & Stripe multi-currency</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>📦</div>
                  <div className="about-feature-info">
                    <strong>Automated Inventory</strong>
                    <span>Real-time webhook sync across ERP & warehouses</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>Global Scale</strong>
                    <span>Multi-language & localized tax compliance</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our Commerce Architects <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/service-hero.png" alt="AppMotive E-Commerce Engineering Team" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">99+</span>
                  <div className="about-badge-text">
                    <strong>PageSpeed Score</strong>
                    <span>Headless Next.js storefront performance</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-pad light-section" aria-labelledby="commerce-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE BUILD</span>
            <h2 id="commerce-caps-heading">Digital storefronts built for <span>speed & revenue.</span></h2>
          </div>
          <p>Headless e-commerce architecture, custom checkout funnels, and order automation.</p>
        </div>

        <div className="why-grid">
          {commerceCapabilities.map((item) => (
            <div className="why-card" key={item.num}>
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <span className="kicker">PLATFORMS & INTEGRATIONS</span>
          <div className="tech-pills" style={{ justifyContent: 'center', marginTop: '16px' }}>
            {commerceTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap */}
      <section className="section section-pad process-section-light" aria-labelledby="commerce-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#FBBC05', background: 'rgba(251, 188, 5, 0.15)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="commerce-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Engineer <span style={{ color: '#FBBC05' }}>High-Converting Stores.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial catalog architecture to live multi-currency checkout — transparent, fast, and conversion focused.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {commerceProcessSteps.map((step) => (
            <Reveal key={step.num}>
              <div
                className="process-card-light"
                style={{
                  '--card-accent': step.accent,
                  '--card-accent-light': step.accentLight
                }}
              >
                <div>
                  <div className="process-card-light-top">
                    <div className="process-num-pill">{step.num}</div>
                    <span className="process-phase-pill-light">{step.phase}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                <div className="process-deliverable-light-box">
                  <span className="process-deliverable-light-label">✓ Key Deliverable</span>
                  <div className="process-deliverable-light-val">{step.deliverable}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section dark-section section-pad" aria-label="Commerce Metrics">
        <div className="stats-header text-center">
          <span className="kicker">ENGINEERING GUARANTEE</span>
          <h2>Built to <span>outperform legacy e-commerce stores.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              0.8<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}>s</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average Product Page Load</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              4-8 <span style={{ fontSize: '1.4rem', color: '#34A853', fontWeight: 600 }}>Weeks</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average Storefront Launch</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              100<span style={{ fontSize: '1.8rem', color: '#4285F4', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Full Store & Codebase Ownership</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>24/7</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Payment Gateway & Webhook SLA</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-pad testimonial-section" aria-labelledby="commerce-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="commerce-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Trusted by e-commerce brands <span style={{ color: '#8993a1' }}>worldwide.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our custom digital commerce engineering powers high-converting storefronts.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {commerceTestimonialsData.map((item) => (
            <Reveal key={item.id}>
              <div className="testimonial-card">
                <div>
                  <div className="testimonial-top">
                    <div className="testimonial-stars">★★★★★</div>
                    <span className="verified-badge">✓ Verified Client</span>
                  </div>
                  <div className="testimonial-highlight">{item.highlight}</div>
                  <p className="testimonial-quote">{item.quote}</p>
                </div>

                <div className="testimonial-author-block">
                  <div className="avatar-badge" style={{ background: item.avatarBg }}>
                    {item.initials}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{item.name}</span>
                    <span className="author-role">{item.role}, {item.company}</span>
                    <span className="author-location">{item.flag} {item.location}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section id="lead-form" className="section section-pad light-section" aria-labelledby="commerce-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="commerce-form-heading">Start your digital <span>commerce project.</span></h2>
            <p>Fill out the form to schedule a free 30-minute discovery call and receive a detailed project scope & cost estimate.</p>

            <div className="contact-card-list">
              <div className="contact-info-card">
                <span className="card-icon">⚡</span>
                <div>
                  <strong>Fast Proposal Guarantee</strong>
                  <span>Detailed scope sent within 24 hours</span>
                </div>
              </div>
              <div className="contact-info-card">
                <span className="card-icon">🔒</span>
                <div>
                  <strong>NDA Protection</strong>
                  <span>Your store details stay 100% confidential</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">✓</span>
                <h3>Thank you, {formData.name}!</h3>
                <p>Your e-commerce project request has been received. Our lead architect will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="Digital Commerce Inquiry Form">
                {errorMsg && (
                  <div style={{ padding: '12px 16px', background: 'rgba(234, 67, 53, 0.1)', border: '1px solid #EA4335', borderRadius: '8px', color: '#EA4335', marginBottom: '16px', fontSize: '0.9rem' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Contact Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000 or +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Store Overview / Requirements (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your product catalog, current store platform, or target features..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request E-Commerce Proposal <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-pad faq-section" aria-labelledby="commerce-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">DIGITAL COMMERCE FAQ</span>
              <h2 id="commerce-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our headless e-commerce architecture, payment gateway integration, and delivery guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {commerceFaqs.map((faq, idx) => (
              <Reveal key={idx}>
                <div className={`faq-item ${openFaq === idx ? 'is-open' : ''}`}>
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
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#07101d', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 40px', textAlign: 'center', color: '#9aa0a6', fontSize: '0.85rem' }}>
        <div>© 2026 AppMotive Technologies. All rights reserved.</div>
      </footer>
    </main>
  );
}
