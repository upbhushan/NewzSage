import express from 'express';
import { getAllNews } from '../controller/getAllNewsController';
import { authMiddleware } from '../middlewares/authmiddleware';


const router = express.Router();

router.get('/news',authMiddleware, getAllNews);

export default router;