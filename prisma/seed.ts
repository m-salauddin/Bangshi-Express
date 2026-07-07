import { PrismaClient, Role } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Seeding started...');

  // =========================
  // Users
  // =========================

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@bangshiexpress.com',
    },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@bangshiexpress.com',
      password: 'asdf098765',
      role: Role.ADMIN,
    },
  });

  const reporter1 = await prisma.user.upsert({
    where: {
      email: 'sakil@bangshiexpress.com',
    },
    update: {},
    create: {
      name: 'Sakil',
      email: 'sakil@bangshiexpress.com',
      password: 'asdf098765',
      role: Role.ADMIN, // REPORTER হলে সেটি ব্যবহার করো
    },
  });

  const reporter2 = await prisma.user.upsert({
    where: {
      email: 'sanowar@bangshiexpress.com',
    },
    update: {},
    create: {
      name: 'Sanowar',
      email: 'sanowar@bangshiexpress.com',
      password: 'asdf098765',
      role: Role.ADMIN,
    },
  });

  // =========================
  // Categories
  // =========================

  const catBangladesh = await prisma.category.upsert({
    where: {
      slug: 'bangladesh',
    },
    update: {},
    create: {
      nameBn: 'বাংলাদেশ',
      nameEn: 'Bangladesh',
      slug: 'bangladesh',
    },
  });

  const catSports = await prisma.category.upsert({
    where: {
      slug: 'sports',
    },
    update: {},
    create: {
      nameBn: 'খেলাধুলা',
      nameEn: 'Sports',
      slug: 'sports',
    },
  });

  const catEntertainment = await prisma.category.upsert({
    where: {
      slug: 'entertainment',
    },
    update: {},
    create: {
      nameBn: 'বিনোদন',
      nameEn: 'Entertainment',
      slug: 'entertainment',
    },
  });

  // =========================
  // District
  // =========================

  let dhaka = await prisma.district.findFirst({
    where: {
      nameEn: 'Dhaka',
    },
  });

  if (!dhaka) {
    dhaka = await prisma.district.create({
      data: {
        nameBn: 'ঢাকা',
        nameEn: 'Dhaka',
      },
    });
  }

  // =========================
  // Upazila
  // =========================

  let savar = await prisma.upazila.findFirst({
    where: {
      nameEn: 'Savar',
    },
  });

  if (!savar) {
    savar = await prisma.upazila.create({
      data: {
        nameBn: 'সাভার',
        nameEn: 'Savar',
        districtId: dhaka.id,
      },
    });
  }

  let dhamrai = await prisma.upazila.findFirst({
    where: {
      nameEn: 'Dhamrai',
    },
  });

  if (!dhamrai) {
    dhamrai = await prisma.upazila.create({
      data: {
        nameBn: 'ধামরাই',
        nameEn: 'Dhamrai',
        districtId: dhaka.id,
      },
    });
  }

  // =========================
  // Union
  // =========================

  let ashulia = await prisma.union.findFirst({
    where: {
      nameEn: 'Ashulia',
    },
  });

  if (!ashulia) {
    await prisma.union.createMany({
      data: [
        {
          nameBn: 'আশুলিয়া',
          nameEn: 'Ashulia',
          upazilaId: savar.id,
        },
        {
          nameBn: 'আমিনবাজার',
          nameEn: 'Aminbazar',
          upazilaId: savar.id,
        },
        {
          nameBn: 'তেঁতুলঝোড়া',
          nameEn: 'Tetuljhora',
          upazilaId: savar.id,
        },
        {
          nameBn: 'ধামসোনা',
          nameEn: 'Dhamsona',
          upazilaId: savar.id,
        },
      ],
    });

    ashulia = await prisma.union.findFirst({
      where: {
        nameEn: 'Ashulia',
      },
    });
  }

  // =========================
  // Demo News
  // =========================

  const newsCount = await prisma.news.count();

  if (newsCount === 0) {
    await prisma.news.createMany({
      data: [
        {
          title: 'সাভারে নতুন আইটি পার্কের উদ্বোধন',
          content: 'Demo Content',
          thumbnail: 'https://placehold.co/800x500',
          categoryId: catBangladesh.id,
          authorId: reporter1.id,
          districtId: dhaka.id,
          upazilaId: savar.id,
          unionId: ashulia?.id ?? null,
          isPublished: true,
          views: 125,
        },
        {
          title: 'ধামরাইয়ে রথযাত্রা অনুষ্ঠিত',
          content: 'Demo Content',
          thumbnail: 'https://placehold.co/800x500',
          categoryId: catBangladesh.id,
          authorId: reporter2.id,
          districtId: dhaka.id,
          upazilaId: dhamrai.id,
          isPublished: true,
          views: 340,
        },
        {
          title: 'সাভারে ফুটবল টুর্নামেন্ট',
          content: 'Demo Content',
          thumbnail: 'https://placehold.co/800x500',
          categoryId: catSports.id,
          authorId: admin.id,
          districtId: dhaka.id,
          upazilaId: savar.id,
          isPublished: true,
          views: 89,
        },
        {
          title: 'সাভারে সিনেমার শুটিং',
          content: 'Demo Content',
          thumbnail: 'https://placehold.co/800x500',
          categoryId: catEntertainment.id,
          authorId: reporter1.id,
          districtId: dhaka.id,
          upazilaId: savar.id,
          isPublished: true,
          views: 512,
        },
      ],
    });

    console.log('✅ Demo news created.');
  } else {
    console.log('ℹ️ Demo news already exists.');
  }

  console.log('✅ Seeding completed successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });