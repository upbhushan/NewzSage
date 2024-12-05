import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import Comment from '../models/Comment'; // Path to your Mongoose Comment model

const createCommentSchema = z.object({
  news_id: z.string({ invalid_type_error: "Invalid news ID format" }),
  user_id: z.string({ invalid_type_error: "Invalid user ID format" }),
  content: z.string().min(1, "Content is required"),
});

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validation = createCommentSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { news_id, user_id, content } = validation.data;

  try {
    const newComment = new Comment({
      news_id,
      user_id,
      content,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  next();
};
