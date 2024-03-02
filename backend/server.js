const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const twitterRoutes = require('./routes/twitterRoutes');
const { authenticateUser } = require('./middleware/authMiddleware'); // Import authenticateUser middleware

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-media-dashboard';

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/twitter', authenticateUser, twitterRoutes); // Twitter API routes // This is a protected route

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Social Media Dashboard API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

