import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
      // Try writing to public/uploads (local development or persistent server)
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filepath = join(uploadDir, filename);

      await writeFile(filepath, buffer);
      return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (fsError: any) {
      // Fallback for Vercel / serverless environment with read-only filesystem (EROFS)
      console.warn('Filesystem write not allowed on serverless platform, using Data URL fallback:', fsError?.message);
      const mimeType = file.type || 'application/octet-stream';
      const base64Url = `data:${mimeType};base64,${buffer.toString('base64')}`;
      return NextResponse.json({ success: true, url: base64Url });
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Upload failed' }, { status: 500 });
  }
}
