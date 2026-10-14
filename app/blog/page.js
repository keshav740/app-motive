import { getAllBlogs } from '../../lib/blogsDb';
import BlogListClient from './BlogListClient';

export const metadata = {
  title: 'Engineering Blog & Technology Insights | AppMotive Technologies',
  description:
    'Explore in-depth technical guides, cloud migration strategies, Agile DevOps frameworks, and enterprise AI automation architectures by AppMotive Technologies.',
  keywords: [
    'AppMotive Technologies Blog',
    'Cloud Migration Strategy',
    'Enterprise DevOps Best Practices',
    'AI Automation Architecture',
    'Full Stack Web Development',
    'Software Engineering Insights',
  ],
  alternates: {
    canonical: 'https://www.appmotivetechnologies.com/blog',
  },
  openGraph: {
    title: 'Engineering Blog & Technology Insights | AppMotive Technologies',
    description:
      'Actionable guides and technical deep-dives on Cloud, DevOps, AI, and modern web architecture.',
    url: 'https://www.appmotivetechnologies.com/blog',
    siteName: 'AppMotive Technologies',
    images: [
      {
        url: '/hero-home.webp',
        width: 1200,
        height: 630,
        alt: 'AppMotive Technologies Engineering Blog',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Blog & Technology Insights | AppMotive Technologies',
    description:
      'Actionable guides and technical deep-dives on Cloud, DevOps, AI, and modern web architecture.',
    images: ['/hero-home.webp'],
  },
};

export default async function BlogPage() {
  const blogs = await getAllBlogs({ publishedOnly: true });

  const jsonLdBlog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AppMotive Technologies Engineering Blog',
    description:
      'Technical insights, architecture blueprints, and enterprise guides on Cloud, AI, and DevOps engineering.',
    url: 'https://www.appmotivetechnologies.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'AppMotive Technologies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.appmotivetechnologies.com/web-logo.webp',
      },
    },
    blogPost: blogs.map((b) => ({
      '@type': 'BlogPosting',
      headline: b.title,
      description: b.excerpt,
      url: `https://www.appmotivetechnologies.com/blog/${b.slug}`,
      datePublished: b.publishedAt || b.createdAt,
      dateModified: b.updatedAt || b.createdAt,
      image: b.coverImage.startsWith('http')
        ? b.coverImage
        : `https://www.appmotivetechnologies.com${b.coverImage}`,
      author: {
        '@type': 'Organization',
        name: b.author?.name || 'AppMotive Technologies',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />
      <BlogListClient initialBlogs={blogs} />
    </>
  );
}
