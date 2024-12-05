// controllers/voteController.ts

import { Request, Response } from 'express';
import Vote from '../models/Vote';
import News from '../models/News';
import mongoose from 'mongoose';

interface VoteRequestBody {
  news_id: string;
  user_id: string;
  vote_type: 'upvote' | 'downvote';
}

export const handleVote = async (req: Request, res: Response): Promise<void> => {
  const { news_id, user_id, vote_type } = req.body as VoteRequestBody;

  // Validate ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(news_id) ||
    !mongoose.Types.ObjectId.isValid(user_id)
  ) {
    res.status(400).json({ message: 'Invalid news_id or user_id' });
    return;
  }

  try {
    // Find existing vote by user on the news item
    const existingVote = await Vote.findOne({ news_id, user_id });

    if (existingVote) {
      if (existingVote.vote_type === vote_type) {
        // // User is attempting to remove their vote (unvote)
        // await Vote.deleteOne({ _id: existingVote._id });

        // // Decrement the appropriate vote count
        // const decrementField = vote_type === 'upvote' ? 'upvote_count' : 'downvote_count';
        // await News.findByIdAndUpdate(news_id, { $inc: { [decrementField]: -1 } });

        res.status(200).json({ message: "no chnage in vote" });
        return;
      } else {
        // User is changing their vote type
        const oldVoteType = existingVote.vote_type;
        existingVote.vote_type = vote_type;
        await existingVote.save();

        // Increment the new vote type count and decrement the old vote type count
        const incrementField = vote_type === 'upvote' ? 'upvote_count' : 'downvote_count';
        const decrementField = oldVoteType === 'upvote' ? 'upvote_count' : 'downvote_count';

        await News.findByIdAndUpdate(news_id, {
          $inc: {
            [incrementField]: 1,
            [decrementField]: -1,
          },
        });

        // Retrieve updated vote counts
        const upvote_count = await Vote.countDocuments({ news_id, vote_type: 'upvote' });
        const downvote_count = await Vote.countDocuments({ news_id, vote_type: 'downvote' });

        res.status(200).json({ message: `Vote updated to ${vote_type}`, votes: { upvote_count, downvote_count } });
        return;
      }
    }

    // Create new vote if no existing vote
    const newVote = new Vote({ news_id, user_id, vote_type });
    await newVote.save();

    // Increment the appropriate vote count
    const incrementField = vote_type === 'upvote' ? 'upvote_count' : 'downvote_count';
    await News.findByIdAndUpdate(news_id, { $inc: { [incrementField]: 1 } });

    // Retrieve updated vote counts
    const upvote_count = await Vote.countDocuments({ news_id, vote_type: 'upvote' });
    const downvote_count = await Vote.countDocuments({ news_id, vote_type: 'downvote' });

    res.status(200).json({ message: `${vote_type} added`, votes: { upvote_count, downvote_count } });
  } catch (error) {
    console.error('Error processing vote:', error);
    res.status(500).json({ message: 'Server error' });
  }
};