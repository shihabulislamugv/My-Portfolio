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

    await prisma.experience.delete({
      where: { id },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/about");
      revalidatePath("/admin/experience");
    } catch {}

    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error: any) {
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

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        role: body.role,
        company: body.company,
        period: body.period,
        description: body.description,
        order: body.order,
      },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/about");
      revalidatePath("/admin/experience");
    } catch {}

    return NextResponse.json({ success: true, experience }, { headers: noCacheHeaders });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: noCacheHeaders });
  }
}
