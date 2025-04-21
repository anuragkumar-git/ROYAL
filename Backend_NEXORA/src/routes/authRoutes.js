const router = require('express').Router()
const passport = require('passport');
const { signIn, signOut, forgetPassword, resetPassword, googleCallbackController } = require('../controllers/authController')
const { authenticateUser } = require('../middlewares/authMiddleware')
const rateLimit = require('express-rate-limit');

// Rate limiting
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 });
const resetLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3 });

/**
 * @route POST /api/auth/login
 * @desc User login
 * @access Public
 */
router.post('/login', authLimiter, signIn);
 
/**
 * @route POST /api/auth/logout
 * @desc User logout
 * @access Protected
 */
router.post('/logout', authenticateUser, signOut);

/**
 * @route POST /api/auth/forgetpassword
 * @desc Request password reset
 * @access Public
 */
router.post('/forgetpassword', resetLimiter, forgetPassword);

/**
 * @route POST /api/auth/resetpassword/:token
 * @desc Reset password
 * @access Public
 */
router.post('/resetpassword/:token', resetLimiter, resetPassword);

/**
 * @route GET /api/auth/google
 * @desc Initiate Google OAuth
 * @access Public
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @route GET /api/auth/google/callback
 * @desc Google OAuth callback
 * @access Public
 */
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallbackController);

module.exports = router