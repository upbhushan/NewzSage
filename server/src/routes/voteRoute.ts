import { Router } from 'express';
import { createVote } from '../controller/voteController';

const router = Router();

router.post('/', createVote);

export default router;