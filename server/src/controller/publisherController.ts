import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET_PUB = "asjfblansfjklasj";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const createPublisherSchema = z.object({
  user_id: z.string({ invalid_type_error: "Invalid user ID format" }),
  government_id: z.string().min(6, "Government ID must be at least 6 characters long"),
  journalism_id: z.string().min(6, "Journalism ID must be at least 6 characters long"),
});

export const createPublisher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        user_id: parseInt(user_id, 10),
        government_id: hashedGovernmentId,
        journalism_id: hashedJournalismId,
      },
    });

    const token = jwt.sign({ user_id }, JWT_SECRET_PUB, { expiresIn: "1d" });

    res.status(201).json({ newPublisher, token });
    next();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const signInPublisherSchema = z.object({
  publisher_id: z.string({ invalid_type_error: "Invalid user ID format" }),
  government_id: z.string().min(6, "Government ID must be at least 6 characters long"),
});

export const signInPublisher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validation = signInPublisherSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { publisher_id, government_id } = validation.data;

  try {
    const publisher = await prisma.publisher.findFirst({
      where: { publisher_id: parseInt(publisher_id, 10) },
    });

    if (!publisher) {
      res.status(404).json({ error: "Publisher not found" });
      return;
    }

    const isGovernmentIdValid = publisher.government_id && await bcrypt.compare(government_id, publisher.government_id);

    if (!isGovernmentIdValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ publisher_id }, JWT_SECRET_PUB, { expiresIn: "1d" });

    res.status(200).json({ token });
    next();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};