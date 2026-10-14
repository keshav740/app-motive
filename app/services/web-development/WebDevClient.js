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

const webDevCapabilities = [
  {
    num: '01',
    title: 'Custom Next.js & React Web Apps',
    desc: 'Scalable, lightning-fast web applications built with Next.js 15, React 19, and Server Components for maximum speed and conversions.'
  },
  {
    num: '02',
    title: 'Headless CMS & Enterprise Portals',
    desc: 'Empower your marketing and content teams with seamless headless CMS integrations (Sanity, Strapi, Contentful, Payload).'
  },
  {
    num: '03',
    title: 'Core Web Vitals & 99+ PageSpeed',
    desc: 'We optimize every asset, script, and database query to ensure instant load times and top-tier SEO rankings.'
  },
  {
    num: '04',
    title: 'Custom Design Systems & Micro-Animations',
    desc: 'Tailored UI/UX design systems with fluid micro-interactions that leave a lasting impression on your visitors.'
  }
];

const webDevTech = ['⚡ Next.js 15', '⚛️ React 19', '🔷 TypeScript', '🎨 Tailwind CSS', '🟢 Node.js', '🐘 PostgreSQL', '📐 GraphQL', '▲ Vercel', '☁️ AWS'];

const webDevFaqs = [
  {
    q: "Why choose Next.js & React for Web Development?",
    a: "Next.js provides server-side rendering (SSR), automatic code splitting, ultra-fast image optimization, and superior SEO performance out of the box. It ensures your web application loads in milliseconds."
  },
  {
    q: "How long does a custom web development project take?",
    a: "A typical high-performance corporate website or web application MVP takes between 4 to 8 weeks from initial discovery and Figma designs to production deployment."
  },
  {
    q: "Do I own 100% of the code and intellectual property?",
    a: "Yes. Upon project completion and final sign-off, you receive 100% full intellectual property (IP) ownership of all source code, design files, and deployment configurations."
  },
  {
    q: "Can you redesign or upgrade our existing slow website?",
    a: "Absolutely. We specialize in modernizing legacy websites into high-speed Next.js web applications while preserving your existing domain authority and SEO rankings."
  }
];

const webDevProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Discovery & Tech Architecture',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'We map out business goals, target audience, SEO strategy, and technical stack to formulate a risk-free blueprint.',
    deliverable: 'Wireframe Blueprint & Tech Roadmap'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'High-Converting UI/UX Design',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Crafting pixel-perfect design systems with fluid micro-interactions and mobile responsiveness in Figma before writing code.',
    deliverable: 'Interactive Figma Prototype & Design System'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'Next.js 15 & React Engineering',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Clean, modular full-stack code using Next.js 15, TypeScript, Tailwind CSS, and optimized database/API integrations.',
    deliverable: 'Production-Grade Codebase & APIs'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: '90+ Speed Tuning & Security QA',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Rigorous cross-browser, security, schema markup, and Google Lighthouse performance optimization to guarantee sub-second loads.',
    deliverable: '90+ PageSpeed Audit & Security Pass'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Serverless Launch & 24/7 SLA',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'Zero-downtime deployment on Vercel/AWS, SSL configuration, analytics setup, and ongoing 24/7 maintenance SLA support.',
    deliverable: 'Live Launch & SLA Support Guarantee'
  }
];

const testimonialsData = [
  {
    id: 1,
    category: 'indian',
    name: 'Rohan Sharma',
    role: 'Founder & CEO',
    company: 'OmniScale Tech',
    location: 'Bengaluru, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #4285F4, #34A853)',
    initials: 'RS',
    rating: 5,
    highlight: '🚀 +185% Conversion Rate',
    quote: 'AppMotive transformed our legacy web platform into a blazingly fast Next.js application. Our page speed score jumped from 42 to 99, and our lead conversion rate increased by 185% within 30 days of launch!',
    project: 'SaaS Platform Modernization'
  },
  {
    id: 2,
    category: 'foreign',
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'CloudPulse Inc.',
    location: 'San Francisco, USA',
    flag: '🇺🇸',
    avatarBg: 'linear-gradient(135deg, #EA4335, #FBBC05)',
    initials: 'MV',
    rating: 5,
    highlight: '⚡ 0.6s Load Time Achieved',
    quote: 'AppMotive delivered world-class React & Next.js architecture for our cloud platform. Their team’s code quality, communication, and speed match the best Silicon Valley engineering standards.',
    project: 'Enterprise SaaS Web App'
  },
  {
    id: 3,
    category: 'indian',
    name: 'Priya Nair',
    role: 'Head of Digital Experience',
    company: 'FinServe Global',
    location: 'Mumbai, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #9C27B0, #4285F4)',
    initials: 'PN',
    rating: 5,
    highlight: '📈 99/100 PageSpeed Score',
    quote: 'The attention to UI performance and SEO architecture was outstanding. They rebuilt our complex portal with micro-animations while retaining 100% of our financial security protocols.',
    project: 'Fintech Web Portal'
  },
  {
    id: 4,
    category: 'foreign',
    name: 'Elena Rostova',
    role: 'Product & Growth Director',
    company: 'NordicFlow Commerce',
    location: 'Stockholm, Sweden',
    flag: '🇸🇪',
    avatarBg: 'linear-gradient(135deg, #00B4DB, #0083B0)',
    initials: 'ER',
    rating: 5,
    highlight: '🌍 Global Headless Rollout',
    quote: 'Exceptional web development expertise! They built our cross-border headless commerce portal with flawless multi-currency support and sub-second page transitions across European markets.',
    project: 'Headless E-Commerce System'
  },
  {
    id: 5,
    category: 'indian',
    name: 'Vikramaditya Roy',
    role: 'Co-Founder',
    company: 'LuxeStay Hospitality',
    location: 'New Delhi, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #FF5722, #FFC107)',
    initials: 'VR',
    rating: 5,
    highlight: '⏱ Delivered 2 Weeks Ahead',
    quote: 'Working with AppMotive was effortless. Their full-stack team handled everything from Figma wireframes to serverless deployment on Vercel. Delivered ahead of schedule with zero post-launch bugs.',
    project: 'Luxury Booking Engine'
  }
];

export default function WebDevClient() {
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
        body: JSON.stringify({ ...formData, service: 'Web Development' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit web dev form error:', err);
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="scroll-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className="cursor-glow" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />

      {/* Fully Responsive Distraction-Free Header */}
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

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Web Development Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> HIGH-PERFORMANCE WEB ENGINEERING</div></Reveal>
          <Reveal><h1>Custom Web Development <em>That Converts & Scales.</em></h1></Reveal>
          <Reveal><p>We build ultra-fast, search-engine-optimized websites and web applications designed to turn visitors into loyal customers.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get Web Dev Quote <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/project-1.webp" alt="AppMotive High-Performance Web Development Platform" className="service-hero-img" />
        </div>
      </section>

      {/* About AppMotive Web Engineering Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="webdev-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#4285F4' }}>WHO WE ARE</span>
              <h2 id="webdev-about-heading">
                We build web applications <span>that drive measurable ROI.</span>
              </h2>
              <p>
                AppMotive Technologies is an elite web development studio. We bridge the gap between high-converting UI design, bulletproof TypeScript engineering, and Google-dominating SEO performance.
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon">⚡</div>
                  <div className="about-feature-info">
                    <strong>Speed Guarantee</strong>
                    <span>Sub-second page load times out of the box</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon">🛡️</div>
                  <div className="about-feature-info">
                    <strong>Full IP Ownership</strong>
                    <span>100% source code ownership & zero lock-in</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon">📈</div>
                  <div className="about-feature-info">
                    <strong>Conversion Focused</strong>
                    <span>UX architectures optimized to capture leads</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>Global Delivery</strong>
                    <span>Serving clients across India, US & Europe</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our Web Architects <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/about-us.webp" alt="AppMotive Web Development Engineering Team" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">50+</span>
                  <div className="about-badge-text">
                    <strong>Successful Projects</strong>
                    <span>High-performance web platforms delivered</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-pad light-section" aria-labelledby="webdev-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE BUILD</span>
            <h2 id="webdev-caps-heading">Web platforms built for <span>speed, clarity & ROI.</span></h2>
          </div>
          <p>Full-stack web engineering tailored to your business goals and user expectations.</p>
        </div>

        <div className="why-grid">
          {webDevCapabilities.map((item) => (
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
            {webDevTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Premium Light Theme Web Engineering Process Section */}
      <section className="section section-pad process-section-light" aria-labelledby="webdev-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#4285F4', background: 'rgba(66, 133, 244, 0.08)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="webdev-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Turn Ideas Into <span style={{ color: '#4285F4' }}>High-Speed Reality.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial architecture strategy to 99+ speed deployment — fully transparent, predictable, and engineered for maximum growth.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {webDevProcessSteps.map((step) => (
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

      <section className="section dark-section section-pad" aria-label="Web Dev Performance Metrics">
        <div className="stats-header text-center">
          <span className="kicker">ENGINEERING GUARANTEE</span>
          <h2>Built to <span>outperform the competition.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              99<span style={{ fontSize: '1.8rem', color: '#4285F4', marginLeft: '2px' }}>+</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Google Lighthouse Speed Score</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              4-8 <span style={{ fontSize: '1.4rem', color: '#34A853', fontWeight: 600 }}>Weeks</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average Project Delivery</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              100<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Full IP & Source Code Ownership</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>24/7</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Uptime & Reliability SLA</span>
          </div>
        </div>
      </section>

      {/* Client Success Stories & Testimonials Section */}
      <section className="section section-pad testimonial-section" aria-labelledby="webdev-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="webdev-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Trusted by leaders <span style={{ color: '#8993a1' }}>in India & worldwide.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our custom web development delivers measurable growth for startups and enterprises across India and global markets.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {testimonialsData.map((item) => (
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

      <section id="lead-form" className="section section-pad light-section" aria-labelledby="webdev-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="webdev-form-heading">Start your web <span>development project.</span></h2>
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
                  <span>Your project details stay 100% confidential</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">✓</span>
                <h3>Thank you, {formData.name}!</h3>
                <p>Your web development project request has been received. Our lead architect will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="Web Development Inquiry Form">
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
                  <label htmlFor="message">Project Requirements / Overview (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your website goals, features needed, or target timeline (optional)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request Web Dev Proposal <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section section-pad faq-section" aria-labelledby="webdev-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">WEB DEV FAQ</span>
              <h2 id="webdev-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our custom web development process, tech stack, and delivery guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {webDevFaqs.map((faq, idx) => (
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

      {/* Minimal Landing Page Copyright Footer */}
      <footer style={{ background: '#07101d', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 40px', textAlign: 'center', color: '#9aa0a6', fontSize: '0.85rem' }}>
        <div>© 2026 AppMotive Technologies. All rights reserved.</div>
      </footer>
    </main>
  );
}
