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

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

const steps = [
  { n: '01', t: 'Discover', d: 'We conduct deep discovery to understand business logic, user pain points, and technical requirements.' },
  { n: '02', t: 'Design', d: 'We create high-fidelity design systems, intuitive user flows, and interactive prototypes.' },
  { n: '03', t: 'Develop', d: 'We build scalable web, mobile, and AI solutions using production-grade code architecture.' },
  { n: '04', t: 'Launch & Scale', d: 'We deploy to production, monitor real-time analytics, and continuously optimize for performance.' }
];

export default function AboutClient() {
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

      <section className="subpage-hero section-pad about-hero-layout" aria-label="About AppMotive Hero">
        <div className="about-hero-copy">
          <Reveal><div className="eyebrow"><i /> ABOUT APPMOTIVE</div></Reveal>
          <Reveal><h1>We design & build digital products <em>that move businesses forward.</em></h1></Reveal>
          <Reveal><p>AppMotive Technologies is a product engineering agency dedicated to crafting sleek, high-impact web apps, mobile products, and AI workflows for ambitious brands worldwide.</p></Reveal>
        </div>
        <div className="about-hero-visual">
          <TiltImage src="/about-us.webp" alt="About AppMotive Technologies Team & Engineering Culture" className="about-hero-img" />
        </div>
      </section>

      <section className="section section-pad light-section" aria-labelledby="mission-heading">
        <div className="about-grid-detailed">
          <div className="about-story">
            <span className="kicker">OUR MISSION</span>
            <h2 id="mission-heading">Eliminating friction between <span>ideas and execution.</span></h2>
            <p>Founded on the principle that digital tools should be fast, purposeful, and beautifully designed, AppMotive brings engineering clarity to every project. We pair modern frontend technology with robust backend architecture.</p>
            <p>Our multidisciplinary team spans design strategy, frontend React/Next.js craftsmanship, mobile engineering, and AI automation.</p>
          </div>
          <div className="about-values">
            <div className="val-card">
              <h3>Speed with Quality</h3>
              <p>We believe in shipping quickly without compromising on clean code or UI precision.</p>
            </div>
            <div className="val-card">
              <h3>Transparent Partnership</h3>
              <p>Direct communication, weekly sprint builds, and clear progress visibility at every stage.</p>
            </div>
            <div className="val-card">
              <h3>Performance First</h3>
              <p>Every pixel and function is optimized for lightning load times and smooth user interaction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-pad process-section" aria-labelledby="process-4step-heading">
        <div className="process-intro">
          <span className="kicker">HOW WE WORK</span>
          <h2 id="process-4step-heading">Our proven <span>4-step process.</span></h2>
          <p>A structured approach that guarantees predictable outcomes and production excellence.</p>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <span>{s.n}</span>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
              <b>↗</b>
            </div>
          ))}
        </div>
      </section>

      <section className="cta section-pad" aria-label="Get in Touch Call to Action">
        <div className="cta-grid" />
        <span className="kicker">GET IN TOUCH</span>
        <h2>Want to work with our team?<br /><span>Let’s connect.</span></h2>
        <Link className="primary light-btn" href="/contact">
          Get in Touch <span>↗</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
