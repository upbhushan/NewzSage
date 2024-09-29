import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createVoteSchema = z.object({
  news_id: z.string().uuid("Invalid news ID format"),
  user_id: z.string().uuid("Invalid user ID format"),
  vote_type: z.enum(['upvote', 'downvote']),
});

export const createVote = async (req: Request, res: Response):Promise<void> => {
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
    const newVote = await prisma.vote.create({
      data: { news_id: parseInt(news_id), user_id: parseInt(user_id), vote_type },
    });

    res.status(201).json(newVote);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
