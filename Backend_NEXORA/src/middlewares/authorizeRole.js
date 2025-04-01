const jwt = require('jsonwebtoken');


// Middleware to authorize specific roles
const authorizeRole = (roles) => {

    return (req, res, next) => {
        const token = req.cookies.token ||req.headers.authorization?.split(' ')
        [1]; // Bearer <token>
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Check if role exists in the decoded token
            const userRole = decoded.role;


            // Check if the user's role is authorized
            if (!roles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. You do not have permission to perform this action.'
                });
            }

            next(); // Proceed if authorized
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'An error occurred while authorizing the user.'
            });
        }
    };
};

module.exports = { authorizeRole }