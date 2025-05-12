import { Request, Response } from 'express';
import { Event } from '../models/Event';
import { Ticket } from '../models/Ticket';

interface AuthRequest extends Request {
  user?: any;
}

// Create a new event
export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user._id,
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error creating event' });
  }
};

// Get all events with filters
export const getEvents = async (req: Request, res: Response) => {
  try {
    const {
      category,
      date,
      location,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query: any = { status: 'published' };

    if (category) query.category = category;
    if (date) query.date = { $gte: new Date(date as string) };
    if (location) {
      query['location.city'] = new RegExp(location as string, 'i');
    }
    if (search) {
      query.$or = [
        { title: new RegExp(search as string, 'i') },
        { description: new RegExp(search as string, 'i') },
      ];
    }

    const events = await Event.find(query)
      .populate('organizer', 'firstName lastName email')
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ date: 1 });

    const total = await Event.countDocuments(query);

    res.json({
      events,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
};

// Get event by ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'firstName lastName email');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event' });
  }
};

// Update event
export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating event' });
  }
};

// Delete event
export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' });
  }
};

// Get organizer's events
export const getOrganizerEvents = async (req: AuthRequest, res: Response) => {
  try {
    const events = await Event.find({ organizer: req.user._id })
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching organizer events' });
  }
};

// Get event statistics
export const getEventStats = async (req: AuthRequest, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to view these statistics' });
    }

    const tickets = await Ticket.find({ event: event._id });
    const totalRevenue = tickets.reduce((sum, ticket) => sum + ticket.totalPrice, 0);
    const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

    const stats = {
      totalRevenue,
      totalTickets,
      ticketTypes: event.ticketTypes.map(type => ({
        name: type.name,
        sold: type.sold,
        remaining: type.quantity - type.sold,
        revenue: type.sold * type.price,
      })),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event statistics' });
  }
}; 