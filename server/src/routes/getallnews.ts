import express from 'express';
import { getAllNews } from '../controller/getAllNewsController';
import { getNewsById } from '../controller/getNewsById';
import { authMiddleware } from '../middlewares/authmiddleware';


const router = express.Router();

router.get('/news',authMiddleware, getAllNews);
router.get('/news/:id', getNewsById);

export default router;