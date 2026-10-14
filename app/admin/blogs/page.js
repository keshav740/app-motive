'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  'Cloud Services',
  'AI & Automation',
  'Agile DevOps',
  'Web Development',
  'Mobile App Development',
  'Blockchain Development',
  'Digital Commerce',
  'Business Applications',
  'Technology Strategy',
];

const PRESET_COVERS = [
  { label: 'Cloud & Infrastructure', url: '/project-1.webp' },
  { label: 'DevOps & Engineering', url: '/project-2.webp' },
  { label: 'AI & Data Intelligence', url: '/project-3.webp' },
  { label: 'Product & Architecture', url: '/hero-home.webp' },
];

const SERVICE_LINKS = [
  { label: 'Cloud Services', path: '/services/cloud-services' },
  { label: 'Agile DevOps', path: '/services/agile-devops' },
  { label: 'AI & Automation', path: '/services/ai-automation' },
  { label: 'Web Development', path: '/services/web-development' },
  { label: 'Mobile App Development', path: '/services/mobile-app-development' },
  { label: 'Blockchain Development', path: '/services/blockchain-development' },
  { label: 'Digital Commerce', path: '/services/digital-commerce' },
  { label: 'Business Applications', path: '/services/business-application' },
];

export default function AdminBlogsPage() {
  const [passcode, setPasscode] = useState('');
  const [token, setToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Published', 'Draft'
  const [uploadingImage, setUploadingImage] = useState(false);

  // Editor modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [notification, setNotification] = useState('');

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    category: 'Cloud Services',
    tags: '',
    coverImage: '/project-1.webp',
    authorName: 'AppMotive Engineering',
    authorRole: 'Engineering Team',
    content: '',
    isPublished: true,
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    serviceLink: '/services/cloud-services',
    serviceCtaTitle: 'Need Enterprise Engineering Assistance?',
    serviceCtaDesc: 'AppMotive engineers design, build, and deploy high-performing digital systems.',
  });

  // Dynamic SEO Audit & Readiness Score
  const seoAudit = useMemo(() => {
    let score = 0;
    const checks = [];

    // 1. Title Length Check (15 pts)
    const titleLen = (formData.metaTitle || formData.title || '').trim().length;
    if (titleLen >= 35 && titleLen <= 70) {
      score += 15;
      checks.push({ label: `Title length is optimal (${titleLen} chars)`, status: 'pass' });
    } else if (titleLen > 0) {
      score += 8;
      checks.push({ label: `Title is ${titleLen} chars (ideal: 40-65 chars)`, status: 'warn' });
    } else {
      checks.push({ label: 'Title is missing', status: 'fail' });
    }

    // 2. Meta Description Length Check (15 pts)
    const descLen = (formData.metaDescription || formData.excerpt || '').trim().length;
    if (descLen >= 110 && descLen <= 170) {
      score += 15;
      checks.push({ label: `Meta description is ideal (${descLen} chars)`, status: 'pass' });
    } else if (descLen > 0) {
      score += 8;
      checks.push({ label: `Description is ${descLen} chars (aim for 120-165)`, status: 'warn' });
    } else {
      checks.push({ label: 'Meta description is missing', status: 'fail' });
    }

    // 3. Slug Quality (10 pts)
    if (formData.slug && /^[a-z0-9-]+$/.test(formData.slug)) {
      score += 10;
      checks.push({ label: 'Clean search-engine-friendly slug URL', status: 'pass' });
    } else {
      checks.push({ label: 'Slug should only contain lowercase & hyphens', status: 'warn' });
    }

    // 4. Featured Cover Image (10 pts)
    if (formData.coverImage && formData.coverImage.trim()) {
      score += 10;
      checks.push({ label: 'Featured image set for Google & Social cards', status: 'pass' });
    } else {
      checks.push({ label: 'Cover image is missing', status: 'fail' });
    }

    // 5. Headings Structure (15 pts)
    const hasHeadings = (formData.content || '').includes('## ');
    if (hasHeadings) {
      score += 15;
      checks.push({ label: 'Contains structured H2 subheadings for Table of Contents', status: 'pass' });
    } else {
      checks.push({ label: 'Add at least one H2 heading (## Topic) for structure', status: 'warn' });
    }

    // 6. Content In-Depth Word Count (20 pts)
    const wordCount = (formData.content || '').trim().split(/\s+/).filter(Boolean).length;
    if (wordCount >= 300) {
      score += 20;
      checks.push({ label: `Rich in-depth content (${wordCount} words)`, status: 'pass' });
    } else if (wordCount >= 100) {
      score += 12;
      checks.push({ label: `Moderate word count (${wordCount} words - recommend 300+)`, status: 'warn' });
    } else {
      checks.push({ label: 'Content is too short for search engine ranking', status: 'fail' });
    }

    // 7. Focus Keywords (10 pts)
    if (formData.keywords && formData.keywords.trim()) {
      score += 10;
      checks.push({ label: 'Focus SEO keywords specified', status: 'pass' });
    } else {
      checks.push({ label: 'Enter 2-3 focus keywords for targeted ranking', status: 'warn' });
    }

    // 8. Internal Service Link (5 pts)
    if (formData.serviceLink) {
      score += 5;
      checks.push({ label: 'Internal service link configured to pass SEO authority', status: 'pass' });
    }

    return { score: Math.min(100, score), checks };
  }, [formData]);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('appmotive_admin_token');
    if (savedToken) {
      setToken(savedToken);
      fetchBlogs(savedToken);
    }
  }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        sessionStorage.setItem('appmotive_admin_token', data.token);
        fetchBlogs(data.token);
      } else {
        setAuthError(data.error || 'Invalid Admin Passcode');
      }
    } catch {
      setAuthError('Authentication network error');
    }
  };

  const fetchBlogs = async (authToken = token) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      } else if (data.error === 'Unauthorized.') {
        sessionStorage.removeItem('appmotive_admin_token');
        setToken('');
      }
    } catch (err) {
      console.error('Failed to fetch admin blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const openNewEditor = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      category: 'Cloud Services',
      tags: 'Engineering, Technology, Enterprise',
      coverImage: '/project-1.webp',
      authorName: 'AppMotive Engineering',
      authorRole: 'Engineering Team',
      content: '## Introduction\n\nWrite your introduction here...\n\n---\n\n## Key Concepts\n\n* Point 1\n* Point 2\n\n---\n\n## Conclusion\n\nSummarize actionable takeaways.',
      isPublished: true,
      metaTitle: '',
      metaDescription: '',
      keywords: 'appmotive, engineering, technology',
      serviceLink: '/services/cloud-services',
      serviceCtaTitle: 'Ready to modernize your architecture?',
      serviceCtaDesc: 'Speak directly with our senior engineering specialists today.',
    });
    setIsEditorOpen(true);
  };

  const openEditEditor = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      category: blog.category || 'Technology Strategy',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || ''),
      coverImage: blog.coverImage || '/project-1.webp',
      authorName: blog.author?.name || 'AppMotive Engineering',
      authorRole: blog.author?.role || 'Technical Team',
      content: blog.content || '',
      isPublished: Boolean(blog.isPublished),
      metaTitle: blog.seo?.metaTitle || '',
      metaDescription: blog.seo?.metaDescription || '',
      keywords: blog.seo?.keywords || '',
      serviceLink: blog.serviceCta?.serviceLink || '/services',
      serviceCtaTitle: blog.serviceCta?.title || 'Accelerate Your Digital Roadmap',
      serviceCtaDesc: blog.serviceCta?.description || 'Partner with AppMotive Technologies for high-performance engineering.',
    });
    setIsEditorOpen(true);
  };

  const handleTitleChange = (val) => {
    setFormData((prev) => {
      const updates = { ...prev, title: val };
      // Auto-generate slug if it was unmodified or new
      if (!editingBlog || !prev.slug) {
        updates.slug = val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      if (!prev.metaTitle) {
        updates.metaTitle = `${val} | AppMotive`;
      }
      return updates;
    });
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a title for the blog post');
      return;
    }

    setActionLoading(true);

    const payload = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      category: formData.category,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      coverImage: formData.coverImage,
      author: {
        name: formData.authorName,
        role: formData.authorRole,
        avatar: '/web-logo.webp',
      },
      content: formData.content,
      isPublished: formData.isPublished,
      seo: {
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.excerpt,
        keywords: formData.keywords,
        canonicalUrl: `https://www.appmotivetechnologies.com/blog/${formData.slug}`,
      },
      serviceCta: {
        title: formData.serviceCtaTitle,
        description: formData.serviceCtaDesc,
        serviceLink: formData.serviceLink,
        serviceName: 'Learn More',
      },
    };

    try {
      if (editingBlog) {
        const res = await fetch(`/api/blogs/${editingBlog._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showNotification('Blog updated successfully!');
          setIsEditorOpen(false);
          fetchBlogs();
        } else {
          alert(data.error || 'Failed to update blog');
        }
      } else {
        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showNotification('Blog published successfully!');
          setIsEditorOpen(false);
          fetchBlogs();
        } else {
          alert(data.error || 'Failed to create blog');
        }
      }
    } catch {
      alert('Network error while saving blog');
    } finally {
      setActionLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const body = new FormData();
    body.append('image', file);

    try {
      const res = await fetch('/api/admin/blogs/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, coverImage: data.url }));
        showNotification('Cover image uploaded successfully!');
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch {
      alert('Network error while uploading image');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleTogglePublish = async (blog) => {
    try {
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !blog.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(blog.isPublished ? 'Post moved to Drafts' : 'Post Published!');
        fetchBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBlog = async (blog) => {
    if (!confirm(`Are you sure you want to permanently delete "${blog.title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Blog post deleted.');
        fetchBlogs();
      } else {
        alert(data.error || 'Failed to delete blog');
      }
    } catch {
      alert('Network error deleting blog');
    }
  };

  const insertSnippet = (prefix, suffix = '') => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + `\n\n${prefix}Your Text${suffix}\n`,
    }));
  };

  // Filtered list
  const filteredBlogs = blogs.filter((b) => {
    if (filterStatus === 'Published' && !b.isPublished) return false;
    if (filterStatus === 'Draft' && b.isPublished) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      const matchTitle = (b.title || '').toLowerCase().includes(s);
      const matchCat = (b.category || '').toLowerCase().includes(s);
      const matchSlug = (b.slug || '').toLowerCase().includes(s);
      if (!matchTitle && !matchCat && !matchSlug) return false;
    }
    return true;
  });

  // Login view
  if (!token) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#07101d', padding: '20px' }}>
        <div style={{ background: '#0e1828', padding: '40px', borderRadius: '16px', border: '1px solid #1f2b3e', width: '100%', maxWidth: '420px', color: '#fff', textAlign: 'center' }}>
          <img src="/web-logo.webp" alt="AppMotive" style={{ width: '48px', height: '48px', margin: '0 auto 16px' }} />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 8px' }}>AppMotive Blog Admin</h1>
          <p style={{ color: '#8fa0b5', fontSize: '0.88rem', margin: '0 0 24px' }}>Enter administrator passcode to manage SEO articles</p>
          {authError && <div style={{ background: 'rgba(234,67,53,0.15)', border: '1px solid #ea4335', color: '#ff6b6b', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>{authError}</div>}
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Admin Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: '#07101d', border: '1px solid #23344d', borderRadius: '8px', color: '#fff', fontSize: '1rem', marginBottom: '20px', outline: 'none' }}
              autoFocus
            />
            <button
              type="submit"
              style={{ width: '100%', padding: '12px', background: '#4285F4', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}
            >
              Sign In to Blog Manager
            </button>
          </form>
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #1f2b3e' }}>
            <Link href="/" style={{ color: '#8fa0b5', fontSize: '0.85rem', textDecoration: 'none' }}>← Return to Homepage</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07101d', color: '#e4e9ef', fontFamily: 'Poppins, sans-serif' }}>
      {/* Top Header */}
      <header style={{ borderBottom: '1px solid #1b283d', background: '#0a1424', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' }}>
            <img src="/web-logo.webp" alt="AppMotive" style={{ width: '32px', height: '32px' }} />
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>App<em>Motive</em> Admin</span>
          </Link>
          <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
            <Link href="/admin/leads" style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.85rem', color: '#8fa0b5', textDecoration: 'none', background: 'transparent' }}>
              Leads
            </Link>
            <span style={{ padding: '6px 14px', borderRadius: '6px', fontSize: '0.85rem', color: '#fff', background: '#4285F4', fontWeight: 600 }}>
              Blog Manager (SEO)
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/blog" target="_blank" style={{ padding: '7px 14px', borderRadius: '6px', fontSize: '0.85rem', color: '#4285F4', textDecoration: 'none', border: '1px solid #233754', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View Public Blog ↗
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem('appmotive_admin_token');
              setToken('');
            }}
            style={{ padding: '7px 14px', borderRadius: '6px', fontSize: '0.85rem', color: '#ff6b6b', border: '1px solid #4a1d1d', background: 'transparent', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#34A853', color: '#fff', padding: '12px 20px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 9999, fontWeight: 600 }}>
          {notification}
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Top Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 6px', color: '#fff' }}>SEO Blog Articles</h1>
            <p style={{ color: '#8fa0b5', margin: 0, fontSize: '0.9rem' }}>
              Create, optimize, and rank technical blog posts on Google with rich metadata & JSON-LD schemas.
            </p>
          </div>
          <button
            onClick={openNewEditor}
            style={{ background: 'linear-gradient(135deg, #4285F4, #3367D6)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(66,133,244,0.3)' }}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>+</span> Write New Article
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: '#0e1828', padding: '18px 22px', borderRadius: '12px', border: '1px solid #1b283d' }}>
            <div style={{ color: '#8fa0b5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Posts</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>{blogs.length}</div>
          </div>
          <div style={{ background: '#0e1828', padding: '18px 22px', borderRadius: '12px', border: '1px solid #1b283d' }}>
            <div style={{ color: '#8fa0b5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Published (Google Live)</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#34A853', marginTop: '4px' }}>
              {blogs.filter((b) => b.isPublished).length}
            </div>
          </div>
          <div style={{ background: '#0e1828', padding: '18px 22px', borderRadius: '12px', border: '1px solid #1b283d' }}>
            <div style={{ color: '#8fa0b5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Drafts</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FBBC05', marginTop: '4px' }}>
              {blogs.filter((b) => !b.isPublished).length}
            </div>
          </div>
          <div style={{ background: '#0e1828', padding: '18px 22px', borderRadius: '12px', border: '1px solid #1b283d' }}>
            <div style={{ color: '#8fa0b5', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Database Status</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#4285F4', marginTop: '8px' }}>
              ● MongoDB & JSON Synced
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div style={{ background: '#0e1828', padding: '16px 20px', borderRadius: '12px', border: '1px solid #1b283d', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Published', 'Draft'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: filterStatus === status ? '#4285F4' : '#1f2e45',
                  background: filterStatus === status ? 'rgba(66,133,244,0.15)' : 'transparent',
                  color: filterStatus === status ? '#fff' : '#8fa0b5',
                  fontSize: '0.85rem',
                  fontWeight: filterStatus === status ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {status}
              </button>
            ))}
          </div>

          <div style={{ flex: '1', maxWidth: '360px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by title, category, or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '9px 16px', background: '#07101d', border: '1px solid #23344d', borderRadius: '8px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>
        </div>

        {/* Blog Post List */}
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#8fa0b5' }}>Loading articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', background: '#0e1828', borderRadius: '12px', border: '1px solid #1b283d' }}>
            <p style={{ color: '#8fa0b5', fontSize: '1rem', margin: '0 0 16px' }}>No blog posts match your criteria.</p>
            <button
              onClick={openNewEditor}
              style={{ background: '#4285F4', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                style={{
                  background: '#0e1828',
                  borderRadius: '12px',
                  border: '1px solid #1b283d',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: '1', minWidth: '320px' }}>
                  <img
                    src={blog.coverImage || '/project-1.webp'}
                    alt={blog.title}
                    style={{ width: '90px', height: '64px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #23344d' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.75rem', background: '#1c2d47', color: '#8ab4f8', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        {blog.category}
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: 600,
                          background: blog.isPublished ? 'rgba(52,168,83,0.15)' : 'rgba(251,188,5,0.15)',
                          color: blog.isPublished ? '#34A853' : '#FBBC05',
                        }}
                      >
                        {blog.isPublished ? '● Published' : '○ Draft'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#687b94' }}>
                        {blog.readTime || '5 min read'}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, margin: '0 0 4px', color: '#fff' }}>
                      {blog.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#7a8eab' }}>
                      <code style={{ color: '#8ab4f8' }}>/blog/{blog.slug}</code>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {blog.isPublished && (
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', color: '#8fa0b5', textDecoration: 'none', border: '1px solid #23344d' }}
                    >
                      View ↗
                    </Link>
                  )}
                  <button
                    onClick={() => handleTogglePublish(blog)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: 'transparent',
                      border: '1px solid',
                      borderColor: blog.isPublished ? '#fbbe0566' : '#34a85366',
                      color: blog.isPublished ? '#FBBC05' : '#34A853',
                      cursor: 'pointer',
                    }}
                  >
                    {blog.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => openEditEditor(blog)}
                    style={{ padding: '8px 16px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, background: '#4285F4', color: '#fff', border: 'none', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog)}
                    style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', background: 'transparent', color: '#ff6b6b', border: '1px solid #4a1d1d', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Write / Edit Modal */}
      {isEditorOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(8px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#0e1828', width: '100%', maxWidth: '1000px', maxHeight: '92vh', overflowY: 'auto', borderRadius: '16px', border: '1px solid #1f2b3e', padding: '32px', color: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1b283d', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 4px' }}>
                  {editingBlog ? 'Edit SEO Article' : 'Create New SEO Article'}
                </h2>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#8fa0b5' }}>
                  Fill in article details, structured content, and Google meta tags.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#8fa0b5', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBlog}>
              {/* Core Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern Cloud Migration Strategy for Enterprise Apps"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: '#07101d', border: '1px solid #23344d', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    URL Slug * (Search Engine Friendly)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="cloud-migration-strategy-guide"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#07101d', border: '1px solid #23344d', borderRadius: '8px', color: '#8ab4f8', fontSize: '0.9rem', outline: 'none' }}
                  />
                  <div style={{ fontSize: '0.75rem', color: '#687b94', marginTop: '4px' }}>
                    Preview: https://appmotivetechnologies.com/blog/<strong>{formData.slug || 'your-slug'}</strong>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#07101d', border: '1px solid #23344d', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2', background: '#07101d', padding: '16px', borderRadius: '10px', border: '1px solid #1f2e45' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                    Featured Cover Image * (Google Rich Snippet & Social Cards)
                  </label>
                  
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    {/* Live Preview */}
                    <div style={{ width: '160px', height: '100px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #23344d', background: '#0e1828', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {formData.coverImage ? (
                        <img src={formData.coverImage} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#687b94' }}>No Image</span>
                      )}
                      {uploadingImage && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 600 }}>
                          Uploading...
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <div style={{ flex: 1, minWidth: '260px' }}>
                      {/* Upload from PC Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <label
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: '#34A853',
                            color: '#fff',
                            padding: '9px 16px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: uploadingImage ? 'not-allowed' : 'pointer',
                            opacity: uploadingImage ? 0.7 : 1,
                            boxShadow: '0 4px 12px rgba(52, 168, 83, 0.25)',
                          }}
                        >
                          <span>📁</span> {uploadingImage ? 'Uploading Image...' : 'Upload Image from Computer'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <span style={{ fontSize: '0.8rem', color: '#8fa0b5' }}>PNG, JPG, WEBP, SVG (Max 10MB)</span>
                      </div>

                      {/* Direct URL input */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <input
                          type="text"
                          placeholder="Or paste image URL / local path (e.g. /project-1.webp)"
                          value={formData.coverImage}
                          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                          style={{ flex: 1, padding: '8px 12px', background: '#0e1828', border: '1px solid #23344d', borderRadius: '6px', color: '#8ab4f8', fontSize: '0.85rem', outline: 'none' }}
                        />
                      </div>

                      {/* Presets */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: '#687b94' }}>Presets:</span>
                        {PRESET_COVERS.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                            style={{
                              fontSize: '0.72rem',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: formData.coverImage === preset.url ? '#4285F4' : '#182436',
                              color: '#fff',
                              border: '1px solid',
                              borderColor: formData.coverImage === preset.url ? '#4285F4' : '#23344d',
                              cursor: 'pointer',
                            }}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="AWS, DevOps, Kubernetes, Automation"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#07101d', border: '1px solid #23344d', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                      Excerpt / Summary (Key for Google Card & Socials)
                    </label>
                    <span style={{ fontSize: '0.75rem', color: formData.excerpt.length > 160 ? '#FBBC05' : '#8fa0b5' }}>
                      {formData.excerpt.length} / 160 chars recommended
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Short engaging summary of the article..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#07101d', border: '1px solid #23344d', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Content Editor */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
                    Article Markdown Content *
                  </label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => insertSnippet('## ')} style={{ background: '#1c2d47', color: '#8ab4f8', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>H2</button>
                    <button type="button" onClick={() => insertSnippet('### ')} style={{ background: '#1c2d47', color: '#8ab4f8', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>H3</button>
                    <button type="button" onClick={() => insertSnippet('**', '**')} style={{ background: '#1c2d47', color: '#8ab4f8', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Bold</button>
                    <button type="button" onClick={() => insertSnippet('* ')} style={{ background: '#1c2d47', color: '#8ab4f8', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Bullet</button>
                    <button type="button" onClick={() => insertSnippet('> ')} style={{ background: '#1c2d47', color: '#8ab4f8', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Quote</button>
                    <button type="button" onClick={() => insertSnippet('```javascript\n', '\n```')} style={{ background: '#1c2d47', color: '#8ab4f8', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Code</button>
                  </div>
                </div>
                <textarea
                  required
                  rows={12}
                  placeholder="Write complete article in Markdown (supports ## headings, **bold**, lists, code blocks, etc.)..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{ width: '100%', padding: '14px', background: '#07101d', border: '1px solid #23344d', borderRadius: '8px', color: '#fff', fontSize: '0.92rem', fontFamily: 'monospace', outline: 'none', resize: 'vertical', lineHeight: '1.6' }}
                />
              </div>

              {/* Internal Linking Box (SEO Booster) */}
              <div style={{ background: '#121f33', padding: '20px', borderRadius: '12px', border: '1px solid #233754', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 6px', color: '#4285F4' }}>
                  🔗 Internal Linking CTA (Pass SEO Authority to Service Pages)
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#8fa0b5', margin: '0 0 16px' }}>
                  This card appears at the bottom of the article to boost conversions and SEO ranking for that service.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>Target Service Page</label>
                    <select
                      value={formData.serviceLink}
                      onChange={(e) => setFormData({ ...formData, serviceLink: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', background: '#07101d', border: '1px solid #23344d', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    >
                      {SERVICE_LINKS.map((s) => (
                        <option key={s.path} value={s.path}>{s.label} ({s.path})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>CTA Box Title</label>
                    <input
                      type="text"
                      value={formData.serviceCtaTitle}
                      onChange={(e) => setFormData({ ...formData, serviceCtaTitle: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', background: '#07101d', border: '1px solid #23344d', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Google Live SERP Preview & SEO Settings */}
              <div style={{ background: '#07101d', padding: '20px', borderRadius: '12px', border: '1px solid #1f2e45', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: '#34A853' }}>
                    🔍 Google Search Engine Preview & Live SEO Audit
                  </h3>
                </div>

                {/* Live SEO Score Gauge */}
                <div style={{ background: '#0e1828', borderRadius: '10px', padding: '16px 20px', border: '1px solid #1f2e45', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.2rem' }}>⚡</span>
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>Live Google SEO Readiness Score</div>
                        <div style={{ fontSize: '0.78rem', color: '#8fa0b5' }}>Real-time audit of top search ranking signals</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          padding: '4px 14px',
                          borderRadius: '8px',
                          background: seoAudit.score >= 80 ? 'rgba(52,168,83,0.15)' : seoAudit.score >= 50 ? 'rgba(251,188,5,0.15)' : 'rgba(234,67,53,0.15)',
                          color: seoAudit.score >= 80 ? '#34A853' : seoAudit.score >= 50 ? '#FBBC05' : '#EA4335',
                          border: `1px solid ${seoAudit.score >= 80 ? '#34A853' : seoAudit.score >= 50 ? '#FBBC05' : '#EA4335'}`,
                        }}
                      >
                        {seoAudit.score} / 100
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: seoAudit.score >= 80 ? '#34A853' : seoAudit.score >= 50 ? '#FBBC05' : '#EA4335' }}>
                        {seoAudit.score >= 80 ? 'Excellent' : seoAudit.score >= 50 ? 'Moderate' : 'Needs Work'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ width: '100%', height: '6px', background: '#07101d', borderRadius: '3px', overflow: 'hidden', marginBottom: '14px' }}>
                    <div
                      style={{
                        width: `${seoAudit.score}%`,
                        height: '100%',
                        background: seoAudit.score >= 80 ? '#34A853' : seoAudit.score >= 50 ? '#FBBC05' : '#EA4335',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>

                  {/* SEO Checklist */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                    {seoAudit.checks.map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
                        <span style={{ color: c.status === 'pass' ? '#34A853' : c.status === 'warn' ? '#FBBC05' : '#EA4335', fontWeight: 700 }}>
                          {c.status === 'pass' ? '✓' : c.status === 'warn' ? '!' : '✕'}
                        </span>
                        <span style={{ color: c.status === 'pass' ? '#cbd5e1' : '#8fa0b5' }}>
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Google Mock */}
                <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', color: '#202124', fontFamily: 'Arial, sans-serif', marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: '#202124', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <img src="/web-logo.webp" alt="" style={{ width: '14px', height: '14px', borderRadius: '50%' }} />
                    <span>appmotivetechnologies.com › blog › {formData.slug || 'article-slug'}</span>
                  </div>
                  <div style={{ fontSize: '18px', color: '#1a0dab', fontWeight: 400, lineHeight: 1.3, marginBottom: '4px' }}>
                    {formData.metaTitle || formData.title || 'Your Article Title Shows Here'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#4d5156', lineHeight: 1.4 }}>
                    {formData.metaDescription || formData.excerpt || 'Enter meta description to show snippet text directly in Google search results...'}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>Meta Title (SEO Title)</label>
                    <input
                      type="text"
                      placeholder="Title optimized for Google..."
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', background: '#0e1828', border: '1px solid #23344d', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>SEO Keywords</label>
                    <input
                      type="text"
                      placeholder="cloud migration, devops, react, aws"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', background: '#0e1828', border: '1px solid #23344d', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '4px' }}>Meta Description</label>
                    <input
                      type="text"
                      placeholder="Comprehensive summary for search engines (140-160 characters)..."
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', background: '#0e1828', border: '1px solid #23344d', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1b283d', paddingTop: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#4285F4' }}
                  />
                  <span>Publish immediately (Make visible on Google & Site)</span>
                </label>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    style={{ padding: '10px 20px', borderRadius: '8px', background: '#1c283d', color: '#8fa0b5', border: 'none', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    style={{ padding: '10px 28px', borderRadius: '8px', background: '#4285F4', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(66,133,244,0.3)' }}
                  >
                    {actionLoading ? 'Saving...' : editingBlog ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
