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
router.post('/api/register', registerBusiness);

// Business login (Public)
router.post('/api/login', loginBusiness);

// Business logout (Protected) - Only logged in business owener can logout
router.post('/api/logout', logoutBusiness);

// Get business profile (Protected) - Only business owners can access
router.get('/api/profile', authenticateToken, authorizeRole('[business]'), getBusinessProfile);

// Update business profile (Protected) - Only business owners can update their profile
router.put('/api/profile', authenticateToken, authorizeRole('[business]'), updateBusinessProfile);

// Delete business account (Protected) - Only business owners can delete their account
router.delete('/api/profile', authenticateToken, authorizeRole('[business]'), deleteBusinessAccount);

module.exports = router;
