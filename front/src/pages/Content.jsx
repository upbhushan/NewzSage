import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
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
import { useAuthContext } from "../context/AuthContext";

export default function Content() {
    const { authUser } = useAuthContext();  // Destructure setAuthUser from context

    const { id } = useParams(); // Get the ID from the URL
    const [newsData, setNewsData] = useState(null);
    const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [zoomedImage, setZoomedImage] = useState(null);

    useEffect(() => {
        console.log(authUser)
        // Fetch the news data and comments based on the ID from the URL
        axios
            .get(`${process.env.VITE_BACKEND_URL}/api/v1/all/news/${id}`  ) // Replace with your actual API URL
            .then((response) => {
                setNewsData(response.data);
                setVotes({
                    upvotes: response.data.upvote_count,
                    downvotes: response.data.downvote_count,
                });
            })
            .catch((error) => {
                console.error("Error fetching news data:", error);
            });

        // Fetch comments for the news
        axios
            .get(`${process.env.VITE_BACKEND_URL}/api/v1/comment/comments/${id}` ) // Adjust endpoint as needed
            .then((response) => {
                setComments(response.data); // Store comments as objects
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
            });
    }, [id]);


    // useEffect(() => {
    //     // Fetch the news data based on the ID from the URL
    //     axios
    //         .get(`http://localhost:3000/api/v1/all/news/${id}`) // Replace with your actual API URL
    //         .then((response) => {
    //             setNewsData(response.data);
    //             setVotes({
    //                 upvotes: response.data.upvote_count,
    //                 downvotes: response.data.downvote_count,
    //             });
    //             setComments(response.data.comments || []);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching news data:", error);
    //         });
    // }, [id]);

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
                    text: newsData.content,
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
    
        const user_id = authUser.id; // Replace this with actual logic to fetch logged-in user ID
    
        const commentData = {
            news_id: id,  // Using news_id from the URL params
            user_id: user_id,  // Use the user ID from the authentication logic
            content: newComment,  // The content of the new comment
        };
    
        try {
            // Retrieve the Bearer token from localStorage
            const token = localStorage.getItem("token"); // Make sure token is saved under 'token' key
    
            // Set up the Authorization header with the Bearer token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
    
            // Send the new comment to the backend with the Authorization header
            const response = await axios.post(`${process.env.VITE_BACKEND_URL}/api/v1/comment`  , commentData, config);
    
            // If the comment is successfully created, add it to the comments state
            setComments((prev) => [...prev, response.data]);
    
            // Clear the comment input
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Failed to post comment.");
        }
    };
    
    

    const handleGoBack = () => {
        window.history.back(); // Go back to the previous page
    };

    if (!newsData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
                {/* Back Button and Publisher Info */}
                <div className="flex items-center space-x-4 mb-4">
                    <button onClick={handleGoBack} className="text-blue-500 hover:text-blue-700">
                        <IoArrowBackOutline className="text-2xl" />
                    </button>
                    <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold">{newsData.author}</span> -{" "}
                            <span>{new Date(newsData.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">{newsData.title}</h1>

                {/* Carousel for Images/Videos */}
                {(newsData.imageUrls.length > 0 || newsData.videoUrls.length > 0) && (
                    <Carousel>
                        <CarouselContent>
                            {newsData.imageUrls.map((url, index) => (
                                <CarouselItem key={index} className="flex justify-center items-center bg-gray-300 rounded-md">
                                    <img
                                        src={url}
                                        alt={`Image ${index + 1}`}
                                        className="max-h-[500px] max-w-full object-contain rounded-md cursor-zoom-in"
                                        style={{
                                            height: "500px",
                                            width: "auto",
                                        }}
                                        onClick={() => handleZoom(url)}
                                    />
                                </CarouselItem>
                            ))}
                            {newsData.videoUrls.map((url, index) => (
                                <CarouselItem key={index} className="flex justify-center items-center bg-gray-300 rounded-md">
                                    <video
                                        controls
                                        className="rounded-md cursor-pointer"
                                        style={{
                                            height: "500px",
                                            width: "1200px",
                                            objectFit: "contain",
                                        }}
                                        src={url}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                )}

                <div className="mt-6">
                    <p className="text-gray-700 leading-relaxed">{newsData.content}</p>
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
    {comments.map((comment) => (
        <li key={comment._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <p className="text-gray-800">{comment.content}</p>
            <span className="text-sm text-gray-500">
                — {comment.user_id}, {new Date(comment.created_at).toLocaleString()}
            </span>
        </li>
    ))}
</ul>
                </div>
            </div>

            {/* Modal for Image Zoom */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeZoom}
                >
                    <img
                        src={zoomedImage}
                        alt="Zoomed Image"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
}
