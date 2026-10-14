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

const pillars = [
  {
    num: '01',
    title: 'Product Thinking Meets Engineering',
    desc: 'We don’t just write code; we analyze your market, user journeys, and business objectives so every line of code drives tangible growth.'
  },
  {
    num: '02',
    title: 'Direct Access to Senior Engineers',
    desc: 'No account managers or unnecessary layers. You collaborate directly with the senior developers and product designers building your product.'
  },
  {
    num: '03',
    title: 'Rapid Production Cycles',
    desc: 'Iterative, fast-paced deployment workflows that get features from concept into production in days rather than months.'
  },
  {
    num: '04',
    title: 'Scalable & Future-Proof Code',
    desc: 'Built using modern frameworks, clean code architecture, and strict security standards to ensure your application scales gracefully.'
  }
];

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function WhyUsClient() {
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

  return (
    <main>
      <div className="scroll-progress"><span style={{ width: `${progress}%` }} /></div>
      <div className="cursor-glow" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />

      <Navbar />

      <section className="subpage-hero section-pad why-hero-layout" aria-label="Why Choose AppMotive Hero">
        <div className="why-hero-copy">
          <Reveal><div className="eyebrow"><i /> WHY APPMOTIVE</div></Reveal>
          <Reveal><h1>Ideas are easy.<br /><em>Building them well isn't.</em></h1></Reveal>
          <Reveal><p>We combine product strategy, intuitive UI design, and production engineering to turn high-ambition concepts into market-defining digital products.</p></Reveal>
        </div>
        <div className="why-hero-visual">
          <TiltImage src="/why-us.webp" alt="Why Choose AppMotive Technologies Engineering Agency" className="why-hero-img" />
        </div>
      </section>

      <section className="section section-pad light-section" aria-labelledby="why-diff-heading">
        <div className="section-head">
          <div>
            <span className="kicker">THE APPMOTIVE DIFFERENCE</span>
            <h2 id="why-diff-heading">Built for speed, <span>clarity and leverage.</span></h2>
          </div>
          <p>Why ambitious founders and growth teams trust AppMotive Technologies to build their mission-critical products.</p>
        </div>

        <div className="why-grid">
          {pillars.map((item) => (
            <div className="why-card" key={item.num}>
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section dark-section section-pad" aria-label="Track Record Metrics">
        <div className="stats-header text-center">
          <span className="kicker">PROVEN TRACK RECORD</span>
          <h2>Numbers that <span>speak for themselves.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong>50<span>+</span></strong>
            <span>Digital Products Delivered</span>
          </div>
          <div className="stat-box">
            <strong>99.9<span>%</span></strong>
            <span>Uptime & Reliability Rate</span>
          </div>
          <div className="stat-box">
            <strong>30<span>+</span></strong>
            <span>Global Corporate & Startup Clients</span>
          </div>
          <div className="stat-box">
            <strong>100<span>%</span></strong>
            <span>On-Time Milestone Delivery</span>
          </div>
        </div>
      </section>

      <section className="cta section-pad" aria-label="Partner Call to Action">
        <div className="cta-grid" />
        <span className="kicker">PARTNER WITH US</span>
        <h2>Ready to build something great?<br /><span>Let’s start today.</span></h2>
        <Link className="primary light-btn" href="/contact">
          Schedule a Discovery Call <span>↗</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
