// models/Comment.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  news_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  content: string;
  created_at: Date;
}

const CommentSchema: Schema = new Schema(
  {
    news_id: { type: Schema.Types.ObjectId, ref: 'News', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

export default mongoose.model<IComment>('Comment', CommentSchema, 'comments');