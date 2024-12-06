// routes/userRoutes.ts
import { Router } from 'express';
import { getUserInfo } from '../controller/userInfoController';
import { authMiddleware } from '../middlewares/authmiddleware';
// import { getUserInfo } from '../controllers/userInfoController';

const router = Router();

// Route to get user info by user_id
router.get('/',authMiddleware, getUserinfo);

export default router;