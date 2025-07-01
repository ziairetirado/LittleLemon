const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // serve HTML/CSS

// Booking handler
app.post('/book', (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;

  // Save to a simple file (simulate database)
  const entry = `${new Date().toISOString()} - ${name} (${email}) - ${phone} - ${date} ${time} for ${guests} guests\n`;
  fs.appendFileSync('bookings.txt', entry);

  // Optional: Send confirmation email (setup nodemailer properly first)
  // sendConfirmationEmail(name, email, date, time, guests);

  res.send(`<h2>Thank you, ${name}! Your reservation for ${guests} guests on ${date} at ${time} has been received.</h2><a href="/">Back</a>`);
});

// Root route (optional if you're serving a static HTML)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
