import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary';
import { Request, Response } from 'express';
import { Event } from '../models/Event';

// Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eventflix_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  } as any, // Fix TS error for folder property
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
});

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getOrganizerEvents,
  getEventStats,
} from '../controllers/eventController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', auth, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }
    const { title, description, date, category, status, ticketTypes, location } = req.body;
    const organizer = (req as any).user._id; // assumes auth middleware sets req.user

    const newEvent = await Event.create({
      title,
      description,
      date,
      category,
      status,
      ticketTypes: typeof ticketTypes === 'string' ? JSON.parse(ticketTypes) : ticketTypes,
      location: typeof location === 'string' ? JSON.parse(location) : location,
      organizer,
      imageUrl: file.path, // Cloudinary URL
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.get('/organizer/events', auth, getOrganizerEvents);
router.get('/:id/stats', auth, getEventStats);

export default router; 