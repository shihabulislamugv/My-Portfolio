import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

interface CachedResume {
  buffer: Buffer;
  mimeType: string;
  etag: string;
  timestamp: number;
}

let memoryCache: CachedResume | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes in-memory cache

export async function GET(req: NextRequest) {
  try {
    const ifNoneMatch = req.headers.get('if-none-match');

    // 1. Serve from in-memory cache if valid
    if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
      if (ifNoneMatch && ifNoneMatch === memoryCache.etag) {
        return new NextResponse(null, {
          status: 304,
          headers: {
            'ETag': memoryCache.etag,
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
        });
      }

      return new NextResponse(memoryCache.buffer as unknown as BodyInit, {
        headers: {
          'Content-Type': memoryCache.mimeType,
          'Content-Disposition': 'inline; filename="Md_Shihabul_Islam_Resume.pdf"',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          'ETag': memoryCache.etag,
        },
      });
    }

    // 2. Lookup profile from DB or fallback
    let resumeUrl: string | null = null;
    try {
      const profile = await prisma.profile.findFirst();
      resumeUrl = profile?.resumeUrl || null;
    } catch (e) {
      console.warn('Prisma lookup failed, falling back to static resume:', e);
    }

    const fallbackPath = join(process.cwd(), 'public', 'uploads', 'Md_Shihabul_Islam_Resume.pdf');

    // A. Base64 Data URL
    if (resumeUrl && resumeUrl.startsWith('data:')) {
      const parts = resumeUrl.split(',');
      const meta = parts[0];
      const base64Data = parts[1] || '';
      const mimeMatch = meta.match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const fileBuffer = Buffer.from(base64Data, 'base64');
      const etag = `"${fileBuffer.length}-${Date.now()}"`;

      memoryCache = { buffer: fileBuffer, mimeType, etag, timestamp: Date.now() };

      return new NextResponse(fileBuffer as unknown as BodyInit, {
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': 'inline; filename="Md_Shihabul_Islam_Resume.pdf"',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          'ETag': etag,
        },
      });
    }

    // B. Relative path in public/
    if (resumeUrl && resumeUrl.startsWith('/') && !resumeUrl.startsWith('//')) {
      const filePath = join(process.cwd(), 'public', resumeUrl);
      if (existsSync(filePath)) {
        const [fileBuffer, fileStat] = await Promise.all([readFile(filePath), stat(filePath)]);
        const etag = `"${fileStat.size}-${Math.floor(fileStat.mtimeMs)}"`;

        memoryCache = { buffer: fileBuffer, mimeType: 'application/pdf', etag, timestamp: Date.now() };

        if (ifNoneMatch && ifNoneMatch === etag) {
          return new NextResponse(null, {
            status: 304,
            headers: {
              'ETag': etag,
              'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
            },
          });
        }

        return new NextResponse(fileBuffer as unknown as BodyInit, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="Md_Shihabul_Islam_Resume.pdf"',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
            'ETag': etag,
          },
        });
      }
    }

    // C. External URL
    if (resumeUrl && (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://'))) {
      return NextResponse.redirect(resumeUrl, 302);
    }

    // D. Default fallback file
    if (existsSync(fallbackPath)) {
      const [fileBuffer, fileStat] = await Promise.all([readFile(fallbackPath), stat(fallbackPath)]);
      const etag = `"${fileStat.size}-${Math.floor(fileStat.mtimeMs)}"`;

      memoryCache = { buffer: fileBuffer, mimeType: 'application/pdf', etag, timestamp: Date.now() };

      if (ifNoneMatch && ifNoneMatch === etag) {
        return new NextResponse(null, {
          status: 304,
          headers: {
            'ETag': etag,
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          },
        });
      }

      return new NextResponse(fileBuffer as unknown as BodyInit, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="Md_Shihabul_Islam_Resume.pdf"',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          'ETag': etag,
        },
      });
    }

    return NextResponse.json({ error: 'Resume PDF not found' }, { status: 404 });
  } catch (error) {
    console.error('Error viewing resume:', error);
    return NextResponse.json({ error: 'Failed to display resume' }, { status: 500 });
  }
}
