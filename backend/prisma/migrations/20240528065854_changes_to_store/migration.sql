/*
  Warnings:

  - Changed the type of `storeid` on the `coupon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `createdById` to the `store` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `merchantId` on the `store` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "coupon" DROP CONSTRAINT "coupon_storeid_fkey";

-- DropForeignKey
ALTER TABLE "store" DROP CONSTRAINT "store_merchantId_fkey";

-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "storeid",
ADD COLUMN     "storeid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "store" ADD COLUMN     "createdById" TEXT NOT NULL,
DROP COLUMN "merchantId",
ADD COLUMN     "merchantId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "store_merchantId_key" ON "store"("merchantId");

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("merchantId") ON DELETE RESTRICT ON UPDATE CASCADE;
