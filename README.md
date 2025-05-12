# EventFlix - Event Management Platform

A full-stack web application for creating, managing, and registering for events. Built with modern technologies and best practices.

## Features

- User authentication and authorization
- Event creation and management
- Event discovery and search
- Ticket sales and management
- Payment processing with Stripe
- Real-time notifications
- Admin dashboard
- Responsive design

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Stripe Elements

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Socket.io

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Stripe account
- npm or yarn

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/EventFlix.git
cd EventFlix
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. Run the development servers
```bash
# Run backend server
cd backend
npm run dev

# Run frontend server
cd frontend
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
EventFlix/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utility functions
│   │   ├── store/        # Redux store
│   │   └── types/        # TypeScript types
│   └── public/           # Static files
│
└── backend/              # Express backend application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   ├── middleware/  # Custom middleware
    │   └── utils/       # Utility functions
    └── config/          # Configuration files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 