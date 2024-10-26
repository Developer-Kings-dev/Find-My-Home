// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  // Get token from the Authorization header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Split the "Bearer" part from the token
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret
    req.user = decoded; // Add the user from the token payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};


// const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
// console.log('Extracted Token:', token);
