import React from 'react';
import { useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import { sortedNewsArticlesState } from '../lib/atom';
import NewsCard from '../components/NewsCard';

function Home() {
  const news = useRecoilValue(sortedNewsArticlesState);

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Latest Community News
      </motion.h1>
      <NewsSection news={news} />
    </main>
  );
}

function NewsSection({ news }) {
  return (
    <section className="my-12">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
}

export default Home;

