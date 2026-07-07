import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ১. ডাটাবেজ লিংক দিয়ে একটি পুল (Pool) তৈরি করছি
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ২. পুলটিকে প্রিজমা অ্যাডাপ্টারে যুক্ত করছি
const adapter = new PrismaPg(pool);

// ৩. নতুন নিয়মে অ্যাডাপ্টার দিয়ে PrismaClient তৈরি করছি
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;