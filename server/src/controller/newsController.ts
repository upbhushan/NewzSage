import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image_url: z.string().url("Invalid image URL"),
  user_id: z.string().uuid("Invalid user ID format"),
});

export const createNews = async (req: Request, res: Response) : Promise<void> => {
  const validation = createNewsSchema.safeParse(req.body);

  if (!validation.success) {
     res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return ;
  }

  const { title, content, image_url, user_id } = validation.data;

  try {
    const newNews = await prisma.news.create({
      data: { title, content, image_url, user_id: Number(user_id) },
    });

    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
