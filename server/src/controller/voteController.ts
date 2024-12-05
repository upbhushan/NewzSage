import { Request, Response } from 'express';
import { z } from 'zod';
import Vote from '../models/Vote'; // Assuming a Mongoose Vote model is defined in `models/Vote`

const createVoteSchema = z.object({
  news_id: z.string({ invalid_type_error: "Invalid news ID format" }),
  user_id: z.string({ invalid_type_error: "Invalid user ID format" }),
  vote_type: z.enum(['upvote', 'downvote']),
});

export const createVote = async (req: Request, res: Response): Promise<void> => {
  const validation = createVoteSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { news_id, user_id, vote_type } = validation.data;

  try {
    const newVote = new Vote({
      news_id,
      user_id,
      vote_type,
    });

    await newVote.save();

    res.status(201).json(newVote);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
