import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, BarChart2, Eye, Home, PlusCircle, User } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

function Sidebar() {
  return (
    <ScrollArea className="w-64 bg-white border-r-2 border-black p-6 min-h-screen">
      <div>
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
              <Link to="/sharevoice" className="flex items-center hover:underline">
                <PlusCircle className="w-5 h-5 mr-2" />
                Share voice
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
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
            <li><Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Why NewzSage?</h3>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Link to="/staticvoice" className="flex items-center">
                <Edit className="w-6 h-6 mr-2" />
                <span>Local Voices</span>
              </Link>
            </li>
            <li className="flex items-center">
              <Link to="/accuracyprobability" className="flex items-center">
                <BarChart2 className="w-6 h-6 mr-2" />
                <span>Accuracy Probability</span>
              </Link>
            </li>
            <li className="flex items-center">
              <Link to="/communityInsights" className="flex items-center">
                <Eye className="w-6 h-6 mr-2" />
                <span>Community Insight</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Sidebar;
