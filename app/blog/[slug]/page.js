import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogs } from '../../../lib/blogsDb';
import BlogPostClient from './BlogPostClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug, { publishedOnly: true });

  if (!blog) {
    return {
      title: 'Blog Post Not Found | AppMotive Technologies',
      description: 'The requested engineering article could not be found.',
    };
  }

  const metaTitle = blog.seo?.metaTitle || `${blog.title} | AppMotive Technologies`;
  const metaDescription = blog.seo?.metaDescription || blog.excerpt || blog.title;
  const canonicalUrl =
    blog.seo?.canonicalUrl || `https://www.appmotivetechnologies.com/blog/${blog.slug}`;
  const ogImage = blog.coverImage.startsWith('http')
    ? blog.coverImage
    : `https://www.appmotivetechnologies.com${blog.coverImage}`;

  const keywordsList = blog.seo?.keywords
    ? blog.seo.keywords.split(',').map((k) => k.trim())
    : Array.isArray(blog.tags)
    ? blog.tags
    : ['AppMotive Technologies', 'Software Engineering'];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywordsList,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: 'AppMotive Technologies',
      publishedTime: blog.publishedAt || blog.createdAt,
      modifiedTime: blog.updatedAt || blog.publishedAt || blog.createdAt,
      authors: [blog.author?.name || 'AppMotive Technologies'],
      section: blog.category,
      tags: Array.isArray(blog.tags) ? blog.tags : [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug, { publishedOnly: true });

  if (!blog) {
    notFound();
  }

  // Fetch 3 related blogs from same category or latest
  const allBlogs = await getAllBlogs({ publishedOnly: true });
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== blog.slug)
    .sort((a, b) => (a.category === blog.category ? -1 : 1))
    .slice(0, 3);

  const postUrl = `https://www.appmotivetechnologies.com/blog/${blog.slug}`;
  const ogImage = blog.coverImage.startsWith('http')
    ? blog.coverImage
    : `https://www.appmotivetechnologies.com${blog.coverImage}`;

  // Article / BlogPosting Schema
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: [ogImage],
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'AppMotive Engineering',
      jobTitle: blog.author?.role || 'Senior Software Engineer',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AppMotive Technologies',
      url: 'https://www.appmotivetechnologies.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.appmotivetechnologies.com/web-logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: blog.category,
    keywords: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
  };

  // Breadcrumbs Schema for Google Search Hierarchy
  const jsonLdBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.appmotivetechnologies.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.appmotivetechnologies.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />
      <BlogPostClient blog={blog} relatedBlogs={relatedBlogs} />
    </>
  );
}
