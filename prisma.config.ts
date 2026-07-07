import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
  // নতুন আপডেটে সিড কমান্ড এখানে দিতে হয়
  migrations: {
    seed: 'npx ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});