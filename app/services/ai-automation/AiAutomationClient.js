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

const aiCapabilities = [
  {
    num: '01',
    title: 'Custom LLM & Agent Architectures',
    desc: 'Deploy state-of-the-art AI agents powered by OpenAI GPT-4o, Anthropic Claude 3.5, and Llama 3 tailored to execute domain-specific workflows.'
  },
  {
    num: '02',
    title: 'Enterprise Knowledge RAG Systems',
    desc: 'Connect your internal documentation, PDFs, and database records into vector search indices for instant semantic search and Q&A.'
  },
  {
    num: '03',
    title: 'Automated Document & Data Processing',
    desc: 'Extract structured JSON from unstructured invoices, customer emails, contracts, and receipts automatically using AI vision models.'
  },
  {
    num: '04',
    title: 'Smart Customer Support Agents',
    desc: 'Replace slow static chatbots with context-aware AI agents capable of resolving complex user inquiries, booking meetings, and taking actions.'
  }
];

const aiTech = ['🤖 OpenAI API', '🧠 Anthropic Claude', '🦜 LangChain / LlamaIndex', '🌲 Pinecone / Qdrant', '🐍 Python', '⚡ FastAPI', '🦙 Ollama', '☁️ AWS Bedrock'];

const aiFaqs = [
  {
    q: 'How do you protect private company data when using LLMs?',
    a: 'We prioritize data privacy by deploying enterprise-grade SOC2 compliant private API endpoints (Azure OpenAI, AWS Bedrock) or hosting open-source LLMs directly on your private cloud server so zero data is shared with public training models.'
  },
  {
    q: 'What is RAG (Retrieval-Augmented Generation)?',
    a: 'RAG converts your internal company documents into mathematical vectors so AI models can pull exact facts from your internal knowledge base before crafting accurate answers.'
  },
  {
    q: 'Can AI agents trigger real actions in our CRM or database?',
    a: 'Yes! We configure agent tool calling (function calling) enabling AI agents to query databases, update CRM lead statuses, send emails, or issue API calls securely.'
  },
  {
    q: 'How long does an AI workflow implementation take?',
    a: 'A custom RAG internal tool or AI agent prototype usually takes 2 to 4 weeks to develop, test, and deploy into production.'
  }
];

const aiProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Workflow Audit & Feasibility',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'Analyzing manual bottlenecks, evaluating API data availability, and selecting optimal LLM models.',
    deliverable: 'AI Architecture & Model Selection Blueprint'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Vector Indexing & RAG Pipeline',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Ingesting enterprise data sources, chunking text, generating embeddings, and storing them in vector DBs.',
    deliverable: 'Indexed Knowledge Base API'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'Agent Tooling & Engineering',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Designing system prompts, guardrails, function tools, and building production Python microservices.',
    deliverable: 'Production AI Microservice & APIs'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'Accuracy Evaluation & QA Pass',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Executing rigorous evaluation benchmark testing to eliminate hallucinations and enforce 99%+ accuracy.',
    deliverable: 'Evaluation Benchmark Audit & Security Pass'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Production API & SLA Support',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'Embedding AI microservices into your web apps, setting up latency monitoring, and team onboarding.',
    deliverable: 'Live Production AI Workflow & 24/7 SLA'
  }
];

const aiTestimonialsData = [
  {
    id: 1,
    name: 'Anish Deshmukh',
    role: 'CTO',
    company: 'DocuQuery AI',
    location: 'Bengaluru, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #34A853, #4285F4)',
    initials: 'AD',
    rating: 5,
    highlight: '🤖 85% Reduction in Manual Data Entry',
    quote: 'AppMotive engineered an enterprise RAG knowledge base for our legal and compliance teams. Document extraction accuracy is over 99% and processing speed is instant!',
    project: 'Enterprise RAG Knowledge System'
  },
  {
    id: 2,
    name: 'David Vance',
    role: 'Head of Customer Experience',
    company: 'OmniAssist Global',
    location: 'Boston, USA',
    flag: '🇺🇸',
    avatarBg: 'linear-gradient(135deg, #4285F4, #FBBC05)',
    initials: 'DV',
    rating: 5,
    highlight: '⚡ 24/7 Autonomous Customer Resolution',
    quote: 'Their custom AI agent integration handles over 6,000 customer inquiries weekly with zero human intervention required. Outstanding Python & FastAPI engineering.',
    project: 'Autonomous Support AI Agent'
  }
];

export default function AiAutomationClient() {
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
        body: JSON.stringify({ ...formData, service: 'AI & Business Automation' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit AI automation form error:', err);
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
          Get AI Proposal <span>↗</span>
        </a>
      </header>

      <section className="subpage-hero section-pad services-hero-layout" aria-label="AI & Automation Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> AI & AUTOMATION CAPABILITY</div></Reveal>
          <Reveal><h1>AI & Business Automation <em>Leverage Intelligent Workflows.</em></h1></Reveal>
          <Reveal><p>Replace slow manual operations with autonomous AI agents, intelligent document processing pipelines, and enterprise vector search RAG engines.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get AI Solution Proposal <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/service-hero.png" alt="AppMotive Intelligent AI & Automation Systems" className="service-hero-img" />
        </div>
      </section>

      {/* About Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="ai-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#34A853' }}>WHO WE ARE</span>
              <h2 id="ai-about-heading">
                We build intelligent AI agents <span>that automate business workflows.</span>
              </h2>
              <p>
                AppMotive Technologies is a pioneering AI solutions studio. We bridge the gap between state-of-the-art LLMs, enterprise data privacy, and autonomous business workflows.
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>🔒</div>
                  <div className="about-feature-info">
                    <strong>100% Data Privacy</strong>
                    <span>Private SOC2 cloud LLM endpoints & zero public data leaks</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>🧠</div>
                  <div className="about-feature-info">
                    <strong>RAG Vector Search</strong>
                    <span>Instant semantic Q&A over internal company documents</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#FBBC05' }}>⚙️</div>
                  <div className="about-feature-info">
                    <strong>Agent Tool Calling</strong>
                    <span>Autonomous AI agents triggering CRM & API actions</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>High Speed Pipelines</strong>
                    <span>Sub-second streaming LLM completions & Python APIs</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our AI Architects <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/about-us.png" alt="AppMotive AI Solution Engineers" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">80%+</span>
                  <div className="about-badge-text">
                    <strong>Operational Cost Saved</strong>
                    <span>Achieved via custom AI workflow automation</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-pad light-section" aria-labelledby="ai-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE BUILD</span>
            <h2 id="ai-caps-heading">AI solutions built for <span>speed, precision & ROI.</span></h2>
          </div>
          <p>Custom LLM agents, enterprise RAG engines, and automated data pipelines.</p>
        </div>

        <div className="why-grid">
          {aiCapabilities.map((item) => (
            <div className="why-card" key={item.num}>
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <span className="kicker">FRAMEWORKS & VECTOR DATABASES</span>
          <div className="tech-pills" style={{ justifyContent: 'center', marginTop: '16px' }}>
            {aiTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap */}
      <section className="section section-pad process-section-light" aria-labelledby="ai-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#34A853', background: 'rgba(52, 168, 83, 0.08)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="ai-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Turn Manual Tasks Into <span style={{ color: '#34A853' }}>Automated AI.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial process audit to vector indexing & agent deployment — secure, evaluation-tested, and transparent.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {aiProcessSteps.map((step) => (
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
      <section className="section dark-section section-pad" aria-label="AI Metrics">
        <div className="stats-header text-center">
          <span className="kicker">ENGINEERING GUARANTEE</span>
          <h2>Built for <span>enterprise data privacy & accuracy.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              99<span style={{ fontSize: '1.8rem', color: '#34A853', marginLeft: '2px' }}>%+</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>RAG Retrieval Accuracy</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              2-4 <span style={{ fontSize: '1.4rem', color: '#4285F4', fontWeight: 600 }}>Weeks</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Average AI Agent Deployment</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              100<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>SOC2 Private Data Isolation</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>24/7</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Autonomous Operations & SLA</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-pad testimonial-section" aria-labelledby="ai-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="ai-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Trusted by leaders <span style={{ color: '#8993a1' }}>building with AI.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our custom AI automation and RAG knowledge bases drive operational efficiency.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {aiTestimonialsData.map((item) => (
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
      <section id="lead-form" className="section section-pad light-section" aria-labelledby="ai-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="ai-form-heading">Request an AI <span>automation proposal.</span></h2>
            <p>Fill out the form to schedule a free 30-minute AI strategy call and receive a detailed technical proposal.</p>

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
                  <span>Your enterprise data stays 100% confidential</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">✓</span>
                <h3>Thank you, {formData.name}!</h3>
                <p>Your AI proposal request has been received. Our lead AI architect will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="AI Automation Inquiry Form">
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
                  <label htmlFor="message">Workflow Automation Goals (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about the manual business process or task you want to automate using AI..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request AI Proposal <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-pad faq-section" aria-labelledby="ai-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">AI & AUTOMATION FAQ</span>
              <h2 id="ai-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our custom LLM agent development, RAG vector systems, and data privacy guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {aiFaqs.map((faq, idx) => (
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
