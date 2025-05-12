import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Event } from '../models/Event';
import { Ticket } from '../models/Ticket';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-04-30.basil',
});

interface AuthRequest extends Request {
  user?: any;
}

// Create a payment intent for ticket purchase
export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId, ticketType, quantity, couponCode } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const ticketTypeInfo = event.ticketTypes.find(
      (type) => type.name === ticketType
    );
    if (!ticketTypeInfo) {
      return res.status(400).json({ error: 'Invalid ticket type' });
    }

    if (ticketTypeInfo.quantity - ticketTypeInfo.sold < quantity) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }

    let totalAmount = ticketTypeInfo.price * quantity;

    // Apply coupon if provided
    if (couponCode) {
      // TODO: Implement coupon logic
      // const discount = await applyCoupon(couponCode, totalAmount);
      // totalAmount -= discount;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        eventId,
        ticketType,
        quantity,
        userId: req.user._id.toString(),
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating payment intent' });
  }
};

// Create ticket after successful payment
export const createTicket = async (req: AuthRequest, res: Response) => {
  try {
    const { eventId, ticketType, quantity, paymentIntentId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const ticketTypeInfo = event.ticketTypes.find(
      (type) => type.name === ticketType
    );
    if (!ticketTypeInfo) {
      return res.status(400).json({ error: 'Invalid ticket type' });
    }

    // Update event ticket count
    ticketTypeInfo.sold += quantity;
    await event.save();

    // Create ticket
    const ticket = new Ticket({
      event: eventId,
      user: req.user._id,
      ticketType,
      quantity,
      totalPrice: ticketTypeInfo.price * quantity,
      paymentIntentId,
      status: 'confirmed',
    });

    await ticket.save();

    // TODO: Send confirmation email with QR code

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error creating ticket' });
  }
};

// Get user's tickets
export const getUserTickets = async (req: AuthRequest, res: Response) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id })
      .populate('event', 'title date location imageUrl')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tickets' });
  }
};

// Get ticket by ID
export const getTicketById = async (req: AuthRequest, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('event', 'title date location imageUrl')
      .populate('user', 'firstName lastName email');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Check if user is authorized to view this ticket
    if (
      ticket.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Not authorized to view this ticket' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching ticket' });
  }
};

// Cancel ticket
export const cancelTicket = async (req: AuthRequest, res: Response) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (ticket.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to cancel this ticket' });
    }

    if (ticket.status === 'cancelled') {
      return res.status(400).json({ error: 'Ticket already cancelled' });
    }

    // Update event ticket count
    const event = await Event.findById(ticket.event);
    if (event) {
      const ticketType = event.ticketTypes.find(
        (type) => type.name === ticket.ticketType
      );
      if (ticketType) {
        ticketType.sold -= ticket.quantity;
        await event.save();
      }
    }

    // Update ticket status
    ticket.status = 'cancelled';
    await ticket.save();

    // TODO: Process refund through Stripe
    // TODO: Send cancellation email

    res.json({ message: 'Ticket cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error cancelling ticket' });
  }
}; 