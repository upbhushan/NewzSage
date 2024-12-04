import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header() {
  return (
    <header className="bg-white border-b-4 border-black">
      <div className="container mx-auto px-4 py-6">
      <Logo />
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

