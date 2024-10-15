import { Router } from 'express';
import { createComment } from '../controller/commentController';
import { authMiddleware } from '../middlewares/authmiddleware';

const router = Router();

router.post('/', authMiddleware,createComment);

export default router;