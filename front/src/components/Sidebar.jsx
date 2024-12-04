import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Edit, BarChart2, Eye, Home, PlusCircle, User } from 'lucide-react';

function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-white border-r-2 border-black p-6 min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-6">NewzSage</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center hover:underline">
              <Home className="w-5 h-5 mr-2" />
              Landing Page
            </Link>
          </li>
          <li>
            <Link to="/home" className="flex items-center hover:underline">
              <Edit className="w-5 h-5 mr-2" />
              Community News
            </Link>
          </li>
          <li>
            <Link to="/submit" className="flex items-center hover:underline">
              <PlusCircle className="w-5 h-5 mr-2" />
              Submit News
            </Link>
          </li>
          <li>
            <Link to="/account" className="flex items-center hover:underline">
              <User className="w-5 h-5 mr-2" />
              My Account
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Why NewzSage?</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <Edit className="w-6 h-6 mr-2" />
            <span>Local Voices</span>
          </li>
          <li className="flex items-center">
            <BarChart2 className="w-6 h-6 mr-2" />
            <span>Accuracy Probability</span>
          </li>
          <li className="flex items-center">
            <Eye className="w-6 h-6 mr-2" />
            <span>Community Insight</span>
          </li>
        </ul>
      </div>
    </motion.aside>
  );
}

export default Sidebar;

