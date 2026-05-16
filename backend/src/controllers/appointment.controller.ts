import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

export const getAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    let where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (search) {
      where.clientName = {
        contains: search as string,
        mode: 'insensitive'
      };
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { date: 'asc' }
      }),
      prisma.appointment.count({ where })
    ]);

    res.json({
      data: appointments,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

export const getAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) }
    });
    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
};

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientName, email, phone, service, date, time, notes } = req.body;
    const appointment = await prisma.appointment.create({
      data: { clientName, email, phone, service, date, time, notes }
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

export const updateAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { clientName, email, phone, service, date, time, status, notes } = req.body;
    
    const appointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { clientName, email, phone, service, date, time, status, notes }
    });
    res.json(appointment);
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

export const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.appointment.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};
