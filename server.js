const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');

const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});