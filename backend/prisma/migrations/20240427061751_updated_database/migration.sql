/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "activestatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "currentRoles" AS ENUM ('USER', 'ADMIN', 'EDITOR');

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "admin";

-- DropEnum
DROP TYPE "activetatus";

-- CreateTable
CREATE TABLE "category" (
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryUrl" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "status" "activestatus" NOT NULL,
    "displayOnHome" "activestatus" NOT NULL,
    "displayOnHomecoupons" "activestatus" NOT NULL,
    "displayOnFooter" "activestatus" NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaKeyword" TEXT NOT NULL,
    "metaCanonical" TEXT NOT NULL,
    "metaSchema" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "activestatus" NOT NULL DEFAULT 'ACTIVE',
    "password" TEXT NOT NULL,
    "department" TEXT,
    "token" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "roles" "currentRoles" NOT NULL DEFAULT 'USER',
    "userId" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expirationTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "storeid" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "storeAlternateName" TEXT NOT NULL,
    "storeUrl" TEXT NOT NULL,
    "storeLogo" TEXT NOT NULL,
    "TrackingLink" TEXT NOT NULL,
    "storeDomainName" TEXT NOT NULL,
    "utmParameter" TEXT NOT NULL,
    "status" "activestatus" NOT NULL,
    "displayOnMenu" "activestatus" NOT NULL,
    "displayOnNotificaton" "activestatus" NOT NULL,
    "topStore" "activestatus" NOT NULL,
    "topStoreInFooter" "activestatus" NOT NULL,
    "storeDescription" TEXT NOT NULL,
    "metaTitle" TEXT NOT NULL,
    "metaKeyword" TEXT NOT NULL,
    "metaCanonical" TEXT NOT NULL,
    "metaSchema" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,

    CONSTRAINT "store_pkey" PRIMARY KEY ("storeid")
);

-- CreateTable
CREATE TABLE "coupon" (
    "couponId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "cashbackType" TEXT NOT NULL,
    "minOff" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "expirationTime" TIMESTAMP(3) NOT NULL,
    "couponCode" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "MerchantLink" TEXT NOT NULL,
    "affiliateUrl" TEXT NOT NULL,
    "termsAndConditions" TEXT NOT NULL,
    "CouponPanchLine" TEXT NOT NULL,
    "status" "activestatus" NOT NULL,
    "topOffer" "activestatus" NOT NULL,
    "hotOfTheDay" "activestatus" NOT NULL,
    "showWithCategory" "activestatus" NOT NULL,
    "description" TEXT NOT NULL,
    "storeid" TEXT NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("couponId")
);

-- CreateTable
CREATE TABLE "_categoryTostore" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_categoryTocoupon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "category_categoryName_key" ON "category"("categoryName");

-- CreateIndex
CREATE INDEX "category_categoryName_idx" ON "category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "token_token_key" ON "token"("token");

-- CreateIndex
CREATE INDEX "token_token_idx" ON "token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "store_storeName_key" ON "store"("storeName");

-- CreateIndex
CREATE INDEX "store_storeName_idx" ON "store"("storeName");

-- CreateIndex
CREATE UNIQUE INDEX "_categoryTostore_AB_unique" ON "_categoryTostore"("A", "B");

-- CreateIndex
CREATE INDEX "_categoryTostore_B_index" ON "_categoryTostore"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_categoryTocoupon_AB_unique" ON "_categoryTocoupon"("A", "B");

-- CreateIndex
CREATE INDEX "_categoryTocoupon_B_index" ON "_categoryTocoupon"("B");

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store" ADD CONSTRAINT "store_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_storeid_fkey" FOREIGN KEY ("storeid") REFERENCES "store"("storeid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTostore" ADD CONSTRAINT "_categoryTostore_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTostore" ADD CONSTRAINT "_categoryTostore_B_fkey" FOREIGN KEY ("B") REFERENCES "store"("storeid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTocoupon" ADD CONSTRAINT "_categoryTocoupon_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categoryTocoupon" ADD CONSTRAINT "_categoryTocoupon_B_fkey" FOREIGN KEY ("B") REFERENCES "coupon"("couponId") ON DELETE CASCADE ON UPDATE CASCADE;
