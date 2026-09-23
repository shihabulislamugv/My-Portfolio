import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(experiences);
  } catch (error: any) {
    console.error("Experience GET error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    return NextResponse.json({ success: true, experience });
  } catch (error: any) {
    console.error("Failed to create experience:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
