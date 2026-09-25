import { isAuthenticated } from "@/lib/check-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const publishedOnly = url.searchParams.get("published") === "true";

    const whereClause = publishedOnly ? { published: true } : {};

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(projects, { headers: noCacheHeaders });
  } catch (error) {
    console.error("Projects GET error:", error);
    return NextResponse.json([], { headers: noCacheHeaders });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authed = await isAuthenticated(req);
    
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noCacheHeaders });
    }

    const body = await req.json();
    const { 
      title, slug, description, thumbnail, 
      role, timeline, problem, solution, 
      externalLink, caseStudy, published 
    } = body;

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        thumbnail: thumbnail || null,
        role: role || null,
        timeline: timeline || null,
        problem: problem || null,
        solution: solution || null,
        externalLink: externalLink || null,
        caseStudy: caseStudy || null,
        published: Boolean(published),
      }
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/projects");
      revalidatePath(`/projects/${slug}`);
      revalidatePath("/admin/projects");
    } catch {}

    return NextResponse.json(project, { status: 201, headers: noCacheHeaders });
  } catch (error: any) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500, headers: noCacheHeaders });
  }
}
