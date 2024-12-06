import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user_id = req.user?.user_id;

  if (!user_id) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }

  try {
    const user = await User.findById(user_id).select('-password_hash');

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({
      user: {
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
        credibility: user.credibility,
      },
    });
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: (error as Error).message });
  }
};
