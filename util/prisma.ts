import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Avoid instantiating too many instances of Prisma in development
  // https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
