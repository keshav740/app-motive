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

const marketingCapabilities = [
  {
    num: '01',
    title: 'Paid Ads (Meta, Google & TikTok)',
    desc: 'High-converting ad campaigns engineered to capture ready-to-buy audiences and scale your Return On Ad Spend (ROAS).'
  },
  {
    num: '02',
    title: 'Social Content & Visual Creative',
    desc: 'Thumb-stopping video reels, infographics, motion graphics, and copy that position your brand at the top of mind.'
  },
  {
    num: '03',
    title: 'Conversion Rate Optimization (CRO)',
    desc: 'A/B testing ad landers, optimizing checkout funnels, and reducing Customer Acquisition Cost (CAC).'
  },
  {
    num: '04',
    title: 'Growth Analytics & Performance Tracking',
    desc: 'Granular tracking attribution, Custom GA4 events, and transparent weekly performance dashboards.'
  }
];

const marketingTech = ['🎯 Meta Ads Manager', '🔍 Google Ads', '📊 Google Analytics 4', '🎵 TikTok Ads', '💼 LinkedIn Campaign Manager', '🎨 Figma Creative', '📈 TripleWhale'];

const marketingFaqs = [
  {
    q: 'How do you measure campaign ROI and performance?',
    a: 'We set up real-time custom dashboards tracking true ROAS, Customer Acquisition Cost (CAC), Lifetime Value (LTV), conversion rate, and net ad profit.'
  },
  {
    q: 'What budget size do you recommend for paid ad campaigns?',
    a: 'We work with growth-stage brands with ad spend budgets starting from $2,500/month up to enterprise scale.'
  },
  {
    q: 'Do you create the ad creatives and video content?',
    a: 'Yes! Our full in-house creative team designs high-converting video reels, static carousels, animated banners, and persuasive ad copy.'
  },
  {
    q: 'How quickly can we expect results from paid social campaigns?',
    a: 'Paid campaigns yield immediate traffic and pixel learning within 48-72 hours. Campaign optimization and scaling typically solidify within the first 14 days.'
  }
];

const marketingProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Audience & Competitor Audit',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'Analyzing your current audience demographics, market positioning, competitor creative hooks, and funnel friction points.',
    deliverable: 'Market Opportunity Audit'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Creative Production & Strategy',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Writing high-converting copy angles, designing visual ad creatives, and configuring tracking attribution pixels.',
    deliverable: 'Ad Creative Suite & Campaign Map'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'Campaign Launch & ROAS Scaling',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Deploying targeted campaigns across channels, real-time bid optimization, and expanding winning creative variants.',
    deliverable: 'Live Paid Campaigns & ROAS Scaling'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'Landing Page CRO Split Testing',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Testing headlines, CTA buttons, and lander layouts to maximize conversion efficiency and lower acquisition cost.',
    deliverable: 'High Conversion Funnel & CRO Audit'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Bi-Weekly Growth Reporting',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'Continuous audience retargeting refinement, creative refresh cycles, and transparent bi-weekly strategy reviews.',
    deliverable: 'Bi-Weekly Analytics & Growth Deck'
  }
];

const marketingTestimonialsData = [
  {
    id: 1,
    name: 'Karan Singhania',
    role: 'Founder',
    company: 'UrbanGear Fashion',
    location: 'Delhi, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #FBBC05, #EA4335)',
    initials: 'KS',
    rating: 5,
    highlight: '📈 4.2x ROAS Scaling Achieved',
    quote: 'AppMotive completely revamped our Meta & Google Ad campaigns. Our ROAS scaled from 1.8x to 4.2x within 60 days while reducing our CAC by 35%!',
    project: 'D2C E-Commerce Paid Growth'
  },
  {
    id: 2,
    name: 'Jessica Miller',
    role: 'CMO',
    company: 'SaaSFlow Global',
    location: 'Austin, USA',
    flag: '🇺🇸',
    avatarBg: 'linear-gradient(135deg, #4285F4, #34A853)',
    initials: 'JM',
    rating: 5,
    highlight: '🚀 +320% Qualified Demos',
    quote: 'Their social media ad creative team understands B2B messaging. LinkedIn & Meta ad lead generation brought us over 320% more qualified demo bookings.',
    project: 'B2B SaaS Performance Marketing'
  }
];

export default function MarketingClient() {
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
        body: JSON.stringify({ ...formData, service: 'Social Media Marketing' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit marketing form error:', err);
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
          Get Proposal <span>↗</span>
        </a>
      </header>

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Social Media Marketing Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> GROWTH & MARKETING CAPABILITY</div></Reveal>
          <Reveal><h1>Social Media Marketing <em>That Scales Revenue.</em></h1></Reveal>
          <Reveal><p>Turn social impressions into predictable revenue. We design high-ROI paid ad strategies, thumb-stopping visual creative, and conversion funnels that lower your CAC.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get Growth Audit <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/project-3.jpg" alt="AppMotive Performance Social Media Marketing" className="service-hero-img" />
        </div>
      </section>

      {/* About Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="marketing-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#FBBC05' }}>WHO WE ARE</span>
              <h2 id="marketing-about-heading">
                We build data-driven campaigns <span>that scale audience & ROI.</span>
              </h2>
              <p>
                AppMotive Technologies is a growth performance agency. We combine persuasive visual storytelling, Meta & Google ad algorithms, and conversion rate optimization (CRO).
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#FBBC05' }}>🎯</div>
                  <div className="about-feature-info">
                    <strong>ROAS Guarantee</strong>
                    <span>Data-backed campaigns engineered for profit</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>🎨</div>
                  <div className="about-feature-info">
                    <strong>In-House Creative</strong>
                    <span>High-converting video reels & motion graphics</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>📊</div>
                  <div className="about-feature-info">
                    <strong>Transparent Analytics</strong>
                    <span>Real-time tracking dashboards & attribution</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>Multi-Channel Scale</strong>
                    <span>Meta, Google, TikTok & LinkedIn campaign mastery</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our Growth Strategists <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/why-us.png" alt="AppMotive Performance Growth Marketers" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">3.5x+</span>
                  <div className="about-badge-text">
                    <strong>Average ROAS</strong>
                    <span>Delivered across active paid campaigns</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-pad light-section" aria-labelledby="marketing-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE DELIVER</span>
            <h2 id="marketing-caps-heading">Performance marketing <span>built for measurable ROI.</span></h2>
          </div>
          <p>End-to-end paid media, content creative, and funnel conversion optimization.</p>
        </div>

        <div className="why-grid">
          {marketingCapabilities.map((item) => (
            <div className="why-card" key={item.num}>
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <span className="kicker">TECHNOLOGY & PLATFORMS</span>
          <div className="tech-pills" style={{ justifyContent: 'center', marginTop: '16px' }}>
            {marketingTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap */}
      <section className="section section-pad process-section-light" aria-labelledby="marketing-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#FBBC05', background: 'rgba(251, 188, 5, 0.15)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="marketing-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Turn Ad Impressions <span style={{ color: '#FBBC05' }}>Into Net Profit.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial audience research to high-volume creative scaling — transparent, data-backed, and revenue focused.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {marketingProcessSteps.map((step) => (
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
      <section className="section dark-section section-pad" aria-label="Marketing Metrics">
        <div className="stats-header text-center">
          <span className="kicker">GROWTH GUARANTEE</span>
          <h2>Built to <span>scale your customer acquisition.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              3.5<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}>x+</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average ROAS Scale</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              -35<span style={{ fontSize: '1.8rem', color: '#34A853', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average CAC Reduction</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              48<span style={{ fontSize: '1.4rem', color: '#4285F4', fontWeight: 600 }}>Hours</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Campaign Launch Time</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>100%</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Transparent Real-Time Analytics</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-pad testimonial-section" aria-labelledby="marketing-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="marketing-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Trusted by D2C & B2B brands <span style={{ color: '#8993a1' }}>worldwide.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our digital marketing and ad campaigns drive scalable customer acquisition.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {marketingTestimonialsData.map((item) => (
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
      <section id="lead-form" className="section section-pad light-section" aria-labelledby="marketing-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="marketing-form-heading">Request a custom <span>growth audit.</span></h2>
            <p>Fill out the form to receive a free ad campaign audit & growth proposal within 24 hours.</p>

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
                  <span>Your campaign details stay 100% confidential</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">✓</span>
                <h3>Thank you, {formData.name}!</h3>
                <p>Your marketing proposal request has been received. Our lead strategist will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="Social Media Marketing Inquiry Form">
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
                  <label htmlFor="message">Marketing Goals / Ad Spend Overview (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your target revenue goals, current ad spend, or main growth challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request Growth Audit <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-pad faq-section" aria-labelledby="marketing-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">MARKETING FAQ</span>
              <h2 id="marketing-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our digital marketing campaigns, ad creative production, and ROAS guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {marketingFaqs.map((faq, idx) => (
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
