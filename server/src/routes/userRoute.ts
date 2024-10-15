import { Router } from 'express';
import { createUser, getUsers ,signinUser } from '../controller/userController';
import { authMiddleware } from '../middlewares/authmiddleware';

const router = Router();

router.post('/signup', createUser);
router.post('/signin',signinUser);
router.get('/get',authMiddleware, getUsers);

export default router;