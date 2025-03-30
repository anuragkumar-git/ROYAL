const jwt = require('jsonwebtoken');
const Business = require('../models/businessModel');
const User = require('../models/userModel');

// Middleware to authenticate business token
const authenticateToken = async (req, res, next) => {
    // Extract token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        // Verify token using JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the business exists
        // const business = await Business.findById(decoded._id).populate('role'); //already in token
        const business = await Business.findById(decoded._id);
        if (!business) {
            return res.status(404).json({ success: false, message: 'Business not found' });
        }

        // Attach business data to request for further use
        req.business = business;
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};


// const authorizeRole =(roles) => {
//     return (req, res, next) => {
//         console.log(req.business);
//       if (!roles.includes(req.business.role)) {
//         return res.status(403).json({ message: 'Access denied. You do not have permission.' });
//       }
//       next();
//     };
//   };

module.exports = { authenticateToken };
