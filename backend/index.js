const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MONGO_URI is not defined in environment variables!');
}

mongoose.connect(uri || 'mongodb://localhost:27017/fiora', {
  serverSelectionTimeoutMS: 5000, // Fail fast if can't connect
})
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

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
