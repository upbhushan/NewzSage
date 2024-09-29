import { Router } from 'express';
import { createPublisher } from '../controller/publisherController';

const router = Router();

router.post('/', createPublisher);

export default router;