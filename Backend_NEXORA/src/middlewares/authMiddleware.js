const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Business = require('../models/businessModel')
const blacklistTokenModel = require('../models/blacklistTokenModel');
require('dotenv').config();

// Authentication Middleware to Verify JWT Token
const authenticateUser = async (req, res, next) => {
  try {
    // Check if Authorization header exists and contains the token
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Format: Bearer token

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Check if token is blacklisted
    const isBlackListed = await blacklistTokenModel.findOne({ token })

    if (isBlackListed) {
      return res.status(401).json({
        msg: "Unauthorized. Token is blacklisted."
      })
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    // Check if user or business exists in the database
    let account;
    if (decoded.role === 'user' || decoded.role === 'admin') {
      account = await User.findById(decoded._id);
    } else if (decoded.role === 'business') {
      account = await Business.findById(decoded._id)
    }

    if (!account) {
      return res.status(401).json({ message: 'authMiddleware:\nAccount not found' })
    }
    req.user = decoded
    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.', error });
  }
};

//? Role-Based Authorization Middleware
const authorizeRole = (roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have permission.' });
    }
    next();
  };
};

// Export Middleware Functions
module.exports = {
  authenticateUser, authorizeRole
};
