import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import News from '../models/News';
import mongoose from 'mongoose';
import { getClaimScore } from '../api/apicall';

interface AuthRequest extends Request {
  user?: {
    username: string;
    user_id: string;
    isPublisher: boolean;
    avatar_id?: string;
  };
}

const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  genres: z.array(z.string()).optional().default([]),
  imageUrls: z.array(z.string()).optional().default([]),
  videoUrls: z.array(z.string()).optional().default([]),
  author: z.string(),
  avatar_id: z.string(),
  created_at: z.date(),
});

export const createNews = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  console.log("Request user:", req.user);

  if (!req.user || !req.user.username) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const validation = createNewsSchema.safeParse({
    ...req.body,
    author: req.user.username, // Automatically set author
    avatar_id: req.user.avatar_id, // Automatically set avatar_id (adjust logic if different field is used)
    created_at: new Date(), // Automatically set created_at
  });

  console.log("Validation result:", validation); // Debug log

  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { title, content, genres, imageUrls, videoUrls, author, avatar_id ,created_at } = validation.data;

  try {
    const existingNews = await News.findOne({ title, content }).exec();

    if (existingNews) {
      res.status(409).json({
        error: "A news article with the same title and content already exists.",
      });
      return;
    }

    const claimScoreData = await getClaimScore(content);
    let real_probability = 0;
    if (
      claimScoreData &&
      Array.isArray(claimScoreData.results) &&
      claimScoreData.results.length > 0 &&
      typeof claimScoreData.results[0].score === 'number'
    ) {
      real_probability = claimScoreData.results[0].score;
    } else {
      console.warn("Unexpected claim score API response format:", claimScoreData);
    }

    console.log("Claim score:", real_probability);

    const newNews = new News({
      title,
      content,
      avatar_id,
      author,
      genres,
      imageUrls,
      videoUrls,
      real_probability,
      created_at
    });

    await newNews.save();

    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
