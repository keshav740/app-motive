'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header style={{ width: '100%' }}>
      <nav className="nav" aria-label="Main Navigation">
        <Link className="brand" href="/" onClick={() => setMobileMenuOpen(false)} aria-label="AppMotive Technologies Homepage">
          <img src="/web-logo.webp" alt="AppMotive Technologies Logo" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-name">App<em>Motive</em><span>®</span></span>
            <span className="brand-sub">TECHNOLOGIES</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link href="/services" className={isActive('/services') ? 'active-link' : ''}>Services</Link>
          <Link href="/why-us" className={isActive('/why-us') ? 'active-link' : ''}>Why Us</Link>
          <Link href="/about" className={isActive('/about') ? 'active-link' : ''}>About</Link>
          <Link href="/blog" className={pathname?.startsWith('/blog') ? 'active-link' : ''}>Blog</Link>
          <Link href="/contact" className={isActive('/contact') ? 'active-link' : ''}>Contact</Link>
        </div>
        <div className="desktop-cta">
          <Link className="nav-cta" href="/contact">Let’s Talk <b>↗</b></Link>
        </div>
        <button
          className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Mobile Navigation Menu">
        <div className="mobile-menu-links">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/why-us" onClick={() => setMobileMenuOpen(false)}>Why Us</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
        <Link className="primary mobile-cta-btn" href="/contact" onClick={() => setMobileMenuOpen(false)}>
          Let’s Talk <span>↗</span>
        </Link>
      </div>
    </header>
  );
}
