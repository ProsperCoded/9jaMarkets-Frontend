/*
  Warnings:

  - A unique constraint covering the columns `[name,marketId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number,customerId]` on the table `PhoneNumber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number,marketId]` on the table `PhoneNumber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Address_name_marketId_idx" ON "Address"("name", "marketId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_name_marketId_key" ON "Address"("name", "marketId");

-- CreateIndex
CREATE INDEX "PhoneNumber_number_customerId_idx" ON "PhoneNumber"("number", "customerId");

-- CreateIndex
CREATE INDEX "PhoneNumber_number_marketId_idx" ON "PhoneNumber"("number", "marketId");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneNumber_number_customerId_key" ON "PhoneNumber"("number", "customerId");

-- CreateIndex
CREATE UNIQUE INDEX "PhoneNumber_number_marketId_key" ON "PhoneNumber"("number", "marketId");
