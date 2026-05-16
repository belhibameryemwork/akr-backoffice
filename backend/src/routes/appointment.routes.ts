import { Router } from 'express';
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointment.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Secure all appointment routes
router.use(authenticate);

router.get('/', getAppointments);
router.get('/:id', getAppointment);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
