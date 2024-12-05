// controllers/authController.ts

import { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id; // Assuming you've set req.user in auth middleware

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'Invalid user ID' });
    return;
  }

  try {
    const user = await User.findById(userId)
      .select('-password_hash') // Exclude password_hash for security
      .populate('credibility'); // Populate referenced fields if necessary

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      isPublisher: user.isPublisher,
      credibility_score: user.credibility_score,
      status: user.status,
      email_verified: user.email_verified,
      created_at: user.created_at,
      updated_at: user.updated_at,
      last_login: user.last_login,
      government_id: user.government_id,
      avatar_id: user.avatar_id,
      credibility: user.credibility, // Adjust based on your schema
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};