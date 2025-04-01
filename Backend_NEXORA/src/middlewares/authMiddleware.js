// Import required modules
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const blacklistTokenModel = require('../models/blacklistTokenModel');
require('dotenv').config();

// Authentication Middleware to Verify JWT Token
const authenticateUser = async (req, res, next) => {
  try {
    // Check if Authorization header exists and contains the token
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Format: Bearer 

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const isBlackListed = await blacklistTokenModel.findOne({ token: token })
    if (isBlackListed) {
      return res.status(401).json({
        msg: "Unauthorized"
      })
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data (userId and role) to the request object

    // Check if user exists in the database

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found. middleware' });
    }

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.', error });
  }
};

//? Role-Based Authorization Middleware
// const authorizeUserRole = (roles) => {
//   return (req, res, next) => {
//     console.log(res.user);

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied. You do not have permission.' });
//     }
//     next();
//   };
// };

// Export Middleware Functions
module.exports = {
  authenticateUser
};
