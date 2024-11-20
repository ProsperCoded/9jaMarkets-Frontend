/*
  Warnings:

  - A unique constraint covering the columns `[customerId,productId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Rating_productId_idx" ON "Rating"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_customerId_productId_key" ON "Rating"("customerId", "productId");
