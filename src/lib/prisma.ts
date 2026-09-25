import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const envUrl = process.env.DATABASE_URL;

  // If using a remote database (e.g. Postgres, Supabase, Neon), connect directly
  if (envUrl && !envUrl.startsWith("file:")) {
    return new PrismaClient();
  }

  // SQLite resolution
  const cwd = process.cwd();
  const candidatePaths = [
    path.join(cwd, "prisma", "dev.db"),
    path.join(cwd, "dev.db"),
    path.join(cwd, ".next", "server", "prisma", "dev.db"),
  ];

  const foundPath = candidatePaths.find((p) => fs.existsSync(/*turbopackIgnore: true*/ p)) || candidatePaths[0];

  // In AWS Lambda / Vercel Serverless Functions, /var/task is strictly read-only.
  // SQLite write operations will fail with "attempt to write a readonly database"
  // unless the database file resides in /tmp (the only writable filesystem area).
  let resolvedPath = foundPath;
  const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

  if (isServerless) {
    const tmpDbPath = path.join("/tmp", "dev.db");
    try {
      if (!fs.existsSync(/*turbopackIgnore: true*/ tmpDbPath) && fs.existsSync(/*turbopackIgnore: true*/ foundPath)) {
        fs.copyFileSync(/*turbopackIgnore: true*/ foundPath, tmpDbPath);
        try {
          fs.chmodSync(tmpDbPath, 0o666);
        } catch {
          // ignore chmod errors
        }
      }
      if (fs.existsSync(tmpDbPath)) {
        resolvedPath = tmpDbPath;
      }
    } catch (err) {
      console.error("Error preparing SQLite in /tmp:", err);
    }
  }

  const absoluteUrl = `file:${resolvedPath}`;

  return new PrismaClient({
    datasources: {
      db: {
        url: absoluteUrl,
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
