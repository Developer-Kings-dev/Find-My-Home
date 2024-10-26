// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User who made the booking
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property', // Reference to the Property being booked
    required: true,
  },
  startDate: {
    type: Date,
    required: true, // Start date of the booking
  },
  endDate: {
    type: Date,
    required: true, // End date of the booking
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the booking creation time
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
