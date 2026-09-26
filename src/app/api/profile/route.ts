import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/check-auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const defaultProfile = {
  name: "SHIHAB.",
  headlineLine1: "Digital",
  headlineLine2: "experiences",
  shortBio: "Crafting intuitive & engaging interfaces for modern digital products.",
  email: "hello@example.com",
  aboutText: "A passionate UX/UI Designer with 2 years of experience developing live projects and robust case studies at a fast-paced agency.",
  resumeUrl: "",
};

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile || defaultProfile, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error("Profile GET error:", error);
    return NextResponse.json(defaultProfile, { headers: noCacheHeaders });
  }
}

export async function POST(req: Request) {
  try {
    const authed = await isAuthenticated(req);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized. Please re-login to your session." }, { status: 401 });
    }

    const body = await req.json();

    const profile = await prisma.profile.upsert({
      where: { id: "1" },
      update: {
        name: body.name || "SHIHAB.",
        headlineLine1: body.headlineLine1 || "Digital",
        headlineLine2: body.headlineLine2 || "experiences",
        shortBio: body.shortBio ?? "",
        email: body.email || "hello@example.com",
        aboutText: body.aboutText ?? "",
        resumeUrl: body.resumeUrl ?? null,
      },
      create: {
        id: "1",
        name: body.name || "SHIHAB.",
        headlineLine1: body.headlineLine1 || "Digital",
        headlineLine2: body.headlineLine2 || "experiences",
        shortBio: body.shortBio || "",
        email: body.email || "hello@example.com",
        aboutText: body.aboutText || "",
        resumeUrl: body.resumeUrl || null,
      }
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath("/about");
      revalidatePath("/admin/profile");
    } catch {}

    return NextResponse.json({ success: true, profile }, { headers: noCacheHeaders });
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500, headers: noCacheHeaders });
  }
}
