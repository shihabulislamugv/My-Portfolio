import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const envUrl = process.env.DATABASE_URL;

  // If using SQLite (file:...) or missing, resolve the absolute path
  if (!envUrl || envUrl.startsWith("file:")) {
    const cwd = process.cwd();
    const candidatePaths = [
      path.join(cwd, "prisma", "dev.db"),
      path.join(cwd, "dev.db"),
      path.join(cwd, ".next", "server", "prisma", "dev.db"),
    ];

    const foundPath = candidatePaths.find((p) => fs.existsSync(p)) || candidatePaths[0];
    const absoluteUrl = `file:${foundPath}`;

    return new PrismaClient({
      datasources: {
        db: {
          url: absoluteUrl,
        },
      },
    });
  }

  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
