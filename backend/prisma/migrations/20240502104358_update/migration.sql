/*
  Warnings:

  - You are about to drop the column `CouponPanchLine` on the `coupon` table. All the data in the column will be lost.
  - Added the required column `CouponPunchLine` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" DROP COLUMN "CouponPanchLine",
ADD COLUMN     "CouponPunchLine" TEXT NOT NULL;
