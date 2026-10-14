import fs from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb';
import { getMongoClient } from './db';

const FALLBACK_BLOGS_PATH = path.join(process.cwd(), 'data', 'blogs.json');

// Helper to ensure fallback JSON file exists
function ensureFallbackFile() {
  const dir = path.dirname(FALLBACK_BLOGS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(FALLBACK_BLOGS_PATH)) {
    fs.writeFileSync(FALLBACK_BLOGS_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Read local blogs from JSON fallback
export function getLocalBlogs() {
  ensureFallbackFile();
  try {
    const raw = fs.readFileSync(FALLBACK_BLOGS_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading local blogs fallback:', err);
    return [];
  }
}

// Save local blogs to JSON fallback
export function saveLocalBlogs(blogs) {
  ensureFallbackFile();
  try {
    fs.writeFileSync(FALLBACK_BLOGS_PATH, JSON.stringify(blogs, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving local blogs:', err);
    return false;
  }
}

// Convert any MongoDB doc to clean serializable object with string _id
function sanitizeBlog(doc) {
  if (!doc) return null;
  return {
    ...doc,
    _id: doc._id ? doc._id.toString() : new ObjectId().toString(),
  };
}

// Slugify helper
export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Estimate read time in minutes
export function calculateReadTime(text) {
  const words = String(text || '').trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${Math.max(1, minutes)} min read`;
}

// Seed initial blogs to MongoDB if collection is empty
async function seedMongoIfEmpty(db) {
  try {
    const count = await db.collection('blogs').countDocuments();
    if (count === 0) {
      const local = getLocalBlogs();
      if (local.length > 0) {
        const toInsert = local.map((b) => {
          const { _id, ...rest } = b;
          return {
            ...rest,
            createdAt: rest.createdAt ? new Date(rest.createdAt) : new Date(),
            updatedAt: rest.updatedAt ? new Date(rest.updatedAt) : new Date(),
            publishedAt: rest.publishedAt ? new Date(rest.publishedAt) : new Date(),
          };
        });
        await db.collection('blogs').insertMany(toInsert);
      }
    }
  } catch (e) {
    console.warn('Could not auto-seed MongoDB blogs:', e.message);
  }
}

// Get All Blogs with filtering
export async function getAllBlogs({ publishedOnly = false, category = null, search = '' } = {}) {
  let blogs = [];

  try {
    const { client } = await getMongoClient();
    const db = client.db('appmotive');
    await seedMongoIfEmpty(db);

    const query = {};
    if (publishedOnly) {
      query.isPublished = true;
    }
    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    if (search && search.trim()) {
      const s = search.trim();
      query.$or = [
        { title: { $regex: s, $options: 'i' } },
        { excerpt: { $regex: s, $options: 'i' } },
        { 'tags': { $regex: s, $options: 'i' } },
      ];
    }

    const cursor = db.collection('blogs').find(query).sort({ publishedAt: -1, createdAt: -1 });
    const docs = await cursor.toArray();
    await client.close();

    blogs = docs.map(sanitizeBlog);
  } catch (err) {
    console.warn('MongoDB getAllBlogs fallback to local file:', err.message);
    const local = getLocalBlogs();
    blogs = local.filter((b) => {
      if (publishedOnly && !b.isPublished) return false;
      if (category && category !== 'All' && String(b.category).toLowerCase() !== String(category).toLowerCase()) {
        return false;
      }
      if (search && search.trim()) {
        const s = search.toLowerCase();
        const matchesTitle = String(b.title || '').toLowerCase().includes(s);
        const matchesExcerpt = String(b.excerpt || '').toLowerCase().includes(s);
        const matchesTags = Array.isArray(b.tags) && b.tags.some(t => String(t).toLowerCase().includes(s));
        if (!matchesTitle && !matchesExcerpt && !matchesTags) return false;
      }
      return true;
    });

    blogs.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt));
  }

  return blogs;
}

// Get Blog by Slug
export async function getBlogBySlug(slug, { publishedOnly = false } = {}) {
  if (!slug) return null;

  try {
    const { client } = await getMongoClient();
    const db = client.db('appmotive');
    const query = { slug };
    if (publishedOnly) {
      query.isPublished = true;
    }

    const doc = await db.collection('blogs').findOne(query);
    await client.close();
    if (doc) return sanitizeBlog(doc);
  } catch (err) {
    console.warn('MongoDB getBlogBySlug fallback to local file:', err.message);
  }

  // Fallback check
  const local = getLocalBlogs();
  const found = local.find((b) => b.slug === slug && (!publishedOnly || b.isPublished));
  return found ? sanitizeBlog(found) : null;
}

// Get Blog by ID
export async function getBlogById(id) {
  if (!id) return null;

  try {
    const { client } = await getMongoClient();
    const db = client.db('appmotive');

    let doc = null;
    if (ObjectId.isValid(id)) {
      doc = await db.collection('blogs').findOne({ _id: new ObjectId(id) });
    }
    if (!doc) {
      doc = await db.collection('blogs').findOne({ _id: id });
    }
    await client.close();
    if (doc) return sanitizeBlog(doc);
  } catch (err) {
    console.warn('MongoDB getBlogById fallback to local file:', err.message);
  }

  const local = getLocalBlogs();
  const found = local.find((b) => String(b._id) === String(id));
  return found ? sanitizeBlog(found) : null;
}

// Create new blog
export async function createBlog(data) {
  const now = new Date();
  const rawSlug = data.slug ? slugify(data.slug) : slugify(data.title);
  
  // Ensure unique slug
  let uniqueSlug = rawSlug || `blog-${Date.now()}`;
  const existing = await getBlogBySlug(uniqueSlug);
  if (existing) {
    uniqueSlug = `${uniqueSlug}-${Date.now().toString().slice(-4)}`;
  }

  const newPost = {
    title: data.title || 'Untitled Post',
    slug: uniqueSlug,
    excerpt: data.excerpt || '',
    category: data.category || 'Technology',
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map((t) => t.trim()) : []),
    coverImage: data.coverImage || '/project-1.webp',
    author: {
      name: data.author?.name || 'AppMotive Engineering',
      role: data.author?.role || 'Technical Team',
      avatar: data.author?.avatar || '/web-logo.webp',
    },
    readTime: data.readTime || calculateReadTime(data.content),
    content: data.content || '',
    isPublished: Boolean(data.isPublished),
    publishedAt: data.isPublished ? (data.publishedAt || now.toISOString()) : null,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    seo: {
      metaTitle: data.seo?.metaTitle || data.title,
      metaDescription: data.seo?.metaDescription || data.excerpt,
      keywords: data.seo?.keywords || (Array.isArray(data.tags) ? data.tags.join(', ') : ''),
      canonicalUrl: data.seo?.canonicalUrl || `https://www.appmotivetechnologies.com/blog/${uniqueSlug}`,
    },
    serviceCta: data.serviceCta || {
      title: 'Accelerate Your Digital Transformation',
      description: 'Partner with AppMotive Technologies to architect, build, and scale world-class software.',
      serviceLink: '/services',
      serviceName: 'Explore All Services',
    },
  };

  let savedId = null;

  try {
    const { client } = await getMongoClient();
    const db = client.db('appmotive');
    const result = await db.collection('blogs').insertOne({
      ...newPost,
      createdAt: now,
      updatedAt: now,
      publishedAt: newPost.publishedAt ? new Date(newPost.publishedAt) : null,
    });
    await client.close();
    savedId = result.insertedId.toString();
  } catch (err) {
    console.warn('MongoDB createBlog error, saving to local fallback:', err.message);
    savedId = new ObjectId().toString();
  }

  // Also sync to local JSON
  const local = getLocalBlogs();
  const createdWithId = { _id: savedId, ...newPost };
  local.unshift(createdWithId);
  saveLocalBlogs(local);

  return createdWithId;
}

// Update blog
export async function updateBlog(id, data) {
  if (!id) throw new Error('Blog ID is required for update');

  const now = new Date();
  const updates = {
    ...data,
    updatedAt: now.toISOString(),
  };

  if (updates.content && !updates.readTime) {
    updates.readTime = calculateReadTime(updates.content);
  }

  if (updates.isPublished && !updates.publishedAt) {
    updates.publishedAt = now.toISOString();
  }

  let mongoUpdated = false;

  try {
    const { client } = await getMongoClient();
    const db = client.db('appmotive');
    const mongoQuery = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };

    const updateDoc = { ...updates, updatedAt: now };
    if (updateDoc.publishedAt) {
      updateDoc.publishedAt = new Date(updateDoc.publishedAt);
    }
    delete updateDoc._id;

    await db.collection('blogs').updateOne(mongoQuery, { $set: updateDoc });
    await client.close();
    mongoUpdated = true;
  } catch (err) {
    console.warn('MongoDB updateBlog error, updating local file:', err.message);
  }

  // Update local file
  const local = getLocalBlogs();
  const index = local.findIndex((b) => String(b._id) === String(id));
  if (index !== -1) {
    local[index] = { ...local[index], ...updates };
    saveLocalBlogs(local);
  }

  return { success: true, blogId: id, mongoUpdated };
}

// Delete blog
export async function deleteBlog(id) {
  if (!id) throw new Error('Blog ID is required for deletion');

  try {
    const { client } = await getMongoClient();
    const db = client.db('appmotive');
    const mongoQuery = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    await db.collection('blogs').deleteOne(mongoQuery);
    await client.close();
  } catch (err) {
    console.warn('MongoDB deleteBlog error:', err.message);
  }

  // Delete from local file
  const local = getLocalBlogs();
  const filtered = local.filter((b) => String(b._id) !== String(id));
  saveLocalBlogs(filtered);

  return { success: true, deletedId: id };
}

// Get all published slugs for sitemap
export async function getAllPublishedSlugs() {
  const blogs = await getAllBlogs({ publishedOnly: true });
  return blogs.map((b) => ({
    slug: b.slug,
    updatedAt: b.updatedAt || b.publishedAt || b.createdAt || new Date().toISOString(),
  }));
}
