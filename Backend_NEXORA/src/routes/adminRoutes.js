const router = require('express').Router()
const { getDashboardStats, getAllUsers, getAllBusinesses, getBusinessById, getUserById, toggleUserBlock, toggleBusinessBlock, approveBusiness, getReportedDeals, resolveReportedDeal } = require('../controllers/adminController')
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware')
const rateLimit = require('express-rate-limit');
// Rate limiting
const adminLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });

/**
// ✅ Get Dashboard Stats
 * @route GET /api/admin/dashboard-stats
 * @desc Get admin dashboard stats
 * @access Admin
 */
router.get('/dashboardstates', adminLimiter, authenticateUser, authorizeRole(['admin']), getDashboardStats)

/**
 // ✅ Get all users
 * @route GET /api/admin/users
 * @desc Get all users
 * @access Admin
 */
router.get('/users', adminLimiter, authenticateUser, authorizeRole(['admin']), getAllUsers)

/**
// ✅ Get a specific user
 * @route GET /api/admin/user/:id
 * @desc Get a specific user
 * @access Admin
 */
router.get('/user/:id', adminLimiter, authenticateUser, authorizeRole(['admin']), getUserById)

/**
// ✅ Get all Businesses
 * @route GET /api/admin/businesses
 * @desc Get all businesses
 * @access Admin
 */
router.get('/businesses', adminLimiter, authenticateUser, authorizeRole(['admin']), getAllBusinesses)

/**
// ✅ Get a specific Business
 * @route GET /api/admin/business/:id
 * @desc Get a specific business
 * @access Admin
 */
router.get('/business/:id', adminLimiter, authenticateUser, authorizeRole(['admin']), getBusinessById)

/**
// ✅ Block/Unblock User
 * @route PUT /api/admin/user/:id/block
 * @desc Block/unblock a user
 * @access Admin
 */
router.put('/user/:id/block', adminLimiter, authenticateUser, authorizeRole(['admin']), toggleUserBlock)

/**
// ✅ Block/Unblock Business
 * @route PUT /api/admin/business/:id/block
 * @desc Block/unblock a business
 * @access Admin
 */
router.put('/business/:id/block', adminLimiter, authenticateUser, authorizeRole(['admin']), toggleBusinessBlock)

/**
 * @route PUT /api/admin/business/:id/approve
 * @desc Approve/reject a business
 * @access Admin
 */
router.put('/business/:id/approve', adminLimiter, authenticateUser, authorizeRole(['admin']), approveBusiness);

// /**
//  * @route PUT /api/admin/deal/:id/approve
//  * @desc Approve/reject a deal
//  * @access Admin
//  */
// router.put('/deal/:id/approve', adminLimiter, authenticateUser, authorizeRole(['admin']), approveDeal);

/**
 * @route GET /api/admin/reported-deals
 * @desc Get reported deals
 * @access Admin
 */
router.get('/reported-deals', adminLimiter, authenticateUser, authorizeRole(['admin']), getReportedDeals);

/**
 * @route PUT /api/admin/reported-deals/:id/resolve
 * @desc Resolve a reported deal
 * @access Admin
 */
router.put('/reported-deals/:id/resolve', adminLimiter, authenticateUser, authorizeRole(['admin']), resolveReportedDeal);

module.exports = router