

// Sample news data
// const dummyNews = [
//   {
//     id: "1",
//     title: "Breaking News: React is Awesome!",
//     description: "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
//     media: [
//       { type: "image", url: "https://picsum.photos/id/237/200/300" },
//       { type: "image", url: "https://picsum.photos/seed/picsum/200/300" },
//       { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
//     ],
//     upvotes: 9800,
//     downvotes: 45,
//     comments: 197,
//     awards: 17,
//     publisher: {
//       name: "TechNews Daily",
//       date: "2024-12-01",
//       logoUrl: "https://picsum.photos/id/237/200/300",
//     },
//   },
//   {
//     id: "2",
//     title: "Breaking News: React is Awesome!",
//     description: "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
//     media: [
//       { type: "image", url: "https://picsum.photos/id/237/200/300" },
//       { type: "image", url: "https://picsum.photos/seed/picsum/200/300" },
//       { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
//     ],
//     upvotes: 9800,
//     downvotes: 45,
//     comments: 197,
//     awards: 17,
//     publisher: {
//       name: "TechNews Daily",
//       date: "2024-12-01",
//       logoUrl: "https://picsum.photos/id/237/200/300",
//     },
//   },
//   {
//     id: "3",
//     title: "Breaking News: React is Awesome!",
//     description: "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
//     media: [
//       { type: "image", url: "https://picsum.photos/id/237/200/300" },
//       { type: "image", url: "https://picsum.photos/seed/picsum/200/300" },
//       { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
//     ],
//     upvotes: 9800,
//     downvotes: 45,
//     comments: 197,
//     awards: 17,
//     publisher: {
//       name: "TechNews Daily",
//       date: "2024-12-01",
//       logoUrl: "https://picsum.photos/id/237/200/300",
//     },
//   },
//   {
//     id: "4",
//     title: "Breaking News: React is Awesome!",
//     description: "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
//     media: [
      
//     ],
//     upvotes: 9800,
//     downvotes: 45,
//     comments: 197,
//     awards: 17,
//     publisher: {
//       name: "TechNews Daily",
//       date: "2024-12-01",
//       logoUrl: "https://picsum.photos/id/237/200/300",
//     },
//   },
//   {
//     id: "5",
//     title: "Breaking News: React is Awesome!",
//     description: "React has revolutionized the way deve be a leader in the web development space.",
//     media: [
//     ],
//     upvotes: 9800,
//     downvotes: 45,
//     comments: 197,
//     awards: 17,
//     publisher: {
//       name: "TechNews Daily",
//       date: "2024-12-01",
//       logoUrl: "https://picsum.photos/id/237/200/300",
//     },
//   },
//   // Add more dummy news items here if needed
// ];

import { useState, useEffect } from 'react';
import axios from 'axios';

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (currentPage) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/v1/all/news', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { page: currentPage, limit: 4 },
      });
      console.log(response);
      const fetchedNews = response.data;

      setNews((prevNews) => {
        const existingIds = new Set(prevNews.map(item => item.id));
        const newUniqueNews = fetchedNews
          .map(item => ({
            id: item._id || `news-${Math.random().toString(36).substr(2, 9)}`,
            probability:item.real_probability,
            title: item.title || "Untitled",
            description: item.content || "No description available",
            media: [...item.imageUrls, ...item.videoUrls],
            upvotes: item.upvote_count || 0,
            downvotes: item.downvote_count || 0,
            comments: item.comments.length || 0,
            awards: 0,
            publisher: {
              name: item.author || "Unknown Publisher",
              date: item.created_at || null,
              logoUrl: null,
            },
          }))
          .filter(item => !existingIds.has(item.id));

        return [...prevNews, ...newUniqueNews];
      });

      setHasMore(fetchedNews.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch news'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
      setLoading(true);
    }
  };

  return { news, loading, error, hasMore, loadMore };
}