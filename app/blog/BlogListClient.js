'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function formatDate(dateStr) {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

const CATEGORIES = [
  'All',
  'Cloud Services',
  'AI & Automation',
  'Agile DevOps',
  'Web Development',
  'Mobile App Development',
  'Blockchain Development',
  'Digital Commerce',
];

export default function BlogListClient({ initialBlogs = [] }) {
  const [blogs] = useState(initialBlogs);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter blogs based on category and search
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchCat =
        selectedCategory === 'All' ||
        String(blog.category).toLowerCase() === selectedCategory.toLowerCase();

      if (!matchCat) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = String(blog.title || '').toLowerCase().includes(q);
        const matchExcerpt = String(blog.excerpt || '').toLowerCase().includes(q);
        const matchTags = Array.isArray(blog.tags) && blog.tags.some((t) => String(t).toLowerCase().includes(q));
        return matchTitle || matchExcerpt || matchTags;
      }

      return true;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const regularBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div style={{ minHeight: '100vh', background: '#07101d', color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
      <Navbar />

      {/* Hero Header */}
      <section style={{ padding: '140px 20px 60px', maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(66, 133, 244, 0.1)',
            border: '1px solid rgba(66, 133, 244, 0.25)',
            borderRadius: '999px',
            padding: '6px 16px',
            fontSize: '0.82rem',
            color: '#8ab4f8',
            marginBottom: '20px',
            fontWeight: 500,
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4285F4' }} />
          APPMOTIVE INSIGHTS & ENGINEERING BLOG
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 auto 18px',
            maxWidth: '900px',
            background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Architectural Insights & <span style={{ color: '#4285F4', WebkitTextFillColor: '#4285F4' }}>Tech Strategy</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#94a3b8',
            maxWidth: '680px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          In-depth technical guides, cloud migration frameworks, and enterprise AI blueprints curated by senior product engineers.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '560px', margin: '0 auto 36px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#0d1829',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '6px 16px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <span style={{ fontSize: '1.1rem', color: '#64748b', marginRight: '10px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search topics, cloud architecture, devops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '0.95rem',
                outline: 'none',
                padding: '8px 0',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 600 : 400,
                  border: isSelected ? '1px solid #4285F4' : '1px solid #1e293b',
                  background: isSelected ? 'rgba(66, 133, 244, 0.15)' : '#0d1829',
                  color: isSelected ? '#8ab4f8' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Articles Container */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px 80px' }}>
        {filteredBlogs.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              background: '#0d1829',
              borderRadius: '16px',
              border: '1px solid #1e293b',
            }}
          >
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '16px' }}>
              No articles found matching &quot;{searchQuery || selectedCategory}&quot;
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              style={{
                background: '#4285F4',
                color: '#fff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post (Big Hero Card) */}
            {featuredBlog && (
              <div
                style={{
                  background: 'linear-gradient(145deg, #0d1829, #091322)',
                  borderRadius: '20px',
                  border: '1px solid #1e293b',
                  overflow: 'hidden',
                  marginBottom: '48px',
                  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ height: '100%', minHeight: '340px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={featuredBlog.coverImage || '/project-1.webp'}
                      alt={featuredBlog.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: '#4285F4',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Featured Insight
                    </div>
                  </div>

                  <div style={{ padding: '36px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                      <span
                        style={{
                          background: 'rgba(66, 133, 244, 0.15)',
                          color: '#8ab4f8',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                        }}
                      >
                        {featuredBlog.category}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>•</span>
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {featuredBlog.readTime || '6 min read'}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h2
                        style={{
                          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                          fontWeight: 700,
                          lineHeight: 1.25,
                          marginBottom: '14px',
                          color: '#ffffff',
                        }}
                      >
                        {featuredBlog.title}
                      </h2>
                    </Link>

                    <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '24px' }}>
                      {featuredBlog.excerpt}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={featuredBlog.author?.avatar || '/web-logo.webp'}
                          alt={featuredBlog.author?.name || 'AppMotive'}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #1e293b' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>
                            {featuredBlog.author?.name || 'AppMotive Engineering'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {featuredBlog.author?.role || 'Technical Team'}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${featuredBlog.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#4285F4',
                          color: '#fff',
                          textDecoration: 'none',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          transition: 'background 0.2s ease',
                        }}
                      >
                        Read Full Article <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Regular Posts */}
            {regularBlogs.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    marginBottom: '24px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span style={{ width: '4px', height: '20px', background: '#34A853', borderRadius: '2px' }} />
                  Latest Technical Publications
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '28px',
                  }}
                >
                  {regularBlogs.map((blog) => (
                    <article
                      key={blog._id}
                      style={{
                        background: '#0d1829',
                        borderRadius: '16px',
                        border: '1px solid #1e293b',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                      }}
                    >
                      <Link
                        href={`/blog/${blog.slug}`}
                        style={{ display: 'block', height: '200px', overflow: 'hidden', position: 'relative' }}
                      >
                        <img
                          src={blog.coverImage || '/project-2.webp'}
                          alt={blog.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            background: 'rgba(7, 16, 29, 0.85)',
                            backdropFilter: 'blur(4px)',
                            color: '#8ab4f8',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {blog.category}
                        </div>
                      </Link>

                      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '0.8rem', color: '#64748b' }}>
                          <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                          <span>•</span>
                          <span>{blog.readTime || '5 min read'}</span>
                        </div>

                        <Link
                          href={`/blog/${blog.slug}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <h4
                            style={{
                              fontSize: '1.2rem',
                              fontWeight: 700,
                              lineHeight: 1.35,
                              marginBottom: '10px',
                              color: '#ffffff',
                            }}
                          >
                            {blog.title}
                          </h4>
                        </Link>

                        <p
                          style={{
                            color: '#94a3b8',
                            fontSize: '0.9rem',
                            lineHeight: 1.55,
                            marginBottom: '20px',
                            flex: 1,
                          }}
                        >
                          {blog.excerpt}
                        </p>

                        <div
                          style={{
                            borderTop: '1px solid #1e293b',
                            paddingTop: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img
                              src={blog.author?.avatar || '/web-logo.webp'}
                              alt=""
                              style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                            />
                            <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                              {blog.author?.name || 'AppMotive Team'}
                            </span>
                          </div>

                          <Link
                            href={`/blog/${blog.slug}`}
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: 600,
                              color: '#4285F4',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            Read Article <span>↗</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Newsletter / Contact CTA Banner */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 80px', padding: '0 20px' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #0d1829 0%, #17253d 100%)',
            border: '1px solid #233754',
            borderRadius: '24px',
            padding: '48px 36px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(66,133,244,0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, margin: '0 0 12px', color: '#fff' }}>
            Ready to Build Next-Gen Digital Products?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Our cloud, AI, and full-stack engineers help ambitious enterprises modernize their software and accelerate delivery.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                background: '#4285F4',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(66, 133, 244, 0.3)',
              }}
            >
              Consult with Senior Engineers ↗
            </Link>
            <Link
              href="/services"
              style={{
                background: '#121f33',
                color: '#cbd5e1',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #233754',
              }}
            >
              Explore Capabilities
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
