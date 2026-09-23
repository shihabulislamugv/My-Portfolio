import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
