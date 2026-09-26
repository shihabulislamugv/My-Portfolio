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

    if (!resumeUrl) {
      // Fallback check if default resume exists
      const fallbackPath = join(process.cwd(), 'public', 'uploads', 'Md_Shihabul_Islam_Resume.pdf');
      if (existsSync(fallbackPath)) {
        const fileBuffer = await readFile(fallbackPath);
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Md_Shihabul_Islam_Resume.pdf"',
          },
        });
      }
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // If it's a Base64 Data URL (e.g. data:application/pdf;base64,...)
    if (resumeUrl.startsWith('data:')) {
      const parts = resumeUrl.split(',');
      const meta = parts[0];
      const base64Data = parts[1] || '';
      const mimeMatch = meta.match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const fileBuffer = Buffer.from(base64Data, 'base64');

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': 'attachment; filename="Md_Shihabul_Islam_Resume.pdf"',
        },
      });
    }

    // If it's a relative path in public (e.g. /uploads/...)
    if (resumeUrl.startsWith('/')) {
      const filePath = join(process.cwd(), 'public', resumeUrl);
      if (existsSync(filePath)) {
        const fileBuffer = await readFile(filePath);
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Md_Shihabul_Islam_Resume.pdf"',
          },
        });
      }
    }

    // If external URL (http / https)
    if (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://')) {
      return NextResponse.redirect(resumeUrl, 302);
    }

    // Fallback
    const fallbackPath = join(process.cwd(), 'public', 'uploads', 'Md_Shihabul_Islam_Resume.pdf');
    if (existsSync(fallbackPath)) {
      const fileBuffer = await readFile(fallbackPath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="Md_Shihabul_Islam_Resume.pdf"',
        },
      });
    }

    return NextResponse.json({ error: 'Resume file not found' }, { status: 404 });
  } catch (error) {
    console.error('Error downloading resume:', error);
    return NextResponse.json({ error: 'Download failed' }, { status: 500 });
  }
}
