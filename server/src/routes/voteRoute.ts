// routes/votes.ts

import express from 'express';
import  {handleVote}  from '../controller/voteController';
import { authMiddleware } from '../middlewares/authmiddleware';

const router = express.Router();

router.post('/change',authMiddleware, handleVote);

export default router;