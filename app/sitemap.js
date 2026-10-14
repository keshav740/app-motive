import { getAllPublishedSlugs } from '../lib/blogsDb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap() {
  const baseUrl = 'https://www.appmotivetechnologies.com';
  const now = new Date();

  const services = [
    'web-development',
    'mobile-app-development',
    'social-media-marketing',
    'blockchain-development',
    'ai-automation',
    'business-application',
    'digital-commerce',
    'agile-devops',
    'cloud-services',
  ];

  const serviceUrls = services.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  // Dynamically load published blogs from Database / Fallback
  let blogUrls = [];
  try {
    const publishedBlogs = await getAllPublishedSlugs();
    blogUrls = publishedBlogs.map((b) => ({
      url: `${baseUrl}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));
  } catch (err) {
    console.warn('Could not populate blog URLs in sitemap:', err.message);
  }

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/landing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...serviceUrls,
    ...blogUrls,
    {
      url: `${baseUrl}/why-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
