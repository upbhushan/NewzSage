/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `publishers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `journalism_id` on table `publishers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "publishers" ALTER COLUMN "journalism_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "publishers_user_id_key" ON "publishers"("user_id");
