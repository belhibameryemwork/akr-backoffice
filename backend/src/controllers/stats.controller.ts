import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalAppointments = await prisma.appointment.count();
    const confirmedAppointments = await prisma.appointment.count({ where: { status: 'CONFIRMED' } });
    const pendingAppointments = await prisma.appointment.count({ where: { status: 'PENDING' } });
    const cancelledAppointments = await prisma.appointment.count({ where: { status: 'CANCELLED' } });
    
    res.json({
      total: totalAppointments,
      confirmed: confirmedAppointments,
      pending: pendingAppointments,
      cancelled: cancelledAppointments
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
