require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/key', (req, res) => {
    const allowedHost = 'bweather-app.onrender.com';
    const referer = req.get('Referer') || '';
    const origin = req.get('Origin') || '';

    if (!referer.includes(allowedHost) && !origin.includes(allowedHost)) {
        return res.status(403).json({ error: 'Access forbidden' });
    }

    res.json({ apiKey: process.env.WEATHER_API_KEY });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
