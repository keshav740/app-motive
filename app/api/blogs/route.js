import { NextResponse } from 'next/server';
import { getAllBlogs, createBlog } from '../../../lib/blogsDb';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'appmotive2026';

function isAuthorized(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '').trim();
  return token === ADMIN_PASSWORD;
}

// GET /api/blogs - Public: get all published blogs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search') || '';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : undefined;

    const blogs = await getAllBlogs({
      publishedOnly: true,
      category,
      search,
    });

    const result = limit ? blogs.slice(0, limit) : blogs;
    return NextResponse.json({ success: true, count: result.length, blogs: result });
  } catch (error) {
    console.error('API /api/blogs GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST /api/blogs - Protected: create a new blog
export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const data = await request.json();
    if (!data.title || !data.title.trim()) {
      return NextResponse.json({ success: false, error: 'Blog title is required' }, { status: 400 });
    }

    const created = await createBlog(data);
    return NextResponse.json({ success: true, blog: created }, { status: 201 });
  } catch (error) {
    console.error('API /api/blogs POST error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
