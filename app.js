const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const path = require('path');

// Middleware for serving static files
app.use(express.static('public'));
app.use(cookieParser());

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true })); // For form submissions
app.use(express.json()); // For JSON payloads

// MongoDB connection
const mongoURI = 'mongodb+srv://test123:test123@cyberx.ylcingr.mongodb.net/?retryWrites=true&w=majority&appName=cyberx';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set the view engine
app.set('view engine', 'ejs');
app.use(authRoutes);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Default route (should come after auth routes to prevent conflicts)
app.get('/', (req, res) => {
  res.render('home');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
