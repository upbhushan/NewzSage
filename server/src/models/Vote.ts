// models/Vote.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IVote extends Document {
  news_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  vote_type: 'upvote' | 'downvote';
  created_at: Date;
}

const VoteSchema: Schema = new Schema(
  {
    news_id: { type: Schema.Types.ObjectId, ref: 'News', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vote_type: { type: String, enum: ['upvote', 'downvote'], required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

// Add a unique index to prevent duplicate votes by the same user on the same news item
// VoteSchema.index({ news_id: 1, user_id: 1 }, { unique: true });

export default mongoose.model<IVote>('Vote', VoteSchema, 'votes');