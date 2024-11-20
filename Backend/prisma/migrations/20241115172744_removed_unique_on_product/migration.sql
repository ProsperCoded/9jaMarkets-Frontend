-- DropIndex
DROP INDEX "Rating_customerId_productId_key";

-- AlterTable
ALTER TABLE "Market" ALTER COLUMN "description" DROP NOT NULL;
