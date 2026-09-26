import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "./auth";
import type { NextRequest } from "next/server";

export async function isAuthenticated(req?: Request | NextRequest): Promise<boolean> {
  const secret = process.env.NEXTAUTH_SECRET || "supersecretstring1234567890abcdef";

  // 1. Attempt standard getServerSession
  try {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      return true;
    }
  } catch (err) {
    // fall through to token check
  }

  // 2. Direct token verification from request headers / cookies
  if (req) {
    try {
      // Try secure cookie (HTTPS / production)
      const tokenSecure = await getToken({
        req: req as any,
        secret,
        secureCookie: true,
      });
      if (tokenSecure) return true;

      // Try non-secure cookie (HTTP / localhost)
      const tokenInsecure = await getToken({
        req: req as any,
        secret,
        secureCookie: false,
      });
      if (tokenInsecure) return true;

      // Try default auto-detected cookie
      const tokenAuto = await getToken({
        req: req as any,
        secret,
      });
      if (tokenAuto) return true;
    } catch (err) {
      // fall through
    }
  }

  return false;
}
