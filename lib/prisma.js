import { PrismaClient } from "@prisma/client";

/**
 * Prisma Client singleton
 * Ensures only one instance of PrismaClient is created across the app
 * This prevents connection pool exhaustion in development
 */
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
