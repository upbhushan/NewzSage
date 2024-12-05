import React from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { PiShareFatLight } from 'react-icons/pi';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from 'react-router-dom';

export default function NewsCard({ news }) {
  const navigate = useNavigate();

  const [votes, setVotes] = useState({
    upvotes: news.upvotes,
    downvotes: news.downvotes,
  });

  const handleVote = (type) => {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleShare = () => {
    const currentUrl = `${window.location.href}/content/${news.id}`;
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
    navigate(`/content/${news.id}`);
  };

  return (
    <div
      className="bg-white text-black rounded-lg p-4 max-w-4xl mx-auto cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleCardClick}
    >
      <div
        className={`grid gap-6 ${
          news.media && news.media.length > 0 ? "md:grid-cols-2" : "grid-cols-1"
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

          {/* Interaction Buttons */}
          <div className="flex items-center space-x-2 text-gray-400">
            <div className="relative flex items-center bg-gray-500 text-white px-4 py-2 rounded-full space-x-2 group hover:bg-[#272729]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote("upvotes");
                }}
              >
                <BiUpvote />
              </button>
              <span className="text-sm font-medium">{votes.upvotes}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote("downvotes");
                }}
              >
                <BiDownvote />
              </button>
              <span className="text-sm font-medium">{votes.downvotes}</span>
            </div>
            <div className="relative flex items-center bg-gray-500 text-white px-4 py-2 rounded-full space-x-2 group hover:bg-[#272729]">
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
        {news.media && news.media.length > 0 && (
          <div
            onClick={(e) => e.stopPropagation()} // Prevent parent onClick
          >
            <Carousel>
              <CarouselContent>
                {news.media.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center items-center bg-gray-300 rounded-md"
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        alt={`Media ${index + 1}`}
                        className="max-h-[250px] max-w-full object-contain rounded-md cursor-zoom-in"
                        style={{
                          height: "250px",
                          width: "auto",
                        }}
                      />
                    ) : item.type === "video" ? (
                      <video
                        controls
                        className="rounded-md cursor-pointer"
                        style={{
                          height: "250px",
                          width: "1200px",
                          objectFit: "contain",
                        }}
                        src={item.url}
                      />
                    ) : null}
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
