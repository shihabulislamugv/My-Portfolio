import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const publishedOnly = url.searchParams.get("published") === "true";

    const whereClause = publishedOnly ? { published: true } : {};

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
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

    return new Response(JSON.stringify(project), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
