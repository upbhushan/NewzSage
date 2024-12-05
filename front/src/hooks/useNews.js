import { useState, useEffect } from 'react';

// Sample news data
const dummyNews = [
  {
    id: "1",
    title: "Breaking News: React is Awesome!",
    description: "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
    media: [
      { type: "image", url: "https://picsum.photos/id/237/200/300" },
      { type: "image", url: "https://picsum.photos/seed/picsum/200/300" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    upvotes: 9800,
    downvotes: 45,
    comments: 197,
    awards: 17,
    publisher: {
      name: "TechNews Daily",
      date: "2024-12-01",
      logoUrl: "https://picsum.photos/id/237/200/300",
    },
  },
  {
    id: "2",
    title: "Breaking News: React is Awesome!",
    description: "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
    media: [
      { type: "image", url: "https://picsum.photos/id/237/200/300" },
      { type: "image", url: "https://picsum.photos/seed/picsum/200/300" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    upvotes: 9800,
    downvotes: 45,
    comments: 197,
    awards: 17,
    publisher: {
      name: "TechNews Daily",
      date: "2024-12-01",
      logoUrl: "https://picsum.photos/id/237/200/300",
    },
  },
  {
    id: "3",
    title: "Breaking News: React is Awesome!",
    description: "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
    media: [
      { type: "image", url: "https://picsum.photos/id/237/200/300" },
      { type: "image", url: "https://picsum.photos/seed/picsum/200/300" },
      { type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
    ],
    upvotes: 9800,
    downvotes: 45,
    comments: 197,
    awards: 17,
    publisher: {
      name: "TechNews Daily",
      date: "2024-12-01",
      logoUrl: "https://picsum.photos/id/237/200/300",
    },
  },
  {
    id: "4",
    title: "Breaking News: React is Awesome!",
    description: "React has revolutionized the way developers build modern web applications. Its component-based architecture and declarative syntax make it a popular choice for creating dynamic, interactive UIs. In this article, we explore why React continues to be a leader in the web development space.",
    media: [
      
    ],
    upvotes: 9800,
    downvotes: 45,
    comments: 197,
    awards: 17,
    publisher: {
      name: "TechNews Daily",
      date: "2024-12-01",
      logoUrl: "https://picsum.photos/id/237/200/300",
    },
  },
  {
    id: "5",
    title: "Breaking News: React is Awesome!",
    description: "React has revolutionized the way deve be a leader in the web development space.",
    media: [
    ],
    upvotes: 9800,
    downvotes: 45,
    comments: 197,
    awards: 17,
    publisher: {
      name: "TechNews Daily",
      date: "2024-12-01",
      logoUrl: "https://picsum.photos/id/237/200/300",
    },
  },
  // Add more dummy news items here if needed
];

export  function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Ensure all required properties are present
        const validatedNews = dummyNews.map(item => ({
          id: item.id || `news-${Math.random().toString(36).substr(2, 9)}`,
          title: item.title || "Untitled",
          description: item.description || "No description available",
          media: item.media || [],
          upvotes: item.upvotes || 0,
          downvotes: item.downvotes || 0,
          comments: item.comments || 0,
          awards: item.awards || 0,
          publisher: item.publisher ? {
            name: item.publisher.name || "Unknown Publisher",
            date: item.publisher.date || null,
            logoUrl: item.publisher.logoUrl || null,
          } : null,
        }));
        
        setNews(validatedNews);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch news'));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
}

