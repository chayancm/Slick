/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `coupon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[merchantId]` on the table `store` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "coupon" DROP CONSTRAINT "coupon_storeid_fkey";

-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "imageUrl";

-- CreateIndex
CREATE UNIQUE INDEX "store_merchantId_key" ON "store"("merchantId");

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("merchantId") ON DELETE RESTRICT ON UPDATE CASCADE;
