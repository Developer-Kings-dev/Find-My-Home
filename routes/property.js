// routes/property.js
const express = require('express');
const { getProperties, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController'); // Ensure this path is correct
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

// Set up Multer for in-memory storage
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Define routes
router.get('/', getProperties); // Ensure getProperties is defined
router.post('/', authMiddleware, upload.array('images', 5), createProperty); // Ensure createProperty is defined
router.put('/:id', authMiddleware, updateProperty);
router.delete('/:id', authMiddleware, deleteProperty);



module.exports = router;
