"use strict";
// // models/Publisher.ts
// import mongoose, { Document, Schema } from 'mongoose';
// export interface IPublisher extends Document {
//   government_id?: string;
//   journalism_id: string;
//   news: mongoose.Types.ObjectId[];
//   credibility?: mongoose.Types.ObjectId;
// }
// const PublisherSchema: Schema = new Schema(
//   {
//     government_id: { type: String },
//     journalism_id: { type: String, required: true },
//     news: [{ type: Schema.Types.ObjectId, ref: 'News' }],
//     credibility: { type: Schema.Types.ObjectId, ref: 'UserCredibility' },
//   },
//   { timestamps: true }
// );
// export default mongoose.model<IPublisher>('Publisher', PublisherSchema, 'publishers');
