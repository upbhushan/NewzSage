import { Router } from 'express';
import { createNews } from '../controller/newsController';

const router = Router();

router.post('/', createNews);

export default router;