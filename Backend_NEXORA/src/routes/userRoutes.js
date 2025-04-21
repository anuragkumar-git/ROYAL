// Import required modules
const express = require('express');
const { registerUser, getUserProfile, updateUserProfile, deleteUserAccount, redeemDeal, saveDeal } = require('../controllers/userController');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');
const rateLimit = require('express-rate-limit');
// Create an Express Router
const router = express.Router();

// Rate limiting (5 attempts per 15 minutes)
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });


/**
 * @route POST /api/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', authLimiter, registerUser); // User Registration

/**
 * View User Profile
 * @route GET /api/profile
 * @desc Get user profile
 * @access Protected (user, admin)
 */
router.get('/profile', authenticateUser, authorizeRole(['user', 'admin']), getUserProfile);

/**
 * Update User Profile
 * @route PUT /api/profile
 * @desc Update user profile
 * @access Protected (user, admin)
 */
router.put('/profile', authenticateUser, authorizeRole(['user', 'admin']), updateUserProfile);

/**
 * Delete User Account
 * @route DELETE /api/profile
 * @desc Delete user account
 * @access Protected (user, admin)
 */
router.delete('/profile', authenticateUser, authorizeRole(['user', 'admin']), deleteUserAccount);

/**
 * @route POST /api/save-deal
 * @desc Save a deal
 * @access Protected (user, admin)
 */
router.post('/save-deal', authenticateUser, authorizeRole(['user', 'admin']), saveDeal);

/**
 * @route POST /api/redeem-deal
 * @desc Redeem a deal
 * @access Protected (user, admin)
 */
router.post('/redeem-deal', authenticateUser, authorizeRole(['user', 'admin']), redeemDeal);

// Export the Router
module.exports = router;