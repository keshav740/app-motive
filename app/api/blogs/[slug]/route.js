import { NextResponse } from 'next/server';
import { getBlogBySlug, getBlogById, updateBlog, deleteBlog } from '../../../../lib/blogsDb';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'appmotive2026';

function isAuthorized(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '').trim();
  return token === ADMIN_PASSWORD;
}

// GET /api/blogs/[slug] - Get blog by slug or ID
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    let blog = await getBlogBySlug(slug, { publishedOnly: false });
    if (!blog) {
      blog = await getBlogById(slug);
    }

    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('API /api/blogs/[slug] GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

// PATCH /api/blogs/[slug] - Update blog by ID or slug
export async function PATCH(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const body = await request.json();

    // Resolve target blog
    let target = await getBlogById(slug);
    if (!target) {
      target = await getBlogBySlug(slug, { publishedOnly: false });
    }
    if (!target) {
      return NextResponse.json({ success: false, error: 'Blog post not found to update' }, { status: 404 });
    }

    const updated = await updateBlog(target._id, body);
    return NextResponse.json({ success: true, result: updated });
  } catch (error) {
    console.error('API /api/blogs/[slug] PATCH error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE /api/blogs/[slug] - Delete blog by ID or slug
export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 });
  }

  try {
    const { slug } = await params;
    let target = await getBlogById(slug);
    if (!target) {
      target = await getBlogBySlug(slug, { publishedOnly: false });
    }
    if (!target) {
      return NextResponse.json({ success: false, error: 'Blog post not found to delete' }, { status: 404 });
    }

    await deleteBlog(target._id);
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('API /api/blogs/[slug] DELETE error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to delete blog' }, { status: 500 });
  }
}
