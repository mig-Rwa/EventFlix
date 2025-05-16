import express from 'express';
import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Extend Request type to include file
interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

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
router.post('/', auth, upload.single('image'), async (req: MulterRequest, res) => {
  try {
    const { title, description, date, category, status, ticketTypes, location } = req.body;
    const organizer = req.user._id; // assumes auth middleware sets req.user
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image is required.' });
    }

    // Parse ticketTypes if sent as JSON string
    let parsedTicketTypes = [];
    if (ticketTypes) {
      parsedTicketTypes = typeof ticketTypes === 'string' ? JSON.parse(ticketTypes) : ticketTypes;
    }

    // Parse location if sent as JSON string
    let parsedLocation = {};
    if (location) {
      parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
    }

    const event = await Event.create({
      title,
      description,
      date,
      category,
      status,
      ticketTypes: parsedTicketTypes,
      location: parsedLocation,
      organizer,
      imageUrl
    });
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.get('/organizer/events', auth, getOrganizerEvents);
router.get('/:id/stats', auth, getEventStats);

export default router; 