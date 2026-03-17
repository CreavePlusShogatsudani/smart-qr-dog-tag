// Prisma 7: @prisma/adapter-pg を使ったPostgreSQL接続（Supabase対応）
// 公式ドキュメント: https://pris.ly/d/client-constructor

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function buildClient(): PrismaClient {
    const connectionString = process.env.DATABASE_URL!;
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? buildClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
