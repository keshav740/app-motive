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

const blockchainCapabilities = [
  {
    num: '01',
    title: 'Smart Contract Audit & Engineering',
    desc: 'Battle-tested EVM & Solana smart contracts engineered in Solidity and Rust with rigorous security unit testing and zero gas waste.'
  },
  {
    num: '02',
    title: 'Decentralized Applications (dApps)',
    desc: 'Full-stack Web3 frontend applications with seamless wallet connections (MetaMask, Phantom, WalletConnect) and real-time state updates.'
  },
  {
    num: '03',
    title: 'Tokenomics & NFT Ecosystems',
    desc: 'Designing custom ERC-20, ERC-721, ERC-1155 token mechanics, staking contracts, and decentralized governance frameworks.'
  },
  {
    num: '04',
    title: 'Layer-2 & Cross-Chain Bridges',
    desc: 'Scaling throughput and reducing user gas fees using Arbitrum, Polygon, Optimism, and decentralized Oracle integrations.'
  }
];

const blockchainTech = ['⛓️ Solidity', '🦀 Rust', '🌐 Ethers.js / Web3.js', '🦊 MetaMask', '👻 Phantom Wallet', '🛠️ Hardhat / Foundry', '🔷 Ethereum', '⚡ Polygon / Arbitrum'];

const blockchainFaqs = [
  {
    q: 'How do you ensure smart contract security against hacks?',
    a: 'We write defensive smart contract logic following OpenZeppelin standards, perform static analysis with Slither/Mythril, and conduct rigorous unit testing before third-party security audits.'
  },
  {
    q: 'Which blockchain networks do you build on?',
    a: 'We support Ethereum (EVM), Polygon, Arbitrum, Optimism, Solana, Avalanche, and custom Hyperledger enterprise chains.'
  },
  {
    q: 'Can you integrate Web3 wallets into our existing React application?',
    a: 'Yes! We can integrate Web3 wallet connection libraries (RainbowKit, Wagmi, Dynamic) directly into any modern Next.js or React web app.'
  },
  {
    q: 'What is the typical timeline for a dApp development project?',
    a: 'A smart contract + dApp web frontend MVP typically takes 4 to 8 weeks depending on protocol complexity and security audit requirements.'
  }
];

const blockchainProcessSteps = [
  {
    num: '01',
    phase: 'PHASE 01',
    title: 'Tokenomics & Protocol Architecture',
    accent: '#4285F4',
    accentLight: 'rgba(66, 133, 244, 0.1)',
    desc: 'Drafting protocol specifications, state machine logic, gas optimization strategy, and token economy dynamics.',
    deliverable: 'Protocol Architecture & Specs'
  },
  {
    num: '02',
    phase: 'PHASE 02',
    title: 'Smart Contract Development',
    accent: '#34A853',
    accentLight: 'rgba(52, 168, 83, 0.1)',
    desc: 'Writing Solidity/Rust smart contracts, unit test suites, and mock testnet deployments.',
    deliverable: 'Verified Smart Contract Codebase'
  },
  {
    num: '03',
    phase: 'PHASE 03',
    title: 'dApp Frontend & Wallet UX',
    accent: '#9C27B0',
    accentLight: 'rgba(156, 39, 176, 0.1)',
    desc: 'Building responsive Web3 interfaces with real-time blockchain event listeners and wallet authentication.',
    deliverable: 'Interactive Web3 dApp Interface'
  },
  {
    num: '04',
    phase: 'PHASE 04',
    title: 'Security Audit & Gas Optimization',
    accent: '#FBBC05',
    accentLight: 'rgba(251, 188, 5, 0.15)',
    desc: 'Executing security audit remediations, static code analysis, gas profiling, and contract verification.',
    deliverable: 'Audited Smart Contract & Security Pass'
  },
  {
    num: '05',
    phase: 'PHASE 05',
    title: 'Mainnet Launch & Node Maintenance',
    accent: '#EA4335',
    accentLight: 'rgba(234, 67, 53, 0.1)',
    desc: 'Contract deployment to mainnet, verifying source code on block explorers, and 24/7 RPC node infrastructure support.',
    deliverable: 'Live Mainnet Protocol Deployment'
  }
];

const blockchainTestimonialsData = [
  {
    id: 1,
    name: 'Vikram Sethi',
    role: 'Founder',
    company: 'Nexus DEX Protocol',
    location: 'Bengaluru, India',
    flag: '🇮🇳',
    avatarBg: 'linear-gradient(135deg, #4285F4, #9C27B0)',
    initials: 'VS',
    rating: 5,
    highlight: '🔒 $50M+ TVL Secured Without Flaw',
    quote: 'AppMotive engineered our EVM smart contracts and Web3 dApp interface. Their gas optimization saved our protocol users thousands in transaction fees!',
    project: 'Decentralized Exchange (DEX) & Staking'
  },
  {
    id: 2,
    name: 'Henrik Lindqvist',
    role: 'Lead Blockchain Architect',
    company: 'Aetheria Web3',
    location: 'Zurich, Switzerland',
    flag: '🇨🇭',
    avatarBg: 'linear-gradient(135deg, #34A853, #4285F4)',
    initials: 'HL',
    rating: 5,
    highlight: '⚡ 100% Security Audit Pass',
    quote: 'Flawless Solidity code quality and unit test coverage. Passed our third-party security audit with zero critical vulnerabilities reported.',
    project: 'Cross-Chain Token Bridge & dApp'
  }
];

export default function BlockchainClient() {
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
        body: JSON.stringify({ ...formData, service: 'Blockchain Development & Web3' }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit blockchain dev form error:', err);
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
          Get Web3 Quote <span>↗</span>
        </a>
      </header>

      <section className="subpage-hero section-pad services-hero-layout" aria-label="Blockchain Development Hero" style={{ paddingTop: '40px' }}>
        <div className="services-hero-copy">
          <Reveal><div className="eyebrow"><i /> WEB3 & BLOCKCHAIN CAPABILITY</div></Reveal>
          <Reveal><h1>Blockchain Development <em>Secure & Audited Web3.</em></h1></Reveal>
          <Reveal><p>Engineer decentralized protocols, audited smart contracts, and Web3 dApps. We build high-throughput blockchain architecture designed for security, low gas overhead, and scale.</p></Reveal>
          <Reveal className="hero-actions" style={{ marginTop: '24px' }}>
            <a href="#lead-form" className="primary">Get Web3 Proposal <span>↗</span></a>
          </Reveal>
        </div>
        <div className="service-hero-visual">
          <TiltImage src="/hero-home.webp" alt="AppMotive Web3 & Blockchain Engineering" className="service-hero-img" />
        </div>
      </section>

      {/* About Section */}
      <section className="section section-pad landing-about-section" aria-labelledby="blockchain-about-heading">
        <div className="landing-about-grid">
          <div className="landing-about-content">
            <Reveal>
              <span className="kicker" style={{ color: '#4285F4' }}>WHO WE ARE</span>
              <h2 id="blockchain-about-heading">
                We build Web3 dApps & smart contracts <span>that guarantee security.</span>
              </h2>
              <p>
                AppMotive Technologies is an elite Web3 engineering firm. We bridge the gap between complex smart contract logic, low gas fees, and intuitive dApp interfaces.
              </p>
            </Reveal>

            <Reveal>
              <div className="about-features-list">
                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>🔒</div>
                  <div className="about-feature-info">
                    <strong>Audited Security</strong>
                    <span>Battle-tested smart contracts following OpenZeppelin</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>⚡</div>
                  <div className="about-feature-info">
                    <strong>Gas Optimization</strong>
                    <span>Efficient EVM byte code to minimize transaction fees</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(251, 188, 5, 0.15)', color: '#FBBC05' }}>🌐</div>
                  <div className="about-feature-info">
                    <strong>Multi-Chain Scale</strong>
                    <span>Ethereum, Polygon, Arbitrum, Solana & Layer-2</span>
                  </div>
                </div>

                <div className="about-feature-card">
                  <div className="about-feature-icon" style={{ background: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>✓</div>
                  <div className="about-feature-info">
                    <strong>Seamless Wallet UX</strong>
                    <span>MetaMask, Phantom & WalletConnect integrations</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <a href="#lead-form" className="primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Consult Our Web3 Architects <span>↗</span>
              </a>
            </Reveal>
          </div>

          <div className="landing-about-visual">
            <Reveal>
              <div style={{ position: 'relative' }}>
                <TiltImage src="/why-us.webp" alt="AppMotive Web3 & Blockchain Developers" className="landing-about-img" />
                <div className="about-floating-badge">
                  <span className="about-badge-num">100%</span>
                  <div className="about-badge-text">
                    <strong>Security Track Record</strong>
                    <span>Zero exploits across deployed mainnet protocols</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section section-pad light-section" aria-labelledby="blockchain-caps-heading">
        <div className="section-head">
          <div>
            <span className="kicker">WHAT WE BUILD</span>
            <h2 id="blockchain-caps-heading">Decentralized protocols built for <span>trust & scalability.</span></h2>
          </div>
          <p>Audited smart contracts, seamless Web3 UX, and Layer-2 scaling solutions.</p>
        </div>

        <div className="why-grid">
          {blockchainCapabilities.map((item) => (
            <div className="why-card" key={item.num}>
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <span className="kicker">FRAMEWORKS & PROTOCOLS</span>
          <div className="tech-pills" style={{ justifyContent: 'center', marginTop: '16px' }}>
            {blockchainTech.map((t, i) => (
              <span className="tech-pill" key={i} style={{ fontSize: '0.95rem', padding: '8px 16px' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Roadmap */}
      <section className="section section-pad process-section-light" aria-labelledby="blockchain-process-heading">
        <div style={{ maxWidth: '750px', margin: '0 auto 40px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker" style={{ color: '#4285F4', background: 'rgba(66, 133, 244, 0.08)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚡ OUR 5-STEP ROADMAP
            </span>
            <h2 id="blockchain-process-heading" style={{ color: '#07101d', fontSize: 'clamp(30px, 3.8vw, 48px)', margin: '14px 0 0', lineHeight: '1.25', letterSpacing: '-1px' }}>
              How We Engineer <span style={{ color: '#4285F4' }}>Audited Web3 Protocols.</span>
            </h2>
            <p style={{ color: '#5f6368', marginTop: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              From initial tokenomics design to verified mainnet deployment — secure, audited, and gas-efficient.
            </p>
          </Reveal>
        </div>

        <div className="process-grid-light">
          {blockchainProcessSteps.map((step) => (
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
      <section className="section dark-section section-pad" aria-label="Blockchain Metrics">
        <div className="stats-header text-center">
          <span className="kicker">SECURITY GUARANTEE</span>
          <h2>Built for <span>bulletproof decentralized protocols.</span></h2>
        </div>
        <div className="stats-large">
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              $50M<span style={{ fontSize: '1.8rem', color: '#4285F4', marginLeft: '2px' }}>+</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Protocol Value Secured</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              0 <span style={{ fontSize: '1.4rem', color: '#34A853', fontWeight: 600 }}>Exploits</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Flawless Security Track Record</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>
              100<span style={{ fontSize: '1.8rem', color: '#FBBC05', marginLeft: '2px' }}>%</span>
            </strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>Verified Open-Source Contracts</span>
          </div>
          <div className="stat-box">
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ffffff' }}>24/7</strong>
            <span style={{ display: 'block', marginTop: '6px', color: '#9aa0a6', fontSize: '0.9rem' }}>RPC Node SLA Monitoring</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-pad testimonial-section" aria-labelledby="blockchain-testimonials-heading">
        <div style={{ maxWidth: '800px', margin: '0 auto 30px', textAlign: 'center' }}>
          <Reveal>
            <span className="kicker">CLIENT SUCCESS STORIES</span>
            <h2 id="blockchain-testimonials-heading" style={{ color: '#ffffff', fontSize: 'clamp(32px, 4vw, 54px)', margin: '12px 0 0' }}>
              Trusted by Web3 founders <span style={{ color: '#8993a1' }}>globally.</span>
            </h2>
            <p style={{ color: '#9aa0a6', marginTop: '16px', fontSize: '1rem', lineHeight: '1.7' }}>
              See how our Web3 smart contract engineering powers secure decentralized platforms.
            </p>
          </Reveal>
        </div>

        <div className="testimonials-grid">
          {blockchainTestimonialsData.map((item) => (
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
      <section id="lead-form" className="section section-pad light-section" aria-labelledby="blockchain-form-heading">
        <div className="contact-layout">
          <div className="contact-info">
            <span className="kicker">GET STARTED</span>
            <h2 id="blockchain-form-heading">Start your Web3 / <span>blockchain project.</span></h2>
            <p>Fill out the form to schedule a free 30-minute technical architecture call and receive a detailed Web3 proposal.</p>

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
                  <span>Your protocol specs stay 100% confidential</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            {submitted ? (
              <div className="success-box">
                <span className="success-icon">✓</span>
                <h3>Thank you, {formData.name}!</h3>
                <p>Your Web3 project request has been received. Our lead architect will review your details and contact you at <strong>{formData.email}</strong> / <strong>{formData.phone}</strong> within 24 hours.</p>
                <button className="primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} aria-label="Blockchain Development Inquiry Form">
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
                    placeholder="jane@protocol.io"
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
                  <label htmlFor="message">Protocol Requirements / Overview (Optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your smart contract logic, target blockchain network (Ethereum/Solana), or dApp goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="primary submit-btn" disabled={loading}>
                  {loading ? 'Submitting Request...' : <>Request Web3 Proposal <span>↗</span></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-pad faq-section" aria-labelledby="blockchain-faq-heading">
        <div className="faq-layout">
          <div className="faq-intro">
            <Reveal>
              <span className="kicker">WEB3 FAQ</span>
              <h2 id="blockchain-faq-heading">Frequently asked <span>questions.</span></h2>
              <p>Everything you need to know about our smart contract auditing, Web3 dApp development, and security guarantees.</p>
            </Reveal>
          </div>

          <div className="faq-list">
            {blockchainFaqs.map((faq, idx) => (
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
