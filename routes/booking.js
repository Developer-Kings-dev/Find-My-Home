// routes/booking.js
const express = require('express');
const { bookProperty, getUserBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Define routes
router.post('/', authMiddleware, bookProperty); // Route to book a property
router.get('/my-bookings', authMiddleware, getUserBookings); // Route to get all bookings by the user

module.exports = router;
