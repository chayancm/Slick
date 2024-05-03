/*
  Warnings:

  - Added the required column `publisherName` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupon" ADD COLUMN     "publisherName" TEXT NOT NULL;
