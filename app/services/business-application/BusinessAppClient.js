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

const businessCapabilities = [
  {
    num: '01',
    title: 'Internal Admin Dashboards & Tooling',
    desc: 'Empower your operations team with tailored internal control centers, live data tables, filtering, and automated reporting.'
  },
  {
    num: '02',
    title: 'Custom CRM & ERP Systems',
    desc: 'Replace fragmented off-the-shelf software with bespoke business management portals tailored precisely to your operational workflow.'
  },
  {
    num: '03',
    title: 'Granular Role-Based Security (RBAC)',
    desc: 'Protect enterprise data with multi-tenant isolation, role-based access control permissions, SAML/SSO integration, and audit logging.'
  },
  {
    num: '04',
    title: 'Legacy System Modernization',
    desc: 'Refactor outdated legacy software monoliths into high-speed microservices with zero operational downtime.'
  }
];

const businessTech = ['🐘 PostgreSQL', '⚛️ React 19', '🟢 Node.js', '📐 GraphQL', '🐳 Docker', '🔑 OAuth 2.0 / SAML', '📊 Redis Caching', '☁️ AWS ECS'];

const businessFaqs = [
  {
    q: 'Why build custom enterprise software instead of using off-the-shelf SaaS?',
    a: 'Custom enterprise software provides 100% data ownership, eliminates recurring seat licensing fees, aligns perfectly with your workflow, and integrates seamlessly with your internal APIs.'
  },
  {
    q: 'How do you handle user permissions and security roles?',
    a: 'We architect granular Role-Based Access Control (RBAC) enabling administrators to grant precise read/write/delete permissions across different user roles and organization departments.'
  },
  {
    q: 'Can custom business applications connect to our existing database?',
    a: 'Yes. We seamlessly connect to PostgreSQL, MySQL, MongoDB, Oracle, Salesforce, and REST/GraphQL APIs.'
  },
  {
    q: 'What is the typical development timeline for a custom business application?',
    a: 'An enterprise internal admin tool or CRM MVP usually takes between 6 to 10 weeks from initial workflow mapping to production launch.'
  }
];

const businessProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Workflow Mapping & Data Modeling',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'Analyzing organizational data flows, user roles, database schemas, and integration endpoints.',
    deliverable: 'ERD Database Schema & RBAC Matrix'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Admin UI/UX Design & Prototyping',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Designing high-density data tables, interactive analytics charts, and intuitive management views in Figma.',
    deliverable: 'Interactive Figma Admin Prototypes'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'Backend Engineering & RBAC Security',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Building high-performance APIs, database indexing, SSO authentication, and real-time audit log tracking.',
    deliverable: 'Secure Business Application Platform'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'Data Migration & Penetration QA',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Migrating legacy records, end-to-end stress testing, RBAC permission auditing, and security validation.',
    deliverable: 'Data Migration & Security Pass'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Production Cutover & Staff Training',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'Live deployment, staff onboarding, operational team training, and 24/7 SLA maintenance support.',
    deliverable: 'Live Enterprise System & Documentation'
  }
];

const businessTestimonialsData = [
  {
    id: 1,
    name: 'Vikramjit Roy',
    role: 'Chief Operating Officer',
    company: 'IndoLogistics Corp',
    location: 'Mumbai, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #EA4335, #4285F4)',
    initials: 'VR',
    rating: 5,
    highlight: '💼 100% Operational Efficiency Gain',
    quote: 'AppMotive designed our custom ERP & internal dispatch dashboard. What used to take 4 hours of spreadsheet entry is now automated in seconds with zero human error.',
    project: 'Enterprise ERP & Internal Admin Portal'
  },
  {
    id: 2,
    name: 'Robert Sterling',
    role: 'VP of Engineering',
    company: 'Apex Health Systems',
    location: 'Chicago, USA',
    flag: '🇺🇸',
    avatarBg: 'linear-gradient(135deg, #9C27B0, #34A853)',
    initials: 'RS',
    rating: 5,
    highlight: '🔒 Granular RBAC & HIPAA Compliant',
    quote: 'Extremely clean full-stack architecture. They modernized our legacy system into a high-speed React dashboard with strict role-based permission control.',
    project: 'Healthcare Admin Portal'
  }
];

export default function BusinessAppClient() {
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
        body: JSON.stringify({ ...formData, service: 'Business Application & Enterprise Software' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit business app form error:', err);
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
          <img src="/web-logo.webp" alt="AppMotive Technologies Logo" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-name" style={{ color: '#07101d' }}>
              App<em style={{ color: '#EA4335', fontStyle: 'normal' }}>Motive</em><span style={{ color: '#07101d', fontSize: '0.7em', marginLeft: '2px' }}>®</span>
            </span>
            <span className="brand-sub" style={{ color: '#5f6368', letterSpacing: '2.5px' }}>TECHNOLOGIES</span>
          </div>
        </Link>
        <a href="#lead-form" className="primary">
          Get Proposal <span>↗</span>
        </a>
      </header>

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Business Application Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> ENTERPRISE SOFTWARE CAPABILITY</div></Reveal>
          <Reveal><h1>Business Application Development <em>Streamline Operations.</em></h1></Reveal>
          <Reveal><p>Custom internal tools, admin portals, and enterprise software platforms engineered to automate complex business workflows and protect organizational data.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get Software Proposal <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/project-1.webp" alt="AppMotive Custom Enterprise Software Systems" className="service-hero-img" />
        </div>
      </section>

      {/* About Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="bizapp-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#EA4335' }}>WHO WE ARE</span>
              <h2 id="bizapp-about-heading">
                We build enterprise applications <span>that simplify complex operations.</span>
              </h2>
              <p>
                AppMotive Technologies is a specialized enterprise software partner. We bridge the gap between high-density operational data, RBAC security, and rapid web performance.
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>🏢</div>
                  <div className="about-feature-info">
                    <strong>Custom Workflows</strong>
                    <span>Bespoke tools built around your exact operational processes</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>🔑</div>
                  <div className="about-feature-info">
                    <strong>Granular RBAC</strong>
                    <span>Multi-tenant permissions & SAML/SSO security</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>💾</div>
                  <div className="about-feature-info">
                    <strong>PostgreSQL & Microservices</strong>
                    <span>High-speed database indexing & zero lag</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#FBBC05' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>Full IP Ownership</strong>
                    <span>100% source code ownership with zero lock-in</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our Enterprise Architects <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/about-us.webp" alt="AppMotive Enterprise Software Engineers" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">100%</span>
                  <div className="about-badge-text">
                    <strong>Custom Tailored</strong>
                    <span>Built specifically for your business operations</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-pad light-section" aria-labelledby="bizapp-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE BUILD</span>
            <h2 id="bizapp-caps-heading">Enterprise software built for <span>clarity & control.</span></h2>
          </div>
          <p>Custom admin dashboards, ERP/CRM portals, and security access control.</p>
        </div>

        <div className="why-grid">
          {businessCapabilities.map((item) => (
            <div className="why-card" key={item.num}>
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <span className="kicker">TECHNOLOGY STACK</span>
          <div className="tech-pills" style={{ justifyContent: 'center', marginTop: '16px' }}>
            {businessTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap */}
      <section className="section section-pad process-section-light" aria-labelledby="bizapp-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#4285F4', background: 'rgba(66, 133, 244, 0.08)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="bizapp-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Engineer <span style={{ color: '#4285F4' }}>Custom Enterprise Software.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial ERD data modeling to data migration & staff onboarding — predictable and secure.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {businessProcessSteps.map((step) => (
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
      <section className="section dark-section section-pad" aria-label="Business App Metrics">
        <div className="stats-header text-center">
          <span className="kicker">SOFTWARE GUARANTEE</span>
          <h2>Built for <span>high-density enterprise performance.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              100<span style={{ fontSize: '1.8rem', color: '#4285F4', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Tailored Workflow Fit</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              6-10 <span style={{ fontSize: '1.4rem', color: '#34A853', fontWeight: 600 }}>Weeks</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average MVP Launch Time</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              0<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}></span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Per-User Seat License Fees</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>24/7</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Enterprise Uptime & SLA</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-pad testimonial-section" aria-labelledby="bizapp-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="bizapp-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Trusted by leaders <span style={{ color: '#8993a1' }}>managing operations.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our custom business applications streamline operations and eliminate manual bottlenecks.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {businessTestimonialsData.map((item) => (
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
      <section id="lead-form" className="section section-pad light-section" aria-labelledby="bizapp-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="bizapp-form-heading">Request a custom <span>software proposal.</span></h2>
            <p>Fill out the form to schedule a free 30-minute discovery call and receive a detailed enterprise architecture scope.</p>

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
                  <span>Your operational details stay 100% confidential</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">✓</span>
                <h3>Thank you, {formData.name}!</h3>
                <p>Your enterprise software request has been received. Our lead architect will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="Business Application Inquiry Form">
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
                    placeholder="+91 9837033948"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">System Overview / Requirements (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your internal management dashboard, ERP/CRM requirements, or target timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request Software Proposal <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-pad faq-section" aria-labelledby="bizapp-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">BUSINESS APP FAQ</span>
              <h2 id="bizapp-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our custom enterprise software development, RBAC security, and delivery guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {businessFaqs.map((faq, idx) => (
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
