import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const createPublisherSchema = z.object({
  user_id: z.string().uuid("Invalid user ID format"),
  government_id: z.string().min(6, "Government ID must be at least 6 characters long"),
  journalism_id: z.string().min(6, "Journalism ID must be at least 6 characters long"),
});

export const createPublisher = async (req: Request, res: Response) : Promise<void> => {
  const validation = createPublisherSchema.safeParse(req.body);

  if (!validation.success) {
     res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { user_id, government_id, journalism_id } = validation.data;

  try {
    const hashedGovernmentId = await bcrypt.hash(government_id, SALT_ROUNDS);
    const hashedJournalismId = await bcrypt.hash(journalism_id, SALT_ROUNDS);

    const newPublisher = await prisma.publisher.create({
      data: {
        user_id: Number(user_id),
        government_id: hashedGovernmentId,
        journalism_id: hashedJournalismId,
      },
    });

    res.status(201).json(newPublisher);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
