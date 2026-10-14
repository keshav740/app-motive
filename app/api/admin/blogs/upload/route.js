import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'appmotive2026';

function isAuthorized(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '').trim();
  return token === ADMIN_PASSWORD;
}

export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image') || formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No image file provided.' }, { status: 400 });
    }

    // Validate mime type
    const mimeType = file.type || '';
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!allowedTypes.includes(mimeType.toLowerCase()) && !mimeType.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid file format. Please upload JPG, PNG, WEBP, or SVG.' },
        { status: 400 }
      );
    }

    // Size limit: 10MB
    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(bytes);

    // Ensure /public/blogs exists
    const uploadDir = path.join(process.cwd(), 'public', 'blogs');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean, SEO-friendly file name
    const originalName = file.name || 'image.webp';
    const ext = path.extname(originalName) || '.webp';
    const baseName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^\w-]/g, '')
      .slice(0, 32);
    
    const uniqueFileName = `${baseName || 'blog-image'}-${Date.now()}${ext.toLowerCase()}`;
    const targetFilePath = path.join(uploadDir, uniqueFileName);

    fs.writeFileSync(targetFilePath, buffer);

    const publicUrl = `/blogs/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: bytes.byteLength,
    });
  } catch (error) {
    console.error('Image upload server error:', error);
    return NextResponse.json({ success: false, error: 'Server error processing image upload.' }, { status: 500 });
  }
}
