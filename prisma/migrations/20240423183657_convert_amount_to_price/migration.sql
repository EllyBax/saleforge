/*
  Warnings:

  - You are about to drop the column `amount` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `price` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "amount",
ADD COLUMN     "price" MONEY NOT NULL;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "amount",
ADD COLUMN     "price" MONEY NOT NULL;
