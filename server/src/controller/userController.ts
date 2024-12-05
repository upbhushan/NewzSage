import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User'; // Assuming a Mongoose User model is defined in `models/User`

const JWT_SECRET = "asjfblansfjklasj";
const SALT_ROUNDS = 10;

// Validation Schemas
const createUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  government_id: z.string().optional(),
  
});

const signinUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const createUser = async (req: Request, res: Response): Promise<void> => {
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

  const { username, email, password, government_id } = validation.data;

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  if (government_id) {
    const existingGovId = await User.findOne({ government_id });
    if (existingGovId) {
      res.status(400).json({ error: "Government ID already in use" });
      return;
    }
  }

  try {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const avatar_id = Math.floor(Math.random() * 10) + 1; // Assign a number between 1 to 10
    const newUser = new User({
      username,
      avatar_id,
      email,
      password_hash,
      isPublisher: !!government_id,
      government_id: government_id || undefined,
    });

    await newUser.save();

    const token = jwt.sign(
      { user_id: newUser._id,
        username: newUser.username,
         isPublisher: newUser.isPublisher,
         author: newUser.username,
          avatar_id: newUser.avatar_id,
         created_at: newUser.created_at,},
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ user_id: newUser._id, token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const signinUser = async (req: Request, res: Response): Promise<void> => {
  const validation = signinUserSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      errors: validation.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
    return;
  }

  const { email, password } = validation.data;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(404).json({ error: "User does not exist" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password_hash);

  if (!passwordMatch) {
    res.status(401).json({ error: "Password does not match" });
    return;
  }

  const token = jwt.sign({ user_id: existingUser._id }, JWT_SECRET, { expiresIn: "1d" });

  res.status(200).json({ message: "User signed in", token });
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find({}, { password_hash: 0 }); // Exclude `password_hash` from results
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
  next();
};
