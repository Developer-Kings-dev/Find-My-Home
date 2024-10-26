// controllers/bookingController.js
const Booking = require('../models/Booking');
const Property = require('../models/Property');

// Book Property
exports.bookProperty = async (req, res) => {
  const { propertyId, startDate, endDate } = req.body;
  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    const booking = new Booking({
      user: req.user.id,
      property: propertyId,
      startDate,
      endDate,
    });

    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Get User Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('property');
    res.json(bookings);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
