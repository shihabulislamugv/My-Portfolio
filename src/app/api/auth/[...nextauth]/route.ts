import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "supersecretstring1234567890abcdef";
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
