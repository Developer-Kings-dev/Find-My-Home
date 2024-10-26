// routes/user.js
const express = require('express');
const { deleteUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Define routes
router.delete('/:id', authMiddleware, deleteUser); // Route to delete user by ID
router.put('/', authMiddleware, updateUser); // Route to update user info

module.exports = router;
