import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { newsArticlesState } from '../lib/atom';

function SubmitNews() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const setNewsArticles = useSetRecoilState(newsArticlesState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: Date.now(),
      title,
      excerpt,
      author: 'Anonymous', // You can add user authentication later
      date: new Date().toLocaleDateString(),
      votes: 0,
      probability: Math.random(), // This should be replaced with an actual AI-based probability
    };
    setNewsArticles((prevArticles) => [...prevArticles, newArticle]);
    setTitle('');
    setExcerpt('');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-4 border-black p-8 my-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Submit News</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-black text-white font-bold py-2 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors duration-300"
          >
            Submit News
          </motion.button>
        </form>
      </motion.div>
    </main>
  );
}

export default SubmitNews;

