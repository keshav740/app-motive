import { NextResponse } from 'next/server';
import { getAllBlogs } from '../../../../lib/blogsDb';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'appmotive2026';

function isAuthorized(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '').trim();
  return token === ADMIN_PASSWORD;
}

// GET /api/admin/blogs - Get all blogs including drafts
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const blogs = await getAllBlogs({ publishedOnly: false });
    return NextResponse.json({
      success: true,
      count: blogs.length,
      publishedCount: blogs.filter((b) => b.isPublished).length,
      draftCount: blogs.filter((b) => !b.isPublished).length,
      blogs,
    });
  } catch (error) {
    console.error('API /api/admin/blogs GET error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch admin blogs' }, { status: 500 });
  }
}
