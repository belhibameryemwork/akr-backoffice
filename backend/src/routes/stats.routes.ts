import { Router } from 'express';
import { getDashboardStats } from '../controllers/stats.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getDashboardStats);

export default router;
