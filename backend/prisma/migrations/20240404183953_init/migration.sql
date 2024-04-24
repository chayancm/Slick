-- CreateEnum
CREATE TYPE "activetatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryUrl" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "status" "activetatus" NOT NULL DEFAULT 'ACTIVE',
    "dispalyOnHome" "activetatus" NOT NULL DEFAULT 'INACTIVE',
    "dispalyOnHomecoupons" "activetatus" NOT NULL DEFAULT 'INACTIVE',
    "dispalyOnFooter" "activetatus" NOT NULL DEFAULT 'INACTIVE',
    "metaTitle" TEXT NOT NULL,
    "metaKeyword" TEXT NOT NULL,
    "metaCanonical" TEXT NOT NULL,
    "metaSchema" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "activetatus" NOT NULL DEFAULT 'INACTIVE',
    "password" TEXT NOT NULL,
    "department" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE INDEX "Category_categoryName_idx" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");
