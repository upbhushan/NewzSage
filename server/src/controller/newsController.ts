import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import News from '../models/News'; // Path to your News model
import mongoose from 'mongoose';

const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  publisher_id: z.string({ invalid_type_error: "Invalid publisher ID format" }),
  genres: z.array(z.string()).optional(),
  imageUrls: z.array(z.string()).optional(),
  videoUrls: z.array(z.string()).optional(),
});

export const createNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validation = createNewsSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(402).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { title, content, publisher_id } = validation.data;

  try {
    // Check if the same news with the same title and content already exists
    const existingNews = await News.findOne({ title, content }).exec();

    if (existingNews) {
      res.status(405).json({
        error: "A news article with the same title and content already exists.",
      });
      return;
    }

    // Proceed to create and save the new news article
    const newNews = new News({
      title,
      content,
      publisher_id: new mongoose.Types.ObjectId(publisher_id),
    });

    await newNews.save();

    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  next();
};
