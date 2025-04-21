const express = require('express');
const { registerBusiness, getBusinessProfile, updateBusinessProfile, deleteBusinessAccount, getBusinessDashboard } = require('../controllers/businessController');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware')// Middleware for authentication and authorization
const { body } = require('express-validator')
const rateLimit = require('express-rate-limit')
const router = express.Router();

// Rate limit for registration (5 attempts per 15 minutes)
const registerLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });

/**
 *  Business registration
 * @route POST /api/business/register
 * @desc Register a new business
 * @access Public
 */
router.post('/register', registerLimiter, registerBusiness);

/**
 * Get business profile  
 * @route GET /api/business/profile
 * @desc Get business profile
 * @access Protected (business role)
 */
router.get('/profile', authenticateUser, authorizeRole('[business]'), getBusinessProfile);

/**
 * Update business profile  
 * @route PUT /api/business/profile
 * @desc Update business profile
 * @access Protected (business role)
 */
router.put('/profile', authenticateUser, authorizeRole('[business]'), updateBusinessProfile);

/**
 * Delete business account  
 * @route DELETE /api/business/profile
 * @desc Delete business account
 * @access Protected (business role)
 */
router.delete('/profile', authenticateUser, authorizeRole('[business]'), deleteBusinessAccount);

/**
 * @route GET /api/business/dashboard
 * @desc Get business dashboard stats
 * @access Protected (business)
 */
router.get('/dashboard', authenticateUser, authorizeRole(['business']), getBusinessDashboard);

module.exports = router;
