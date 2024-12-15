"use strict";
// import { Request, Response, NextFunction } from 'express';
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { z } from 'zod';
// const JWT_SECRET_PUB = "asjfblansfjklasj";
// const SALT_ROUNDS = 10;
// // Mongoose Models
// // import Publisher from '../models/Publisher'; // Assuming a Publisher model is defined in `models/Publisher`
// // Validation Schemas
// const createPublisherSchema = z.object({
//   // user_id: z.string({ invalid_type_error: "Invalid user ID format" }),
//   government_id: z.string().min(6, "Government ID must be at least 6 characters long"),
//   journalism_id: z.string().min(6, "Journalism ID must be at least 6 characters long"),
// });
// export const createPublisher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const validation = createPublisherSchema.safeParse(req.body);
//   if (!validation.success) {
//     res.status(400).json({
//       errors: validation.error.errors.map((err) => ({
//         path: err.path,
//         message: err.message,
//       })),
//     });
//     return;
//   }
//   const {  government_id, journalism_id } = validation.data;
//   try {
//     const existingPublisher = await Publisher.findOne({ government_id});
//     if (existingPublisher) {
//       res.status(409).json({
//         error: "A publisher with this government ID already exists.",
//       });
//       return;
//     }
//     const hashedGovernmentId = await bcrypt.hash(government_id, SALT_ROUNDS);
//     const hashedJournalismId = await bcrypt.hash(journalism_id, SALT_ROUNDS);
//     const newPublisher = new Publisher({
//       // user_id: new mongoose.Types.ObjectId(user_id),
//       government_id: hashedGovernmentId,
//       journalism_id: hashedJournalismId,
//     });
//     await newPublisher.save();
//     const token = jwt.sign({ user_id : newPublisher._id}, JWT_SECRET_PUB, { expiresIn: "1d" });
//     res.status(201).json({ newPublisher, token });
//     next();
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// };
// const signInPublisherSchema = z.object({
//   publisher_id: z.string({ invalid_type_error: "Invalid user ID format" }),
//   government_id: z.string().min(6, "Government ID must be at least 6 characters long"),
// });
// export const signInPublisher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const validation = signInPublisherSchema.safeParse(req.body);
//   if (!validation.success) {
//     res.status(400).json({
//       errors: validation.error.errors.map((err) => ({
//         path: err.path,
//         message: err.message,
//       })),
//     });
//     return;
//   }
//   const { publisher_id, government_id } = validation.data;
//   try {
//     const publisher = await Publisher.findById(publisher_id);
//     if (!publisher) {
//       res.status(404).json({ error: "Publisher not found" });
//       return;
//     }
//     const isGovernmentIdValid = publisher.government_id && await bcrypt.compare(government_id, publisher.government_id);
//     if (!isGovernmentIdValid) {
//       res.status(401).json({ error: "Invalid credentials" });
//       return;
//     }
//     const token = jwt.sign({ publisher_id }, JWT_SECRET_PUB, { expiresIn: "1d" });
//     res.status(200).json({ token });
//     next();
//   } catch (error) {
//     res.status(500).json({ error: (error as Error).message });
//   }
// };
