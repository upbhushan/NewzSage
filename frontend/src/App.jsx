'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Edit, Eye, BarChart2 } from 'lucide-react';

// Dummy data
const dummyNews = [
  {
    id: 1,
    title: 'Local Festival Draws Record Crowd',
    excerpt: 'The annual Harvest Moon Festival saw unprecedented attendance this year, with over 10,000 visitors...',
    author: 'Jane Doe',
    date: 'May 15, 1923',
    votes: 120,
    probability: 0.95,
  },
  {
    id: 2,
    title: 'New Park to Open Next Month',
    excerpt: 'City officials announced the grand opening of Willow Creek Park, set to become the largest green space...',
    author: 'John Smith',
    date: 'May 14, 1923',
    votes: 85,
    probability: 0.88,
  },
  {
    id: 3,
    title: 'City Council Approves Budget',
    excerpt: 'In a late-night session, the City Council voted 7-2 to approve the annual budget, with key allocations...',
    author: 'Alice Johnson',
    date: 'May 13, 1923',
    votes: 62,
    probability: 0.92,
  },
];

export default function NewspaperLanding() {
  const [news, setNews] = useState(dummyNews);

  const handleVote = (id, isUpvote) => {
    setNews((prevNews) =>
      prevNews.map((item) =>
        item.id === id ? { ...item, votes: item.votes + (isUpvote ? 1 : -1) } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-serif">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <NewsSection news={news} onVote={handleVote} />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-white border-b-4 border-black">
      <div className="container mx-auto px-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold text-center"
        >
          NewzSage
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-xl mt-2"
        >
          The Voice of Our Community Since 1900
        </motion.p>
      </div>
      <nav className="bg-black text-white py-2">
        <ul className="flex justify-center space-x-6">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Local</a></li>
          <li><a href="#" className="hover:underline">Opinion</a></li>
          <li><a href="#" className="hover:underline">Sports</a></li>
          <li><a href="#" className="hover:underline">Weather</a></li>
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-4 border-black p-8 my-8 text-center"
    >
      <h2 className="text-4xl font-bold mb-4">Extra! Extra! Read All About It!</h2>
      <p className="text-xl mb-6">Discover the pulse of our community through authentic local stories.</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-black text-white font-bold py-2 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors duration-300"
      >
        Start Reading
      </motion.button>
    </motion.section>
  );
}

function NewsSection({ news, onVote }) {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Headlines</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} onVote={onVote} />
        ))}
      </div>
    </section>
  );
}

function NewsCard({ news, onVote }) {
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
            onClick={() => onVote(news.id, true)}
            className="text-black hover:text-gray-700"
          >
            <ThumbsUp size={20} />
          </motion.button>
          <span className="font-bold">{news.votes}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onVote(news.id, false)}
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

function FeaturesSection() {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Why NewzSage?</h2>
      <div className="grid gap-8 md:grid-cols-3">
        <FeatureCard
          icon={<Edit className="w-12 h-12" />}
          title="Local Voices"
          description="Empower local publishers to share their stories and perspectives."
        />
        <FeatureCard
          icon={<BarChart2 className="w-12 h-12" />}
          title="Accuracy Probability"
          description="Our AI-powered system estimates the likelihood of news accuracy."
        />
        <FeatureCard
          icon={<Eye className="w-12 h-12" />}
          title="Community Insight"
          description="Upvote and downvote features allow readers to contribute to news credibility."
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white border-2 border-black p-6"
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-center">{description}</p>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">NewzSage</h3>
            <p>Empowering local voices, one story at a time.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <p>Stay connected with our community.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
