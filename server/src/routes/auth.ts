// routes/auth.ts

import express from 'express';
import { getUserInfo } from '../controller/authController';
import {authMiddleware} from '../middlewares/authmiddleware'; // Middleware to verify JWT

const router = express.Router();

// Protected route to get user info
router.get('/user', authMiddleware, getUserInfo);

export default router;