/*
  Warnings:

  - A unique constraint covering the columns `[productId,customerId]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PhoneNumber_number_customerId_idx";

-- DropIndex
DROP INDEX "PhoneNumber_number_customerId_key";

-- DropIndex
DROP INDEX "PhoneNumber_number_marketId_idx";

-- DropIndex
DROP INDEX "PhoneNumber_number_marketId_key";

-- CreateIndex
CREATE UNIQUE INDEX "CartProduct_productId_customerId_key" ON "CartProduct"("productId", "customerId");
