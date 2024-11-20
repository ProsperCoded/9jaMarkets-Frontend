/*
  Warnings:

  - A unique constraint covering the columns `[name,customerId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Address_name_key";

-- CreateIndex
CREATE INDEX "Address_name_customerId_idx" ON "Address"("name", "customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_name_customerId_key" ON "Address"("name", "customerId");
