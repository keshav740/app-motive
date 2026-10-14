'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function formatDate(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Slugify anchor helper
function toAnchorId(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Markdown Renderer with ID Anchors
function MarkdownRenderer({ content }) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let inList = false;
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} style={{ paddingLeft: '24px', margin: '16px 0', color: '#cbd5e1', lineHeight: '1.8' }}>
          {listBuffer.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
      inList = false;
    }
  };

  const flushCode = () => {
    if (codeBuffer.length > 0) {
      elements.push(
        <div
          key={`code-${elements.length}`}
          style={{
            background: '#040914',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '20px',
            margin: '24px 0',
            overflowX: 'auto',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            color: '#8ab4f8',
            lineHeight: 1.6,
          }}
        >
          <pre style={{ margin: 0 }}>{codeBuffer.join('\n')}</pre>
        </div>
      );
      codeBuffer = [];
      inCodeBlock = false;
    }
  };

  const renderInline = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#fff', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCode();
      } else {
        flushList();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      inList = true;
      listBuffer.push(trimmed.slice(2));
      return;
    } else if (inList) {
      flushList();
    }

    if (trimmed === '---') {
      elements.push(
        <hr
          key={`hr-${index}`}
          style={{
            border: 'none',
            borderTop: '1px solid #1e293b',
            margin: '40px 0',
          }}
        />
      );
      return;
    }

    // Headings with clean scrollable anchor IDs
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.slice(3).trim();
      const anchorId = toAnchorId(headingText);
      elements.push(
        <h2
          id={anchorId}
          key={`h2-${index}`}
          style={{
            fontSize: '1.65rem',
            fontWeight: 700,
            color: '#fff',
            marginTop: '44px',
            marginBottom: '18px',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            scrollMarginTop: '100px',
          }}
        >
          {headingText}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.slice(4).trim();
      const anchorId = toAnchorId(headingText);
      elements.push(
        <h3
          id={anchorId}
          key={`h3-${index}`}
          style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            color: '#8ab4f8',
            marginTop: '32px',
            marginBottom: '14px',
            lineHeight: 1.4,
            scrollMarginTop: '100px',
          }}
        >
          {headingText}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={`quote-${index}`}
          style={{
            borderLeft: '4px solid #4285F4',
            background: 'rgba(66, 133, 244, 0.08)',
            padding: '16px 20px',
            borderRadius: '0 8px 8px 0',
            margin: '24px 0',
            color: '#cbd5e1',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          {renderInline(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    if (!trimmed) {
      return;
    }

    elements.push(
      <p
        key={`p-${index}`}
        style={{
          color: '#cbd5e1',
          fontSize: '1.05rem',
          lineHeight: '1.8',
          marginBottom: '20px',
        }}
      >
        {renderInline(trimmed)}
      </p>
    );
  });

  flushList();
  flushCode();

  return <div>{elements}</div>;
}

export default function BlogPostClient({ blog, relatedBlogs = [], faqs = [] }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extract Table of Contents
  const toc = useMemo(() => {
    if (!blog?.content) return [];
    const lines = blog.content.split('\n');
    const items = [];
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        const title = trimmed.slice(3).trim();
        items.push({ title, id: toAnchorId(title) });
      }
    });
    return items;
  }, [blog?.content]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(blog.title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#07101d', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
      {/* Top Reading Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          background: 'linear-gradient(90deg, #4285F4, #34A853, #FBBC05)',
          zIndex: 99999,
          transition: 'width 0.1s linear',
        }}
      />

      <Navbar />

      <main style={{ maxWidth: '920px', margin: '0 auto', padding: '130px 20px 80px' }}>
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: '#64748b',
            marginBottom: '28px',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" style={{ color: '#8fa0b5', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/blog" style={{ color: '#8fa0b5', textDecoration: 'none' }}>Blog</Link>
          <span>/</span>
          <span style={{ color: '#4285F4', fontWeight: 500 }}>{blog.category}</span>
        </nav>

        {/* Article Header */}
        <header style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(66, 133, 244, 0.15)',
                color: '#8ab4f8',
                border: '1px solid rgba(66, 133, 244, 0.3)',
                padding: '4px 14px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              {blog.category}
            </span>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Published {formatDate(blog.publishedAt || blog.createdAt)}
            </span>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>•</span>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
              {blog.readTime || '6 min read'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              color: '#ffffff',
            }}
          >
            {blog.title}
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            {blog.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #1e293b',
              borderBottom: '1px solid #1e293b',
              padding: '16px 0',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={blog.author?.avatar || '/web-logo.webp'}
                alt={blog.author?.name || 'AppMotive'}
                style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #233754' }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>
                  {blog.author?.name || 'AppMotive Engineering'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {blog.author?.role || 'Technical Team'}
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleShareTwitter}
                title="Share on X"
                style={{
                  background: '#0d1829',
                  border: '1px solid #1e293b',
                  color: '#cbd5e1',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>𝕏</span> Share
              </button>

              <button
                onClick={handleShareLinkedIn}
                title="Share on LinkedIn"
                style={{
                  background: '#0d1829',
                  border: '1px solid #1e293b',
                  color: '#cbd5e1',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>in</span> LinkedIn
              </button>

              <button
                onClick={handleCopyLink}
                style={{
                  background: copied ? '#34A853' : '#0d1829',
                  border: '1px solid #1e293b',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontWeight: copied ? 600 : 400,
                  transition: 'background 0.2s ease',
                }}
              >
                {copied ? '✓ Link Copied!' : '🔗 Copy Link'}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #1e293b',
            marginBottom: '40px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          <img
            src={blog.coverImage || '/project-1.webp'}
            alt={blog.title}
            style={{ width: '100%', height: 'auto', maxHeight: '460px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Table of Contents (TOC) */}
        {toc.length > 0 && (
          <nav
            aria-label="Table of Contents"
            style={{
              background: 'linear-gradient(145deg, #0d1829, #091322)',
              border: '1px solid #1e293b',
              borderRadius: '14px',
              padding: '24px 28px',
              marginBottom: '44px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '1.1rem' }}>📑</span>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Table of Contents
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {toc.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      color: '#8ab4f8',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    <span style={{ color: '#4285F4', fontSize: '0.8rem', fontWeight: 600 }}>0{idx + 1}.</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body Content */}
        <article style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: '1.8' }}>
          <MarkdownRenderer content={blog.content} />
        </article>

        {/* Tags Row */}
        {Array.isArray(blog.tags) && blog.tags.length > 0 && (
          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #1e293b' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '12px', fontWeight: 600 }}>
              TOPICS & KEYWORDS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#0d1829',
                    border: '1px solid #1e293b',
                    color: '#94a3b8',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '0.82rem',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion Section (Google Rich Snippets) */}
        {faqs && faqs.length > 0 && (
          <section style={{ marginTop: '56px', paddingTop: '36px', borderTop: '1px solid #1e293b' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#4285F4' }}>❓</span> Frequently Asked Questions
            </h3>
            <p style={{ color: '#8fa0b5', fontSize: '0.9rem', margin: '0 0 20px' }}>
              Key architectural questions answered by our engineering specialists.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      background: '#0d1829',
                      border: '1px solid #1e293b',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '16px 20px',
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontSize: '0.98rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span>{faq.q}</span>
                      <span style={{ color: '#4285F4', fontSize: '1.2rem', fontWeight: 700 }}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 20px 18px', color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Service CTA Internal Link Box (SEO Link Equity & Lead Gen) */}
        {blog.serviceCta && (
          <div
            style={{
              marginTop: '56px',
              background: 'linear-gradient(135deg, #0d1829 0%, #152238 100%)',
              border: '1px solid #233754',
              borderRadius: '16px',
              padding: '36px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ flex: '1', minWidth: '280px' }}>
              <div
                style={{
                  display: 'inline-block',
                  background: 'rgba(66, 133, 244, 0.2)',
                  color: '#8ab4f8',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Recommended Engineering Service
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
                {blog.serviceCta.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                {blog.serviceCta.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={blog.serviceCta.serviceLink || '/services'}
                style={{
                  background: '#4285F4',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  boxShadow: '0 4px 14px rgba(66,133,244,0.35)',
                }}
              >
                {blog.serviceCta.serviceName || 'Explore Solution'} ↗
              </Link>
              <Link
                href="/contact"
                style={{
                  background: '#121f33',
                  color: '#cbd5e1',
                  border: '1px solid #233754',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                }}
              >
                Book Engineering Call
              </Link>
            </div>
          </div>
        )}

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <section style={{ marginTop: '72px', paddingTop: '40px', borderTop: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                Related Articles & Guides
              </h3>
              <Link href="/blog" style={{ color: '#4285F4', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
                View All Articles →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel._id}
                  href={`/blog/${rel.slug}`}
                  style={{
                    background: '#0d1829',
                    borderRadius: '12px',
                    border: '1px solid #1e293b',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <img
                    src={rel.coverImage || '/project-2.webp'}
                    alt={rel.title}
                    style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: '#8ab4f8', fontWeight: 600, marginBottom: '6px' }}>
                      {rel.category}
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', margin: '0 0 8px', lineHeight: 1.4 }}>
                      {rel.title}
                    </h4>
                    <div style={{ marginTop: 'auto', fontSize: '0.78rem', color: '#64748b' }}>
                      {rel.readTime || '5 min read'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div style={{ marginTop: '56px', textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{
              color: '#8fa0b5',
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ← Back to all articles
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
