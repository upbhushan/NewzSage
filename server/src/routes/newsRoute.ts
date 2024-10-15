import { Router } from 'express';
import { createNews } from '../controller/newsController';
import { publisherMiddleware } from '../middlewares/publishmiddleware';
import { authMiddleware } from '../middlewares/authmiddleware';

const router = Router();

router.post('/post',publisherMiddleware, createNews);

export default router;