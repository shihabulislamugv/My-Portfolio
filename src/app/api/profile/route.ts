import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const defaultProfile = {
  name: "SHIHAB.",
  headlineLine1: "Digital",
  headlineLine2: "experiences",
  shortBio: "Crafting intuitive & engaging interfaces for modern digital products.",
  email: "hello@example.com",
  aboutText: "A passionate UX/UI Designer with 2 years of experience developing live projects and robust case studies at a fast-paced agency.",
  resumeUrl: "",
};

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst();
    return NextResponse.json(profile || defaultProfile);
  } catch (error: any) {
    console.error("Profile GET error:", error);
    return NextResponse.json(defaultProfile);
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const profile = await prisma.profile.upsert({
      where: { id: "1" },
      update: {
        name: body.name,
        headlineLine1: body.headlineLine1,
        headlineLine2: body.headlineLine2,
        shortBio: body.shortBio,
        email: body.email,
        aboutText: body.aboutText,
        resumeUrl: body.resumeUrl,
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

    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
