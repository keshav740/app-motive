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

const mobileDevCapabilities = [
  {
    num: '01',
    title: 'Cross-Platform React Native & Flutter',
    desc: 'Ship native iOS and Android apps simultaneously with single codebase efficiency without compromising on 60fps performance.'
  },
  {
    num: '02',
    title: 'Native Swift & Kotlin Engineering',
    desc: 'High-performance native apps designed specifically for iOS and Android when hardware integrations and max speed are mandatory.'
  },
  {
    num: '03',
    title: 'Offline Sync & Real-Time Data',
    desc: 'Keep users engaged even when offline with local SQLite/Realm persistence and seamless background sync.'
  },
  {
    num: '04',
    title: 'App Store & Play Store Deployment',
    desc: 'End-to-end publishing, ASO optimization, store submission management, and automated CI/CD build deployment pipelines.'
  }
];

const mobileDevTech = ['📱 React Native', '💙 Flutter', '🍏 Swift (iOS)', '🤖 Kotlin (Android)', '🔥 Firebase', '⚡ GraphQL', '💾 SQLite/Realm', '☁️ AWS Amplify'];

const mobileDevFaqs = [
  {
    q: 'Do you build native or cross-platform mobile applications?',
    a: 'We excel in both! We recommend React Native or Flutter for cross-platform efficiency with single codebases, and Swift/Kotlin when deep native hardware access or maximum graphics speed is required.'
  },
  {
    q: 'Do you handle Apple App Store and Google Play Store submission?',
    a: 'Yes. We manage the complete App Store & Google Play Store submission process, including metadata guidelines, screenshot generation, policy compliance, and app review approval.'
  },
  {
    q: 'How do you ensure 60fps smooth UI animations on mobile?',
    a: 'We utilize native UI driver bindings (Reanimated 3 for React Native, Skia for Flutter) to execute gestures directly on the main UI thread, ensuring silky smooth transitions.'
  },
  {
    q: 'Can you integrate push notifications and payment gateways?',
    a: 'Absolutely. We integrate APNs, FCM push notifications, Apple Pay, Google Pay, Stripe, and in-app subscriptions seamlessly.'
  }
];

const mobileDevProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Mobile Architecture & Wireframing',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'Mapping out user journeys, offline sync requirements, native API hardware needs, and interactive Figma prototypes.',
    deliverable: 'Figma Mobile Prototypes & System Blueprint'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Touch UI/UX & Gesture Engineering',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Crafting touch-optimized layouts, micro-animations, and fluid gesture handling tailored for mobile viewports.',
    deliverable: 'Interactive Mobile Application Prototypes'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'Mobile App Codebase Development',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Clean, modular full-stack mobile code using React Native, Flutter, Swift, and Kotlin with robust local state.',
    deliverable: 'Production Mobile Codebase'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: '60fps Performance & Hardware QA',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Rigorous multi-device hardware testing, frame rate profiling, memory leak audits, and offline storage validation.',
    deliverable: '60fps Performance Audit & QA Pass'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Store Publishing & 24/7 SLA Support',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'Guided store submission to Apple App Store and Google Play Store, ASO optimization, and 24/7 post-launch SLA.',
    deliverable: 'Live Store Listings & Code Handoff'
  }
];

const mobileTestimonialsData = [
  {
    id: 1,
    name: 'Aarav Mehta',
    role: 'Co-Founder & CEO',
    company: 'FitPulse Mobility',
    location: 'Bengaluru, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #34A853, #4285F4)',
    initials: 'AM',
    rating: 5,
    highlight: '📱 60fps Native Performance',
    quote: 'AppMotive engineered our React Native cross-platform application with smooth 60fps animations. Our user retention surged by 210% after launching on iOS and Android!',
    project: 'Fitness & Health Mobile App'
  },
  {
    id: 2,
    name: 'Chloe Bennett',
    role: 'VP of Product',
    company: 'FinSwift Pay',
    location: 'New York, USA',
    flag: '🇺🇸',
    avatarBg: 'linear-gradient(135deg, #4285F4, #9C27B0)',
    initials: 'CB',
    rating: 5,
    highlight: '🔒 Instant Biometric & Offline Sync',
    quote: 'The mobile engineering quality exceeded our expectations. FaceID security, offline transaction sync, and push notifications worked flawlessly from day one.',
    project: 'Fintech Wallet Mobile App'
  },
  {
    id: 3,
    name: 'Devansh Kulkarni',
    role: 'Head of Product',
    company: 'LogiMove Express',
    location: 'Pune, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #EA4335, #FBBC05)',
    initials: 'DK',
    rating: 5,
    highlight: '⏱ 100% Play Store Approval',
    quote: 'AppMotive handled the entire Mobile app lifecycle from Figma to Google Play & App Store publishing. Their team delivered two weeks ahead of schedule!',
    project: 'Driver & Delivery Mobile Portal'
  }
];

export default function MobileDevClient() {
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
        body: JSON.stringify({ ...formData, service: 'Mobile Application Development' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit mobile dev form error:', err);
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
              App<em style={{ color: '#34A853', fontStyle: 'normal' }}>Motive</em><span style={{ color: '#07101d', fontSize: '0.7em', marginLeft: '2px' }}>®</span>
            </span>
            <span className="brand-sub" style={{ color: '#5f6368', letterSpacing: '2.5px' }}>TECHNOLOGIES</span>
          </div>
        </Link>
        <a href="#lead-form" className="primary">
          Get Quote <span>↗</span>
        </a>
      </header>

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Mobile Application Development Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> MOBILE ENGINEERING CAPABILITY</div></Reveal>
          <Reveal><h1>Mobile Application Development <em>Engineered for 60fps.</em></h1></Reveal>
          <Reveal><p>Transform your digital vision into native iOS and Android applications. From gesture-driven UI to offline sync and enterprise APIs, we craft mobile experiences users love.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get Mobile Dev Quote <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/project-2.jpg" alt="AppMotive High-Performance Mobile Application Engineering" className="service-hero-img" />
        </div>
      </section>

      {/* About Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="mobiledev-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#34A853' }}>WHO WE ARE</span>
              <h2 id="mobiledev-about-heading">
                We build iOS & Android apps <span>that dominate the app stores.</span>
              </h2>
              <p>
                AppMotive Technologies is a premier mobile engineering studio. We bridge the gap between fluid touch gestures, offline-first data sync, and high-conversion mobile UX.
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>📱</div>
                  <div className="about-feature-info">
                    <strong>60fps Fluid UI</strong>
                    <span>Smooth gesture animations on all mobile devices</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>🛡️</div>
                  <div className="about-feature-info">
                    <strong>Store Pass Guarantee</strong>
                    <span>100% Apple & Google Play store policy compliance</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#FBBC05' }}>💾</div>
                  <div className="about-feature-info">
                    <strong>Offline First Sync</strong>
                    <span>Uninterrupted user experience even without internet</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>Cross-Platform Efficiency</strong>
                    <span>Single codebase deployment for iOS & Android</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our Mobile Architects <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/about-us.png" alt="AppMotive Mobile Application Engineers" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">40+</span>
                  <div className="about-badge-text">
                    <strong>Published Apps</strong>
                    <span>iOS & Android applications in store</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-pad light-section" aria-labelledby="mobiledev-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE BUILD</span>
            <h2 id="mobiledev-caps-heading">Mobile platforms built for <span>performance & retention.</span></h2>
          </div>
          <p>Native & cross-platform mobile engineering tailored to your business goals.</p>
        </div>

        <div className="why-grid">
          {mobileDevCapabilities.map((item) => (
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
            {mobileDevTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap Section */}
      <section className="section section-pad process-section-light" aria-labelledby="mobiledev-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#34A853', background: 'rgba(52, 168, 83, 0.08)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="mobiledev-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Engineer <span style={{ color: '#34A853' }}>Top-Rated Mobile Apps.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial wireframe prototype to store publication — transparent, predictable, and optimized for maximum mobile engagement.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {mobileDevProcessSteps.map((step) => (
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
      <section className="section dark-section section-pad" aria-label="Mobile Dev Metrics">
        <div className="stats-header text-center">
          <span className="kicker">ENGINEERING GUARANTEE</span>
          <h2>Built for <span>maximum mobile engagement.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              60<span style={{ fontSize: '1.8rem', color: '#34A853', marginLeft: '2px' }}>fps</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Silky Smooth UI Animations</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              4-8 <span style={{ fontSize: '1.4rem', color: '#4285F4', fontWeight: 600 }}>Weeks</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average App Store Launch</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              100<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>App Store Approval Guarantee</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>24/7</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Crash Analytics & SLA Support</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-pad testimonial-section" aria-labelledby="mobiledev-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="mobiledev-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Loved by founders <span style={{ color: '#8993a1' }}>across iOS & Android.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our custom mobile application development delivers measurable growth and high user retention.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {mobileTestimonialsData.map((item) => (
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
      <section id="lead-form" className="section section-pad light-section" aria-labelledby="mobiledev-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="mobiledev-form-heading">Start your mobile <span>app development.</span></h2>
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
                <p>Your mobile app project request has been received. Our lead architect will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="Mobile Development Inquiry Form">
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
                  <label htmlFor="message">Project Requirements / Overview (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your mobile app concept, target platform (iOS/Android), features needed..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request Mobile Dev Proposal <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-pad faq-section" aria-labelledby="mobiledev-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">MOBILE DEV FAQ</span>
              <h2 id="mobiledev-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our custom mobile app development process, tech stack, and delivery guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {mobileDevFaqs.map((faq, idx) => (
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
