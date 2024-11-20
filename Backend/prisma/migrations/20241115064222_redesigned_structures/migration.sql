/*
  Warnings:

  - You are about to drop the column `marketId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `brandName` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `displayImage` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationCode` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerifiedAt` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `marketCategories` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetCode` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `PhoneNumber` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `marketId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Delivery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MarketVerification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,merchantId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Market` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Market` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Market` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Market` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MerchantVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MerchantVerificationType" AS ENUM ('BUSINESS_REGISTRATION', 'IDENTITY_VERIFICATION');

-- CreateEnum
CREATE TYPE "MerchantVerificationScope" AS ENUM ('NIN', 'CAC', 'UTILITY_BILL', 'PASSPORT', 'DRIVERS_LICENSE');

-- CreateEnum
CREATE TYPE "MerchantCategory" AS ENUM ('GROCERY', 'PHARMACY', 'RESTAURANT', 'BAKERY', 'CLOTHING', 'ELECTRONICS', 'FURNITURE', 'HARDWARE', 'SPORTS', 'TOYS');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_orderId_fkey";

-- DropForeignKey
ALTER TABLE "MarketVerification" DROP CONSTRAINT "MarketVerification_marketId_fkey";

-- DropForeignKey
ALTER TABLE "PhoneNumber" DROP CONSTRAINT "PhoneNumber_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_marketId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_marketId_fkey";

-- DropIndex
DROP INDEX "Address_name_marketId_idx";

-- DropIndex
DROP INDEX "Address_name_marketId_key";

-- DropIndex
DROP INDEX "Market_brandName_key";

-- DropIndex
DROP INDEX "Market_email_brandName_idx";

-- DropIndex
DROP INDEX "Market_email_key";

-- DropIndex
DROP INDEX "Market_googleId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "marketId",
ADD COLUMN     "merchantId" TEXT;

-- AlterTable
ALTER TABLE "Market" DROP COLUMN "brandName",
DROP COLUMN "displayImage",
DROP COLUMN "email",
DROP COLUMN "emailVerificationCode",
DROP COLUMN "emailVerifiedAt",
DROP COLUMN "googleId",
DROP COLUMN "marketCategories",
DROP COLUMN "password",
DROP COLUMN "passwordResetCode",
DROP COLUMN "refreshToken",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "PhoneNumber" DROP COLUMN "marketId",
ADD COLUMN     "merchantId" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "marketId",
ADD COLUMN     "merchantId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "marketId",
ADD COLUMN     "merchantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Delivery";

-- DropTable
DROP TABLE "MarketVerification";

-- DropEnum
DROP TYPE "DeliveryStatus";

-- DropEnum
DROP TYPE "MarketCategory";

-- DropEnum
DROP TYPE "MarketVerificationScope";

-- DropEnum
DROP TYPE "MarketVerificationStatus";

-- DropEnum
DROP TYPE "MarketVerificationType";

-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "googleId" TEXT,
    "email" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "password" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "emailVerificationCode" TEXT,
    "passwordResetCode" TEXT,
    "displayImage" TEXT,
    "refreshToken" TEXT,
    "merchantCategories" "MerchantCategory"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "marketId" TEXT,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantVerification" (
    "id" TEXT NOT NULL,
    "status" "MerchantVerificationStatus" NOT NULL,
    "type" "MerchantVerificationType" NOT NULL,
    "scope" "MerchantVerificationScope" NOT NULL,
    "document" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "merchantId" TEXT NOT NULL,

    CONSTRAINT "MerchantVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_googleId_key" ON "Merchant"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_brandName_key" ON "Merchant"("brandName");

-- CreateIndex
CREATE INDEX "Merchant_email_brandName_idx" ON "Merchant"("email", "brandName");

-- CreateIndex
CREATE INDEX "Address_name_merchantId_idx" ON "Address"("name", "merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_name_merchantId_key" ON "Address"("name", "merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "Market_name_key" ON "Market"("name");

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhoneNumber" ADD CONSTRAINT "PhoneNumber_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantVerification" ADD CONSTRAINT "MerchantVerification_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
