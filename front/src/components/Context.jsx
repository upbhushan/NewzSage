// import { useNavigate } from "react-router-dom";
// import { BiUpvote, BiDownvote } from "react-icons/bi";
// import { FaRegComment } from "react-icons/fa";
// import { PiShareFatLight } from "react-icons/pi";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// export default function Card() {
//     const newsData = {
//         id: "1",
//         title: "Breaking News: React is Awesome!",
//         description:
//             "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
//         media: [
//             { type: "image", url: "https://picsum.photos/id/237/200/300" },
//         ],
//         upvotes: 123,
//         downvotes: 45,
//         publisher: {
//             name: "TechNews Daily",
//             date: "2024-12-01",
//             logoUrl: "https://picsum.photos/id/237/200/300",
//         },
//     };

//     return (
//         <div className="bg-white shadow-md rounded-lg p-4 max-w-md">
//             {/* Publisher Info */}
//             <div className="flex items-center space-x-4 mb-4">
//                 {newsData.publisher.logoUrl && (
//                     <img
//                         src={newsData.publisher.logoUrl}
//                         alt="Publisher Logo"
//                         className="w-10 h-10 rounded-full"
//                     />
//                 )}
//                 <div className="text-sm text-gray-600">
//                     <span className="font-semibold">{newsData.publisher.name}</span> -{" "}
//                     <span>{new Date(newsData.publisher.date).toLocaleDateString()}</span>
//                 </div>
//             </div>

//             {/* News Title */}
//             <h1 className="text-xl font-bold mb-4">{newsData.title}</h1>

//             {/* News Image */}
//             {newsData.media.length > 0 && newsData.media[0].type === "image" && (
//                 <img
//                     src={newsData.media[0].url}
//                     alt="News"
//                     className="w-full h-48 object-cover rounded-lg mb-4"
//                 />
//             )}

//             {/* Description */}
//             <p className="text-gray-700 leading-relaxed mb-4">
//                 {newsData.description.length > 100
//                     ? `${newsData.description.substring(0, 100)}...`
//                     : newsData.description}
//             </p>

//             {/* Upvotes, Downvotes, and Comments */}
//             <div className="flex items-center space-x-4">
//                 <div className="flex items-center bg-[#1E1E38] text-white px-4 py-2 rounded-full space-x-2">
//                     <BiUpvote />
//                     <span className="text-sm font-medium">{newsData.upvotes - newsData.downvotes}</span>
//                 </div>
//                 <div className="flex items-center bg-[#1E1E38] text-white px-4 py-2 rounded-full space-x-2">
//                     <FaRegComment />
//                     <span className="text-sm font-medium">2</span> {/* Hardcoded comment count */}
//                 </div>
//             </div>
//         </div>
//     );
// }
