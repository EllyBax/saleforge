/*
  Warnings:

  - You are about to drop the column `name` on the `Inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[item]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `item` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Inventory_name_key";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "name",
ADD COLUMN     "item" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_item_key" ON "Inventory"("item");
