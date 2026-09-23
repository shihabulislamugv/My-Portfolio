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

    await prisma.academic.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
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

    const academic = await prisma.academic.update({
      where: { id },
      data: {
        degree: body.degree,
        institution: body.institution,
        period: body.period,
        description: body.description,
        order: body.order !== undefined ? Number(body.order) : undefined,
      },
    });

    return NextResponse.json({ success: true, academic });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  return PATCH(req, props);
}
