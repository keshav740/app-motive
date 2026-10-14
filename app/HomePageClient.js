'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const services = [
  ['01', 'Website Development', 'High-performance, modern websites designed and engineered to turn visitors into loyal customers.', 'WEB DEV', '/project-1.webp'],
  ['02', 'Meta Ads (Facebook & Instagram)', 'Targeted ad campaigns on Facebook and Instagram engineered for maximum brand reach and lead generation.', 'META ADS', '/project-2.webp'],
  ['03', 'Google Ads', 'High-intent Search, Shopping, and Display campaigns designed to put your business first on Google.', 'GOOGLE ADS', '/project-3.webp'],
  ['04', 'Landing Pages', 'High-speed, custom landing pages optimized specifically to convert ad traffic into phone calls and bookings.', 'LANDING PAGES', '/service-hero.webp'],
];

const faqs = [
  {
    q: "What services does AppMotive Technologies offer?",
    a: "We specialize in custom website development, Meta ads (Facebook & Instagram), Google ads management, and high-converting landing pages for small businesses."
  },
  {
    q: "How long does a typical project take from start to launch?",
    a: "Timelines depend on scope. A typical custom website or landing page takes 1 to 3 weeks, while complete ad setup and launch takes under 7 days. We work closely with you every step of the way."
  },
  {
    q: "What is your pricing structure and engagement model?",
    a: "We offer transparent fixed pricing for websites and landing pages, alongside flexible monthly ad management packages with no long-term lock-in contracts."
  },
  {
    q: "How do you handle IP ownership and credentials?",
    a: "You retain 100% full ownership of your website, source code, ad accounts, and all digital assets upon completion."
  },
  {
    q: "Do you provide post-launch support and ad optimization?",
    a: "Yes, we provide continuous A/B testing, ad creative updates, bid optimization, and weekly performance reports to maximize your ROI."
  }
];

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Magnetic({ children, className = '' }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.14;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.14;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return <span ref={ref} className={`magnetic ${className}`} onMouseMove={move} onMouseLeave={leave}>{children}</span>;
}

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

    el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;
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

export default function HomePageClient({ latestBlogs = [] }) {
  const [progress, setProgress] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);
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

  return (
    <main>
      <div className="scroll-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className="cursor-glow" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />

      <Navbar />

      <section id="top" className="hero section-pad" aria-label="Hero Section">
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-copy">
          <Reveal><div className="eyebrow"><i /> WEBSITES · META ADS · GOOGLE ADS · LANDING PAGES</div></Reveal>
          <Reveal><h1>Get more customers with a <em>better website</em> and <em>smarter advertising.</em></h1></Reveal>
          <Reveal><p>We build websites and run Facebook, Instagram, and Google ads for small businesses.</p></Reveal>
          <Reveal className="hero-actions">
            <Magnetic>
              <Link className="primary" href="/contact">Book a free consultation <span>↗</span></Link>
            </Magnetic>
            <Magnetic>
              <Link className="secondary" href="#services">See our services <span>↓</span></Link>
            </Magnetic>
          </Reveal>
          <Reveal className="hero-services-tags">
            <span className="hero-service-tag">⚡ Website Development</span>
            <span className="hero-service-tag">🎯 Meta Ads (Facebook & IG)</span>
            <span className="hero-service-tag">📈 Google Ads</span>
            <span className="hero-service-tag">🚀 Landing Pages</span>
          </Reveal>
          <Reveal className="hero-meta"><span>SCROLL TO EXPLORE</span><div className="scroll-line"><i /></div></Reveal>
        </div>

        <div className="hero-visual">
          <TiltImage src="/hero-home.webp" alt="AppMotive Technologies Website & Digital Advertising" className="hero-home-img" />
        </div>
      </section>

      <div className="marquee">
        <div>WEBSITE DEVELOPMENT <b>✦</b> META ADS (FB & IG) <b>✦</b> GOOGLE ADS <b>✦</b> LANDING PAGES <b>✦</b> SMALL BUSINESS GROWTH <b>✦</b> WEBSITE DEVELOPMENT <b>✦</b> META ADS <b>✦</b> GOOGLE ADS <b>✦</b></div>
      </div>

      <section id="services" className="section section-pad light-section" aria-labelledby="services-heading">
        <Reveal>
          <div className="section-head">
            <div>
              <span className="kicker">01 / CAPABILITIES</span>
              <h2 id="services-heading">Everything you need to <span>move forward.</span></h2>
            </div>
            <p>One team across strategy, design and engineering — built to take ideas from first sketch to production.</p>
          </div>
        </Reveal>
        <div className="service-layout">
          <div className="service-index desktop-only-index">
            {services.map(([n, t, d, tag], i) => (
              <button
                className={activeService === i ? 'active' : ''}
                key={n}
                onClick={() => setActiveService(i)}
                onMouseEnter={() => setActiveService(i)}
              >
                <span>{n}</span>
                <strong>{t}</strong>
                <b>↗</b>
              </button>
            ))}
          </div>

          <div className="service-stage desktop-only-stage">
            <div className={`stage-orb orb-${(activeService >= 0 ? activeService : 0) + 1}`} />
            <div className="stage-visual-box">
              <img
                key={services[activeService >= 0 ? activeService : 0][0]}
                src={services[activeService >= 0 ? activeService : 0][4]}
                alt={`AppMotive ${services[activeService >= 0 ? activeService : 0][1]} capability preview`}
                className="stage-visual-img"
              />
            </div>
            <span className="stage-tag">{services[activeService >= 0 ? activeService : 0][3]}</span>
            <span className="stage-number">{services[activeService >= 0 ? activeService : 0][0]}</span>
            <h3>{services[activeService >= 0 ? activeService : 0][1]}</h3>
            <p>{services[activeService >= 0 ? activeService : 0][2]}</p>
            <div className="stage-bottom">
              <span>APP / MOTIVE</span>
              <Link href={activeService === 3 ? "/landing" : "/services"} style={{ color: 'inherit', textDecoration: 'none' }}>EXPLORE CAPABILITY ↗</Link>
            </div>
          </div>

          <div className="service-accordion mobile-only-accordion">
            {services.map(([n, t, d, tag], i) => (
              <div className="accordion-item" key={n}>
                <button
                  className={`accordion-header ${activeService === i ? 'active' : ''}`}
                  onClick={() => setActiveService(activeService === i ? -1 : i)}
                >
                  <span>{n}</span>
                  <strong>{t}</strong>
                  <b>{activeService === i ? '↓' : '↗'}</b>
                </button>
                {activeService === i && (
                  <div className="service-stage accordion-stage">
                    <div className={`stage-orb orb-${i + 1}`} />
                    <div className="stage-visual-box">
                      <img src={services[i][4]} alt={`AppMotive ${t} capability preview`} className="stage-visual-img" />
                    </div>
                    <span className="stage-tag">{tag}</span>
                    <span className="stage-number">{n}</span>
                    <h3>{t}</h3>
                    <p>{d}</p>
                    <div className="stage-bottom">
                      <span>APP / MOTIVE</span>
                      <Link href={i === 3 ? "/landing" : "/services"} style={{ color: 'inherit', textDecoration: 'none' }}>EXPLORE CAPABILITY ↗</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section section-pad process-section" aria-labelledby="process-heading">
        <Reveal className="process-intro">
          <span className="kicker">02 / OUR PROCESS</span>
          <h2 id="process-heading">Think. Make. <span>Move.</span></h2>
          <p>Clear thinking, rapid prototyping and thoughtful engineering. No unnecessary layers between an idea and the people building it.</p>
          <div className="process-wheel"><span>01</span><span>02</span><span>03</span><span>04</span><i /></div>
        </Reveal>
        <div className="steps">
          {[
            ['01', 'Discover', 'We understand the business, users and opportunity.'],
            ['02', 'Design', 'We turn insight into a clear product experience.'],
            ['03', 'Develop', 'We build fast, scalable and production-ready.'],
            ['04', 'Launch', 'We ship, learn and keep improving.']
          ].map(([n, t, d]) => (
            <Reveal key={n}>
              <div className="step">
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
                <b>↗</b>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-heading">
        <div className="about-top section-pad why-hero-layout">
          <div className="why-hero-copy">
            <Reveal>
              <span className="kicker">03 / ABOUT APPMOTIVE</span>
              <h2 id="about-heading">Engineering digital products<br /><span>that scale & perform.</span></h2>
            </Reveal>
            <Reveal>
              <p>AppMotive Technologies is a full-service digital product agency. We partner with ambitious founders, startups, and enterprises to design, engineer, and launch production-ready web, mobile, and AI solutions.</p>
            </Reveal>
            <Reveal>
              <div className="about-highlights">
                <div className="about-highlight-item">
                  <span className="highlight-check">✓</span>
                  <div>
                    <strong>Product-First Engineering</strong>
                    <p>Clean, maintainable code built for speed, security, and real business conversion.</p>
                  </div>
                </div>
                <div className="about-highlight-item">
                  <span className="highlight-check">✓</span>
                  <div>
                    <strong>Full-Lifecycle Execution</strong>
                    <p>From UI/UX strategy to cloud deployment and ongoing optimization.</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="about-cta-row">
                <Link href="/about" className="text-link" style={{ fontWeight: 600, color: 'var(--blue)' }}>
                  Learn more about our team <span>↗</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="why-hero-visual">
            <TiltImage src="/about-us.webp" alt="AppMotive Technologies Engineering Team and Vision" className="about-hero-img" />
          </div>
        </div>

        <div className="stats section-pad">
          <div><strong>50<span>+</span></strong><span>Projects Shipped</span></div>
          <div><strong>30<span>+</span></strong><span>Happy Clients</span></div>
          <div><strong>99.9<span>%</span></strong><span>Reliability SLA</span></div>
          <div><strong>100<span>%</span></strong><span>IP Ownership</span></div>
        </div>
      </section>

      <section id="faq" className="section section-pad faq-section" aria-labelledby="faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">04 / FREQUENTLY ASKED QUESTIONS</span>
              <h2 id="faq-heading">Got questions?<br /><span>We've got answers.</span></h2>
              <p>Everything you need to know about working with AppMotive Technologies, our delivery timelines, pricing, and IP ownership.</p>
            </Reveal>
            <Reveal>
              <div className="faq-support-card">
                <strong>Have a custom question?</strong>
                <p>Can't find the answer you're looking for? Reach out to our engineering team directly.</p>
                <Link href="/contact" className="faq-support-link">Ask us directly <span>↗</span></Link>
              </div>
            </Reveal>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
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

      {/* 05 / ENGINEERING INSIGHTS & PERSPECTIVES */}
      {latestBlogs && latestBlogs.length > 0 && (
        <section id="insights" className="section-pad" aria-label="Latest Engineering Insights" style={{ borderTop: '1px solid var(--line, #e4e9ef)' }}>
          <div className="section-head">
            <Reveal>
              <span className="kicker">05 / PERSPECTIVES & TECH STRATEGY</span>
              <h2>Engineering Insights.<br /><span>Blueprints for modern tech leaders.</span></h2>
              <p>Actionable guides on cloud modernization, enterprise DevOps, and practical AI automation architectures.</p>
            </Reveal>
            <div className="section-head-cta">
              <Link href="/blog" className="ghost">
                View All Articles <span>↗</span>
              </Link>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
              marginTop: '40px',
            }}
          >
            {latestBlogs.map((blog) => (
              <Reveal key={blog._id}>
                <article
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    border: '1px solid var(--line, #e4e9ef)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    height: '100%',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <Link href={`/blog/${blog.slug}`} style={{ display: 'block', height: '180px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={blog.coverImage || '/project-1.webp'}
                      alt={blog.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: '#07101d',
                        color: '#fff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {blog.category}
                    </div>
                  </Link>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted, #687486)', marginBottom: '8px' }}>
                      {blog.readTime || '5 min read'}
                    </div>

                    <Link href={`/blog/${blog.slug}`} style={{ textDecoration: 'none', color: 'var(--ink, #07101d)' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 10px', lineHeight: 1.35 }}>
                        {blog.title}
                      </h3>
                    </Link>

                    <p style={{ fontSize: '0.88rem', color: 'var(--muted, #687486)', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                      {blog.excerpt}
                    </p>

                    <div style={{ borderTop: '1px solid var(--line, #e4e9ef)', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink, #07101d)' }}>
                        {blog.author?.name || 'AppMotive Team'}
                      </span>
                      <Link href={`/blog/${blog.slug}`} style={{ color: 'var(--blue, #4285F4)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Read Article <span>↗</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section id="contact" className="cta section-pad" aria-label="Call to Action">
        <div className="cta-grid" />
        <div className="cta-logo"><img src="/appmotive-logo.webp" alt="AppMotive Technologies Logo" /></div>
        <Reveal>
          <span className="kicker">06 / LET’S BUILD</span>
          <h2>Have an idea?<br /><span>Let’s make it real.</span></h2>
          <Magnetic>
            <Link className="primary light-btn" href="/contact">Start a conversation <span>↗</span></Link>
          </Magnetic>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
