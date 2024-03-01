const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Other API routes
// ...

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
