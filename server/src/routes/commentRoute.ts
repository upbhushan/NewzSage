import { Router } from 'express';
import { createComment } from '../controller/commentController';

const router = Router();

router.post('/', createComment);

export default router;