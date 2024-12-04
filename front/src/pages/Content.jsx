import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { IoArrowBackOutline } from "react-icons/io5"; // Import back icon
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function Content() {
    const [zoomedImage, setZoomedImage] = useState(null);

    const newsData = {
        id: "1",
        title: "Breaking News: React is Awesome!",
        description:
            "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
        media: [
            { type: "image", url: "https://picsum.photos/id/237/200/300" },
            { type: "image", url: "https://picsum.photos/seed/picsum/200/300" },
            { type: "image", url: "https://picsum.photos/200/300/?blur" },
            { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        ],
        upvotes: 123,
        downvotes: 45,
        publisher: {
            name: "TechNews Daily",
            date: "2024-12-01",
            logoUrl: "https://picsum.photos/id/237/200/300", // Add publisher logo if available
        },
    };

    const initialComments = [
        {
            text: "This is amazing news!",
            author: "Alice",
            date: "2024-12-03T10:15:00Z",
        },
        {
            text: "I couldn't agree more.",
            author: "Bob",
            date: "2024-12-03T12:30:00Z",
        },
    ];

    const [votes, setVotes] = useState({
        upvotes: newsData.upvotes,
        downvotes: newsData.downvotes,
    });
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");

    const handleVote = (type) => {
        setVotes((prev) => ({
            ...prev,
            [type]: prev[type] + 1,
        }));
    };

    const handleZoom = (imageUrl) => {
        setZoomedImage(imageUrl);
    };

    const closeZoom = () => {
        setZoomedImage(null);
    };

    const handleShare = () => {
        const currentUrl = window.location.href;
        if (navigator.share) {
            navigator
                .share({
                    title: newsData.title,
                    text: newsData.description,
                    url: currentUrl,
                })
                .catch((error) => console.log("Error sharing:", error));
        } else {
            const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl
            )}&text=${encodeURIComponent(newsData.title)}`;
            window.open(shareUrl, "_blank");
        }
    };

    const handlePostComment = async () => {
        if (newComment.trim() === "") {
            alert("Comment cannot be empty.");
            return;
        }

        const newCommentObject = {
            text: newComment,
            author: "You",
            date: new Date().toISOString(),
        };

        await new Promise((resolve) => setTimeout(resolve, 500));

        setComments((prev) => [...prev, newCommentObject]);
        setNewComment("");
    };

    const handleGoBack = () => {
        window.history.back(); // Go back to the previous page
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
                {/* Back Button and Publisher Info */}
                <div className="flex items-center space-x-4 mb-4">
                    <button onClick={handleGoBack} className="text-blue-500 hover:text-blue-700">
                        <IoArrowBackOutline className="text-2xl" />
                    </button>
                    <div className="flex items-center space-x-2">
                        {newsData.publisher.logoUrl && (
                            <img
                                src={newsData.publisher.logoUrl}
                                alt="Publisher Logo"
                                className="w-10 h-10 rounded-full"
                            />
                        )}
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold">{newsData.publisher.name}</span> -{" "}
                            <span>{new Date(newsData.publisher.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">{newsData.title}</h1>

                {/* Carousel for Images/Videos */}
                {newsData.media && newsData.media.length > 0 && (
                    <Carousel>
                        <CarouselContent>
                            {newsData.media.map((item, index) => (
                                <CarouselItem key={index} className="flex justify-center items-center bg-gray-300 rounded-md">
                                    {item.type === "image" ? (
                                        <img
                                            src={item.url}
                                            alt={`Media ${index + 1}`}
                                            className="max-h-[500px] max-w-full object-contain rounded-md cursor-zoom-in"
                                            style={{
                                                height: "500px",
                                                width: "auto",
                                            }}
                                            onClick={() => handleZoom(item.url)}
                                        />
                                    ) : item.type === "video" ? (
                                        <video
                                            controls
                                            className="rounded-md cursor-pointer"
                                            style={{
                                                height: "500px",
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
                )}

                <div className="mt-6">
                    <p className="text-gray-700 leading-relaxed">{newsData.description}</p>
                </div>

                <div className="flex items-center space-x-4 my-6 justify-start">
                    <div className="relative flex items-center bg-[#1E1E38] text-white px-4 py-2 rounded-full space-x-2 group">
                        <button onClick={() => handleVote("upvotes")}>
                            <BiUpvote />
                        </button>
                        <span className="text-sm font-medium">{votes.upvotes - votes.downvotes}</span>
                        <button onClick={() => handleVote("downvotes")}>
                            <BiDownvote />
                        </button>
                    </div>

                    <div className="relative flex items-center bg-[#1E1E38] text-white px-4 py-2 rounded-full space-x-2 group">
                        <FaRegComment />
                        <span className="text-sm font-medium">{comments.length}</span>
                    </div>

                    <div
                        onClick={handleShare}
                        className="relative flex items-center bg-[#1E1E38] text-white px-4 py-2 rounded-full space-x-2 group cursor-pointer"
                    >
                        <PiShareFatLight />
                        <span className="text-sm font-thin">Share</span>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    {/* Add Comment Section */}
                    <div className="m-6">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md mb-2"
                            rows="3"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <Button
                            onClick={handlePostComment}
                            className="bg-blue-400 text-white px-4 py-2 rounded-full"
                        >
                            Comment
                        </Button>
                    </div>

                    <ul className="space-y-4">
                        {comments.map((comment, index) => (
                            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                <p className="text-gray-800">{comment.text}</p>
                                <span className="text-sm text-gray-500">
                                    — {comment.author}, {new Date(comment.date).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {zoomedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeZoom}
                >
                    <img
                        src={zoomedImage}
                        alt="Zoomed"
                        className="max-w-[90%] max-h-[90%] cursor-zoom-out"
                    />
                </div>
            )}
        </div>
    );
}
