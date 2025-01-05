require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to validate access to the API key endpoint
app.get('/api/key', (req, res) => {
    const allowedHost = 'bweather-app.onrender.com';
    const referer = req.get('Referer') || '';
    const origin = req.get('Origin') || '';

    // Check if the request is coming from your domain
    if (!referer.includes(allowedHost) && !origin.includes(allowedHost)) {
        return res.status(403).json({ error: 'Access forbidden' });
    }

    // Respond with the API key
    res.json({ apiKey: process.env.WEATHER_API_KEY });
});

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
