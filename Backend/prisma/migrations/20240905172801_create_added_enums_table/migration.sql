/*
  Warnings:

  - Added the required column `status` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `MarketVerification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `MarketVerification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `MarketVerification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MarketVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MarketVerificationType" AS ENUM ('BUSINESS_REGISTRATION', 'IDENTITY_VERIFICATION');

-- CreateEnum
CREATE TYPE "MarketVerificationScope" AS ENUM ('NIN', 'CAC', 'UTILITY_BILL', 'PASSPORT', 'DRIVERS_LICENSE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('ELECTRONICS', 'FASHION', 'FOOD', 'HEALTH', 'HOME', 'SPORTS', 'TOYS');

-- CreateEnum
CREATE TYPE "MarketCategory" AS ENUM ('GROCERY', 'PHARMACY', 'RESTAURANT', 'BAKERY', 'CLOTHING', 'ELECTRONICS', 'FURNITURE', 'HARDWARE', 'SPORTS', 'TOYS');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PICKED_UP', 'DELIVERED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "status" "DeliveryStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Market" ADD COLUMN     "marketCategories" "MarketCategory"[];

-- AlterTable
ALTER TABLE "MarketVerification" ADD COLUMN     "scope" "MarketVerificationScope" NOT NULL,
ADD COLUMN     "status" "MarketVerificationStatus" NOT NULL,
ADD COLUMN     "type" "MarketVerificationType" NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "ProductCategory" NOT NULL;
