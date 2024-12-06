import React, { useState } from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { PiShareFatLight } from 'react-icons/pi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function NewsCard({ news }) {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [votes, setVotes] = useState({
    upvotes: news.upvotes,
    downvotes: news.downvotes,
  });
  const [userVote, setUserVote] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (type) => {
    if (!authUser) {
      alert('Please log in to vote.');
      return;
    }

    setIsVoting(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/vote/change", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          news_id: news.id,
          user_id: authUser.id,
          vote_type: type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { votes: updatedVotes, message } = data;
        setVotes({
          upvotes: updatedVotes.upvote_count,
          downvotes: updatedVotes.downvote_count,
        });

        if (message.includes('updated')) {
          setUserVote(type);
        } else if (message.includes('added')) {
          setUserVote(type);
        } else {
          setUserVote(null);
        }
      } else {
        console.error('Vote Error:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your vote.');
    } finally {
      setIsVoting(false);
    }
  };

  const handleShare = () => {
    const currentUrl = `${window.location.origin}/content/${news.id}`;
    if (navigator.share) {
      navigator
        .share({
          title: news.title,
          text: news.description,
          url: currentUrl,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(news.title)}`;
      window.open(shareUrl, "_blank");
    }
  };

  const handleCardClick = () => {
    console.log(news)
    navigate(`/content/${news.id}`);
  };

  return (
    <div
      className="bg-white text-black rounded-lg p-4 max-w-4xl mx-auto cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div
        className={`grid gap-6 ${
          news.images && news.images.length > 0 ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        <div className="space-y-4">
          {/* Publisher Info */}
          {news.publisher && (
            <div className="flex items-center space-x-4">
              {news.publisher.logoUrl && (
                <img
                  src={news.publisher.logoUrl}
                  alt="Publisher Logo"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div className="text-sm text-gray-700">
                <span className="font-semibold">{news.publisher.name}</span>
                {news.publisher.date && (
                  <>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(news.publisher.date).toLocaleDateString()}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Title */}
          <h2 className="text-xl font-bold">{news.title}</h2>

          {/* Description */}
          <p className="text-gray-800 leading-relaxed">
            {news.description.length > 200
              ? `${news.description.substring(0, 200)}...`
              : news.description}
          </p>
          <div className="mt-4">
          <div className="flex items-center">
      <span className="text-gray-600">Real Probability: </span>
      <span className="font-semibold mr-2">
        {news.probability !== undefined ? `${(news.probability * 100).toFixed(2)}%` : 'N/A'}
      </span>
      {news.probability !== undefined && (
        news.probability > 0.4 ? 
        <FaCheckCircle className="text-black" /> : 
        <FaTimesCircle className="text-black" />
      )}
    </div>

      </div>

          {/* Interaction Buttons */}
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="relative flex items-center bg-gray-500 text-white px-4 py-2 rounded-full space-x-2 group hover:bg-[#272729]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote("upvote");
                }}
                disabled={isVoting}
                className={`${userVote === 'upvote' ? 'text-blue-500' : ''}`}
              >
                <BiUpvote />
              </button>
              <span className="text-sm font-medium">{votes.upvotes}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote("downvote");
                }}
                disabled={isVoting}
                className={`${userVote === 'downvote' ? 'text-red-500' : ''}`}
              >
                <BiDownvote />
              </button>
              <span className="text-sm font-medium">{votes.downvotes}</span>
            </div>
            <div 
              className="relative flex items-center bg-gray-500 text-white px-4 py-2 rounded-full space-x-2 group hover:bg-[#272729]"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/news/${news.id}/comments`);
              }}
            >
              <FaRegComment />
              <span className="text-sm font-medium">{news.comments}</span>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="relative flex items-center bg-gray-500 text-white px-4 py-2 rounded-full space-x-2 group cursor-pointer hover:bg-[#272729]"
            >
              <PiShareFatLight />
              <span className="text-sm font-thin">Share</span>
            </div>
          </div>
        </div>

        {/* Media Carousel */}
        {news.images && news.images.length > 0 && (
          <div
            onClick={(e) => e.stopPropagation()} // Prevent parent onClick
          >
            <Carousel>
              <CarouselContent>
                {news.images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center items-center bg-gray-300 rounded-md"
                  >
                    <img
                      src={image.url}
                      alt={`Media ${index + 1}`}
                      className="max-h-[250px] max-w-full object-contain rounded-md cursor-zoom-in"
                      style={{
                        height: "250px",
                        width: "auto",
                      }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          
        )}
      </div>
      
    </div>
  );
}
