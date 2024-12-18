import { Request, Response, NextFunction } from 'express';
import News from '../models/News'; // Adjust the path as necessary

export const getAllNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // console.log("all");
    const news = await News.find({}).populate('author', '-password_hash'); // Assuming each news has an 'author' field referencing User
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};