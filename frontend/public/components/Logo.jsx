// src/components/Logo.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Logo() {
  return (
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
  );
}

export default Logo;