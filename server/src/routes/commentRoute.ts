import { Router } from 'express';
import { createComment } from '../controller/commentController';
import { authMiddleware } from '../middlewares/authmiddleware';
import { getCommentsByNewsId } from '../controller/getCommentsByNewsId'; 

const router = Router();

router.post('/', authMiddleware,createComment);
router.get('/comments/:news_id', getCommentsByNewsId);


export default router;