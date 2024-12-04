import { atom, selector } from 'recoil';

export const newsArticlesState = atom({
  key: 'newsArticlesState',
  default: [
    {
      id: 1,
      title: 'Local Festival Draws Record Crowd',
      excerpt: 'The annual Harvest Moon Festival saw unprecedented attendance this year, with over 10,000 visitors...',
      author: 'Jane Doe',
      date: 'May 15, 1923',
      votes: 120,
      probability: 0.95,
    },
    {
      id: 2,
      title: 'New Park to Open Next Month',
      excerpt: 'City officials announced the grand opening of Willow Creek Park, set to become the largest green space...',
      author: 'John Smith',
      date: 'May 14, 1923',
      votes: 85,
      probability: 0.88,
    },
    {
      id: 3,
      title: 'City Council Approves Budget',
      excerpt: 'In a late-night session, the City Council voted 7-2 to approve the annual budget, with key allocations...',
      author: 'Alice Johnson',
      date: 'May 13, 1923',
      votes: 62,
      probability: 0.92,
    },
  ],
});

export const sortedNewsArticlesState = selector({
  key: 'sortedNewsArticlesState',
  get: ({ get }) => {
    const articles = get(newsArticlesState);
    return [...articles].sort((a, b) => b.votes - a.votes);
  },
});

