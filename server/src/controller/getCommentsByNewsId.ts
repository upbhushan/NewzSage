import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment'; // Path to your Mongoose Comment model

export const getCommentsByNewsId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { news_id } = req.params;

  if (!news_id) {
    res.status(400).json({ error: "News ID is required" });
    return;
  }

  try {
    const comments = await Comment.find({ news_id }).sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }

  next();
};
