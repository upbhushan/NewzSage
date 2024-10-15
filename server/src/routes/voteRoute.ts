import { Router } from 'express';
import { createVote } from '../controller/voteController';
import { authMiddleware } from '../middlewares/authmiddleware';

const router = Router();

router.post('/',authMiddleware, createVote);

export default router;