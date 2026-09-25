import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/check-auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(experiences, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error("Experience GET error:", error);
    return NextResponse.json([], { headers: noCacheHeaders });
  }
}

export async function POST(req: Request) {
  try {
    const authed = await isAuthenticated(req);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noCacheHeaders });
    }

    const body = await req.json();

    const experience = await prisma.experience.create({
      data: {
        role: body.role,
        company: body.company,
        period: body.period,
        description: body.description,
        order: body.order || 0,
      },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/about");
      revalidatePath("/admin/experience");
    } catch {}

    return NextResponse.json({ success: true, experience }, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error("Failed to create experience:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500, headers: noCacheHeaders });
  }
}
