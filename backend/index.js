const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

// Connection helper
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    if (!uri) throw new Error('MONGO_URI is missing');
    const db = await mongoose.connect(uri);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('DB Connection Error:', err);
    throw err;
  }
};

// Middleware to ensure DB is connected before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    env: process.env.NODE_ENV
  });
});

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Work log routes
const workLogRoutes = require('./routes/workLogRoutes');
app.use('/api/worklogs', workLogRoutes);

// Export for Vercel
module.exports = app;

// Start server (only if not on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
