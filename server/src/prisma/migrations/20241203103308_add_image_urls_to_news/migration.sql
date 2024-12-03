/*
  Warnings:

  - You are about to drop the column `fake_probability` on the `news` table. All the data in the column will be lost.
  - The `image_url` column on the `news` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "news" DROP COLUMN "fake_probability",
ADD COLUMN     "video_url" TEXT[],
DROP COLUMN "image_url",
ADD COLUMN     "image_url" TEXT[];
