-- CreateTable
CREATE TABLE "genres" (
    "genre_id" SERIAL NOT NULL,
    "genre_name" TEXT NOT NULL,
    "news_id" INTEGER NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("genre_id")
);

-- AddForeignKey
ALTER TABLE "genres" ADD CONSTRAINT "genres_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("news_id") ON DELETE RESTRICT ON UPDATE CASCADE;
