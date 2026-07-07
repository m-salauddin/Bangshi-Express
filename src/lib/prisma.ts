import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

// 💥 Supabase-এর জন্য SSL (Secure) অপশনটি চালু করা হলো
const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false, // এটি লোকাল মেশিনে Supabase এর সাথে কানেক্ট করতে সাহায্য করে
  }
});

const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;