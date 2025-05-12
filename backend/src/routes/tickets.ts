import express from 'express';
import {
  createPaymentIntent,
  createTicket,
  getUserTickets,
  getTicketById,
  cancelTicket,
} from '../controllers/ticketController';
import { auth } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Payment and ticket creation
router.post('/payment-intent', createPaymentIntent);
router.post('/', createTicket);

// Ticket management
router.get('/user', getUserTickets);
router.get('/:id', getTicketById);
router.post('/:id/cancel', cancelTicket);

export default router; 