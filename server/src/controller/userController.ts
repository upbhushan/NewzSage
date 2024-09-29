import { Request, Response,NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// next: NextFunction (for middleware)
const createUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


export const createUser = async (req: Request, res: Response ,next: NextFunction) : Promise<void> => {

  const validation = createUserSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { username, email, password } = validation.data;

  try {

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);


    const newUser = await prisma.user.create({
      data: { username, email, password_hash },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  next();
};


export const getUsers = async (req: Request, res: Response,next: NextFunction):Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  next();    
};
