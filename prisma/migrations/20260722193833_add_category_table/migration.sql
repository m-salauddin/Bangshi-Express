/*
  Warnings:

  - You are about to drop the column `linkUrl` on the `Advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `placement` on the `Advertisement` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Union` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Upazila` table. All the data in the column will be lost.
  - Added the required column `position` to the `Advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameBn` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameBn` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `District` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameBn` to the `Union` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Union` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameBn` to the `Upazila` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Upazila` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Union" DROP CONSTRAINT "Union_upazilaId_fkey";

-- DropForeignKey
ALTER TABLE "Upazila" DROP CONSTRAINT "Upazila_districtId_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "District_name_key";

-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "linkUrl",
DROP COLUMN "placement",
ADD COLUMN     "buttonText" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "link" TEXT,
ADD COLUMN     "newsId" TEXT,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "nameBn" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "District" DROP COLUMN "name",
ADD COLUMN     "nameBn" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "reporterName" TEXT,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "tags" TEXT;

-- AlterTable
ALTER TABLE "Union" DROP COLUMN "name",
ADD COLUMN     "nameBn" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Upazila" DROP COLUMN "name",
ADD COLUMN     "nameBn" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Upazila" ADD CONSTRAINT "Upazila_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Union" ADD CONSTRAINT "Union_upazilaId_fkey" FOREIGN KEY ("upazilaId") REFERENCES "Upazila"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
