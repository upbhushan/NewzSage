/*
  Warnings:

  - You are about to drop the column `user_id` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_credibility` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publisher_id]` on the table `user_credibility` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publisher_id` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher_id` to the `user_credibility` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_credibility" DROP CONSTRAINT "user_credibility_user_id_fkey";

-- DropIndex
DROP INDEX "user_credibility_user_id_key";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "user_id",
ADD COLUMN     "downvote_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "publisher_id" INTEGER NOT NULL,
ADD COLUMN     "upvote_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "user_credibility" DROP COLUMN "user_id",
ADD COLUMN     "publisher_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_credibility_publisher_id_key" ON "user_credibility"("publisher_id");

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("publisher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_credibility" ADD CONSTRAINT "user_credibility_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("publisher_id") ON DELETE RESTRICT ON UPDATE CASCADE;
