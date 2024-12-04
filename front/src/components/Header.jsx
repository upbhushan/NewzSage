import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
          <Link to="/">NewzSage</Link>
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
          <li><Link to="/home" className="hover:underline">Home</Link></li>
          <li><Link to="/local" className="hover:underline">Local</Link></li>
          <li><Link to="/opinion" className="hover:underline">Opinion</Link></li>
          <li><Link to="/sports" className="hover:underline">Sports</Link></li>
          <li><Link to="/weather" className="hover:underline">Weather</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

