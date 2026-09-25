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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await isAuthenticated(req);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noCacheHeaders });
    }

    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/projects");
      revalidatePath("/admin/projects");
    } catch {}

    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: noCacheHeaders });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await isAuthenticated(req);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: noCacheHeaders });
    }

    const { id } = await params;
    const body = await req.json();

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        thumbnail: body.thumbnail,
        role: body.role,
        timeline: body.timeline,
        problem: body.problem,
        solution: body.solution,
        externalLink: body.externalLink,
        caseStudy: body.caseStudy,
        published: body.published,
      },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/projects");
      if (project.slug) revalidatePath(`/projects/${project.slug}`);
      revalidatePath("/admin/projects");
    } catch {}

    return NextResponse.json({ success: true, project }, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500, headers: noCacheHeaders });
  }
}
