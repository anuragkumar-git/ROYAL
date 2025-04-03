const { getDashboardStats, getAllUsers, getAllBusinesses, getBusinessById, getUserById, toggleUserBlock, toggleBusinessBlock } = require('../controllers/adminController')
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware')

const router = require('express').Router()

// ✅ Get Dashboard Stats
router.get('/dashboardstates', authenticateUser, authorizeRole(['admin']), getDashboardStats)

// ✅ Get all users
router.get('/users', authenticateUser, authorizeRole(['admin']), getAllUsers)

// ✅ Get a specific user
router.get('/user/:id', authenticateUser, authorizeRole(['admin']), getUserById)

// ✅ Get all Businesses
router.get('/businesses', authenticateUser, authorizeRole(['admin']), getAllBusinesses)

// ✅ Get a specific Business
router.get('/business/:id', authenticateUser, authorizeRole(['admin']), getBusinessById)

// ✅ Block/Unblock User
router.put('/user/:id/block', authenticateUser, authorizeRole(['admin']), toggleUserBlock)

// ✅ Block/Unblock Business
router.put('/business/:id/block', authenticateUser, authorizeRole(['admin']), toggleBusinessBlock)

module.exports = router