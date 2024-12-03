/*
  Warnings:

  - You are about to drop the column `image_url` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `news` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "news" DROP COLUMN "image_url",
DROP COLUMN "video_url";

-- CreateTable
CREATE TABLE "image_urls" (
    "image_url_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "news_id" INTEGER NOT NULL,

    CONSTRAINT "image_urls_pkey" PRIMARY KEY ("image_url_id")
);

-- CreateTable
CREATE TABLE "video_urls" (
    "video_url_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "news_id" INTEGER NOT NULL,

    CONSTRAINT "video_urls_pkey" PRIMARY KEY ("video_url_id")
);

-- AddForeignKey
ALTER TABLE "image_urls" ADD CONSTRAINT "image_urls_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("news_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_urls" ADD CONSTRAINT "video_urls_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("news_id") ON DELETE RESTRICT ON UPDATE CASCADE;
