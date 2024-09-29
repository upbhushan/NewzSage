import { Router } from 'express';
import { createUser, getUsers } from '../controller/userController';

const router = Router();

router.post('/signup', createUser);
router.get('/get', getUsers);

export default router;