import { Request, Response, NextFunction } from 'express';
import News from '../models/News'; // Adjust the path as necessary

export const getNewsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params; // Get the news ID from the request parameters
    const news = await News.findById(id).populate('author', '-password_hash'); // Assuming each news has an 'author' field referencing User

    if (!news) {
       res.status(404).json({ error: 'News not found' });
       return;
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
