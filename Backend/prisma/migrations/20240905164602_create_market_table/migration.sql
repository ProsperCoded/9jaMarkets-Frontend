-- CreateTable
CREATE TABLE "Market" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "emailVerificationCode" TEXT,
    "passwordResetCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Market_email_key" ON "Market"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Market_brandName_key" ON "Market"("brandName");
