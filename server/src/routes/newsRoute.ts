import { Router } from 'express';
import { createNews } from '../controller/newsController';
// import { checkPublisherRole } from '../middlewares/checkPublisherRole';
import {authMiddleware} from '../middlewares/authmiddleware';

const router = Router();

router.post('/post',authMiddleware, createNews);

export default router;