import express from "express";
import fs from "fs";
import path from "path";

// Ensure uploads directory exists at the project root
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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
    'https://event-flix-five.vercel.app',
    'https://event-flix-git-master-mbabazis-projects-92e18a01.vercel.app', // new deployed frontend
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000'
  ],
  credentials: true,
}));
app.use(express.json());

// Serve uploads directory as static
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

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