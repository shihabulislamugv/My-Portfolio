import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    const resumeUrl = profile?.resumeUrl;
    const fallbackPath = join(process.cwd(), 'public', 'uploads', 'Md_Shihabul_Islam_Resume.pdf');

    // 1. If it's a Base64 Data URL (e.g. data:application/pdf;base64,...)
    if (resumeUrl && resumeUrl.startsWith('data:')) {
      const parts = resumeUrl.split(',');
      const meta = parts[0];
      const base64Data = parts[1] || '';
      const mimeMatch = meta.match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const fileBuffer = Buffer.from(base64Data, 'base64');

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': 'inline; filename="Md_Shihabul_Islam_Resume.pdf"',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // 2. If it's a relative path in public (e.g. /uploads/...)
    if (resumeUrl && resumeUrl.startsWith('/') && !resumeUrl.startsWith('//')) {
      const filePath = join(process.cwd(), 'public', resumeUrl);
      if (existsSync(filePath)) {
        const fileBuffer = await readFile(filePath);
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="Md_Shihabul_Islam_Resume.pdf"',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }
    }

    // 3. If external URL (http / https)
    if (resumeUrl && (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://'))) {
      return NextResponse.redirect(resumeUrl, 302);
    }

    // 4. Default Fallback file in public/uploads
    if (existsSync(fallbackPath)) {
      const fileBuffer = await readFile(fallbackPath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="Md_Shihabul_Islam_Resume.pdf"',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    return NextResponse.json({ error: 'Resume PDF not found' }, { status: 404 });
  } catch (error) {
    console.error('Error viewing resume:', error);
    return NextResponse.json({ error: 'Failed to display resume' }, { status: 500 });
  }
}
