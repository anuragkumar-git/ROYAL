const express = require('express');
const {
    registerBusiness,
    getBusinessProfile,
    updateBusinessProfile,
    deleteBusinessAccount,
} = require('../controllers/businessController');

// Middleware for authentication and authorization

const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware')

const router = express.Router();

// Business registration (Public)
router.post('/register', registerBusiness);


// Get business profile (Protected) - Only business owners can access
router.get('/profile', authenticateUser, authorizeRole('[business]'), getBusinessProfile);

// Update business profile (Protected) - Only business owners can update their profile
router.put('/profile', authenticateUser, authorizeRole('[business]'), updateBusinessProfile);

// Delete business account (Protected) - Only business owners can delete their account
router.delete('/profile', authenticateUser, authorizeRole('[business]'), deleteBusinessAccount);

module.exports = router;
