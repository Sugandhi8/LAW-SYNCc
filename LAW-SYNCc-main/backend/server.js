const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Load Models and Associations
require('./models');

// Initialize PostgreSQL Database Connection
const { connectDB } = require('./config/db');
connectDB();

// Initialize Express App
const app = express();

// Middlewares
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      return callback(null, origin); // Dynamically reflect origin for credentials support
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Root / Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date(),
    database: 'PostgreSQL',
    service: 'Legal Dictionary API'
  });
});

// Import Route Handlers
const authRoutes = require('./routes/authRoutes');
const termRoutes = require('./routes/termRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const historyRoutes = require('./routes/historyRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');

// Mount API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/terms', termRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/quizzes', quizRoutes); // alias support
app.use('/api/profile', userRoutes);
app.use('/api/users', userRoutes); // alias support

// Fallback route for base API path
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Legal Dictionary REST API (PostgreSQL)',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      terms: '/api/terms',
      bookmarks: '/api/bookmarks',
      history: '/api/history',
      quiz: '/api/quiz',
      profile: '/api/profile'
    }
  });
});

// Error Middlewares
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Legal Dictionary Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  server.close(() => process.exit(1));
});
