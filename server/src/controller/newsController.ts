import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import News from '../models/News';
import mongoose from 'mongoose';
import { getClaimScore } from '../api/apicall';
// Updated schema with default values for optional fields
const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  genres: z.array(z.string()).optional().default([]),
  imageUrls: z.array(z.string()).optional().default([]),
  videoUrls: z.array(z.string()).optional().default([]),
});

export const createNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validation = createNewsSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { title, content, genres, imageUrls, videoUrls } = validation.data;
  // const publisher_id = req.body.publisher_id; // Use publisher_id from middleware

  try {
    // Check for duplicate news
    const existingNews = await News.findOne({ title, content }).exec();

    if (existingNews) {
      res.status(409).json({
        error: "A news article with the same title and content already exists.",
      });
      return;
    }
    // get claim score from API
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

    // Create and save the new news article
    const newNews = new News({
      title,
      content,
      // publisher_id: new mongoose.Types.ObjectId(publisher_id),
      genres,
      imageUrls,
      videoUrls,
      real_probability,
    });

    await newNews.save();

    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
