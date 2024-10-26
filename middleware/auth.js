// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = {
  protect: async (req, res, next) => {
    try {
      let token;
      
      // Check header for token
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      // Make sure token exists
      if (!token) {
        return res.status(401).json({
          status: 'fail',
          message: 'Not authorized to access this route'
        });
      }

      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user to request
        req.user = await User.findById(decoded.id);
        next();
      } catch (err) {
        return res.status(401).json({
          status: 'fail',
          message: 'Token is not valid'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server Error'
      });
    }
  },

  // Optional: Add admin middleware if needed
  restrictTo: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          status: 'fail',
          message: 'You do not have permission to perform this action'
        });
      }
      next();
    };
  }
};

module.exports = auth;