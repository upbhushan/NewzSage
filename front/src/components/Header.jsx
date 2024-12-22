import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header() {
  return (
    <header className="bg-white border-b-4 ">
      <div className="container mx-auto px-4 py-6">
      <Logo />
      </div>
      
    </header>
  );
}
export default Header;

