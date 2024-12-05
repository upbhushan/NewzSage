import React from 'react';
import { motion } from 'framer-motion';
import { Edit, BarChart2, Eye } from 'lucide-react';
import { useNews } from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import { Skeleton } from "@/components/ui/skeleton"
import Sidebar from '@/components/Sidebar';



function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white border border-gray-800 p-6 rounded-lg text-black"
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-center text-gray-700">{description}</p>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">Why NewzSage?</h2>
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

export default function LandingPage() {
  const { news, loading, error } = useNews();

  return (
    <>
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center text-black"><Skeleton className="w-[100px] h-[20px] rounded-full" /></div>
        ) : error ? (
          <div className="text-center text-red-500">{error.message}</div>
        ) : (
          <div className="space-y-6">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
        <FeaturesSection />
      </div>
      { <Footer />}
    </main>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1A1A1B] text-gray-400 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 NewzSage. All rights reserved.</p>
      </div>
    </footer>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}