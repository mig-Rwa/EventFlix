import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import { createServer } from 'http';
// import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth';
import eventRoutes from './routes/events';
import ticketRoutes from './routes/tickets';

// Load environment variables
dotenv.config();

const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     methods: ['GET', 'POST']
//   }
// });

// Middleware
app.use(cors({
  origin: [
    'https://event-flix-five.vercel.app', // your Vercel frontend
    'http://localhost:3000',              // local dev
    'http://localhost:3001',              // another local dev port
    'http://localhost:5000'               // backend-to-backend if needed
  ],
  credentials: true,
}));
app.use(express.json());

// Database connection
console.log('Connecting to MongoDB:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventflix')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EventFlix API' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});