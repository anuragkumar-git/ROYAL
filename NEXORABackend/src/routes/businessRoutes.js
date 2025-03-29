const express = require('express');
const {
    registerBusiness,
    getBusinessProfile,
    updateBusinessProfile,
    deleteBusinessAccount,
    loginBusiness,
    logoutBusiness
} = require('../controllers/businessController');

// Middleware for authentication and authorization

const { authenticateToken } = require('../middlewares/authenticateToken')
const { authorizeRole } = require('../middlewares/authorizeRole')

const router = express.Router();

// Business registration (Public)
router.post('/register', registerBusiness);

// Business login (Public)
router.post('/login', loginBusiness);

// Business logout (Protected) - Only logged in business owener can logout
router.post('/logout', logoutBusiness);

// Get business profile (Protected) - Only business owners can access
router.get('/profile', authenticateToken, authorizeRole('[business]'), getBusinessProfile);

// Update business profile (Protected) - Only business owners can update their profile
router.put('/profile', authenticateToken, authorizeRole('[business]'), updateBusinessProfile);

// Delete business account (Protected) - Only business owners can delete their account
router.delete('/profile', authenticateToken, authorizeRole('[business]'), deleteBusinessAccount);

module.exports = router;
