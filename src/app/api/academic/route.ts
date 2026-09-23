import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const academics = await prisma.academic.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(academics);
  } catch (error: any) {
    console.error("Academic GET error:", error);
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

    const academic = await prisma.academic.create({
      data: {
        degree: body.degree,
        institution: body.institution,
        period: body.period,
        description: body.description || "",
        order: Number(body.order) || 0,
      },
    });

    return NextResponse.json({ success: true, academic });
  } catch (error: any) {
    console.error("Failed to create academic entry:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
