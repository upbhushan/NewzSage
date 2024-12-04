import React from 'react';
import { motion } from 'framer-motion';
import { Edit, BarChart2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import sampleNews from '../test/SampleNews';
import NewsCard from '../components/NewsCard';

function LandingPage({ isAuthenticated }) {
  return (
    <main className=" py-2">
        <div className='container mx-auto'>
            <SampleNewsSection news={sampleNews} /> {/* Use imported sampleNews */}
            <FeaturesSection />
        </div>
        {!isAuthenticated && <Footer />}
    </main>
  );
}

function Hero({ isAuthenticated }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-4 border-black p-8 my-8 text-center"
    >
      <h2 className="text-4xl font-bold mb-4">Extra! Extra! Read All About It!</h2>
      <p className="text-xl mb-6">Discover the pulse of our community through authentic local stories.</p>
      {isAuthenticated ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white font-bold py-2 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors duration-300"
        >
          <Link to="/home">Start Reading</Link>
        </motion.button>
      ) : (
        <div className="space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white font-bold py-2 px-6 border-2 border-black hover:bg-white hover:text-black transition-colors duration-300"
          >
            <Link to="/signup">Sign Up</Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black font-bold py-2 px-6 border-2 border-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            <Link to="/signin">Sign In</Link>
          </motion.button>
        </div>
      )}
    </motion.section>
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

function SampleNewsSection({ news }) { // New Section for Sample News
    return (
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Sample News</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
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
    <footer className="bg-black text-white py-8 rounded-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">NewzSage</h3>
            <p>Empowering local voices, one story at a time.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
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
export default LandingPage;

