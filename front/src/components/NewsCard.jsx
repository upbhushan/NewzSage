import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useSetRecoilState } from 'recoil';
import { newsArticlesState } from '../lib/atom';

function NewsCard({ news }) {
  const setNewsArticles = useSetRecoilState(newsArticlesState);

  const handleVote = (isUpvote) => {
    setNewsArticles((prevNews) =>
      prevNews.map((item) =>
        item.id === news.id ? { ...item, votes: item.votes + (isUpvote ? 1 : -1) } : item
      )
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-2 border-black p-6"
    >
      <h3 className="text-xl font-bold mb-2">{news.title}</h3>
      <p className="text-sm mb-4">{news.excerpt}</p>
      <div className="flex justify-between items-center text-sm">
        <span>By {news.author}</span>
        <span>{news.date}</span>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote(true)}
            className="text-black hover:text-gray-700"
          >
            <ThumbsUp size={20} />
          </motion.button>
          <span className="font-bold">{news.votes}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleVote(false)}
            className="text-black hover:text-gray-700"
          >
            <ThumbsDown size={20} />
          </motion.button>
        </div>
        <div className="text-sm font-bold">
          Accuracy: {(news.probability * 100).toFixed(0)}%
        </div>
      </div>
    </motion.article>
  );
}

export default NewsCard;

