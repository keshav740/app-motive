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

const devOpsCapabilities = [
  {
    num: '01',
    title: 'Automated CI/CD Pipelines',
    desc: 'Automate build, test, and release workflows with GitHub Actions, GitLab CI, or Jenkins for instant zero-downtime production deployments.'
  },
  {
    num: '02',
    title: 'Containerization & Kubernetes',
    desc: 'Package microservices into optimized Docker containers and orchestrate auto-scaling clusters with Kubernetes (EKS / GKE).'
  },
  {
    num: '03',
    title: 'Infrastructure as Code (IaC)',
    desc: 'Define, version control, and provision cloud resources reproducibly using Terraform and Ansible with complete security governance.'
  },
  {
    num: '04',
    title: 'Agile Delivery & SRE Coaching',
    desc: 'Empower engineering teams with modern Agile delivery practices, automated testing frameworks, and Site Reliability Engineering (SRE).'
  }
];

const devOpsTech = ['🐳 Docker', '☸️ Kubernetes', '🐙 GitHub Actions', '🏗️ Terraform', '⚙️ Ansible', '📊 Prometheus / Grafana', '☁️ AWS EKS', '⛵ Helm'];

const devOpsFaqs = [
  {
    q: 'How does DevOps automation benefit engineering teams?',
    a: 'DevOps automation eliminates manual deployment errors, shortens release cycles from months to minutes, improves code quality with automated unit testing, and ensures zero-downtime rollouts.'
  },
  {
    q: 'What is Infrastructure as Code (IaC)?',
    a: 'IaC allows your team to write human-readable code (Terraform) that defines servers, databases, and network firewalls, allowing complete environment replication in minutes.'
  },
  {
    q: 'Do you support multi-cloud deployment setups?',
    a: 'Yes. We build cloud-agnostic containerized architectures capable of running across AWS, Google Cloud, Azure, and on-premises infrastructure.'
  },
  {
    q: 'How long does a DevOps CI/CD pipeline audit and setup take?',
    a: 'A complete CI/CD audit and automated pipeline setup typically takes 2 to 4 weeks depending on the number of microservices.'
  }
];

const devOpsProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Infrastructure & Pipeline Audit',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'Evaluating existing deployment bottlenecks, security permissions, container setup, and automated test coverage.',
    deliverable: 'DevOps Infrastructure Audit'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Containerization & IaC Scripts',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Dockerizing application microservices, writing Terraform modules, and configuring environment secrets.',
    deliverable: 'Terraform Modules & Dockerfiles'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'CI/CD Automation & Testing',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Setting up automated GitHub Actions workflows, staging deployment environments, and automated regression testing.',
    deliverable: 'Automated CI/CD Pipeline Suite'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'Zero Downtime Deployment QA',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Testing blue/green rollouts, canary deployments, automated rollbacks, and security secret scanning.',
    deliverable: 'Zero Downtime & SRE Pass'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Monitoring & Team Handoff',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'Integrating Prometheus/Grafana alerts, zero-downtime deployment triggers, and training internal engineering teams.',
    deliverable: 'Live Production Cluster & SRE Setup'
  }
];

const devOpsTestimonialsData = [
  {
    id: 1,
    name: 'Siddharth Rao',
    role: 'Head of Infrastructure',
    company: 'CloudScale Technologies',
    location: 'Bengaluru, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #4285F4, #34A853)',
    initials: 'SR',
    rating: 5,
    highlight: '⚡ Deployment Time Cut from 2h to 3m',
    quote: 'AppMotive automated our entire Kubernetes & GitHub Actions pipeline. Releases that used to take two hours now deploy with zero downtime in 3 minutes!',
    project: 'Kubernetes & CI/CD Pipeline Automation'
  },
  {
    id: 2,
    name: 'Nathan Wright',
    role: 'Lead SRE Architect',
    company: 'SaaSGrid Global',
    location: 'Seattle, USA',
    flag: '🇺🇸',
    avatarBg: 'linear-gradient(135deg, #9C27B0, #EA4335)',
    initials: 'NW',
    rating: 5,
    highlight: '🏗️ 100% Terraform Infrastructure',
    quote: 'Their Infrastructure as Code setup using Terraform is best in class. We can spin up entire staging and production environments automatically in under 10 minutes.',
    project: 'Terraform IaC & Cloud Security'
  }
];

export default function AgileDevOpsClient() {
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
        body: JSON.stringify({ ...formData, service: 'Agile & DevOps Infrastructure' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit DevOps form error:', err);
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
              App<em style={{ color: '#4285F4', fontStyle: 'normal' }}>Motive</em><span style={{ color: '#07101d', fontSize: '0.7em', marginLeft: '2px' }}>®</span>
            </span>
            <span className="brand-sub" style={{ color: '#5f6368', letterSpacing: '2.5px' }}>TECHNOLOGIES</span>
          </div>
        </Link>
        <a href="#lead-form" className="primary">
          Get Quote <span>↗</span>
        </a>
      </header>

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Agile & DevOps Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> DEVOPS & INFRASTRUCTURE CAPABILITY</div></Reveal>
          <Reveal><h1>Agile & DevOps Engineering <em>Automate Software Delivery.</em></h1></Reveal>
          <Reveal><p>Accelerate deployment cycles with automated CI/CD pipelines, Kubernetes container orchestration, and reproducible Infrastructure as Code.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get DevOps Proposal <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/project-3.webp" alt="AppMotive Agile & DevOps Infrastructure Engineering" className="service-hero-img" />
        </div>
      </section>

      {/* About Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="devops-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#4285F4' }}>WHO WE ARE</span>
              <h2 id="devops-about-heading">
                We automate cloud pipelines <span>for zero-downtime releases.</span>
              </h2>
              <p>
                AppMotive Technologies is a specialized SRE & DevOps consultancy. We bridge the gap between rapid software feature development, automated CI/CD testing, and rock-solid cloud reliability.
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>⚙️</div>
                  <div className="about-feature-info">
                    <strong>Zero-Downtime Releases</strong>
                    <span>Blue/Green deployments with automated rollback triggers</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>🏗️</div>
                  <div className="about-feature-info">
                    <strong>Terraform IaC</strong>
                    <span>100% version controlled cloud infrastructure</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#FBBC05' }}>☸️</div>
                  <div className="about-feature-info">
                    <strong>Kubernetes Orchestration</strong>
                    <span>Auto-scaling EKS/GKE microservices clusters</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>24/7 SLA Monitoring</strong>
                    <span>Prometheus & Grafana automated health alerts</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our DevOps Architects <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/why-us.webp" alt="AppMotive SRE & DevOps Infrastructure Engineers" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">99.99%</span>
                  <div className="about-badge-text">
                    <strong>Target Uptime</strong>
                    <span>Maintained across client production clusters</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-pad light-section" aria-labelledby="devops-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE BUILD</span>
            <h2 id="devops-caps-heading">Cloud pipelines built for <span>speed, reliability & scale.</span></h2>
          </div>
          <p>Automated CI/CD, Kubernetes container orchestration, and Infrastructure as Code.</p>
        </div>

        <div className="why-grid">
          {devOpsCapabilities.map((item) => (
            <div className="why-card" key={item.num}>
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <span className="kicker">DEVOPS TOOLING & FRAMEWORKS</span>
          <div className="tech-pills" style={{ justifyContent: 'center', marginTop: '16px' }}>
            {devOpsTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap */}
      <section className="section section-pad process-section-light" aria-labelledby="devops-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#4285F4', background: 'rgba(66, 133, 244, 0.08)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="devops-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Automate <span style={{ color: '#4285F4' }}>Software Delivery Pipelines.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial pipeline audit to zero-downtime production deployment — transparent and reproducible.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {devOpsProcessSteps.map((step) => (
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
      <section className="section dark-section section-pad" aria-label="DevOps Metrics">
        <div className="stats-header text-center">
          <span className="kicker">ENGINEERING GUARANTEE</span>
          <h2>Built for <span>bulletproof deployment automation.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              3<span style={{ fontSize: '1.8rem', color: '#4285F4', marginLeft: '2px' }}>mins</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average CI/CD Deployment Time</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              2-4 <span style={{ fontSize: '1.4rem', color: '#34A853', fontWeight: 600 }}>Weeks</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average Pipeline Setup</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              100<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Terraform IaC Reproducibility</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>24/7</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>SRE Alerting & Uptime SLA</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-pad testimonial-section" aria-labelledby="devops-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="devops-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Trusted by tech leads <span style={{ color: '#8993a1' }}>worldwide.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our Agile & DevOps infrastructure engineering accelerates software delivery.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {devOpsTestimonialsData.map((item) => (
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
      <section id="lead-form" className="section section-pad light-section" aria-labelledby="devops-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="devops-form-heading">Start your DevOps <span>automation project.</span></h2>
            <p>Fill out the form to schedule a free 30-minute infrastructure discovery call and receive a detailed pipeline proposal.</p>

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
                  <span>Your infrastructure details stay 100% confidential</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">✓</span>
                <h3>Thank you, {formData.name}!</h3>
                <p>Your DevOps request has been received. Our lead SRE architect will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="DevOps Infrastructure Inquiry Form">
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
                  <label htmlFor="message">Infrastructure Overview / Goals (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your current deployment process, cloud provider, or CI/CD goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request DevOps Proposal <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-pad faq-section" aria-labelledby="devops-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">DEVOPS FAQ</span>
              <h2 id="devops-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our CI/CD pipeline automation, Terraform IaC, and SRE guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {devOpsFaqs.map((faq, idx) => (
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
