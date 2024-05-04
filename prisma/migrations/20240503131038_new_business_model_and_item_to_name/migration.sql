/*
  Warnings:

  - You are about to drop the column `businessDescription` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `businessName` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `businessType` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `name` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "businessDescription",
DROP COLUMN "businessName",
DROP COLUMN "businessType",
DROP COLUMN "product",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "productName",
ADD COLUMN     "product" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "item",
ADD COLUMN     "product" TEXT NOT NULL;
