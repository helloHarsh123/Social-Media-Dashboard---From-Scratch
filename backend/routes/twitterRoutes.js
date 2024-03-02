// routes/twitterRoutes.js
const express = require('express');
const router = express.Router();
const twitterService = require('../services/twitterService');
const { authenticateUser } = require('../middleware/authMiddleware');

// Route to fetch user's timeline
router.get('/timeline', authenticateUser, async (req, res) => {
  try {
    const tweets = await twitterService.get('statuses/user_timeline');
    res.json(tweets);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
