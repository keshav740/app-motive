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

const cloudCapabilities = [
  {
    num: '01',
    title: 'AWS & GCP Cloud Migrations',
    desc: 'Seamlessly migrate legacy infrastructure and databases to AWS or Google Cloud with zero data loss or service disruption.'
  },
  {
    num: '02',
    title: 'Serverless APIs & Event Architectures',
    desc: 'Build cost-effective serverless microservices using AWS Lambda, Cloudflare Workers, and Google Cloud Functions.'
  },
  {
    num: '03',
    title: 'Auto-Scaling & Disaster Recovery',
    desc: 'Architect resilient multi-region database failovers, automated backup policies, and dynamic load balancers.'
  },
  {
    num: '04',
    title: 'Cloud Security & FinOps Audit',
    desc: 'Optimize cloud expenditure, audit IAM security rules, and enforce SOC2/HIPAA compliance controls across all cloud resources.'
  }
];

const cloudTech = ['☁️ AWS', '🌐 Google Cloud (GCP)', '🔷 Microsoft Azure', '⚡ Serverless', '🧡 Cloudflare', '🐘 AWS Aurora', '🛡️ HashiCorp Vault', '📊 Datadog'];

const cloudFaqs = [
  {
    q: 'How do you handle cloud migration without downtime?',
    a: 'We use blue/green deployment strategies, real-time database replication, and DNS traffic switching to ensure your applications remain live while data transfers seamlessly.'
  },
  {
    q: 'What cloud provider do you recommend for our app?',
    a: 'AWS is ideal for enterprise infrastructure, Google Cloud (GCP) is unmatched for AI & data analytics workloads, and Vercel/Cloudflare are perfect for modern web applications.'
  },
  {
    q: 'Can you help reduce our monthly cloud bill?',
    a: 'Yes! Our Cloud FinOps audit identifies idle resources, optimizes EC2/RDS instances, and implements auto-scaling rules to reduce cloud expenditure by 20% to 40%.'
  },
  {
    q: 'How long does a cloud migration take?',
    a: 'A standard cloud migration roadmap ranges from 3 to 6 weeks depending on database sizes and microservices architecture.'
  }
];

const cloudProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Cloud Infrastructure & Cost Audit',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'Evaluating current server architecture, network security rules, database throughput, and monthly spend.',
    deliverable: 'Cloud Infrastructure & Cost Blueprint'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Serverless & Database Topology',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Designing cloud network VPCs, serverless microservices, IAM security policies, and DB replication topologies.',
    deliverable: 'Cloud Architecture & IAM Spec'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'Data Migration & Staging Sync',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Staging live database replication streams, testing failover triggers, and deploying auto-scaling policies.',
    deliverable: 'Tested Multi-Region Cloud Staging'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'FinOps Optimization & Security Pass',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Auditing security access controls, configuring cost budget alerts, and executing SOC2 compliance checks.',
    deliverable: 'FinOps Cost Audit & Security Pass'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Production Cutover & 24/7 Ops',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'Executing seamless DNS cutover, setting up 24/7 Datadog alerts, and establishing automated snapshot backups.',
    deliverable: 'Live Cloud Infrastructure & 24/7 Ops'
  }
];

const cloudTestimonialsData = [
  {
    id: 1,
    name: 'Gaurav Agrawal',
    role: 'CTO',
    company: 'FinPulse Cloud',
    location: 'Bengaluru, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #34A853, #4285F4)',
    initials: 'GA',
    rating: 5,
    highlight: '☁️ 99.99% Uptime & 35% Cost Saved',
    quote: 'AppMotive migrated our core financial API services to AWS Serverless Lambda. Our monthly infrastructure bill dropped by 35% while uptime remained at 99.99%!',
    project: 'AWS Serverless Migration & FinOps'
  },
  {
    id: 2,
    name: 'Jonathan Ross',
    role: 'Principal Cloud Architect',
    company: 'DataStream Global',
    location: 'San Jose, USA',
    flag: '🇺🇸',
    avatarBg: 'linear-gradient(135deg, #4285F4, #FBBC05)',
    initials: 'JR',
    rating: 5,
    highlight: '⚡ Zero Downtime Cloud Cutover',
    quote: 'Flawless database migration stream. Over 10 million customer records were migrated to Google Cloud Spanner with zero system downtime or data loss.',
    project: 'GCP Cloud Spanner Migration'
  }
];

export default function CloudServicesClient() {
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
        body: JSON.stringify({ ...formData, service: 'Cloud Services & Architecture' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit cloud services form error:', err);
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
              App<em style={{ color: '#34A853', fontStyle: 'normal' }}>Motive</em><span style={{ color: '#07101d', fontSize: '0.7em', marginLeft: '2px' }}>®</span>
            </span>
            <span className="brand-sub" style={{ color: '#5f6368', letterSpacing: '2.5px' }}>TECHNOLOGIES</span>
          </div>
        </Link>
        <a href="#lead-form" className="primary">
          Get Quote <span>↗</span>
        </a>
      </header>

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Cloud Architecture Services Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> CLOUD ARCHITECTURE CAPABILITY</div></Reveal>
          <Reveal><h1>Cloud Architecture Services <em>High Uptime & Elastic Scale.</em></h1></Reveal>
          <Reveal><p>Build resilient cloud infrastructure. We design AWS/GCP cloud migrations, serverless microservices, auto-scaling databases, and FinOps cost optimizations.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get Cloud Proposal <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/project-1.webp" alt="AppMotive Elastic Cloud Architecture Systems" className="service-hero-img" />
        </div>
      </section>

      {/* About Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="cloud-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#34A853' }}>WHO WE ARE</span>
              <h2 id="cloud-about-heading">
                We build elastic cloud systems <span>that deliver 99.99% uptime.</span>
              </h2>
              <p>
                AppMotive Technologies is an elite cloud architecture firm. We bridge the gap between high availability, zero downtime data migrations, and automated cloud cost optimization (FinOps).
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>☁️</div>
                  <div className="about-feature-info">
                    <strong>99.99% High Availability</strong>
                    <span>Multi-region database failover & load balancing</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>⚡</div>
                  <div className="about-feature-info">
                    <strong>Serverless Elasticity</strong>
                    <span>Instant auto-scaling without idle server overhead</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#FBBC05' }}>💰</div>
                  <div className="about-feature-info">
                    <strong>FinOps Cost Reduction</strong>
                    <span>Save 20% to 40% on monthly AWS/GCP bills</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>SOC2 & HIPAA Compliant</strong>
                    <span>Enterprise IAM security rules & encrypted backups</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our Cloud Architects <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/about-us.webp" alt="AppMotive Cloud Architecture Engineers" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">99.99%</span>
                  <div className="about-badge-text">
                    <strong>Uptime SLA Guarantee</strong>
                    <span>Maintained across AWS & GCP deployments</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-pad light-section" aria-labelledby="cloud-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE BUILD</span>
            <h2 id="cloud-caps-heading">Cloud architecture built for <span>scale, security & uptime.</span></h2>
          </div>
          <p>AWS/GCP migrations, serverless microservices, and FinOps cost optimization.</p>
        </div>

        <div className="why-grid">
          {cloudCapabilities.map((item) => (
            <div className="why-card" key={item.num}>
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <span className="kicker">CLOUD PROVIDERS & UTILITIES</span>
          <div className="tech-pills" style={{ justifyContent: 'center', marginTop: '16px' }}>
            {cloudTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap */}
      <section className="section section-pad process-section-light" aria-labelledby="cloud-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#34A853', background: 'rgba(52, 168, 83, 0.08)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="cloud-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Execute <span style={{ color: '#34A853' }}>Zero-Downtime Cloud Migrations.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial architecture audit to live multi-region cutover — transparent, secure, and resilient.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {cloudProcessSteps.map((step) => (
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
      <section className="section dark-section section-pad" aria-label="Cloud Metrics">
        <div className="stats-header text-center">
          <span className="kicker">CLOUD GUARANTEE</span>
          <h2>Built for <span>high uptime & cost efficiency.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              99.99<span style={{ fontSize: '1.8rem', color: '#34A853', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>High Availability SLA</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              3-6 <span style={{ fontSize: '1.4rem', color: '#4285F4', fontWeight: 600 }}>Weeks</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average Migration Time</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              20-40<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average Cloud Spend Saved</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>24/7</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Cloud Monitoring & Response</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-pad testimonial-section" aria-labelledby="cloud-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="cloud-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Trusted by leaders <span style={{ color: '#8993a1' }}>scaling in the cloud.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our custom cloud services deliver resilient uptime and cost savings.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {cloudTestimonialsData.map((item) => (
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
      <section id="lead-form" className="section section-pad light-section" aria-labelledby="cloud-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="cloud-form-heading">Start your cloud <span>architecture project.</span></h2>
            <p>Fill out the form to schedule a free 30-minute cloud discovery call and receive a detailed architecture proposal.</p>

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
                  <span>Your cloud specs stay 100% confidential</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">✓</span>
                <h3>Thank you, {formData.name}!</h3>
                <p>Your cloud architecture request has been received. Our lead architect will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="Cloud Services Inquiry Form">
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
                  <label htmlFor="message">Cloud Infrastructure Goals (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your cloud provider (AWS/GCP/Azure), migration timeline, or cost optimization goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request Cloud Proposal <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-pad faq-section" aria-labelledby="cloud-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">CLOUD SERVICES FAQ</span>
              <h2 id="cloud-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our AWS/GCP cloud migrations, serverless APIs, FinOps audits, and 24/7 SLA guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {cloudFaqs.map((faq, idx) => (
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
