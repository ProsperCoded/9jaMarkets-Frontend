-- CreateIndex
CREATE INDEX "Customer_email_idx" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Market_email_brandName_idx" ON "Market"("email", "brandName");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");
