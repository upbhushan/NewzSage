// models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password_hash: string;
  credibility_score: number;
  status: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  publisher?: mongoose.Types.ObjectId;
  credibility?: mongoose.Types.ObjectId; // Reference to UserCredibility
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password_hash: { type: String, required: true },
    credibility_score: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
    email_verified: { type: Boolean, default: false },
    last_login: { type: Date },
    publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' },
    credibility: { type: Schema.Types.ObjectId, ref: 'UserCredibility' }, // Added reference to UserCredibility
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default mongoose.model<IUser>('User', UserSchema, 'users');
