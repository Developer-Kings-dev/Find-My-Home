// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const updatedData = { name, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10); // Re-hash password if provided
    }
    const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
