/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_name_key" ON "Address"("name");
